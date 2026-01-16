<script>
	import { onMount } from 'svelte';
	
	// Community profile data
	let community = {
		id: 'community-1',
		name: 'Komunitas Pencari Barang Hilang Jakarta Selatan',
		location: 'Jakarta Selatan',
		itemTypes: ['Dompet & Identitas', 'HP & Elektronik', 'Kunci', 'Dokumen Penting', 'Hewan Peliharaan'],
		description: 'Komunitas relawan yang membantu pencarian barang hilang di wilayah Jakarta Selatan. Kami berfokus pada kehilangan barang pribadi, elektronik, dokumen penting, dan hewan peliharaan. Bergabunglah dengan kami untuk saling membantu dalam menemukan barang yang hilang.',
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
		bannerImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200"><rect width="800" height="200" fill="%23667eea"/><text x="400" y="100" font-family="Arial" font-size="24" text-anchor="middle" fill="white">Banner Komunitas Jakarta Selatan</text></svg>',
		logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/><text x="50" y="55" font-family="Arial" font-size="30" text-anchor="middle" fill="white">JS</text></svg>',
		socialLinks: {
			facebook: 'https://facebook.com/komunitasjs',
			twitter: 'https://twitter.com/komunitasjs',
			instagram: 'https://instagram.com/komunitasjs'
		},
		rules: [
			'Harap memberikan informasi yang akurat dan jujur',
			'Tidak memposting informasi palsu atau menyesatkan',
			'Menghormati privasi member lain',
			'Menjaga komunikasi yang sopan dan saling membantu'
		],
		stats: {
			weeklyReports: 42,
			itemsFound: 28,
			dailyActiveMembers: 127,
			responseTime: '2.5 jam'
		}
	};
	
	// Admins data
	let admins = [
		{ id: 'admin-1', name: 'Budi Santoso', role: 'Founder', reputation: 4.9, joinDate: '2020-03-15', posts: 342 },
		{ id: 'admin-2', name: 'Siti Rahayu', role: 'Moderator', reputation: 4.7, joinDate: '2021-07-22', posts: 189 },
		{ id: 'admin-3', name: 'Ahmad Prasetyo', role: 'Coordinator', reputation: 4.8, joinDate: '2020-11-30', posts: 267 }
	];
	
	// Recent activity
	let recentActivity = [
		{ id: 'activity-1', type: 'found', title: 'Dompet ditemukan di Mall Pondok Indah', user: 'Maria S.', time: '2 jam yang lalu' },
		{ id: 'activity-2', type: 'lost', title: 'Kehilangan kunci motor di Stasiun Sudirman', user: 'Joko W.', time: '5 jam yang lalu' },
		{ id: 'activity-3', type: 'discussion', title: 'Tips menjaga keamanan barang di tempat umum', user: 'Admin Komunitas', time: '1 hari yang lalu' },
		{ id: 'activity-4', type: 'found', title: 'HP iPhone ditemukan di kafe Kemang', user: 'Rina K.', time: '1 hari yang lalu' }
	];
	
	// Verification requests
	let verificationRequests = [
		{ id: 'req-1', name: 'Komunitas Hewan Peliharaan Bandung', status: 'pending', requestDate: '2024-01-14' },
		{ id: 'req-2', name: 'Lost & Found Surabaya', status: 'approved', requestDate: '2024-01-10' }
	];
	
	// Collaboration requests
	let collaborationRequests = [
		{ id: 'collab-1', name: 'Komunitas Jakarta Pusat', status: 'active', startDate: '2023-12-01', itemsShared: 15 },
		{ id: 'collab-2', name: 'Komunitas Bekasi', status: 'pending', startDate: '2024-01-12', itemsShared: 0 }
	];
	
	// Archive data
	let archives = [
		{ id: 'archive-1', title: 'Dompet ditemukan di Mall Pondok Indah', status: 'found', date: '2024-01-10', reporter: 'Maria S.' },
		{ id: 'archive-2', title: 'Kunci motor ditemukan di Parkiran SCBD', status: 'found', date: '2024-01-08', reporter: 'Rina K.' },
		{ id: 'archive-3', title: 'Kehilangan HP di Stasiun Sudirman', status: 'lost', date: '2024-01-05', reporter: 'Joko W.' }
	];
	
	// User state
	let isMember = false;
	let showJoinForm = false;
	let joinRequest = {
		name: '',
		email: '',
		phone: '',
		reason: ''
	};
	
	// Format date for display
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	// Join community
	function joinCommunity() {
		if (!joinRequest.name || !joinRequest.email) {
			alert('Mohon isi nama dan email Anda.');
			return;
		}
		
		// In a real app, this would make an API call
		isMember = true;
		showJoinForm = false;
		alert(`Selamat ${joinRequest.name}! Anda telah bergabung dengan komunitas.`);
		joinRequest = { name: '', email: '', phone: '', reason: '' };
	}
	
	// Leave community
	function leaveCommunity() {
		if (confirm('Apakah Anda yakin ingin keluar dari komunitas ini?')) {
			isMember = false;
			alert('Anda telah keluar dari komunitas.');
		}
	}
	
	// Report community
	function reportCommunity() {
		const reason = prompt('Mohon jelaskan alasan Anda melaporkan komunitas ini:');
		if (reason) {
			alert('Laporan Anda telah dikirim dan akan ditinjau oleh admin.');
			// In a real app, this would make an API call
		}
	}
	
	// Verify community
	function verifyCommunity() {
		if (confirm('Apakah Anda yakin ingin mengirim permintaan verifikasi untuk komunitas ini?')) {
			alert('Permintaan verifikasi telah dikirim.');
			// In a real app, this would make an API call
		}
	}
	
	// Request collaboration
	function requestCollaboration() {
		const communityName = prompt('Nama komunitas yang ingin diajak kolaborasi:');
		if (communityName) {
			alert(`Permintaan kolaborasi dengan ${communityName} telah dikirim.`);
			// In a real app, this would make an API call
		}
	}
	
	// Initialize
	onMount(() => {
		// Check if user is already a member (in a real app, this would come from auth)
		isMember = false;
	});
