<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { lostItems, ITEM_STATUS, STATUS_CONFIG } from '$lib/store.js';
	import ProgressTracker from '$lib/components/ProgressTracker.svelte';
	import TimelineActivity from '$lib/components/TimelineActivity.svelte';
	import ChatSystem from '$lib/components/ChatSystem.svelte';

	let reportReference = '';
	let reportData = null;
	let loading = false;
	let error = '';
	let showCloseDialog = false;
	let closeNotes = '';

	onMount(() => {
		// Get reference from URL params
		const urlParams = new URLSearchParams(window.location.search);
		const ref = urlParams.get('ref');
		if (ref) {
			reportReference = ref;
			searchReport();
		}
	});

	async function searchReport() {
		if (!reportReference.trim()) {
			error = 'Masukkan nomor referensi laporan';
			return;
		}
		
		loading = true;
		error = '';
		
		try {
			const found = await lostItems.findByReference(reportReference);
			if (found) {
				reportData = found;
				// Notifications functionality removed as per requirements
			} else {
				error = 'Laporan tidak ditemukan. Periksa kembali nomor referensi Anda.';
				reportData = null;
			}
		} catch (err) {
			error = 'Terjadi kesalahan saat mencari laporan';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	function handleCloseReport() {
		if (closeNotes.trim()) {
			lostItems.closeReport(reportData.id, closeNotes);
			showCloseDialog = false;
			closeNotes = '';
			// Refresh data
			searchReport();
		}
	}

	function getStatusProgress() {
		if (!reportData) return 0;
		const statuses = [ITEM_STATUS.RECEIVED, ITEM_STATUS.VERIFYING, ITEM_STATUS.SEARCHING, ITEM_STATUS.FOUND, ITEM_STATUS.CLOSED];
		const currentIndex = statuses.indexOf(reportData.status);
		return currentIndex >= 0 ? ((currentIndex + 1) / statuses.length) * 100 : 0;
	}
</script>

<svelte:head>
	<title>Status Laporan - Seekly</title>
</svelte:head>

<div class="status-container">
	<div class="container">
		<!-- Header -->
		<div class="card">
			<h1 class="page-title">Status Laporan Barang Hilang</h1>
			
			<!-- Search Form -->
			<div class="search-form">
				<div class="form-group">
					<label for="reference">Nomor Referensi Laporan</label>
					<input
						id="reference"
						type="text"
						bind:value={reportReference}
						placeholder="Masukkan nomor referensi (contoh: LI-2024-123456)"
						class="search-input"
						on:keydown={(e) => e.key === 'Enter' && searchReport()}
					/>
				</div>
				<button
					on:click={searchReport}
					disabled={loading}
					class="btn btn-primary {loading ? 'disabled' : ''}"
				>
					{loading ? 'Mencari...' : 'Cari Laporan'}
				</button>
			</div>
			
			{#if error}
				<div class="alert alert-warning">
					<p>{error}</p>
				</div>
			{/if}
		</div>

		{#if reportData}
			<!-- Report Found -->
			<div class="report-sections">
				<!-- Report Overview -->
				<div class="card">
					<div class="report-header">
						<div class="report-info">
							<h2 class="report-title">Laporan #{reportData.referenceNumber}</h2>
							<p class="reporter-info">Dilaporkan oleh: {reportData.reporterName}</p>
						</div>
						<div class="status-badge">
							<span class="status-icon">{STATUS_CONFIG[reportData.status]?.icon}</span>
							<span 
								class="status-label"
								style="background-color: {STATUS_CONFIG[reportData.status]?.color}"
							>
								{STATUS_CONFIG[reportData.status]?.label}
							</span>
						</div>
					</div>

					<div class="report-details">
						<div class="detail-item">
							<h3 class="detail-label">Deskripsi Barang</h3>
							<p class="detail-value">{reportData.description}</p>
						</div>
						<div class="detail-item">
							<h3 class="detail-label">Lokasi Hilang</h3>
							<p class="detail-value">{reportData.location}</p>
						</div>
						<div class="detail-item">
							<h3 class="detail-label">Tanggal Hilang</h3>
							<p class="detail-value">{new Date(reportData.dateLost).toLocaleDateString('id-ID')}</p>
						</div>
						<div class="detail-item">
							<h3 class="detail-label">Tanggal Laporan</h3>
							<p class="detail-value">{new Date(reportData.dateReported).toLocaleDateString('id-ID')}</p>
						</div>
					</div>
				</div>

				<!-- Progress Tracker -->
				<ProgressTracker {reportData} />

				<!-- Notifications Panel removed as per requirements -->

				<!-- Timeline Activity -->
				<TimelineActivity statusHistory={reportData.statusHistory || []} />

				<!-- Chat System -->
				<ChatSystem 
					reportId={reportData.id} 
					comments={reportData.comments || []} 
					on:newComment={(e) => {
						lostItems.addComment(reportData.id, e.detail);
						searchReport(); // Refresh data
					}}
				/>

				

				<!-- Close Report Button -->
				{#if reportData.status !== ITEM_STATUS.CLOSED && reportData.status !== ITEM_STATUS.CANCELLED}
					<div class="card">
						<h3 class="section-title">Tutup Laporan</h3>
						<p class="section-description">
							Jika barang telah ditemukan atau Anda ingin menutup laporan ini, klik tombol di bawah.
						</p>
						<button
							on:click={() => showCloseDialog = true}
							class="btn btn-success"
						>
							Tutup Laporan
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<!-- Close Report Dialog -->
{#if showCloseDialog}
	<div class="modal-overlay">
		<div class="modal">
			<h3 class="modal-title">Tutup Laporan</h3>
			<p class="modal-description">
				Berikan catatan atau komentar untuk penutupan laporan ini:
			</p>
			<div class="form-group">
				<textarea
					bind:value={closeNotes}
					placeholder="Contoh: Barang telah ditemukan dan diambil..."
					rows="3"
				></textarea>
			</div>
			<div class="modal-actions">
				<button
					on:click={() => { showCloseDialog = false; closeNotes = ''; }}
					class="btn-cancel"
				>
					Batal
				</button>
				<button
					on:click={handleCloseReport}
					disabled={!closeNotes.trim()}
					class="btn btn-success {!closeNotes.trim() ? 'disabled' : ''}"
				>
					Tutup Laporan
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.status-container {
		min-height: 100vh;
		padding: 2rem 0;
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #2d3748;
		margin-bottom: 1.5rem;
		text-align: center;
		background: linear-gradient(45deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.search-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.search-input {
		width: 100%;
		padding: 15px 20px;
		border: 2px solid #e2e8f0;
		border-radius: 15px;
		font-size: 16px;
		transition: all 0.3s ease;
		background: rgba(255, 255, 255, 0.9);
		font-family: 'Poppins', sans-serif;
	}

	.search-input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
		background: white;
		transform: translateY(-2px);
	}

	.report-sections {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.report-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.report-info {
		flex: 1;
	}

	.report-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 0.5rem;
	}

	.reporter-info {
		color: #718096;
		font-weight: 500;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-icon {
		font-size: 1.5rem;
	}

	.status-label {
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.report-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.detail-item {
		padding: 1rem;
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
		border-radius: 12px;
		border: 1px solid rgba(102, 126, 234, 0.1);
	}

	.detail-label {
		font-weight: 600;
		color: #4a5568;
		margin-bottom: 0.5rem;
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.detail-value {
		color: #2d3748;
		font-weight: 500;
		line-height: 1.5;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 1rem;
	}

	.section-description {
		color: #718096;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.disabled:hover {
		transform: none !important;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		padding: 1rem;
		backdrop-filter: blur(5px);
	}

	.modal {
		background: white;
		border-radius: 20px;
		max-width: 500px;
		width: 100%;
		padding: 2rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
		animation: modalSlideIn 0.3s ease;
	}

	@keyframes modalSlideIn {
		from {
			opacity: 0;
			transform: translateY(-20px) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.modal-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 1rem;
	}

	.modal-description {
		color: #718096;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	.btn-cancel {
		padding: 10px 20px;
		color: #718096;
		background: transparent;
		border: 2px solid #e2e8f0;
		border-radius: 15px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Poppins', sans-serif;
	}

	.btn-cancel:hover {
		color: #4a5568;
		border-color: #cbd5e0;
		background: #f7fafc;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.page-title {
			font-size: 2rem;
		}

		.report-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.report-details {
			grid-template-columns: 1fr;
		}

		.modal {
			padding: 1.5rem;
			margin: 1rem;
		}

		.modal-actions {
			flex-direction: column;
		}
	}
</style>