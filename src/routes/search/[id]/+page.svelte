<script>
	import { lostItems } from '$lib/store.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let item = null;
	let isLoading = true;
	let notFound = false;
	
	onMount(async () => {
		const itemId = $page.params.id;
		
		if (itemId) {
			try {
				// In a real app, you would fetch the specific item by ID
				// For now, we'll simulate this by searching through all items
				const allItems = await lostItems.getSorted();
				item = allItems.find(i => i.id === itemId);
				
				if (!item) {
					notFound = true;
				}
			} catch (error) {
				console.error('Error fetching item:', error);
				notFound = true;
			} finally {
				isLoading = false;
			}
		} else {
			notFound = true;
			isLoading = false;
		}
	});
	
	// Function to format date for display
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	// Function to format date reported
	function formatDateReported(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Detail Barang Hilang - Seekly</title>
</svelte:head>

<div class="card">
	{#if isLoading}
		<div class="alert alert-info">
			🔄 Memuat detail barang...
		</div>
	{:else if notFound}
		<div class="alert alert-warning">
			<h2>❌ Barang Tidak Ditemukan</h2>
			<p>Maaf, barang yang Anda cari tidak dapat ditemukan.</p>
			<a href="/search" class="btn btn-primary">← Kembali ke Pencarian</a>
		</div>
	{:else if item}
		<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
			<h2 style="margin: 0; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2.2rem; font-weight: 700;">
				🔍 Detail Barang Hilang
			</h2>
			<a href="/reports" class="btn" style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); padding: 10px 20px; font-size: 14px;">
				← Kembali
			</a>
		</div>
		
		<div class="card item-card" style="border-left: 6px solid #667eea;">
			<div class="item-header">
				<div>
					<h3 class="item-title">{item.description}</h3>
					<div style="color: #718096; font-size: 14px; margin-top: 5px;">
						<strong>Ref:</strong> {item.referenceNumber}
					</div>
				</div>
				<div class="item-date">
					Dilaporkan: {formatDateReported(item.dateReported)}
				</div>
			</div>
			
			<div style="display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start;">
				<!-- Details -->
				<div>
					<div class="item-info">
						<strong>📍 Lokasi Kehilangan:</strong> {item.location}
					</div>
					
					<div class="item-info">
						<strong>📅 Tanggal Hilang:</strong> {formatDate(item.dateLost)}
					</div>
					
					<div class="item-info">
						<strong>🧍 Dilaporkan oleh:</strong> {item.reporterName}
					</div>
					
					{#if item.contact}
						<div class="item-info">
							<strong>📞 Kontak:</strong> {item.contact}
						</div>
					{/if}
					
					<div class="item-info">
						<strong>📝 Deskripsi Lengkap:</strong>
						<p style="margin-top: 0.5rem; line-height: 1.6;">{item.description}</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Action Buttons -->
		<div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
			<a href="/chat?name={item.reporterName}&item={item.description}" class="btn btn-success" style="flex: 1; min-width: 150px; text-align: center;">
				💬 Hubungi Pelapor
			</a>
			
			<a href="/reports" class="btn" style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); flex: 1; min-width: 150px; text-align: center;">
				🔍 Cari Barang Lain
			</a>
			
			<a href="/" class="btn btn-primary" style="flex: 1; min-width: 150px; text-align: center;">
				📝 Laporkan Barang Hilang
			</a>
			

		</div>
		
		<!-- Additional Info -->
		<div class="card" style="margin-top: 2rem; background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05)); border: 1px solid rgba(102, 126, 234, 0.1);">
			<h3 style="margin-top: 0; color: #667eea;">💡 Tips</h3>
			<ul style="padding-left: 1.5rem;">
				<li style="margin-bottom: 0.5rem;">Pastikan Anda yakin bahwa ini adalah barang yang Anda cari</li>
				<li style="margin-bottom: 0.5rem;">Hubungi pelapor segera setelah memastikan barang tersebut milik Anda</li>
				<li style="margin-bottom: 0.5rem;">Siapkan identitas barang sebagai bukti kepemilikan saat menghubungi</li>
			</ul>
		</div>
	{/if}
</div>

<style>
	.item-card {
		border-left: 6px solid #667eea;
		margin-bottom: 20px;
		position: relative;
		overflow: hidden;
	}
	
	.item-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
		pointer-events: none;
	}
	
	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		position: relative;
		z-index: 1;
		flex-wrap: wrap;
		gap: 1rem;
	}
	
	.item-title {
		font-size: 24px;
		font-weight: 600;
		color: #667eea;
		text-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
		margin: 0;
	}
	
	.item-date {
		color: #718096;
		font-size: 14px;
		font-weight: 500;
		background: rgba(102, 126, 234, 0.1);
		padding: 4px 12px;
		border-radius: 20px;
	}
	
	.item-info {
		margin: 15px 0;
		position: relative;
		z-index: 1;
	}
	
	.item-info strong {
		color: #4a5568;
		font-weight: 600;
		display: block;
		margin-bottom: 5px;
	}
	
	.alert {
		padding: 20px;
		margin-bottom: 25px;
		border-radius: 15px;
		font-weight: 500;
		border: none;
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	
	.alert::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}
	
	@keyframes shimmer {
		0% { left: -100%; }
		100% { left: 100%; }
	}
	
	.alert-info {
		background: linear-gradient(135deg, #3498db, #2980b9);
		color: white;
		box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
	}
	
	.alert-warning {
		background: linear-gradient(135deg, #f39c12, #e67e22);
		color: white;
		box-shadow: 0 10px 25px rgba(243, 156, 18, 0.3);
	}
	
	.btn {
		background: linear-gradient(45deg, #ff6b6b, #ee5a24);
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 25px;
		cursor: pointer;
		font-size: 16px;
		font-weight: 500;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		text-decoration: none;
		display: inline-block;
		text-align: center;
	}
	
	.btn:hover {
		background: linear-gradient(45deg, #ee5a24, #ff6b6b);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
	}
	
	.btn-primary {
		background: linear-gradient(45deg, #3498db, #2980b9);
		box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
	}
	
	.btn-primary:hover {
		background: linear-gradient(45deg, #2980b9, #3498db);
		box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
	}
	
	.btn-success {
		background: linear-gradient(45deg, #2ecc71, #27ae60);
		box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
	}
	
	.btn-success:hover {
		background: linear-gradient(45deg, #27ae60, #2ecc71);
		box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
	}
	
	@media (max-width: 768px) {
		.item-header {
			flex-direction: column;
			align-items: flex-start;
		}
		
		.item-title {
			font-size: 20px;
		}
		
		.item-info strong {
			font-size: 14px;
		}
	}
</style>