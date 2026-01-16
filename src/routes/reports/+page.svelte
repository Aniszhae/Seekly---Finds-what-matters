<script>
	import { lostItems, foundReports } from '$lib/store.js';
	import { onMount } from 'svelte';
	
	let allLostItems = [];
	let allFoundItems = [];
	let isLoading = true;
	let showResetConfirm = false;
	
	// Filter states
	let activeFilter = 'all'; // 'all', 'lost', 'found'
	let searchQuery = '';
	
	// Computed filtered items
	$: filteredItems = getFilteredItems(allLostItems, allFoundItems, activeFilter, searchQuery);
	
	// Load all items on mount
	onMount(async () => {
		await loadItems();
	});
	
	async function loadItems() {
		isLoading = true;
		try {
			allLostItems = await lostItems.getSorted();
			allFoundItems = await foundReports.getSorted();
		} catch (error) {
			console.error('Error loading items:', error);
			allLostItems = [];
			allFoundItems = [];
		} finally {
			isLoading = false;
		}
	}
	
	// Filter and search logic
	function getFilteredItems(lostItems, foundItems, filter, query) {
		let items = [];
		
		// Combine items based on filter
		if (filter === 'all' || filter === 'lost') {
			const mappedLostItems = lostItems.map(item => ({
				...item,
				type: 'lost',
				title: item.description,
				location: item.location,
				date: item.dateLost,
				reporter: item.reporterName
			}));
			items = [...items, ...mappedLostItems];
		}
		
		if (filter === 'all' || filter === 'found') {
			const mappedFoundItems = foundItems.map(item => ({
				...item,
				type: 'found',
				title: item.itemName,
				location: item.locationFound,
				date: item.dateFound,
				reporter: item.reporterName
			}));
			items = [...items, ...mappedFoundItems];
		}
		
		// Apply search filter
		if (query.trim()) {
			const searchTerm = query.toLowerCase();
			items = items.filter(item => 
				item.title.toLowerCase().includes(searchTerm) ||
				item.location.toLowerCase().includes(searchTerm) ||
				item.reporter.toLowerCase().includes(searchTerm) ||
				(item.description && item.description.toLowerCase().includes(searchTerm)) ||
				(item.referenceNumber && item.referenceNumber.toLowerCase().includes(searchTerm))
			);
		}
		
		// Sort by date reported (newest first)
		return items.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
	}
	
	// Filter functions
	function setFilter(filter) {
		activeFilter = filter;
	}
	
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
	
	// Function to calculate days since reported
	function daysSinceReported(dateString) {
		const reportDate = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - reportDate);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		
		if (diffDays === 0) return 'Hari ini';
		if (diffDays === 1) return '1 hari yang lalu';
		return `${diffDays} hari yang lalu`;
	}
	
	// Function to reset all data
	function resetAllData() {
		lostItems.reset();
		foundReports.reset();
		allLostItems = [];
		allFoundItems = [];
		showResetConfirm = false;
	}
	
	// Function to refresh data
	async function refreshData() {
		await loadItems();
	}
	
	// Get item type styling
	function getItemTypeConfig(type) {
		if (type === 'lost') {
			return {
				icon: '🔍',
				label: 'Lost Item',
				color: '#FF6B6B',
				bgColor: '#FFE8E8',
				borderColor: '#FF6B6B'
			};
		} else {
			return {
				icon: '📦',
				label: 'Found Item',
				color: '#4ECDC4',
				bgColor: '#E8F8F7',
				borderColor: '#4ECDC4'
			};
		}
	}
	
	// Clear search
	function clearSearch() {
		searchQuery = '';
	}
</script>

<svelte:head>
	<title>Semua Laporan - Seekly</title>
</svelte:head>

