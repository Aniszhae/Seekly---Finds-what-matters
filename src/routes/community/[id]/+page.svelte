<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// State variables
	let community = null;
	let activeTab = 'posts';
	let isLoading = true;
	let isMember = false;
	let userRole = 'member';
	let isMuted = false;

	// Mock Data Store
	const communitiesData = {
		'community-1': {
			id: 'community-1',
			name: 'Komunitas Penyelamat Barang Jakarta',
			shortDescription: 'Relawan aktif membantu warga Jakarta mengembalikan barang berharga yang tertinggal atau hilang.',
			fullDescription: 'Komunitas Penyelamat Barang Jakarta (KPBJ) adalah wadah bagi para relawan yang berdedikasi untuk membantu sesama warga Jakarta dalam proses pencarian dan pengembalian barang hilang. Kami mengutamakan integritas, kejujuran, dan kecepatan informasi.',
			category: 'Lingkungan & Sosial',
			topics: ['Logistik', 'Relawan', 'Keamanan'],
			coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
			logo: '🏢',
			memberCount: 2450,
			status: 'terbuka',
			createdAt: '2023-01-15',
			location: 'DKI Jakarta',
			website: 'https://penyelamatbarang.jakarta.go.id',
			social: { instagram: '@kpbj_official', twitter: '@kpbj_jkt' },
			tags: ['#JakartaPeduli', '#BarangHilang', '#RelawanJKT'],
			rules: [
				{ title: 'Integritas', content: 'Dilarang keras meminta imbalan paksa kepada pemilik barang.' },
				{ title: 'Verifikasi', content: 'Wajib verifikasi kepemilikan dengan bukti yang sah.' }
			],
			prohibitions: ['Spamming', 'Ujaran Kebencian', 'Iklan', 'Konten SARA'],
			sanctions: 'Peringatan keras hingga pemblokiran permanen.',
			admins: [
				{ name: 'Andi Wijaya', role: 'Head Admin', contact: 'andi@kpbj.org', responseTime: '1-2 jam' },
				{ name: 'Siti Aminah', role: 'Moderator', activeTime: '08:00 - 17:00' }
			],
			posts: [
				{ id: 1, author: 'Budi Kemas', text: 'Menemukan dompet di halte Tosari.', time: '10m lalu', likes: 12 },
				{ id: 2, author: 'Sisca', text: 'Update sistem pelaporan barang hilang.', time: '2j lalu', likes: 45 }
			],
			discussions: [
				{ id: 1, title: 'Cara membedakan bukti kepemilikan', author: 'Andi', replies: 28 },
				{ id: 2, title: 'Spot tertinggal barang di KRL', author: 'Rian', replies: 56 }
			],
			events: [
				{ id: 1, title: 'Gathering Relawan', date: '25 Jan 2024', location: 'Taman Suropati' }
			]
		},
		'community-2': {
			id: 'community-2',
			name: 'Komunitas Pecinta Hewan Bandung',
			shortDescription: 'Membantu menemukan hewan peliharaan yang hilang di area Bandung.',
			fullDescription: 'Kami adalah sekumpulan pecinta hewan yang peduli terhadap keselamatan anabul dan peliharaan lainnya di Bandung.',
			category: 'Hewan Peliharaan',
			topics: ['Kucing', 'Anjing', 'Rescue'],
			coverImage: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&q=80&w=1200',
			logo: '🐾',
			memberCount: 1200,
			status: 'terbuka',
			createdAt: '2022-05-20',
			location: 'Bandung',
			website: 'https://hewanbandung.org',
			social: { instagram: '@hewanbdg' },
			tags: ['#BandungJuara', '#RescueHewan'],
			rules: [
				{ title: 'Kasih Sayang', content: 'Perlakukan hewan dengan baik saat proses evakuasi.' }
			],
			prohibitions: ['Kekerasan hewan', 'Jual beli ilegal'],
			sanctions: 'Pemblokiran dan lapor pihak berwajib jika ada kekerasan.',
			admins: [
				{ name: 'Rina', role: 'Admin', contact: 'rina@hewan.org' }
			],
			posts: [],
			discussions: [],
			events: []
		}
	};

	onMount(() => {
		const id = $page.params.id;
		// Initialize data based on URL ID
		setTimeout(() => {
			community = communitiesData[id] || communitiesData['community-1'];
			isLoading = false;
		}, 500);
	});

	function toggleJoin() { isMember = !isMember; }
	function toggleMute() { isMuted = !isMuted; }
</script>