</script>

<div class="card">
	<!-- Community Banner -->
	<div style="position: relative; margin: -1.5rem -1.5rem 1.5rem -1.5rem; border-radius: 15px 15px 0 0; overflow: hidden;">
		<img src={community.bannerImage} alt="Community Banner" style="width: 100%; height: 200px; object-fit: cover;" />
		<div style="position: absolute; bottom: 1rem; left: 1rem;">
			<div style="display: flex; align-items: center; gap: 1rem;">
				<img src={community.logo} alt="Community Logo" style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid white; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);" />
				<div>
					<h1 style="margin: 0; color: white; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);">{community.name}</h1>
					<div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
						{#if community.verified}
							<span style="background: rgba(46, 204, 113, 0.9); color: white; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem; font-weight: 600;">✅ Terverifikasi</span>
						{/if}
						{#if community.isOfficial}
							<span style="background: rgba(52, 152, 219, 0.9); color: white; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem; font-weight: 600;">🏢 Resmi</span>
						{/if}
						<span style="background: rgba(255, 255, 255, 0.9); color: #333; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">📍 {community.location}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Community Actions -->
	<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
		{#if !isMember}
			<button 
				class="btn btn-success" 
				on:click={() => showJoinForm = true}
				style="flex: 1; min-width: 150px;"
			>
				🤝 Bergabung dengan Komunitas
			</button>
		{:else}
			<button 
				class="btn" 
				style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); flex: 1; min-width: 150px;"
				on:click={leaveCommunity}
			>
				🚪 Keluar dari Komunitas
			</button>
		{/if}
		
		<button 
			class="btn" 
			style="background: linear-gradient(45deg, #3498db, #2980b9); flex: 1; min-width: 150px;"
			on:click={() => window.location.href = '/community/forum'}
		>
			💬 Forum Diskusi
		</button>
		
		<button 
			class="btn" 
			style="background: linear-gradient(45deg, #1abc9c, #16a085); flex: 1; min-width: 150px;"
			on:click={verifyCommunity}
		>
			✅ Minta Verifikasi
		</button>
		
		<button 
			class="btn" 
			style="background: linear-gradient(45deg, #9b59b6, #8e44ad); flex: 1; min-width: 150px;"
			on:click={requestCollaboration}
		>
			🔄 Ajak Kolaborasi
		</button>
		
		<button 
			class="btn" 
			style="background: linear-gradient(45deg, #e74c3c, #c0392b); flex: 1; min-width: 150px;"
			on:click={reportCommunity}
		>
			🚩 Laporkan
		</button>
	</div>
	
	<!-- Community Stats -->
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
		<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 15px; border: 1px solid rgba(102, 126, 234, 0.2);">
			<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👥</div>
			<div style="font-size: 2rem; font-weight: 700; color: #667eea;">{community.memberCount}</div>
			<div style="color: #718096;">Anggota</div>
		</div>
		
		<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1)); border-radius: 15px; border: 1px solid rgba(46, 204, 113, 0.2);">
			<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✅</div>
			<div style="font-size: 2rem; font-weight: 700; color: #27ae60;">{community.foundItems}</div>
			<div style="color: #718096;">Barang Ditemukan</div>
		</div>
		
		<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(241, 196, 15, 0.1), rgba(243, 156, 18, 0.1)); border-radius: 15px; border: 1px solid rgba(241, 196, 15, 0.2);">
			<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📋</div>
			<div style="font-size: 2rem; font-weight: 700; color: #f39c12;">{community.activeReports}</div>
			<div style="color: #718096;">Laporan Aktif</div>
		</div>
		
		<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1)); border-radius: 15px; border: 1px solid rgba(155, 89, 182, 0.2);">
			<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⭐</div>
			<div style="font-size: 2rem; font-weight: 700; color: #9b59b6;">{community.rating}</div>
			<div style="color: #718096;">Rating</div>
		</div>
	</div>
	
	<!-- Community Description -->
	<div class="card" style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; color: #667eea;">📝 Tentang Komunitas</h3>
		<p style="line-height: 1.6; color: #4a5568;">{community.description}</p>
		
		<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
			<div style="flex: 1; min-width: 250px;">
				<h4 style="margin-bottom: 0.5rem; color: #667eea;">📍 Lokasi</h4>
				<p style="margin: 0; color: #718096;">{community.location}</p>
				{#if community.coordinates}
					<button 
						class="btn" 
						style="background: rgba(52, 152, 219, 0.1); color: #3498db; padding: 0.5rem 1rem; margin-top: 0.5rem;"
						on:click={() => window.open(`https://www.google.com/maps?q=${community.coordinates.lat},${community.coordinates.lng}`, '_blank')}
					>
						🧭 Buka di Google Maps
					</button>
				{/if}
			</div>
			
			<div style="flex: 1; min-width: 250px;">
				<h4 style="margin-bottom: 0.5rem; color: #667eea;">📦 Jenis Barang</h4>
				<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
					{#each community.itemTypes as type}
						<span style="background: rgba(118, 75, 162, 0.1); color: #764ba2; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">{type}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
	
	<!-- Community Rules -->
	<div class="card" style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; color: #667eea;">📜 Aturan Komunitas</h3>
		<ul style="padding-left: 1.5rem;">
			{#each community.rules as rule}
				<li style="margin-bottom: 0.5rem; color: #4a5568;">{rule}</li>
			{/each}
		</ul>
	</div>
	
	<!-- Admins -->
	<div class="card" style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; color: #667eea;">🧑‍💼 Admin Komunitas</h3>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
			{#each admins as admin}
				<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(102, 126, 234, 0.05); border-radius: 15px;">
					<div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(45deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
						{admin.name.charAt(0)}
					</div>
					<div>
						<h4 style="margin: 0 0 0.25rem 0;">{admin.name}</h4>
						<p style="margin: 0; font-size: 0.9rem; color: #718096;">{admin.role}</p>
						<div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
							<span style="background: rgba(241, 196, 15, 0.2); color: #f39c12; padding: 0.1rem 0.3rem; border-radius: 5px; font-size: 0.8rem;">⭐ {admin.reputation}</span>
							<span style="color: #718096; font-size: 0.8rem;">{admin.posts} posts</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Recent Activity -->
	<div class="card" style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; color: #667eea;">🕒 Aktivitas Terbaru</h3>
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			{#each recentActivity as activity}
				<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.7); border-radius: 15px; border-left: 4px solid {activity.type === 'found' ? '#27ae60' : activity.type === 'lost' ? '#e74c3c' : '#3498db'};">
					<div style="font-size: 1.5rem;">
						{activity.type === 'found' ? '✅' : activity.type === 'lost' ? '🔍' : '💬'}
					</div>
					<div style="flex: 1;">
						<h4 style="margin: 0 0 0.25rem 0; font-size: 1rem;">{activity.title}</h4>
						<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #718096;">
							<span>oleh {activity.user}</span>
							<span>•</span>
							<span>{activity.time}</span>
						</div>
					</div>
					<button 
						class="btn" 
						style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; font-size: 0.9rem;"
					>
						👁️ Lihat
					</button>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Verification & Collaboration -->
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
		<!-- Verification Requests -->
		<div class="card">
			<h3 style="margin-bottom: 1rem; color: #667eea;">🧾 Verifikasi & Keamanan</h3>
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				{#each verificationRequests as request}
					<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.7); border-radius: 15px; border-left: 4px solid {request.status === 'approved' ? '#27ae60' : '#f39c12'};">
						<div style="font-size: 1.5rem;">
							{request.status === 'approved' ? '✅' : '⏳'}
						</div>
						<div style="flex: 1;">
							<h4 style="margin: 0 0 0.25rem 0; font-size: 1rem;">{request.name}</h4>
							<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #718096;">
								<span>{request.status === 'approved' ? 'Disetujui' : 'Menunggu'}</span>
								<span>•</span>
								<span>{request.requestDate}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		
		<!-- Collaboration Requests -->
		<div class="card">
			<h3 style="margin-bottom: 1rem; color: #667eea;">🔄 Kolaborasi Antar Komunitas</h3>
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				{#each collaborationRequests as request}
					<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.7); border-radius: 15px; border-left: 4px solid {request.status === 'active' ? '#27ae60' : '#f39c12'};">
						<div style="font-size: 1.5rem;">
							{request.status === 'active' ? '🤝' : '⏳'}
						</div>
						<div style="flex: 1;">
							<h4 style="margin: 0 0 0.25rem 0; font-size: 1rem;">{request.name}</h4>
							<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #718096;">
								<span>{request.status === 'active' ? 'Aktif' : 'Menunggu'}</span>
								<span>•</span>
								<span>{request.startDate}</span>
							</div>
							{#if request.itemsShared > 0}
								<div style="margin-top: 0.25rem; font-size: 0.8rem; color: #3498db;">
									📦 {request.itemsShared} barang dibagikan
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	
	<!-- Archives -->
	<div class="card" style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; color: #667eea;">🗓️ Riwayat & Arsip</h3>
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			{#each archives as item}
				<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.7); border-radius: 15px; border-left: 4px solid {item.status === 'found' ? '#27ae60' : '#e74c3c'};">
					<div style="font-size: 1.5rem;">
						{item.status === 'found' ? '✅' : '🔍'}
					</div>
					<div style="flex: 1;">
						<h4 style="margin: 0 0 0.25rem 0; font-size: 1rem;">{item.title}</h4>
						<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #718096;">
							<span>Dilaporkan oleh {item.reporter}</span>
							<span>•</span>
							<span>{item.date}</span>
						</div>
					</div>
					<button 
						class="btn" 
						style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; font-size: 0.9rem;"
					>
						👁️ Lihat
					</button>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Stats -->
	<div class="card">
		<h3 style="margin-bottom: 1rem; color: #667eea;">📊 Statistik Komunitas</h3>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
			<div style="text-align: center; padding: 1rem; background: rgba(102, 126, 234, 0.05); border-radius: 15px;">
				<div style="font-size: 2rem; font-weight: 700; color: #667eea;">{community.stats.weeklyReports}</div>
				<div style="color: #718096;">Laporan Minggu Ini</div>
			</div>
			
			<div style="text-align: center; padding: 1rem; background: rgba(46, 204, 113, 0.05); border-radius: 15px;">
				<div style="font-size: 2rem; font-weight: 700; color: #27ae60;">{community.stats.itemsFound}</div>
				<div style="color: #718096;">Barang Ditemukan</div>
			</div>
			
			<div style="text-align: center; padding: 1rem; background: rgba(241, 196, 15, 0.05); border-radius: 15px;">
				<div style="font-size: 2rem; font-weight: 700; color: #f39c12;">{community.stats.dailyActiveMembers}</div>
				<div style="color: #718096;">Anggota Aktif Harian</div>
			</div>
			
			<div style="text-align: center; padding: 1rem; background: rgba(155, 89, 182, 0.05); border-radius: 15px;">
				<div style="font-size: 2rem; font-weight: 700; color: #9b59b6;">{community.stats.responseTime}</div>
				<div style="color: #718096;">Waktu Respons</div>
			</div>
		</div>
	</div>
</div>

<!-- Join Community Form -->
{#if showJoinForm}
	<div style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; overflow-y: auto;">
		<div class="card" style="max-width: 500px; width: 100%;">
			<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(102, 126, 234, 0.2);">
				<h2 style="margin: 0; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
					🤝 Bergabung dengan Komunitas
				</h2>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); padding: 0.5rem; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"
					on:click={() => showJoinForm = false}
				>
					❌
				</button>
			</div>
			
			<div class="form-group">
				<label for="name">Nama Lengkap *</label>
				<input 
					type="text"
					id="name"
					bind:value={joinRequest.name}
					placeholder="Masukkan nama lengkap Anda"
					class="form-control"
				/>
			</div>
			
			<div class="form-group">
				<label for="email">Email *</label>
				<input 
					type="email"
					id="email"
					bind:value={joinRequest.email}
					placeholder="Masukkan email Anda"
					class="form-control"
				/>
			</div>
			
			<div class="form-group">
				<label for="phone">Nomor Telepon</label>
				<input 
					type="tel"
					id="phone"
					bind:value={joinRequest.phone}
					placeholder="Masukkan nomor telepon Anda"
					class="form-control"
				/>
			</div>
			
			<div class="form-group">
				<label for="reason">Alasan Bergabung</label>
				<textarea 
					id="reason"
					bind:value={joinRequest.reason}
					placeholder="Mengapa Anda ingin bergabung dengan komunitas ini?"
					class="form-control"
					rows="3"
				></textarea>
			</div>
			
			<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
				<button 
					class="btn btn-success" 
					on:click={joinCommunity}
					style="flex: 1; min-width: 120px;"
				>
					✅ Bergabung Sekarang
				</button>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); flex: 1; min-width: 120px;"
					on:click={() => showJoinForm = false}
				>
					❌ Batal
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.card {
		background: white;
		border-radius: 15px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(0, 0, 0, 0.05);
	}
	
	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
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
	}
	
	.btn:hover {
		background: linear-gradient(45deg, #ee5a24, #ff6b6b);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
	}
	
	.btn-success {
		background: linear-gradient(45deg, #2ecc71, #27ae60);
		box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
	}
	
	.btn-success:hover {
		background: linear-gradient(45deg, #27ae60, #2ecc71);
		box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
	}
	
	.form-control {
		width: 100%;
		padding: 15px 20px;
		border: 2px solid #e2e8f0;
		border-radius: 15px;
		font-size: 16px;
		background: rgba(255, 255, 255, 0.8);
		font-family: 'Poppins', sans-serif;
		transition: all 0.3s ease;
	}
	
	.form-control:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
		background: white;
		transform: translateY(-2px);
	}
	
	.form-group {
		margin-bottom: 1.5rem;
	}
	
	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #2d3748;
	}
</style>