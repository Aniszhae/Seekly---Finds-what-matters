<script>
	import { foundReports } from '$lib/store.js';
	import { onMount } from 'svelte';
	
	let reports = [];
	let filteredReports = [];
	let searchQuery = '';
	let isLoading = true;
	let stats = {
		total: 0,
		today: 0,
		thisWeek: 0
	};
	
	onMount(async () => {
		await loadReports();
		isLoading = false;
	});
	
	async function loadReports() {
		reports = await foundReports.getSorted();
		filteredReports = reports;
		calculateStats();
	}
	
	function calculateStats() {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
		
		stats.total = reports.length;
		stats.today = reports.filter(report => {
			const reportDate = new Date(report.dateReported);
			return reportDate >= today;
		}).length;
		stats.thisWeek = reports.filter(report => {
			const reportDate = new Date(report.dateReported);
			return reportDate >= weekAgo;
		}).length;
	}
	
	function handleSearch() {
		if (!searchQuery.trim()) {
			filteredReports = reports;
			return;
		}
		
		const query = searchQuery.toLowerCase();
		filteredReports = reports.filter(report => 
			report.itemName.toLowerCase().includes(query) ||
			report.description.toLowerCase().includes(query) ||
			report.locationFound.toLowerCase().includes(query) ||
			report.reporterName.toLowerCase().includes(query) ||
			report.referenceNumber.toLowerCase().includes(query)
		);
	}
	
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	
	function formatTime(timeString) {
		return timeString.substring(0, 5);
	}
	
	async function refreshData() {
		isLoading = true;
		await loadReports();
		isLoading = false;
	}
	
	function resetData() {
		if (confirm('Apakah Anda yakin ingin menghapus semua data laporan barang temuan?')) {
			foundReports.reset();
			reports = [];
			filteredReports = [];
			stats = { total: 0, today: 0, thisWeek: 0 };
		}
	}
</script>

<svelte:head>
	<title>Riwayat Barang Temuan - Seekly – Find What Matters</title>
</svelte:head>

