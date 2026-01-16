<script>

	// State variables
	let searchTerm = '';
	let selectedLocation = '';
	let selectedItemType = '';
	let selectedTimeRange = '';
	let showMapView = false;
	let communities = [];  // Will be populated from communityData
	let filteredCommunities = [];
	let isLoading = false;
	let showEmergencyMode = false;
	let notificationsEnabled = false;
	let notificationRadius = 5; // km
	let showRadiusSettings = false;
	let scannedQRCode = '';

	// Simulate joined communities (in a real app, this would come from user data)
	let joinedCommunityIds = new Set(['community-1', 'community-2']); // IDs of joined communities

	// Reactive: displayed communities based on filter AND membership
	$: displayedJoinedCommunities = filteredCommunities.filter(c => joinedCommunityIds.has(c.id));
	$: displayedUnjoinedCommunities = filteredCommunities.filter(c => !joinedCommunityIds.has(c.id));

	// Sample community data (in a real app, this would come from a store or API)
	let communityData = [
		{
			id: 'community-1',
			name: 'Komunitas Pencari Barang Hilang Jakarta Selatan',
			location: 'Jakarta Selatan',
			itemTypes: ['Dompet & Identitas', 'HP & Elektronik', 'Kunci', 'Dokumen Penting'],
			description: 'Komunitas relawan yang membantu pencarian barang hilang di wilayah Jakarta Selatan',
			memberCount: 1247,
			activeReports: 23,
			foundItems: 89,
			verified: true,
			adminContact: 'admin@js.com',
			rating: 4.8,
			coordinates: { lat: -6.254, lng: 106.822 },
			isActive: true,
			lastActivity: '2024-01-15',
			isOfficial: true,
			verificationStatus: 'verified'
		},
		{
			id: 'community-2',
			name: 'Komunitas Barang Hilang Hewan Peliharaan',
			location: 'Bandung',
			itemTypes: ['Hewan Peliharaan', 'Kucing', 'Anjing', 'Burung'],
			description: 'Komunitas khusus untuk membantu pencarian hewan peliharaan yang hilang',
			memberCount: 892,
			activeReports: 15,
			foundItems: 67,
			verified: true,
			adminContact: 'admin@hewan.com',
			rating: 4.9,
			coordinates: { lat: -6.917, lng: 107.619 },
			isActive: true,
			lastActivity: '2024-01-14',
			isOfficial: false,
			verificationStatus: 'verified'
		},
		{
			id: 'community-3',
			name: 'Lost & Found Bandung',
			location: 'Bandung',
			itemTypes: ['HP & Elektronik', 'Dompet & Identitas', 'Kendaraan Hilang', 'Laptop'],
			description: 'Komunitas pencarian barang hilang di kota Bandung',
			memberCount: 2156,
			activeReports: 42,
			foundItems: 156,
			verified: true,
			adminContact: 'admin@bandung.com',
			rating: 4.7,
			coordinates: { lat: -6.903, lng: 107.618 },
			isActive: true,
			lastActivity: '2024-01-15',
			isOfficial: true,
			verificationStatus: 'pending'
		},
		{
			id: 'community-4',
			name: 'Komunitas Kendaraan Hilang Jakarta',
			location: 'Jakarta Pusat',
			itemTypes: ['Kendaraan Hilang', 'Motor', 'Mobil', 'Sepeda'],
			description: 'Komunitas khusus untuk pencarian kendaraan hilang di wilayah Jakarta',
			memberCount: 987,
			activeReports: 18,
			foundItems: 43,
			verified: false,
			adminContact: 'admin@jakarta.com',
			rating: 4.5,
			coordinates: { lat: -6.186, lng: 106.829 },
			isActive: true,
			lastActivity: '2024-01-13',
			isOfficial: false,
			verificationStatus: 'none'
		},
		{
			id: 'community-5',
			name: 'Komunitas Pencari Barang Hilang Surabaya',
			location: 'Surabaya',
			itemTypes: ['Dompet & Identitas', 'HP & Elektronik', 'Kunci', 'Dokumen Penting'],
			description: 'Komunitas relawan yang membantu pencarian barang hilang di wilayah Surabaya',
			memberCount: 756,
			activeReports: 12,
			foundItems: 54,
			verified: true,
			adminContact: 'admin@surabaya.com',
			rating: 4.6,
			coordinates: { lat: -7.257, lng: 112.752 },
			isActive: true,
			lastActivity: '2024-01-14',
			isOfficial: false,
			verificationStatus: 'verified'
		}
	];

	// Filter options
	const locations = ['Jakarta Selatan', 'Bandung', 'Jakarta Pusat', 'Surabaya', 'Yogyakarta'];
	const itemTypes = ['Dompet & Identitas', 'HP & Elektronik', 'Hewan Peliharaan', 'Kendaraan Hilang', 'Kunci', 'Dokumen Penting', 'Laptop', 'Motor', 'Mobil', 'Sepeda'];
	const timeRanges = ['Minggu ini', 'Bulan ini', '3 bulan terakhir', 'Kapan saja'];

	// Initialize communities with data
	communities = [...communityData];

	// Filter communities - triggered by button click (shows loading animation)
	function filterCommunities() {
		isLoading = true;
		// Brief loading animation for user feedback
		setTimeout(() => {
			isLoading = false;
		}, 300);
	}


	// Clear all filters
	function clearFilters() {
		searchTerm = '';
		selectedLocation = '';
		selectedItemType = '';
		selectedTimeRange = '';
		// filteredCommunities is now updated automatically via reactive statement
	}

	// Toggle map view
	function toggleMapView() {
		showMapView = !showMapView;
	}

	// Join community
	function joinCommunity(communityId) {
		const community = communities.find(c => c.id === communityId);
		if (community && !joinedCommunityIds.has(communityId)) {
			joinedCommunityIds.add(communityId);
			joinedCommunityIds = joinedCommunityIds; // Trigger reactivity
			alert(`Anda telah bergabung dengan ${community.name}!`);
		} else {
			alert(`Anda telah bergabung dengan komunitas!`);
		}
		// In a real app, this would make an API call to join the community
	}

	// Leave community
	function leaveCommunity(communityId) {
		if (confirm('Apakah Anda yakin ingin keluar dari komunitas ini?')) {
			const community = communities.find(c => c.id === communityId);
			if (community && joinedCommunityIds.has(communityId)) {
				joinedCommunityIds.delete(communityId);
				joinedCommunityIds = joinedCommunityIds; // Trigger reactivity
				alert(`Anda telah keluar dari ${community.name}.`);
			} else {
				alert(`Anda telah keluar dari komunitas.`);
			}
			// In a real app, this would make an API call to leave the community
		}
	}

	// Report suspicious post
	function reportCommunity(communityId) {
		alert(`Laporan komunitas mencurigakan telah dikirim.`);
		// In a real app, this would make an API call to report the community
	}

	// Toggle emergency mode
	function toggleEmergencyMode() {
		showEmergencyMode = !showEmergencyMode;
	}

	// Enable notifications
	function toggleNotifications() {
		notificationsEnabled = !notificationsEnabled;
		if (notificationsEnabled) {
			showRadiusSettings = true;
		}
	}

	// Set notification radius
	function setNotificationRadius() {
		showRadiusSettings = false;
		alert(`Notifikasi diaktifkan untuk radius ${notificationRadius} km`);
	}

	// Helper function to apply all filters
	function applyFilters(term, loc, itemType, timeRange, data) {
		if (!data || data.length === 0) return [];
		
		let result = [...data];

		// Filter by search term
		if (term) {
			const searchLower = term.toLowerCase();
			result = result.filter(community => 
				community.name.toLowerCase().includes(searchLower) ||
				community.description.toLowerCase().includes(searchLower) ||
				community.location.toLowerCase().includes(searchLower) ||
				community.itemTypes.some(type => type.toLowerCase().includes(searchLower))
			);
		}

		// Filter by location
		if (loc) {
			result = result.filter(community => community.location === loc);
		}

		// Filter by item type
		if (itemType) {
			result = result.filter(community => community.itemTypes.includes(itemType));
		}

		return result;
	}

	// Reactive statement: re-filter when any filter variable changes
	$: filteredCommunities = applyFilters(searchTerm, selectedLocation, selectedItemType, selectedTimeRange, communities);
