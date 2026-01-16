<script>
	import { lostItems, foundReports } from '$lib/store.js';
	import { onMount } from 'svelte';
	
	let searchTerm = '';
	let searchResults = [];
	let isSearching = false;
	let hasSearched = false;
	let searchType = 'all'; // 'all', 'lost', 'found'
	
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
	
	async function performSearch() {
		if (!searchTerm.trim()) return;
		
		isSearching = true;
		hasSearched = true;
		searchResults = [];
		
		try {
			// Get all items
			const lostItemsList = await lostItems.getSorted();
			const foundItemsList = await foundReports.getSorted();
			
			let results = [];
			
			// Search in lost items
			if (searchType === 'all' || searchType === 'lost') {
				const lostMatches = lostItemsList.filter(item => 
					item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(item.contact && item.contact.toLowerCase().includes(searchTerm.toLowerCase()))
				).map(item => ({
					...item,
					type: 'lost'
				}));
				
				results = [...results, ...lostMatches];
			}
			
			// Search in found items
			if (searchType === 'all' || searchType === 'found') {
				const foundMatches = foundItemsList.filter(item => 
					item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.locationFound.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.reporterName.toLowerCase().includes(searchTerm.toLowerCase())
				).map(item => ({
					...item,
					type: 'found'
				}));
				
				results = [...results, ...foundMatches];
			}
			
			// Sort by date reported (newest first)
			results.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
			
			searchResults = results;
		} catch (error) {
			console.error('Search error:', error);
			searchResults = [];
		} finally {
			isSearching = false;
		}
	}
	
	function handleSearchSubmit(e) {
		e.preventDefault();
		performSearch();
	}
	
	// Reset search
	function resetSearch() {
		searchTerm = '';
		searchResults = [];
		hasSearched = false;
		searchType = 'all';
	}
</script>

<svelte:head>
	<title>Cari Barang Hilang & Temuan - Seekly</title>
</svelte:head>