<div class="community-detail-container">
	{#if isLoading}
		<div class="loader-wrapper">
			<div class="spinner"></div>
			<p>Memuat data komunitas...</p>
		</div>
	{:else if community}
		<div class="cover-section" style="background-image: url({community.coverImage})">
			<div class="cover-overlay">
				<a href="/community" on:click|preventDefault={() => history.back()} class="back-link" title="Kembali ke Daftar Komunitas">
					<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					<span>Kembali</span>
				</a>
				<div class="header-content">
					<div class="community-logo">{community.logo}</div>
					<div class="header-text">
						<span class="category-badge">{community.category}</span>
						<h1>{community.name}</h1>
						<p>{community.shortDescription}</p>
					</div>
					<div class="header-actions">
						{#if isMember}
							<button class="btn btn-secondary" on:click={toggleJoin}>Keluar</button>
							<a href="/community/chat?id={community.id}" class="btn btn-primary">Chat</a>
						{:else}
							<button class="btn btn-primary large" on:click={toggleJoin}>Gabung</button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="content-grid">
			<div class="main-column">
				<section class="card">
					<h2>📖 Informasi Utama</h2>
					<p class="full-desc">{community.fullDescription}</p>
					<div class="topic-pills">
						{#each community.topics as topic}<span class="topic-pill">#{topic}</span>{/each}
					</div>
				</section>

				<section class="card">
					<div class="tab-header">
						<button class:active={activeTab === 'posts'} on:click={() => activeTab = 'posts'}>Postingan</button>
						<button class:active={activeTab === 'discussions'} on:click={() => activeTab = 'discussions'}>Diskusi</button>
						<button class:active={activeTab === 'events'} on:click={() => activeTab = 'events'}>Agenda</button>
					</div>
					<div class="tab-content">
						{#if activeTab === 'posts'}
							<div class="posts-list">
								{#each community.posts as post}
									<div class="post-item">
										<div class="post-user-avatar">{(post.author || 'U')[0]}</div>
										<div class="post-main">
											<div class="post-meta"><strong>{post.author}</strong> • {post.time}</div>
											<p>{post.text}</p>
										</div>
									</div>
								{:else}
									<p class="empty-msg">Belum ada postingan terbaru.</p>
								{/each}
							</div>
						{:else if activeTab === 'discussions'}
							<div class="discussion-list">
								{#each community.discussions as disc}
									<div class="discussion-item">
										<div><h4>{disc.title}</h4><p>Oleh {disc.author}</p></div>
										<div class="disc-stats">{disc.replies} Balasan</div>
									</div>
								{:else}
									<p class="empty-msg">Belum ada diskusi aktif.</p>
								{/each}
							</div>
						{:else if activeTab === 'events'}
							<div class="event-list">
								{#each community.events as event}
									<div class="event-item">
										<div class="event-date">
											<span class="day">{event.date.split(' ')[0]}</span>
											<span class="month">{event.date.split(' ')[1]}</span>
										</div>
										<div class="event-info"><h4>{event.title}</h4><p>📍 {event.location}</p></div>
									</div>
								{:else}
									<p class="empty-msg">Belum ada agenda terdekat.</p>
								{/each}
							</div>
						{/if}
					</div>
				</section>

				<section class="card">
					<h2>📜 Aturan</h2>
					<div class="rules-grid">
						{#each community.rules as rule}
							<div class="rule-box"><h4>{rule.title}</h4><p>{rule.content}</p></div>
						{/each}
					</div>
					<div class="guidelines-box">
						<p><strong>Larangan:</strong> {community.prohibitions.join(', ')}</p>
						<p><strong>Sanksi:</strong> {community.sanctions}</p>
					</div>
				</section>

				<section class="card">
					<h2>🧑‍💼 Pengelola</h2>
					{#each community.admins as admin}
						<div class="admin-item">
							<div class="admin-avatar">{(admin.name || 'A')[0]}</div>
							<div class="admin-info"><h4>{admin.name}</h4><p>{admin.role}</p></div>
						</div>
					{/each}
				</section>
			</div>

			<aside class="sidebar-column">
				<div class="card">
					<h3>👥 Keanggotaan</h3>
					<div class="stat-row"><span>Anggota</span><strong>{community.memberCount.toLocaleString()}</strong></div>
					<div class="stat-row"><span>Status</span><span class="badge {community.status}">{community.status}</span></div>
					<div class="stat-row"><span>Peran</span><strong>{isMember ? userRole : '-'}</strong></div>
				</div>

				{#if isMember}
					<div class="card">
						<h3>🔔 Pengaturan</h3>
						<div class="stat-row">
							<span>Notifikasi</span>
							<button class="btn btn-sm" on:click={toggleMute}>{isMuted ? 'Muted' : 'Aktif'}</button>
						</div>
					</div>
				{/if}

				<div class="card">
					<h3>ℹ️ Info Tambahan</h3>
					<div class="info-item"><strong>Lokasi:</strong> {community.location}</div>
					<div class="info-item"><strong>Sejak:</strong> {new Date(community.createdAt).getFullYear()}</div>
					<div class="tag-cloud">
						{#each community.tags as tag}<span class="tag">{tag}</span>{/each}
					</div>
				</div>
			</aside>
		</div>
	{:else}
		<div class="error-container">
			<h2>Komunitas Tidak Ditemukan</h2>
			<a href="/community" class="btn btn-primary">Kembali</a>
		</div>
	{/if}
</div>

<style>
	.community-detail-container { min-height: 100vh; background: #F9FAFB; padding-bottom: 3rem; font-family: 'Inter', sans-serif; }
	.loader-wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh; }
	.spinner { width: 40px; height: 40px; border: 4px solid #E5E7EB; border-top: 4px solid #2563EB; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	.cover-section { height: 300px; background-size: cover; background-position: center; position: relative; }
	.cover-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)); display: flex; align-items: flex-end; padding: 2rem; }
	
	.back-link {
		position: absolute;
		top: 2rem;
		left: 2rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: white;
		text-decoration: none;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(8px);
		padding: 0.6rem 1.2rem;
		border-radius: 12px;
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 0.2s;
		border: 1px solid rgba(255, 255, 255, 0.2);
		z-index: 20;
	}

	.back-link:hover {
		background: rgba(0, 0, 0, 0.5);
		transform: translateX(-5px);
	}

	.header-content { max-width: 1200px; margin: 0 auto; width: 100%; display: flex; align-items: center; gap: 1.5rem; }
	.community-logo { width: 80px; height: 80px; background: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
	.header-text h1 { color: white; margin: 0; font-size: 2rem; font-family: 'Outfit', sans-serif; }
	.header-text p { color: #E5E7EB; margin: 0.25rem 0 0; }
	.category-badge { background: #2563EB; color: white; padding: 0.2rem 0.6rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
	.header-actions { margin-left: auto; display: flex; gap: 0.75rem; }

	.content-grid { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; display: grid; grid-template-columns: 1fr 320px; gap: 2rem; }
	.card { background: white; padding: 1.5rem; border-radius: 16px; border: 1px solid #E5E7EB; margin-bottom: 1.5rem; }
	.card h2, .card h3 { margin-top: 0; font-family: 'Outfit', sans-serif; font-size: 1.25rem; }
	.full-desc { line-height: 1.6; color: #4B5563; }
	.topic-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
	.topic-pill { background: #EFF6FF; color: #2563EB; padding: 0.25rem 0.75rem; border-radius: 8px; font-size: 0.85rem; }

	.tab-header { display: flex; border-bottom: 1px solid #E5E7EB; margin-bottom: 1.5rem; gap: 1.5rem; }
	.tab-header button { background: none; border: none; padding: 0.75rem 0; font-weight: 600; color: #6B7280; cursor: pointer; border-bottom: 2px solid transparent; }
	.tab-header button.active { color: #2563EB; border-bottom-color: #2563EB; }

	.post-item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #F3F4F6; }
	.post-user-avatar { width: 40px; height: 40px; background: #E5E7EB; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
	.post-meta { font-size: 0.85rem; color: #6B7280; margin-bottom: 0.25rem; }

	.event-item { display: flex; gap: 1rem; padding: 1rem; background: #F9FAFB; border-radius: 12px; margin-bottom: 0.75rem; }
	.event-date { display: flex; flex-direction: column; align-items: center; background: white; padding: 0.5rem; border-radius: 8px; min-width: 50px; }
	.event-date .day { font-weight: 800; font-size: 1.2rem; }
	.event-date .month { font-size: 0.7rem; text-transform: uppercase; color: #2563EB; }

	.rule-box { margin-bottom: 1rem; }
	.rule-box h4 { margin: 0 0 0.25rem 0; font-size: 1rem; }
	.rule-box p { margin: 0; font-size: 0.9rem; color: #4B5563; }

	.admin-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #F9FAFB; border-radius: 12px; margin-bottom: 0.75rem; }
	.admin-avatar { width: 40px; height: 40px; background: #2563EB; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
	.admin-info h4 { margin: 0; font-size: 1rem; }
	.admin-info p { margin: 0; font-size: 0.8rem; color: #6B7280; }

	.stat-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #F3F4F6; font-size: 0.9rem; }
	.stat-row:last-child { border-bottom: none; }
	.badge { padding: 0.1rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
	.badge.terbuka { background: #DCFCE7; color: #166534; }

	.tag-cloud { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
	.tag { color: #6B7280; font-size: 0.8rem; }

	.btn { padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; border: none; cursor: pointer; transition: 0.2s; }
	.btn-primary { background: #2563EB; color: white; }
	.btn-secondary { background: white; border: 1px solid #D1D5DB; color: #374151; }
	.btn-sm { font-size: 0.8rem; padding: 0.25rem 0.75rem; }
	
	.empty-msg { text-align: center; color: #6B7280; padding: 2rem 0; font-style: italic; }

	@media (max-width: 768px) {
		.content-grid { grid-template-columns: 1fr; }
		.cover-section { height: 250px; }
		.header-content { flex-direction: column; text-align: center; }
		.header-actions { margin: 1rem auto 0; }
	}
</style>