<div class="card">
	<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
		<h2 style="color: transparent; background: linear-gradient(45deg, #27ae60, #2ecc71); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2.2rem; font-weight: 700; margin: 0;">📦 Riwayat Barang Temuan</h2>
		<div style="display: flex; gap: 10px;">
			<button 
				class="btn btn-primary" 
				style="padding: 10px 20px; font-size: 14px;"
				on:click={refreshData}
				disabled={isLoading}
			>
				{isLoading ? '🔄' : '🔄'} Refresh
			</button>
			<button 
				class="btn btn-danger" 
				style="padding: 10px 20px; font-size: 14px;"
				on:click={resetData}
			>
				🗑️ Reset
			</button>
		</div>
	</div>
	
	<!-- Statistics -->
	<div class="stats-grid" style="margin-bottom: 2rem;">
		<div class="stat-card floating" style="animation-delay: 0s;">
			<div class="stat-number">{stats.total}</div>
			<div class="stat-label">📦 Total Laporan</div>
		</div>
		<div class="stat-card floating" style="animation-delay: 0.2s;">
			<div class="stat-number">{stats.today}</div>
			<div class="stat-label">📅 Hari Ini</div>
		</div>
		<div class="stat-card floating" style="animation-delay: 0.4s;">
			<div class="stat-number">{stats.thisWeek}</div>
			<div class="stat-label">📈 Minggu Ini</div>
		</div>
	</div>
	
	<!-- Search -->
	<div style="margin-bottom: 2rem;">
		<input 
			type="text"
			bind:value={searchQuery}
			on:input={handleSearch}
			placeholder="🔍 Cari berdasarkan nama barang, deskripsi, lokasi, pelapor, atau nomor referensi..."
			class="search-box"
		/>
	</div>
	
	{#if isLoading}
		<div class="alert alert-info">
			🔄 Memuat data laporan barang temuan...
		</div>
	{:else if filteredReports.length === 0}
		{#if searchQuery}
			<div class="alert alert-warning">
				🔍 Tidak ditemukan laporan yang sesuai dengan pencarian "{searchQuery}"
			</div>
		{:else}
			<div class="alert alert-info">
				📦 Belum ada laporan barang temuan.<br>
				<a href="/found" style="color: white; text-decoration: underline;">Klik di sini untuk membuat laporan pertama</a>
			</div>
		{/if}
	{:else}
		<div style="margin-bottom: 1rem; color: #718096; font-weight: 500;">
			Menampilkan {filteredReports.length} dari {reports.length} laporan
		</div>
		
		{#each filteredReports as report}
			<a href="/temuan/{report.id}" class="card item-card" style="border-left-color: #27ae60; display: block; text-decoration: none; color: inherit; cursor: pointer;">
				<div class="item-header">
					<div>
						<div class="item-title" style="color: #27ae60;">{report.itemName}</div>
						<div style="color: #718096; font-size: 14px; margin-top: 5px;">
							<strong>Ref:</strong> {report.referenceNumber}
						</div>
					</div>
					<div class="item-date">
						{formatDate(report.dateReported)}
					</div>
				</div>
				
				<div style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: start;">
					<!-- Photo -->
					{#if report.photo}
						<div>
							<img 
								src={report.photo} 
								alt={report.itemName}
								style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"
							/>
						</div>
					{/if}
					
					<!-- Details -->
					<div>
						<div class="item-info">
							<strong>Deskripsi:</strong> {report.description}
						</div>
						
						<div class="item-info">
							<strong>📍 Lokasi Ditemukan:</strong> {report.locationFound}
						</div>
						
						<div class="item-info">
							<strong>🗓️ Tanggal & Waktu:</strong> 
							{new Date(report.dateFound).toLocaleDateString('id-ID')} pukul {formatTime(report.timeFound)}
						</div>
						
						<div class="item-info">
							<strong>👤 Pelapor:</strong> {report.reporterName}
						</div>
						
						<div class="item-info">
							<strong>📞 Kontak:</strong> 
							<a href="tel:{report.reporterPhone}" style="color: #27ae60; text-decoration: none;">{report.reporterPhone}</a>
							| 
							<a href="mailto:{report.reporterEmail}" style="color: #27ae60; text-decoration: none;">{report.reporterEmail}</a>
						</div>
					</div>
				</div>
			</a>
		{/each}
	{/if}
</div>

<div class="card" style="margin-top: 2rem;">
	<h3 style="color: transparent; background: linear-gradient(45deg, #27ae60, #2ecc71); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1.5rem; font-size: 1.8rem; font-weight: 600; text-align: center;">✨ Bantuan Komunitas</h3>
	<div class="stats-grid">
		<div class="stat-card floating" style="animation-delay: 0s;">
			<div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
			<h4 style="color: #27ae60; font-weight: 600; margin-bottom: 0.5rem;">Laporkan</h4>
			<p style="color: #718096; font-size: 14px; line-height: 1.5;">Temukan barang? Laporkan segera untuk membantu pemiliknya</p>
		</div>
		<div class="stat-card floating" style="animation-delay: 0.5s;">
			<div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
			<h4 style="color: #27ae60; font-weight: 600; margin-bottom: 0.5rem;">Hubungi</h4>
			<p style="color: #718096; font-size: 14px; line-height: 1.5;">Kontak pelapor jika Anda pemilik barang yang hilang</p>
		</div>
		<div class="stat-card floating" style="animation-delay: 1s;">
			<div style="font-size: 3rem; margin-bottom: 1rem;">💝</div>
			<h4 style="color: #27ae60; font-weight: 600; margin-bottom: 0.5rem;">Bersama</h4>
			<p style="color: #718096; font-size: 14px; line-height: 1.5;">Mari bersama membantu mengembalikan barang yang hilang</p>
		</div>
	</div>
</div>