<div class="card">
	<div style="text-align: center; margin-bottom: 2rem;">
		<h2 style="margin: 0; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2.5rem; font-weight: 700;">
			🔍 Cari Barang
		</h2>
		<p style="color: #718096; font-size: 1.1rem; margin-top: 0.5rem;">
			Cari barang hilang atau barang temuan di komunitas Anda
		</p>
	</div>
	
	<form on:submit={handleSearchSubmit} style="margin-bottom: 2rem;">
		<div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
			<input 
				type="text" 
				placeholder="🔍 Masukkan nama barang, lokasi, atau deskripsi..." 
				bind:value={searchTerm}
				style="flex: 1; min-width: 250px; padding: 15px; border: 2px solid #e2e8f0; border-radius: 15px; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: all 0.3s ease;"
			/>
			
			<button 
				type="submit"
				class="btn btn-primary"
				disabled={!searchTerm.trim()}
				style="padding: 0 30px; font-size: 16px; font-weight: 600;"
			>
				Cari
			</button>
		</div>
		
		<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
			<label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
				<input 
					type="radio" 
					name="searchType" 
					value="all" 
					bind:group={searchType}
					style="transform: scale(1.2);"
				/>
				Semua Barang
			</label>
			
			<label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
				<input 
					type="radio" 
					name="searchType" 
					value="lost" 
					bind:group={searchType}
					style="transform: scale(1.2);"
				/>
				Barang Hilang
			</label>
			
			<label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
				<input 
					type="radio" 
					name="searchType" 
					value="found" 
					bind:group={searchType}
					style="transform: scale(1.2);"
				/>
				Barang Temuan
			</label>
			
			{#if hasSearched}
				<button 
					type="button"
					on:click={resetSearch}
					class="btn"
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); margin-left: auto;"
				>
					↺ Reset
				</button>
			{/if}
		</div>
	</form>
	
	{#if isSearching}
		<div class="alert alert-info">
			🔄 Mencari barang-barang hebat...
		</div>
	{:else if hasSearched}
		{#if searchResults.length > 0}
			<div style="margin-bottom: 1.5rem;">
				<h3 style="color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">
					📋 Hasil Pencarian ({searchResults.length} barang ditemukan)
				</h3>
				{#if searchType === 'all'}
					<p style="color: #718096; margin-top: 0.5rem;">
						Menampilkan hasil untuk barang hilang dan barang temuan
					</p>
				{:else if searchType === 'lost'}
					<p style="color: #718096; margin-top: 0.5rem;">
						Menampilkan hasil untuk barang hilang saja
					</p>
				{:else if searchType === 'found'}
					<p style="color: #718096; margin-top: 0.5rem;">
						Menampilkan hasil untuk barang temuan saja
					</p>
				{/if}
			</div>
			
			{#each searchResults as item}
				<a 
					href="{item.type === 'lost' ? '/search/' : '/temuan/'}{item.id}" 
					class="card item-card" 
					style="display: block; text-decoration: none; color: inherit; cursor: pointer; border-left: 6px solid {item.type === 'lost' ? '#667eea' : '#27ae60'};"
				>
					<div class="item-header">
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<span style="background: {item.type === 'lost' ? '#667eea' : '#27ae60'}; color: white; padding: 4px 8px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
								{item.type === 'lost' ? ' Barang Hilang' : ' Barang Temuan'}
							</span>
							<div class="item-title">{item.type === 'lost' ? item.description : item.itemName}</div>
						</div>
						<div class="item-date">Dilaporkan: {formatDateReported(item.dateReported)}</div>
					</div>
					
					<div class="item-info">
						<strong>📍 Lokasi:</strong> {item.type === 'lost' ? item.location : item.locationFound}
					</div>
					
					<div class="item-info">
						<strong>📅 Tanggal:</strong> {formatDate(item.type === 'lost' ? item.dateLost : item.dateFound)}
					</div>
					
					<div class="item-info">
						<strong>👤 Pelapor:</strong> {item.type === 'lost' ? item.reporterName : item.reporterName}
					</div>
					
					{#if item.type === 'lost' && item.contact}
						<div class="item-info">
							<strong>📞 Kontak:</strong> {item.contact}
						</div>
					{:else if item.type === 'found'}
						<div class="item-info">
							<strong>📞 Kontak:</strong> {item.reporterPhone} | {item.reporterEmail}
						</div>
					{/if}
				</a>
			{/each}
		{:else}
			<div class="alert alert-info">
				🚫 Tidak ada barang yang cocok dengan "{searchTerm}". Coba kata kunci lain atau periksa ejaan. 🤔
			</div>
		{/if}
	{/if}
</div>

<style>
	.card {
		background: white;
		border-radius: 15px;
		box-shadow: 0 10px 25px rgba(0,0,0,0.05);
		padding: 2rem;
		margin-bottom: 2rem;
		position: relative;
		overflow: hidden;
		border: none;
	}
	
	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
		pointer-events: none;
	}
	
	.item-card {
		margin-bottom: 1.5rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	
	.item-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 30px rgba(0,0,0,0.1);
	}
	
	.item-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, rgba(102, 126, 234, 0.02), rgba(118, 75, 162, 0.02));
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
		font-size: 18px;
		font-weight: 600;
		color: #4a5568;
		text-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
		margin: 10px 0;
		position: relative;
		z-index: 1;
	}
	
	.item-info strong {
		color: #4a5568;
		font-weight: 600;
		display: inline-block;
		margin-right: 8px;
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
	
	.btn:disabled {
		background: #bdc3c7;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}
	
	.btn-primary {
		background: linear-gradient(45deg, #3498db, #2980b9);
		box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
	}
	
	.btn-primary:hover {
		background: linear-gradient(45deg, #2980b9, #3498db);
		box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
	}
	
	input[type="text"] {
		outline: none;
	}
	
	input[type="text"]:focus {
		border-color: #667eea;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
	}
	
	@media (max-width: 768px) {
		.card {
			padding: 1.5rem;
		}
		
		.item-header {
			flex-direction: column;
			align-items: flex-start;
		}
		
		.item-title {
			font-size: 16px;
		}
		
		.item-info strong {
			font-size: 14px;
		}
		
		form {
			flex-direction: column;
		}
	}
</style>