</script>

<svelte:head>
	<title>Komunitas - Seekly</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="container">
	<div class="hero-section glass-effect">
		<div class="hero-content">
			<span class="hero-badge">Hub Sosial</span>
			<h1 class="page-title">Komunitas Seekly</h1>
			<p class="page-subtitle">Hubungkan diri Anda dengan ribuan relawan. Temukan barang Anda lebih cepat melalui kekuatan komunitas.</p>
		</div>
	</div>

	<!-- Search and Filters -->
	<section class="search-filters-card floating content-box">
		<div class="filters-grid">
				<div class="filter-group">
					<label for="search">🔍 Cari Komunitas</label>
					<input 
						type="text"
						id="search"
						bind:value={searchTerm}
						placeholder="Nama komunitas, lokasi, atau jenis barang..."
						class="filter-input"
					/>
				</div>

				<div class="filter-group">
					<label for="location">📍 Lokasi</label>
					<select 
						id="location"
						bind:value={selectedLocation}
						class="filter-select"
					>
						<option value="">Semua Lokasi</option>
						{#each locations as location}
							<option value={location}>{location}</option>
						{/each}
					</select>
				</div>

				<div class="filter-group">
					<label for="itemType">📦 Jenis Barang</label>
					<select 
						id="itemType"
						bind:value={selectedItemType}
						class="filter-select"
					>
						<option value="">Semua Jenis Barang</option>
						{#each itemTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>

				<div class="filter-group">
					<label for="timeRange">📅 Rentang Waktu</label>
					<select 
						id="timeRange"
						bind:value={selectedTimeRange}
						class="filter-select"
					>
						<option value="">Kapan saja</option>
						{#each timeRanges as range}
							<option value={range}>{range}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="filter-actions">
				<button 
					class="btn btn-primary" 
					on:click={filterCommunities}
					disabled={isLoading}
				>
					{isLoading ? '🔄 Mencari...' : 'Cari Komunitas'}
				</button>

				<button 
					class="btn btn-secondary" 
					on:click={clearFilters}
				>
					Bersihkan Filter
				</button>

				<button 
					class="btn btn-outline" 
					on:click={toggleMapView}
				>
					{showMapView ? '📋 Lihat Daftar' : '🗺️ Lihat Peta'}
				</button>
			</div>
	</section>

	<!-- Results Header -->
	<div class="results-header floating content-box">
		<h2>Hasil Pencarian ({filteredCommunities.length} komunitas ditemukan)</h2>
	</div>

	<!-- Map View -->
	{#if showMapView}
		<div class="map-view-card floating content-box">
			<div class="map-placeholder">
					<div class="map-icon">🗺️</div>
					<h3>Peta Interaktif Komunitas</h3>
					<p>Peta menunjukkan lokasi komunitas dan laporan kehilangan</p>
					<div class="map-features">
						<span class="feature-tag">📍 Lokasi Komunitas</span>
						<span class="feature-tag">⚠️ Laporan Aktif</span>
						<span class="feature-tag">✅ Barang Ditemukan</span>
					</div>
				</div>
			</div>
	{:else}
		<!-- List View -->
		{#if isLoading}
			<div class="loading-container floating content-box">
				<div class="spinner"></div>
				<p>Mencari komunitas...</p>
			</div>
		{:else}
			<!-- A. Joined Communities -->
			{#if displayedJoinedCommunities.length > 0}
				<section class="community-section">
					<div class="content-box floating">
						<h2 class="section-title">Komunitasku 💖</h2>
					</div>
					<div class="communities-grid">
						{#each displayedJoinedCommunities as community}
							<div class="community-card joined floating">
								<div class="community-header">
									<h3 class="community-name">{community.name}</h3>
									<span class="badge joined-badge">Sudah Bergabung</span>
								</div>

								<div class="community-details">
									<div class="detail-row">
										<span class="detail-label">📍 Lokasi:</span>
										<div class="detail-box">
											<span class="detail-value">{community.location}</span>
										</div>
									</div>
									
									<div class="detail-row">
										<span class="detail-label">📄 Deskripsi:</span>
										<div class="detail-box">
											<span class="detail-value">{community.description}</span>
										</div>
									</div>
								</div>

								<div class="community-stats">
									<div class="stat">
										<span class="stat-value">{community.memberCount}</span>
										<span class="stat-label">Anggota</span>
									</div>
									<div class="stat">
										<span class="stat-value">{community.foundItems}</span>
										<span class="stat-label">Ditemukan</span>
									</div>
									<div class="stat">
										<span class="stat-value">{community.activeReports}</span>
										<span class="stat-label">Aktif</span>
									</div>
								</div>

								<div class="community-actions">
									<a href="/community/{community.id}" class="btn btn-primary">
										Lihat Komunitas
									</a>
									<a href="/community/chat?id={community.id}" class="btn btn-secondary">
										Buka Chat
									</a>
									<button 
										class="btn btn-outline"
										on:click={() => leaveCommunity(community.id)}
									>
										Keluar
									</button>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<!-- B. Unjoined Communities -->
			{#if displayedUnjoinedCommunities.length > 0}
				<section class="community-section">
					<div class="content-box floating">
						<h2 class="section-title">Temukan Komunitas Baru 🔍</h2>
					</div>
					<div class="communities-grid">
						{#each displayedUnjoinedCommunities as community}
							<div class="community-card floating">
								<div class="community-header">
									<h3 class="community-name">{community.name}</h3>
									{#if community.verified}
										<span class="badge verified">Terverifikasi</span>
									{/if}
								</div>

								<div class="community-details">
									<div class="detail-row">
										<span class="detail-label">📍 Lokasi:</span>
										<div class="detail-box">
											<span class="detail-value">{community.location}</span>
										</div>
									</div>
									
									<div class="detail-row">
										<span class="detail-label">📄 Deskripsi:</span>
										<div class="detail-box">
											<span class="detail-value">{community.description}</span>
										</div>
									</div>
								</div>

								<div class="community-stats">
									<div class="stat">
										<span class="stat-value">{community.memberCount}</span>
										<span class="stat-label">Anggota</span>
									</div>
									<div class="stat">
										<span class="stat-value">{community.foundItems}</span>
										<span class="stat-label">Ditemukan</span>
									</div>
									<div class="stat">
										<span class="stat-value">{community.activeReports}</span>
										<span class="stat-label">Aktif</span>
									</div>
								</div>

								<div class="community-actions">
									<button 
										class="btn btn-primary"
										on:click={() => joinCommunity(community.id)}
									>
										Gabung Komunitas
									</button>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			{#if displayedJoinedCommunities.length === 0 && displayedUnjoinedCommunities.length === 0}
				<div class="empty-state-card floating content-box">
					<div class="empty-icon">🔍</div>
					<h3>Komunitas Tidak Ditemukan</h3>
					<p>Tidak ada komunitas yang sesuai dengan kriteria pencarian Anda. Coba ubah filter pencarian Anda.</p>
					<button class="btn btn-primary" on:click={clearFilters}>Reset Filter</button>
				</div>
			{/if}
		{/if}
	{/if}
</div>

<style>
	:global(body) {
		background-color: #F9FAFB;
		min-height: 100vh;
		font-family: 'Inter', sans-serif;
		color: #111827;
		margin: 0;
	}

	.container {
		max-width: 1300px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
	}

	/* Utility Classes */
	.glass-effect {
		background: #FFFFFF;
		border: 1px solid #E5E7EB;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	/* Hero Section */
	.hero-section {
		padding: 4rem 2rem;
		border-radius: 24px;
		margin-bottom: 3rem;
		text-align: left;
		background: #FFFFFF;
		border: 1px solid #E5E7EB;
	}

	.hero-badge {
		background: #EFF6FF;
		color: #2563EB;
		padding: 0.5rem 1rem;
		border-radius: 99px;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1.5rem;
		display: inline-block;
	}

	.page-title {
		font-family: 'Outfit', sans-serif;
		font-size: clamp(2.25rem, 5vw, 3rem);
		font-weight: 800;
		color: #111827;
		margin: 0 0 1rem 0;
		line-height: 1.2;
	}

	.page-subtitle {
		font-size: 1.125rem;
		color: #6B7280;
		max-width: 800px;
		line-height: 1.6;
	}

	/* Search & Filters */
	.search-filters-card {
		padding: 2rem;
		border-radius: 20px;
		margin-bottom: 3rem;
		background: #FFFFFF;
		border: 1px solid #E5E7EB;
	}

	.filters-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.filter-group label {
		display: block;
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
		margin-bottom: 0.5rem;
	}

	.filter-input, .filter-select {
		width: 100%;
		padding: 0.875rem 1rem;
		background: #FFFFFF;
		border: 1px solid #D1D5DB;
		border-radius: 12px;
		font-size: 1rem;
		color: #111827;
		transition: all 0.2s;
	}

	.filter-input:focus, .filter-select:focus {
		outline: none;
		border-color: #2563EB;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.filter-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
	}

	/* Results Header */
	.results-header {
		margin-bottom: 2rem;
		border-bottom: 1px solid #E5E7EB;
		padding-bottom: 1rem;
	}

	.results-header h2 {
		font-family: 'Outfit', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: #111827;
		margin: 0;
	}

	/* Communities Grid */
	.communities-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 2rem;
	}

	.community-card {
		padding: 2rem;
		border-radius: 20px;
		transition: all 0.2s;
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #FFFFFF;
		border: 1px solid #E5E7EB;
	}

	.community-card:hover {
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		border-color: #D1D5DB;
	}

	.community-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.community-name {
		font-family: 'Outfit', sans-serif;
		font-size: 1.375rem;
		font-weight: 700;
		color: #111827;
		line-height: 1.3;
	}

	.badge {
		padding: 0.375rem 0.75rem;
		border-radius: 8px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.verified {
		background: #FEF3C7;
		color: #92400E;
	}

	.joined-badge {
		background: #DCFCE7;
		color: #166534;
	}

	.community-details {
		flex-grow: 1;
		margin-bottom: 1.5rem;
	}

	.detail-row {
		margin-bottom: 1rem;
	}

	.detail-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 700;
		color: #6B7280;
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.detail-value {
		font-size: 1rem;
		color: #374151;
		line-height: 1.5;
	}

	.community-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		padding: 1.25rem;
		background: #F9FAFB;
		border-radius: 12px;
		margin-bottom: 1.5rem;
		border: 1px solid #F3F4F6;
	}

	.stat {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-family: 'Outfit', sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		color: #111827;
	}

	.stat-label {
		font-size: 0.625rem;
		font-weight: 600;
		color: #6B7280;
		text-transform: uppercase;
	}

	/* Buttons */
	.btn {
		padding: 0.75rem 1.25rem;
		border-radius: 10px;
		font-weight: 600;
		font-family: 'Inter', sans-serif;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.9375rem;
	}

	.btn-primary {
		background: #2563EB;
		color: #FFFFFF;
	}

	.btn-primary:hover {
		background: #1D4ED8;
	}

	.btn-secondary {
		background: #E5E7EB;
		color: #1F2937;
	}

	.btn-secondary:hover {
		background: #D1D5DB;
	}

	.btn-outline {
		background: #FFFFFF;
		border: 1px solid #D1D5DB;
		color: #374151;
	}

	.btn-outline:hover {
		background: #F9FAFB;
		border-color: #9CA3AF;
	}

	.community-actions {
		display: flex;
		gap: 0.75rem;
	}

	.community-actions .btn {
		flex: 1;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.filters-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.filters-grid {
			grid-template-columns: 1fr;
		}
		.filter-actions {
			flex-direction: column;
		}
		.communities-grid {
			grid-template-columns: 1fr;
		}
		.community-actions {
			flex-direction: column;
		}
		.hero-section {
			padding: 2rem 1.5rem;
		}
	}

	/* Sections */
	.community-section {
		margin-bottom: 4rem;
	}

	.section-title {
		font-family: 'Outfit', sans-serif;
		font-size: 1.75rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.section-title::after {
		content: '';
		flex: 1;
		height: 1px;
		background: #E5E7EB;
	}
</style>