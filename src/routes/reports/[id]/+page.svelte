<script>
	import { page } from '$app/stores';
	import { lostItems, foundReports, ITEM_STATUS, STATUS_CONFIG } from '$lib/store.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	// Get the report ID from the URL parameter
	const reportId = $page.params.id;
	
	// State variables
	let report = null;
	let isLoading = true;
	let error = null;
	let showMarkFoundConfirm = false;
	let showStatusUpdateForm = false;
	let newStatus = '';
	let statusNotes = '';
	
	// Load the report data on mount
	onMount(async () => {
		await loadReport();
	});
	
	async function loadReport() {
		isLoading = true;
		error = null;
		
		try {
			// Try to find in lost items first
			const lostItemsList = await lostItems.getSorted();
			const foundLostItem = lostItemsList.find(item => item.id === reportId);
			
			if (foundLostItem) {
				report = {
					...foundLostItem,
					jenis_laporan: 'Barang Hilang',
					nama_barang: foundLostItem.description,
					lokasi_terakhir: foundLostItem.location,
					tanggal_laporan: foundLostItem.dateLost,
					foto_barang: null // No photo in current data model
				};
			} else {
				// Try to find in found reports
				const foundItemsList = await foundReports.getSorted();
				const foundFoundItem = foundItemsList.find(item => item.id === reportId);
				
				if (foundFoundItem) {
					report = {
						...foundFoundItem,
						jenis_laporan: 'Barang Ditemukan',
						nama_barang: foundFoundItem.itemName,
						lokasi_terakhir: foundFoundItem.locationFound,
						tanggal_laporan: foundFoundItem.dateFound,
						foto_barang: foundFoundItem.photo,
						deskripsi: foundFoundItem.description
					};
				} else {
					error = 'Laporan tidak ditemukan';
				}
			}
		} catch (err) {
			console.error('Error loading report:', err);
			error = 'Terjadi kesalahan saat memuat laporan';
		} finally {
			isLoading = false;
		}
	}
	
	// Function to contact admin
	function contactAdmin() {
		// In a real app, this would open a contact form or email
		alert('Fitur kontak admin akan membuka formulir kontak atau mengirim email ke admin.');
	}
	
	// Function to mark as found
	function markAsFound() {
		if (report.jenis_laporan === 'Barang Hilang') {
			showMarkFoundConfirm = true;
		}
	}
	
	// Function to confirm marking as found
	async function confirmMarkAsFound() {
		try {
			// Update status to FOUND
			lostItems.updateStatus(report.id, ITEM_STATUS.FOUND, 'Ditandai sebagai ditemukan oleh pelapor');
			
			// Reload the report to show updated status
			await loadReport();
			
			showMarkFoundConfirm = false;
		} catch (err) {
			console.error('Error updating status:', err);
			alert('Terjadi kesalahan saat memperbarui status');
		}
	}
	
	// Function to update status
	async function updateStatus() {
		if (!newStatus) return;
		
		try {
			lostItems.updateStatus(report.id, newStatus, statusNotes);
			
			// Reload the report to show updated status
			await loadReport();
			
			// Reset form
			showStatusUpdateForm = false;
			newStatus = '';
			statusNotes = '';
		} catch (err) {
			console.error('Error updating status:', err);
			alert('Terjadi kesalahan saat memperbarui status');
		}
	}
	
	// Function to format date for display
	function formatDate(dateString) {
		if (!dateString) return '-';
		
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	// Function to format date reported
	function formatDateReported(dateString) {
		if (!dateString) return '-';
		
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	
	// Function to go back to reports list
	function goBack() {
		goto('/reports');
	}
</script>

<svelte:head>
	<title>Detail Laporan - Aplikasi Seekly</title>
</svelte:head>

<div class="report-detail-container">
	<!-- Back Button -->
	<div style="margin-bottom: 1.5rem;">
		<button 
			on:click={goBack}
			class="btn"
			style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); border-radius: 20px; display: inline-flex; align-items: center; gap: 8px;"
		>
			<span>←</span>
			<span>Kembali ke Daftar Laporan</span>
		</button>
	</div>

	{#if isLoading}
		<div class="alert alert-info">
			🔄 Memuat detail laporan...
		</div>
	{:else if error}
		<div class="alert alert-danger">
			❌ {error}
		</div>
	{:else if report}
		<div class="card">
			<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
				<div>
					<h2 style="color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2rem; font-weight: 700;">
						📋 Detail Laporan
					</h2>
					<p style="color: #718096; margin: 0.5rem 0 0 0;">
						ID: {report.id} | Referensi: {report.referenceNumber || '-'}
					</p>
				</div>
				
				<!-- Status Badge -->
				{#if report.status}
					{@const statusConfig = STATUS_CONFIG[report.status]}
					<div style="background: {statusConfig.color}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
						<span>{statusConfig.icon}</span>
						<span>{statusConfig.label}</span>
					</div>
				{/if}
			</div>
			
			<!-- Report Info Grid -->
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
				<!-- Left Column -->
				<div>
					<h3 style="color: #4a5568; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 0;">Informasi Barang</h3>
					
					<div class="info-item">
						<label>🏷️ Nama Barang:</label>
						<p>{report.nama_barang || '-'}</p>
					</div>
					
					<div class="info-item">
						<label>📋 Jenis Laporan:</label>
						<p>
							{#if report.jenis_laporan === 'Barang Hilang'}
								<span style="color: #FF6B6B; font-weight: 600;">🔍 {report.jenis_laporan}</span>
							{:else}
								<span style="color: #4ECDC4; font-weight: 600;">📦 {report.jenis_laporan}</span>
							{/if}
						</p>
					</div>
					
					<div class="info-item">
						<label>📍 Lokasi Terakhir:</label>
						<p>{report.lokasi_terakhir || '-'}</p>
					</div>
					
					<div class="info-item">
						<label>📝 Deskripsi:</label>
						<p style="white-space: pre-wrap;">{report.deskripsi || '-'}</p>
					</div>
				</div>
				
				<!-- Right Column -->
				<div>
					<h3 style="color: #4a5568; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 0;">Informasi Laporan</h3>
					
					<div class="info-item">
						<label>📅 Tanggal Laporan:</label>
						<p>{formatDate(report.tanggal_laporan)}</p>
					</div>
					
					<div class="info-item">
						<label>🕰️ Waktu Dilaporkan:</label>
						<p>{formatDateReported(report.dateReported)}</p>
					</div>
					
					<div class="info-item">
						<label>👤 Pelapor:</label>
						<p>{report.reporterName || '-'}</p>
					</div>
					
					{#if report.jenis_laporan === 'Barang Hilang' && report.contact}
						<div class="info-item">
							<label>📞 Kontak Pelapor:</label>
							<p>{report.contact}</p>
						</div>
					{:else if report.jenis_laporan === 'Barang Ditemukan'}
						<div class="info-item">
							<label>📞 Telepon Pelapor:</label>
							<p>{report.reporterPhone || '-'}</p>
						</div>
						<div class="info-item">
							<label>✉️ Email Pelapor:</label>
							<p>{report.reporterEmail || '-'}</p>
						</div>
						{#if report.timeFound}
							<div class="info-item">
								<label>🕰️ Waktu Ditemukan:</label>
								<p>{report.timeFound}</p>
							</div>
						{/if}
					{/if}
					
					<!-- Photo (if available) -->
					{#if report.foto_barang}
						<div class="info-item">
							<label>📸 Foto Barang:</label>
							<div style="margin-top: 0.5rem;">
								<img 
									src={report.foto_barang} 
									alt="Foto barang" 
									style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"
									on:error={(e) => e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">📷 Gambar tidak tersedia</text></svg>'}
								/>
							</div>
						</div>
					{/if}
				</div>
			</div>
			
			<!-- Action Buttons -->
			<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #e2e8f0;">
				<button 
					on:click={contactAdmin}
					class="btn btn-primary"
					style="border-radius: 20px; display: inline-flex; align-items: center; gap: 8px;"
				>
					📞 Hubungi Admin
				</button>
				
				{#if report.jenis_laporan === 'Barang Hilang' && report.status !== ITEM_STATUS.FOUND && report.status !== ITEM_STATUS.CLOSED}
					<button 
						on:click={markAsFound}
						class="btn btn-success"
						style="border-radius: 20px; display: inline-flex; align-items: center; gap: 8px;"
					>
						✅ Tandai Sudah Ditemukan
					</button>
				{/if}
				
				<!-- Admin-only status update (in a real app, this would check user permissions) -->
				{#if report.jenis_laporan === 'Barang Hilang'}
					<button 
						on:click={() => showStatusUpdateForm = !showStatusUpdateForm}
						class="btn"
						style="background: linear-gradient(45deg, #3498db, #2980b9); border-radius: 20px; display: inline-flex; align-items: center; gap: 8px;"
					>
						🔄 Update Status
					</button>
				{/if}
			</div>
			
			<!-- Status Update Form (Admin only) -->
			{#if showStatusUpdateForm}
				<div class="card" style="margin-top: 1.5rem; background: linear-gradient(135deg, #f8f9ff, #e8f0ff); border: 2px solid rgba(102, 126, 234, 0.1);">
					<h3 style="color: #4a5568; margin-top: 0;">Update Status Laporan</h3>
					
					<div style="margin-bottom: 1rem;">
						<label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Status Baru:</label>
						<select bind:value={newStatus} style="width: 100%; padding: 10px; border-radius: 8px; border: 2px solid #e2e8f0;">
							<option value="">-- Pilih Status --</option>
							{#each Object.entries(STATUS_CONFIG) as [statusKey, config]}
								<option value={statusKey}>{config.label}</option>
							{/each}
						</select>
					</div>
					
					<div style="margin-bottom: 1rem;">
						<label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Catatan (Opsional):</label>
						<textarea 
							bind:value={statusNotes} 
							placeholder="Tambahkan catatan untuk update status ini..."
							style="width: 100%; padding: 10px; border-radius: 8px; border: 2px solid #e2e8f0; min-height: 80px;"
						></textarea>
					</div>
					
					<div style="display: flex; gap: 1rem;">
						<button 
							on:click={updateStatus}
							class="btn btn-success"
							disabled={!newStatus}
							style="border-radius: 20px;"
						>
							✅ Simpan Perubahan
						</button>
						<button 
							on:click={() => showStatusUpdateForm = false}
							class="btn"
							style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); border-radius: 20px;"
						>
							Batal
						</button>
					</div>
				</div>
			{/if}
		</div>
		
		<!-- Status History (for lost items only) -->
		{#if report.jenis_laporan === 'Barang Hilang' && report.statusHistory && report.statusHistory.length > 0}
			<div class="card" style="margin-top: 1.5rem;">
				<h3 style="color: #4a5568; margin-top: 0; display: flex; align-items: center; gap: 10px;">
					<span>📊</span>
					<span>Histori Status</span>
				</h3>
				
				<div style="position: relative;">
					<!-- Timeline line -->
					<div style="position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: #e2e8f0;"></div>
					
					{#each report.statusHistory as statusUpdate, index}
						{@const statusConfig = STATUS_CONFIG[statusUpdate.status]}
						<div style="display: flex; margin-bottom: 1.5rem; position: relative;">
							<!-- Timeline dot -->
							<div style="width: 32px; height: 32px; border-radius: 50%; background: {statusConfig.color}; color: white; display: flex; align-items: center; justify-content: center; margin-right: 15px; z-index: 1; flex-shrink: 0;">
								{statusConfig.icon}
							</div>
							
							<div style="flex: 1;">
								<div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
									<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem;">
										<strong style="color: {statusConfig.color};">{statusConfig.label}</strong>
										<span style="color: #718096; font-size: 0.9rem;">{formatDateReported(statusUpdate.date)}</span>
									</div>
									
									{#if statusUpdate.notes}
										<p style="margin: 0; color: #4a5568;">{statusUpdate.notes}</p>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		
		<!-- Comments Section (for lost items only) -->
		{#if report.jenis_laporan === 'Barang Hilang' && report.comments}
			<div class="card" style="margin-top: 1.5rem;">
				<h3 style="color: #4a5568; margin-top: 0; display: flex; align-items: center; gap: 10px;">
					<span>💬</span>
					<span>Komentar ({report.comments.length})</span>
				</h3>
				
				{#if report.comments.length === 0}
					<p style="color: #718096; text-align: center; padding: 1rem;">Belum ada komentar untuk laporan ini.</p>
				{:else}
					<div style="max-height: 400px; overflow-y: auto; padding-right: 10px;">
						{#each report.comments as comment}
							<div style="background: {comment.isAdmin ? 'linear-gradient(135deg, #e8f8f7, #d1f0ee)' : 'white'}; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
								<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem;">
									<strong style="color: {comment.isAdmin ? '#4ECDC4' : '#667eea'};">
										{comment.author} {#if comment.isAdmin} <span style="background: #4ECDC4; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.8rem; margin-left: 5px;">Admin</span>{/if}
									</strong>
									<span style="color: #718096; font-size: 0.9rem;">{formatDateReported(comment.timestamp)}</span>
								</div>
								<p style="margin: 0; color: #4a5568;">{comment.message}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>

{#if showMarkFoundConfirm}
	<div class="modal-overlay">
		<div class="modal-content">
			<h3 style="margin-top: 0; color: #4a5568;">✅ Konfirmasi Tandai Sudah Ditemukan</h3>
			<p>Apakah Anda yakin ingin menandai laporan ini sebagai "Barang Ditemukan"? Status ini akan memperbarui laporan Anda dan memberi tahu tim admin.</p>
			
			<div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
				<button 
					on:click={confirmMarkAsFound}
					class="btn btn-success"
					style="flex: 1; border-radius: 20px;"
				>
					Ya, Tandai Sudah Ditemukan
				</button>
				<button 
					on:click={() => showMarkFoundConfirm = false}
					class="btn"
					style="flex: 1; background: linear-gradient(45deg, #95a5a6, #7f8c8d); border-radius: 20px;"
				>
					Batal
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.report-detail-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}
	
	.info-item {
		margin-bottom: 1.5rem;
	}
	
	.info-item label {
		display: block;
		font-weight: 600;
		color: #4a5568;
		margin-bottom: 0.5rem;
	}
	
	.info-item p {
		margin: 0;
		padding: 0.75rem;
		background: #f8fafc;
		border-radius: 8px;
		border: 1px solid #e2e8f0;
		color: #4a5568;
	}
	
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	
	.modal-content {
		background: white;
		padding: 2rem;
		border-radius: 15px;
		max-width: 500px;
		margin: 1rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}
	
	@media (max-width: 768px) {
		.report-detail-container {
			padding: 0.5rem;
		}
		
		.info-item p {
			padding: 0.5rem;
		}
		
		.modal-content {
			padding: 1.5rem;
		}
	}
</style>