<div class="card">
	<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
		<h2 style="color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2.2rem; font-weight: 700;">📋 Semua Laporan</h2>
		
		<div style="display: flex; gap: 15px; flex-wrap: wrap;">
			<button 
				class="btn btn-success" 
				on:click={refreshData}
				disabled={isLoading}
				style="border-radius: 20px;"
			>
				🔄 Segarkan
			</button>
			
			{#if (allLostItems.length > 0 || allFoundItems.length > 0)}
				<button 
					class="btn btn-danger"
					on:click={() => showResetConfirm = true}
					style="border-radius: 20px;"
				>
					🗑️ Reset Semua Data
				</button>
			{/if}
		</div>
	</div>

	<!-- Filter and Search Section -->
	<div style="background: linear-gradient(135deg, #f8f9ff, #e8f0ff); border-radius: 20px; padding: 25px; margin-bottom: 2rem; border: 2px solid rgba(102, 126, 234, 0.1);">
		<!-- Search Bar -->
		<div style="margin-bottom: 20px;">
			<div style="position: relative;">
				<input 
					type="text" 
					bind:value={searchQuery}
					placeholder="Cari laporan berdasarkan deskripsi, lokasi, nama pelapor, atau nomor referensi..."
					style="width: 100%; padding: 15px 50px 15px 20px; border: 2px solid #e2e8f0; border-radius: 15px; font-size: 16px; background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.05);"
					class="search-input"
				/>
				{#if searchQuery}
					<button 
						on:click={clearSearch}
						style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #666; cursor: pointer; font-size: 18px;"
						title="Bersihkan pencarian"
					>
						❌
					</button>
				{:else}
					<span style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #666; font-size: 18px;">🔍</span>
				{/if}
			</div>
		</div>

		<!-- Filter Buttons (Segmented Control) -->
		<div style="display: flex; gap: 0; background: white; border-radius: 15px; padding: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 2px solid rgba(102, 126, 234, 0.1);">
			<button 
				on:click={() => setFilter('all')}
				style="flex: 1; padding: 12px 20px; border: none; border-radius: 10px; font-weight: 600; transition: all 0.3s ease; background: {activeFilter === 'all' ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'transparent'}; color: {activeFilter === 'all' ? 'white' : '#4a5568'}; cursor: pointer; display: flex; items-center; justify-content: center; gap: 8px;"
				class="filter-btn"
			>
				<span style="font-size: 18px;">📊</span>
				<span>Semua Laporan</span>
				<span style="font-size: 12px; opacity: 0.8;">({allLostItems.length + allFoundItems.length})</span>
			</button>
			
			<button 
				on:click={() => setFilter('lost')}
				style="flex: 1; padding: 12px 20px; border: none; border-radius: 10px; font-weight: 600; transition: all 0.3s ease; background: {activeFilter === 'lost' ? 'linear-gradient(45deg, #FF6B6B, #ff5252)' : 'transparent'}; color: {activeFilter === 'lost' ? 'white' : '#4a5568'}; cursor: pointer; display: flex; items-center; justify-content: center; gap: 8px;"
				class="filter-btn"
			>
				<span style="font-size: 18px;">🔍</span>
				<span>Barang Hilang</span>
				<span style="font-size: 12px; opacity: 0.8;">({allLostItems.length})</span>
			</button>
			
			<button 
				on:click={() => setFilter('found')}
				style="flex: 1; padding: 12px 20px; border: none; border-radius: 10px; font-weight: 600; transition: all 0.3s ease; background: {activeFilter === 'found' ? 'linear-gradient(45deg, #4ECDC4, #44a08d)' : 'transparent'}; color: {activeFilter === 'found' ? 'white' : '#4a5568'}; cursor: pointer; display: flex; items-center; justify-content: center; gap: 8px;"
				class="filter-btn"
			>
				<span style="font-size: 18px;">📦</span>
				<span>Barang Temuan</span>
				<span style="font-size: 12px; opacity: 0.8;">({allFoundItems.length})</span>
			</button>
		</div>

		<!-- Active Filter Info -->
		{#if activeFilter !== 'all' || searchQuery}
			<div style="margin-top: 15px; padding: 10px 15px; background: rgba(102, 126, 234, 0.1); border-radius: 10px; font-size: 14px; color: #4a5568;">
				{#if searchQuery && activeFilter !== 'all'}
					<span>🔍 Menampilkan laporan <strong>{getItemTypeConfig(activeFilter).label.toLowerCase()}</strong> yang cocok dengan "<strong>{searchQuery}</strong>"</span>
				{:else if searchQuery}
					<span>🔍 Mencari semua laporan untuk "<strong>{searchQuery}</strong>"</span>
				{:else if activeFilter !== 'all'}
					<span>📋 Menampilkan hanya laporan <strong>{getItemTypeConfig(activeFilter).label.toLowerCase()}</strong></span>
				{/if}
				<span style="margin-left: 10px; color: #667eea; font-weight: 600;">({filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''})</span>
			</div>
		{/if}
	</div>

	{#if showResetConfirm}
		<div class="alert alert-warning" style="margin-bottom: 1.5rem;">
			<h4 style="color: white; margin-bottom: 10px;">⚠️ Konfirmasi Reset</h4>
			<p style="color: rgba(255,255,255,0.9); margin-bottom: 15px;">Apakah Anda yakin ingin menghapus SEMUA laporan (baik barang hilang maupun barang temuan)? Tindakan ini tidak dapat dibatalkan.</p>
			<div style="margin-top: 15px;">
				<button 
					class="btn btn-danger" 
					style="margin-right: 15px; border-radius: 20px;"
					on:click={resetAllData}
				>
					Ya, Hapus Semua 🗑️
				</button>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); border-radius: 20px;"
					on:click={() => showResetConfirm = false}
				>
					Batal
				</button>
			</div>
		</div>
	{/if}

	{#if isLoading}
		<div class="alert alert-info">
			🔄 Loading awesome reports...
		</div>
	{:else if filteredItems.length === 0}
		{#if searchQuery}
			<div class="alert alert-info">
				🔍 Tidak ada laporan yang cocok dengan "<strong>{searchQuery}</strong>"{activeFilter !== 'all' ? ` dalam laporan ${getItemTypeConfig(activeFilter).label.toLowerCase()}` : ''}. 
				<button on:click={clearSearch} style="color: white; font-weight: 600; text-decoration: underline; background: none; border: none; cursor: pointer;">Bersihkan pencarian</button> untuk melihat semua laporan.
			</div>
		{:else if activeFilter !== 'all'}
			<div class="alert alert-info">
				📝 Belum ada laporan {getItemTypeConfig(activeFilter).label.toLowerCase()}. 
				{#if activeFilter === 'lost'}
					<a href="/" style="color: white; font-weight: 600; text-decoration: underline;">Laporkan barang hilang</a> untuk memulai! ✨
				{:else}
					<a href="/found" style="color: white; font-weight: 600; text-decoration: underline;">Laporkan barang temuan</a> untuk memulai! ✨
				{/if}
			</div>
		{:else}
			<div class="alert alert-info">
				📝 Belum ada laporan. Mulai dengan <a href="/" style="color: white; font-weight: 600; text-decoration: underline;">melaporkan barang hilang</a> atau <a href="/found" style="color: white; font-weight: 600; text-decoration: underline;">barang temuan</a>! ✨
			</div>
		{/if}
	{:else}
		<div style="margin-bottom: 1.5rem;">
			<p style="color: #718096; font-size: 16px; font-weight: 500;">
				{#if activeFilter === 'all'}
					Total laporan: <strong style="color: #667eea;">{filteredItems.length}</strong> 
					(<strong style="color: #FF6B6B;">{allLostItems.length} hilang</strong>, <strong style="color: #4ECDC4;">{allFoundItems.length} ditemukan</strong>)
				{:else}
					Laporan {getItemTypeConfig(activeFilter).label}: <strong style="color: {getItemTypeConfig(activeFilter).color};">{filteredItems.length}</strong>
				{/if}
				{#if searchQuery}
					| Difilter berdasarkan: "<strong>{searchQuery}</strong>"
				{/if}
				| Diurutkan berdasarkan terbaru dulu 🔄
			</p>
		</div>
		
		{#each filteredItems as item, index}
			{@const typeConfig = getItemTypeConfig(item.type)}
			<a href="{item.type === 'lost' ? '/search/' : '/temuan/'}{item.id}" class="item-card" style="border-left: 6px solid {typeConfig.borderColor}; background: linear-gradient(135deg, {typeConfig.bgColor}, rgba(255,255,255,0.9)); display: block; text-decoration: none; color: inherit; cursor: pointer;">
				<div class="item-header">
					<div class="item-title" style="display: flex; align-items: center; gap: 10px;">
						<span style="background: {typeConfig.color}; color: white; padding: 4px 8px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
							{typeConfig.icon} {typeConfig.label}
						</span>
						<span style="color: #4a5568; font-weight: 600;">#{filteredItems.length - index}</span>
						<span style="color: #667eea; font-weight: 600;">{item.title}</span>
					</div>
					<div class="item-date">
						{daysSinceReported(item.dateReported)}
					</div>
				</div>
				
				<div class="item-info">
					<strong>📍 Lokasi:</strong> {item.location}
				</div>
				
				<div class="item-info">
					<strong>📅 Tanggal {item.type === 'lost' ? 'Hilang' : 'Ditemukan'}:</strong> {formatDate(item.date)}
				</div>
				
				{#if item.type === 'found' && item.timeFound}
					<div class="item-info">
						<strong>🕰️ Waktu Ditemukan:</strong> {item.timeFound}
					</div>
				{/if}
				
				<div class="item-info">
					<strong>👤 Dilaporkan oleh:</strong> {item.reporter}
				</div>
				
				{#if item.type === 'lost' && item.contact}
					<div class="item-info">
						<strong>📞 Kontak:</strong> {item.contact}
					</div>
				{:else if item.type === 'found'}
					<div class="item-info">
						<strong>📞 Telepon:</strong> {item.reporterPhone}
						<span style="margin-left: 15px;"><strong>✉️ Email:</strong> {item.reporterEmail}</span>
					</div>
				{/if}
				
				{#if item.referenceNumber}
					<div class="item-info">
						<strong>🏷️ Referensi:</strong> 
						<span style="font-family: monospace; background: rgba(102, 126, 234, 0.1); padding: 2px 6px; border-radius: 4px; color: #667eea; font-weight: 600;">
							{item.referenceNumber}
						</span>
						{#if item.type === 'lost'}
							<a href="/status?ref={item.referenceNumber}" style="margin-left: 10px; color: #667eea; text-decoration: none; font-weight: 600;" title="Cek Status">
								🔍 Lacak Status
							</a>
						{/if}
					</div>
				{/if}
				
				<div class="item-info" style="font-size: 14px; color: #888; margin-top: 10px;">
					<strong>🕰️ Dilaporkan:</strong> {formatDateReported(item.dateReported)}
				</div>
			</a>
		{/each}
	{/if}
</div>

<div class="card" style="margin-top: 2rem;">
	<h3 style="color: #007bff; margin-bottom: 1rem;">📊 Statistics</h3>
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
		<div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #FF6B6B, #ff5252); color: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">
			<div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
			<div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.2rem;">{allLostItems.length}</div>
			<div style="font-weight: 600; font-size: 14px;">Barang Hilang</div>
		</div>
		
		<div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #4ECDC4, #44a08d); color: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);">
			<div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
			<div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.2rem;">{allFoundItems.length}</div>
			<div style="font-weight: 600; font-size: 14px;">Barang Temuan</div>
		</div>
		
		<div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
			<div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
			<div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.2rem;">{allLostItems.length + allFoundItems.length}</div>
			<div style="font-weight: 600; font-size: 14px;">Total Laporan</div>
		</div>
		
		<div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #ffeaa7, #fdcb6e); color: #333; border-radius: 12px; box-shadow: 0 4px 15px rgba(255, 234, 167, 0.4);">
			<div style="font-size: 2rem; margin-bottom: 0.5rem;">📅</div>
			<div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.2rem;">
				{[...allLostItems, ...allFoundItems].filter(item => {
					const reportDate = new Date(item.dateReported);
					const today = new Date();
					return reportDate.toDateString() === today.toDateString();
				}).length}
			</div>
			<div style="font-weight: 600; font-size: 14px;">Laporan Hari Ini</div>
		</div>
	</div>
</div>

<style>
	.filter-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(0,0,0,0.15);
	}
	
	.search-input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
		transform: translateY(-2px);
	}
	
	.item-card {
		transition: all 0.3s ease;
		margin-bottom: 1rem;
		border-radius: 10px;
		padding: 1.5rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}
	
	.item-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0,0,0,0.1);
	}
	
	.item-card a {
		color: inherit;
		text-decoration: none;
	}
	
	@media (max-width: 768px) {
		.filter-btn {
			flex-direction: column;
			gap: 4px !important;
			padding: 10px 8px !important;
			font-size: 12px;
		}
		
		.filter-btn span:last-child {
			font-size: 10px !important;
		}
		
		.item-title {
			flex-direction: column !important;
			align-items: flex-start !important;
			gap: 5px !important;
		}
	}
	
	.item-card {
		border-left: 6px solid #667eea;
		margin-bottom: 20px;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}
	
	.item-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
	}
	
	.item-title {
		font-size: 20px;
		font-weight: 600;
		color: #667eea;
		text-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
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
		margin: 12px 0;
		position: relative;
		z-index: 1;
	}
	
	.item-info strong {
		color: #4a5568;
		font-weight: 600;
	}
	
	.alert {
		padding: 20px;
		margin-bottom: 25px;
		border-radius: 15px;
		font-weight: 500;
		border: none;
		position: relative;
		overflow: hidden;
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
</style>