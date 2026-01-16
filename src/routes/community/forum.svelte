<script>
	import { onMount } from 'svelte';
	
	// Forum posts data with enhanced structure
	let posts = [
		{
			id: 'post-1',
			title: 'Kehilangan HP iPhone di Stasiun Gambir',
			content: 'Hilang iPhone 12 warna biru di sekitar stasiun Gambir sekitar pukul 14.30. Sudah dicek ke loket info tapi belum ada yang menyerahkan. Mohon bantuan rekan-rekan semua.',
			author: 'Ahmad S.',
			authorReputation: 4.8,
			authorBadges: ['Penemu Terpercaya', 'Relawan Aktif'],
			community: 'Komunitas Pencari Barang Hilang Jakarta',
			timestamp: '2024-01-15T15:30:00Z',
			likes: 24,
			comments: 8,
			location: 'Stasiun Gambir, Jakarta Pusat',
			itemType: 'HP & Elektronik',
			isUrgent: true,
			qrCode: 'QR-HP123',
			tags: ['urgent', 'electronics'],
			status: 'lost', // lost, found, searching
			media: [
				{ type: 'image', url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">📱 Foto HP</text></svg>', description: 'Foto HP yang hilang' },
				{ type: 'image', url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">📍 Lokasi Terakhir</text></svg>', description: 'Lokasi terakhir terlihat' }
			],
			coordinates: { lat: -6.175, lng: 106.825 },
			isVerified: true,
			isPinned: false,
			category: 'lost',
			isModerated: true, // Moderator feature
			viewCount: 127, // View count for statistics
			lastActivity: '2024-01-15T17:30:00Z' // Last activity timestamp
		},
		{
			id: 'post-2',
			title: 'Anjing Peliharaan Hilang di Pondok Indah',
			content: 'Kucing persia warna putih dengan kalung biru hilang sejak kemarin sore di kompleks Pondok Indah. Nama kucingnya "Milo". Mohon yang melihat menghubungi saya.',
			author: 'Siti R.',
			authorReputation: 4.5,
			authorBadges: ['Pemilik Hewan'],
			community: 'Komunitas Barang Hilang Hewan Peliharaan',
			timestamp: '2024-01-14T10:15:00Z',
			likes: 42,
			comments: 15,
			location: 'Pondok Indah, Jakarta Selatan',
			itemType: 'Hewan Peliharaan',
			isUrgent: false,
			qrCode: 'QR-PET456',
			tags: ['pet', 'animal'],
			status: 'lost',
			media: [
				{ type: 'image', url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">🐱 Foto Kucing</text></svg>', description: 'Foto kucing yang hilang' }
			],
			coordinates: { lat: -6.254, lng: 106.822 },
			isVerified: false,
			isPinned: true,
			category: 'lost',
			isModerated: true,
			viewCount: 203,
			lastActivity: '2024-01-14T11:15:00Z'
		},
		{
			id: 'post-3',
			title: 'Motor Yamaha Mio Hilang di Parkiran Mall',
			content: 'Motor Yamaha Mio warna merah dengan stiker kartun di bagasi hilang dari parkiran Mall Taman Anggrek sekitar pukul 19.00. Plat nomor B 1234 XYZ.',
			author: 'Budi K.',
			authorReputation: 4.2,
			authorBadges: ['Anggota Baru'],
			community: 'Komunitas Kendaraan Hilang Jakarta',
			timestamp: '2024-01-13T20:45:00Z',
			likes: 18,
			comments: 5,
			location: 'Mall Taman Anggrek, Jakarta Barat',
			itemType: 'Kendaraan Hilang',
			isUrgent: true,
			qrCode: 'QR-MTR789',
			tags: ['urgent', 'vehicle'],
			status: 'found', // Changed to found for demo
			media: [
				{ type: 'image', url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">🏍️ Foto Motor</text></svg>', description: 'Foto motor yang ditemukan' }
			],
			coordinates: { lat: -6.186, lng: 106.829 },
			isVerified: true,
			isPinned: false,
			category: 'found',
			isModerated: true,
			viewCount: 89,
			lastActivity: '2024-01-13T21:30:00Z'
		},
		{
			id: 'post-4',
			title: 'Tips supaya barang cepat ditemukan',
			content: 'Berikut beberapa tips yang bisa membantu agar barang hilang lebih cepat ditemukan: 1. Laporkan segera ke komunitas, 2. Pasang iklan di media sosial, 3. Kunjungi tempat-tempat umum terdekat...',
			author: 'Admin Komunitas',
			authorReputation: 4.9,
			authorBadges: ['Moderator', 'Penemu Terpercaya'],
			community: 'Komunitas Pencari Barang Hilang Jakarta',
			timestamp: '2024-01-12T09:00:00Z',
			likes: 56,
			comments: 12,
			location: '',
			itemType: '',
			isUrgent: false,
			qrCode: '',
			tags: ['tips', 'edukasi'],
			status: 'discussion',
			media: [],
			coordinates: null,
			isVerified: true,
			isPinned: true,
			category: 'tips',
			isModerated: true,
			viewCount: 342,
			lastActivity: '2024-01-12T10:30:00Z'
		},
		{
			id: 'post-5',
			title: 'Dompet ditemukan di Mall Pondok Indah - Sudah Dikembalikan',
			content: 'Dompet berisi KTP, SIM, dan uang tunai ditemukan di area food court Mall Pondok Indah. Sudah dikembalikan ke pemiliknya. Alhamdulillah!',
			author: 'Maria S.',
			authorReputation: 4.7,
			authorBadges: ['Penemu Terpercaya', 'Relawan Aktif'],
			community: 'Komunitas Pencari Barang Hilang Jakarta',
			timestamp: '2024-01-11T14:20:00Z',
			likes: 38,
			comments: 7,
			location: 'Mall Pondok Indah, Jakarta Selatan',
			itemType: 'Dompet & Identitas',
			isUrgent: false,
			qrCode: 'QR-WLT987',
			tags: ['success', 'found'],
			status: 'found',
			media: [
				{ type: 'image', url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">👛 Foto Dompet</text></svg>', description: 'Foto dompet yang ditemukan' }
			],
			coordinates: { lat: -6.254, lng: 106.822 },
			isVerified: true,
			isPinned: false,
			category: 'success', // Success story category
			isModerated: true,
			viewCount: 156,
			lastActivity: '2024-01-11T16:45:00Z',
			isSuccessStory: true // Mark as success story
		}
	];
	
	// Comments data with threaded replies
	let comments = {
		'post-1': [
			{
				id: 'comment-1',
				postId: 'post-1',
				author: 'Maria S.',
				authorReputation: 4.7,
				authorBadges: ['Penemu Terpercaya'],
				content: 'Saya melihat HP seperti itu di sekitar area masjid dekat stasiun tadi sore. Bisa hubungi saya?',
				timestamp: '2024-01-15T16:45:00Z',
				likes: 5,
				reactions: { '👍': 3, '🙏': 2 },
				isVerified: true,
				replies: [
					{
						id: 'reply-1',
						commentId: 'comment-1',
						author: 'Ahmad S.',
						content: 'Terima kasih banyak! Saya segera ke sana.',
						timestamp: '2024-01-15T17:00:00Z',
						likes: 2,
						reactions: { '🙏': 2 }
					}
				]
			},
			{
				id: 'comment-2',
				postId: 'post-1',
				author: 'Joko W.',
				authorReputation: 4.3,
				authorBadges: ['Relawan Aktif'],
				content: 'Sudah dilaporkan ke petugas stasiun? Mereka biasanya menyimpan barang-barang yang ditemukan.',
				timestamp: '2024-01-15T17:30:00Z',
				likes: 3,
				reactions: { '👍': 3 },
				isVerified: false,
				replies: []
			}
		],
		'post-2': [
			{
				id: 'comment-3',
				postId: 'post-2',
				author: 'Rina K.',
				content: 'Saya menemukan kucing putih di area SCBD tadi pagi. Apakah ini kucing Anda?',
				timestamp: '2024-01-14T11:00:00Z',
				likes: 8,
				reactions: { '👀': 5, '🙏': 3 },
				isVerified: false,
				replies: [
					{
						id: 'reply-2',
						commentId: 'comment-3',
						author: 'Siti R.',
						content: 'Iya benar! Ciri-cirinya sama. Boleh saya minta nomor kontak untuk menjemput?',
						timestamp: '2024-01-14T11:15:00Z',
						likes: 1,
						reactions: { '🙏': 1 }
					}
				]
			}
		]
	};
	
	let newPost = {
		title: '',
		content: '',
		location: '',
		itemType: '',
		qrCode: '',
		tags: [],
		category: 'lost', // lost, found, discussion, tips, alert, coordination, success
		media: [],
		status: 'lost', // lost, found, searching
		coordinates: null
	};
	
	let newComment = {
		content: '',
		replies: {}
	};
	
	let showNewPostForm = false;
	let selectedPost = null;
	let selectedCategory = 'all';
	let notificationsEnabled = false;
	let radius = 5; // km
	let showNotificationSettings = false;
	let collaborations = [];
	let showCollaborations = false;
	let archives = [];
	let showArchives = false;
	let searchQuery = '';
	let showSearchResults = false;
	let searchResults = [];
	let showSuccessStories = false;
	let successStories = [];
	let followedPosts = [];
	let followedCategories = [];
	let userRole = 'member'; // member, moderator, admin
	let showUserProfile = false;
	let userProfile = {
		name: 'Anda',
		reputation: 4.0,
		badges: ['Anggota Baru'],
		joinedDate: '2024-01-01',
		postsCount: 5,
		commentsCount: 12
	};
	
	// Categories for forum
	const categories = [
		{ id: 'all', name: 'Semua Kategori', icon: '📋' },
		{ id: 'lost', name: 'Laporan Kehilangan', icon: '🔍' },
		{ id: 'found', name: 'Laporan Penemuan', icon: '🧾' },
		{ id: 'tips', name: 'Tips & Edukasi', icon: '💡' },
		{ id: 'success', name: 'Cerita Sukses', icon: '❤️' },
		{ id: 'alert', name: 'Waspada Penipuan', icon: '🚨' },
		{ id: 'coordination', name: 'Koordinasi Pencarian', icon: '🗺️' },
		{ id: 'discussion', name: 'Diskusi Umum', icon: '🗨️' }
	];
	
	// Item types for dropdown
	const itemTypes = ['Dompet & Identitas', 'HP & Elektronik', 'Hewan Peliharaan', 'Kendaraan Hilang', 'Kunci', 'Dokumen Penting', 'Laptop', 'Motor', 'Mobil', 'Sepeda'];
	
	// Sample collaboration data
	const collaborationData = [
		{ id: 'collab-1', community1: 'Komunitas Jakarta Selatan', community2: 'Komunitas Jakarta Pusat', itemsShared: 12, lastSync: '2024-01-15' },
		{ id: 'collab-2', community1: 'Komunitas Bandung', community2: 'Komunitas Jakarta Barat', itemsShared: 8, lastSync: '2024-01-14' }
	];
	
	// Sample archive data
	const archiveData = [
		{ id: 'archive-1', title: 'Dompet ditemukan di Mall Pondok Indah', status: 'found', date: '2024-01-10', reporter: 'Maria S.', category: 'found' },
		{ id: 'archive-2', title: 'Kunci motor ditemukan di Parkiran SCBD', status: 'found', date: '2024-01-08', reporter: 'Rina K.', category: 'found' },
		{ id: 'archive-3', title: 'Kehilangan HP di Stasiun Sudirman', status: 'lost', date: '2024-01-05', reporter: 'Joko W.', category: 'lost' },
		{ id: 'archive-4', title: 'Tips menjaga keamanan barang di tempat umum', status: 'discussion', date: '2024-01-03', reporter: 'Admin Komunitas', category: 'tips' }
	];
	
	// Sample success stories
	const successStoriesData = [
		{ 
			id: 'success-1', 
			title: 'Dompet ditemukan setelah 3 hari!', 
			content: 'Dompet saya yang hilang di stasiun akhirnya ditemukan berkat bantuan komunitas. Terima kasih banyak!',
			author: 'Andi P.',
			timestamp: '2024-01-10T14:30:00Z',
			likes: 42,
			itemType: 'Dompet & Identitas',
			location: 'Stasiun Gambir',
			category: 'success'
		},
		{ 
			id: 'success-2', 
			title: 'Motor ditemukan di bengkel', 
			content: 'Motor saya yang hilang selama seminggu akhirnya ditemukan di bengkel langganan. Alhamdulillah!',
			author: 'Budi K.',
			timestamp: '2024-01-08T16:45:00Z',
			likes: 38,
			itemType: 'Kendaraan Hilang',
			location: 'Bengkel Motor Jaya',
			category: 'success'
		}
	];
	
	// Forum statistics
	let forumStats = {
		totalPosts: 1247,
		activeReports: 23,
		itemsFound: 89,
		dailyActiveMembers: 127,
		responseTime: '2.5 jam'
	};
	
	// Format date for display
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
	
	// Format relative time
	function formatRelativeTime(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diffInSeconds = Math.floor((now - date) / 1000);
		
		if (diffInSeconds < 60) return 'baru saja';
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
		if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
		return formatDate(dateString);
	}
	
	// Toggle new post form
	function toggleNewPostForm() {
		showNewPostForm = !showNewPostForm;
	}
	
	// Submit new post
	function submitPost() {
		if (!newPost.title || !newPost.content) {
			alert('Mohon isi judul dan konten posting.');
			return;
		}
		
		const post = {
			id: 'post-' + (posts.length + 1),
			title: newPost.title,
			content: newPost.content,
			author: userProfile.name,
			authorReputation: userProfile.reputation,
			authorBadges: userProfile.badges,
			community: 'Komunitas Anda',
			timestamp: new Date().toISOString(),
			likes: 0,
			comments: 0,
			location: newPost.location,
			itemType: newPost.itemType,
			isUrgent: newPost.title.toLowerCase().includes('darurat') || newPost.title.toLowerCase().includes('penting'),
			qrCode: newPost.qrCode || `QR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
			tags: newPost.tags,
			status: newPost.status,
			media: newPost.media,
			coordinates: newPost.location ? { lat: -6.2 + Math.random() * 0.1, lng: 106.8 + Math.random() * 0.1 } : null,
			isVerified: false,
			isPinned: false,
			category: newPost.category,
			isModerated: userRole === 'moderator' || userRole === 'admin', // Auto-moderate for mods/admins
			viewCount: 0,
			lastActivity: new Date().toISOString(),
			isSuccessStory: newPost.category === 'success'
		};
		
		posts = [post, ...posts];
		newPost = { title: '', content: '', location: '', itemType: '', qrCode: '', tags: [], category: 'lost', media: [], status: 'lost', coordinates: null };
		showNewPostForm = false;
		
		// In real app, this would trigger a notification to community members
		if (notificationsEnabled) {
			alert('Posting baru telah dibuat dan dikirim ke anggota komunitas dalam radius ' + radius + ' km');
		}
	}
	
	// Like a post
	function likePost(postId) {
		posts = posts.map(post => {
			if (post.id === postId) {
				return { ...post, likes: post.likes + 1 };
			}
			return post;
		});
	}
	
	// View post details
	function viewPost(post) {
		selectedPost = post;
		// Increment view count
		posts = posts.map(p => {
			if (p.id === post.id) {
				return { ...p, viewCount: p.viewCount + 1 };
			}
			return p;
		});
		if (selectedPost) {
			selectedPost = { ...selectedPost, viewCount: selectedPost.viewCount + 1 };
		}
	}
	
	// Close post details
	function closePost() {
		selectedPost = null;
	}
	
	// Toggle notifications
	function toggleNotifications() {
		notificationsEnabled = !notificationsEnabled;
		if (notificationsEnabled) {
			showNotificationSettings = true;
		}
	}
	
	// Set notification radius
	function setNotificationRadius() {
		showNotificationSettings = false;
		alert(`Notifikasi diaktifkan untuk radius ${radius} km`);
	}
	
	// Toggle collaborations
	function toggleCollaborations() {
		showCollaborations = !showCollaborations;
		if (showCollaborations) {
			collaborations = [...collaborationData];
		}
	}
	
	// Toggle archives
	function toggleArchives() {
		showArchives = !showArchives;
		if (showArchives) {
			archives = [...archiveData];
		}
	}
	
	// Scan QR code
	function scanQRCode() {
		const qrCode = prompt('Masukkan kode QR untuk memverifikasi barang:');
		if (qrCode) {
			alert(`Kode QR ${qrCode} telah discan. Memverifikasi barang...`);
			// In a real app, this would verify the item
		}
	}
	
	// Report suspicious post
	function reportPost(postId) {
		if (confirm('Apakah Anda yakin ingin melaporkan posting ini sebagai mencurigakan?')) {
			alert('Laporan Anda telah dikirim dan akan ditinjau oleh admin.');
			// In a real app, this would send a report to moderators
		}
	}
	
	// Add comment to post
	function addComment(postId) {
		if (!newComment.content.trim()) {
			alert('Mohon isi komentar Anda.');
			return;
		}
		
		const comment = {
			id: 'comment-' + (Object.keys(comments).length + 1),
			postId: postId,
			author: userProfile.name,
			authorReputation: userProfile.reputation,
			authorBadges: userProfile.badges,
			content: newComment.content,
			timestamp: new Date().toISOString(),
			likes: 0,
			reactions: {},
			isVerified: false,
			replies: []
		};
		
		if (!comments[postId]) {
			comments[postId] = [];
		}
		
		comments[postId] = [...comments[postId], comment];
		newComment.content = '';
		
		// Update post comment count and last activity
		posts = posts.map(post => {
			if (post.id === postId) {
				return { 
					...post, 
					comments: post.comments + 1,
					lastActivity: new Date().toISOString()
				};
			}
			return post;
		});
		
		// Update selectedPost if it's the same post
		if (selectedPost && selectedPost.id === postId) {
			selectedPost = { 
				...selectedPost, 
				comments: selectedPost.comments + 1,
				lastActivity: new Date().toISOString()
			};
		}
	}
	
	// Like a comment
	function likeComment(postId, commentId) {
		if (!comments[postId]) return;
		
		comments[postId] = comments[postId].map(comment => {
			if (comment.id === commentId) {
				return { ...comment, likes: comment.likes + 1 };
			}
			return comment;
		});
	}
	
	// Add reaction to comment
	function addReaction(postId, commentId, reaction) {
		if (!comments[postId]) return;
		
		comments[postId] = comments[postId].map(comment => {
			if (comment.id === commentId) {
				const reactions = { ...comment.reactions };
				reactions[reaction] = (reactions[reaction] || 0) + 1;
				return { ...comment, reactions };
			}
			return comment;
		});
	}
	
	// Add reply to comment
	function addReply(postId, commentId, replyContent) {
		if (!replyContent.trim() || !comments[postId]) return;
		
		comments[postId] = comments[postId].map(comment => {
			if (comment.id === commentId) {
				const reply = {
					id: 'reply-' + (comment.replies.length + 1),
					commentId: commentId,
					author: userProfile.name,
					content: replyContent,
					timestamp: new Date().toISOString(),
					likes: 0,
					reactions: {}
				};
				return { ...comment, replies: [...comment.replies, reply] };
			}
			return comment;
		});
		
		// Update post last activity
		posts = posts.map(post => {
			if (post.id === postId) {
				return { 
					...post, 
					lastActivity: new Date().toISOString()
				};
			}
			return post;
		});
		
		// Update selectedPost if it's the same post
		if (selectedPost && selectedPost.id === postId) {
			selectedPost = { 
				...selectedPost, 
				lastActivity: new Date().toISOString()
			};
		}
	}
	
	// Change post status
	function changePostStatus(postId, newStatus) {
		posts = posts.map(post => {
			if (post.id === postId) {
				return { ...post, status: newStatus };
			}
			return post;
		});
		
		if (selectedPost && selectedPost.id === postId) {
			selectedPost = { ...selectedPost, status: newStatus };
		}
		
		alert(`Status posting telah diubah menjadi: ${newStatus === 'lost' ? 'Hilang' : newStatus === 'found' ? 'Ditemukan' : 'Proses pencarian'}`);
	}
	
	// Pin/unpin post
	function togglePinPost(postId) {
		posts = posts.map(post => {
			if (post.id === postId) {
				return { ...post, isPinned: !post.isPinned };
			}
			return post;
		});
		
		if (selectedPost && selectedPost.id === postId) {
			selectedPost = { ...selectedPost, isPinned: !selectedPost.isPinned };
		}
		
		alert(`Posting ${selectedPost && selectedPost.id === postId && selectedPost.isPinned ? 'dipasangkan' : 'dilepas'} sebagai pinned post`);
	}
	
	// Filter posts by category
	function filterPostsByCategory() {
		if (selectedCategory === 'all') return posts;
		return posts.filter(post => post.category === selectedCategory);
	}
	
	// Search posts
	function searchPosts() {
		if (!searchQuery.trim()) {
			showSearchResults = false;
			return;
		}
		
		const query = searchQuery.toLowerCase();
		searchResults = posts.filter(post => 
			post.title.toLowerCase().includes(query) ||
			post.content.toLowerCase().includes(query) ||
			post.author.toLowerCase().includes(query) ||
			(post.location && post.location.toLowerCase().includes(query)) ||
			(post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))) ||
			(post.itemType && post.itemType.toLowerCase().includes(query))
		);
		
		showSearchResults = true;
	}
	
	// Toggle success stories
	function toggleSuccessStories() {
		showSuccessStories = !showSuccessStories;
		if (showSuccessStories) {
			successStories = [...successStoriesData];
		}
	}
	
	// Follow/unfollow post
	function toggleFollowPost(postId) {
		const index = followedPosts.indexOf(postId);
		if (index > -1) {
			followedPosts.splice(index, 1);
			alert('Berhenti mengikuti posting ini');
		} else {
			followedPosts.push(postId);
			alert('Mulai mengikuti posting ini');
		}
	}
	
	// Follow/unfollow category
	function toggleFollowCategory(categoryId) {
		const index = followedCategories.indexOf(categoryId);
		if (index > -1) {
			followedCategories.splice(index, 1);
			alert('Berhenti mengikuti kategori ini');
		} else {
			followedCategories.push(categoryId);
			alert('Mulai mengikuti kategori ini');
		}
	}
	
	// Verify post
	function verifyPost(postId) {
		posts = posts.map(post => {
			if (post.id === postId) {
				return { ...post, isVerified: true };
			}
			return post;
		});
		
		if (selectedPost && selectedPost.id === postId) {
			selectedPost = { ...selectedPost, isVerified: true };
		}
		
		alert('Posting telah diverifikasi');
	}
	
	// Delete post
	function deletePost(postId) {
		if (confirm('Apakah Anda yakin ingin menghapus posting ini?')) {
			posts = posts.filter(post => post.id !== postId);
			delete comments[postId];
			
			if (selectedPost && selectedPost.id === postId) {
				closePost();
			}
			
			alert('Posting telah dihapus');
		}
	}
	
	// Mark post as success story
	function markAsSuccessStory(postId) {
		posts = posts.map(post => {
			if (post.id === postId) {
				return { ...post, isSuccessStory: true, category: 'success' };
			}
			return post;
		});
		
		if (selectedPost && selectedPost.id === postId) {
			selectedPost = { ...selectedPost, isSuccessStory: true, category: 'success' };
		}
		
		alert('Posting telah ditandai sebagai cerita sukses');
	}
	
	// Open in Google Maps
	function openInMaps(coordinates) {
		if (coordinates) {
			window.open(`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`, '_blank');
		}
	}
	
	// Initialize
	onMount(() => {
		// Simulate real-time notifications
		setInterval(() => {
			if (notificationsEnabled && Math.random() > 0.7) {
				console.log('🔔 New notification received');
			}
		}, 30000); // Every 30 seconds
	});
</script>

<div class="card">
	<h2 style="margin-bottom: 1.5rem; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2rem; font-weight: 700; text-align: center;">💬 Community Forum</h2>
	
	<!-- Forum Controls -->
	<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: rgba(102, 126, 234, 0.05); border-radius: 15px; border: 1px solid rgba(102, 126, 234, 0.2);">
		<div>
			<h3 style="margin-bottom: 0.5rem;">Komunitas Pencari Barang Hilang Jakarta</h3>
			<p style="margin: 0; color: #718096;">1,247 members • 23 active reports</p>
		</div>
		
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			<button 
				class="btn" 
				on:click={toggleNewPostForm}
				style="background: linear-gradient(45deg, #3498db, #2980b9); padding: 8px 16px; font-size: 14px; border-radius: 20px;"
			>
				{showNewPostForm ? '❌ Cancel' : '➕ New Post'}
			</button>
			
			<button 
				class="btn" 
				on:click={toggleNotifications}
				style="padding: 8px 16px; font-size: 14px; border-radius: 20px; {notificationsEnabled ? 'background: linear-gradient(45deg, #2ecc71, #27ae60);' : 'background: linear-gradient(45deg, #95a5a6, #7f8c8d);'}"
			>
				{notificationsEnabled ? '🔔 Notifikasi Aktif' : '🔕 Aktifkan Notifikasi'}
			</button>
			
			<button 
				class="btn" 
				on:click={toggleCollaborations}
				style="padding: 8px 16px; font-size: 14px; border-radius: 20px; background: linear-gradient(45deg, #9b59b6, #8e44ad);"
			>
				🔄 Kolaborasi
			</button>
			
			<button 
				class="btn" 
				on:click={toggleArchives}
				style="padding: 8px 16px; font-size: 14px; border-radius: 20px; background: linear-gradient(45deg, #f39c12, #d35400);"
			>
				🗓️ Arsip
			</button>
			
			<button 
				class="btn" 
				on:click={scanQRCode}
				style="padding: 8px 16px; font-size: 14px; border-radius: 20px; background: linear-gradient(45deg, #1abc9c, #16a085);"
			>
				🪪 Scan QR
			</button>
		</div>
	</div>
	
	<!-- Search Bar -->
	<div style="margin-bottom: 1.5rem;">
		<div style="display: flex; gap: 0.5rem;">
			<input 
				type="text"
				bind:value={searchQuery}
				placeholder="Cari berdasarkan nama barang, lokasi, pengguna, atau tag..."
				class="form-control"
				on:keyup={(e) => { if (e.key === 'Enter') searchPosts(); }}
				style="flex: 1;"
			/>
			<button 
				class="btn" 
				style="background: linear-gradient(45deg, #667eea, #764ba2); padding: 12px 20px;"
				on:click={searchPosts}
			>
				🔍 Cari
			</button>
		</div>
	</div>
	
	<!-- Category Filter -->
	<div style="margin-bottom: 1.5rem;">
		<h4 style="margin-bottom: 0.5rem; color: #667eea;">Kategori Diskusi</h4>
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			{#each categories as category}
				<button 
					class="btn" 
					class:selected={selectedCategory === category.id}
					on:click={() => selectedCategory = category.id}
					style="padding: 8px 16px; font-size: 14px; border-radius: 20px; {selectedCategory === category.id ? 'background: linear-gradient(45deg, #667eea, #764ba2);' : 'background: rgba(102, 126, 234, 0.1); color: #667eea;'}"
				>
					{category.icon} {category.name}
				</button>
			{/each}
		</div>
	</div>
	
	<!-- Notification Settings -->
	{#if notificationsEnabled && showNotificationSettings}
		<div class="card" style="margin-bottom: 2rem; border-left: 6px solid #f39c12;">
			<h3 style="margin-bottom: 1rem; color: #f39c12;">🔔 Pengaturan Notifikasi Radius</h3>
			
			<div class="form-group">
				<label for="radius">Radius Notifikasi (km)</label>
				<input 
					type="range"
					id="radius"
					bind:value={radius}
					min="1"
					max="50"
					class="form-control"
					style="width: 100%;"
				/>
				<div style="text-align: center; margin-top: 0.5rem; font-weight: 600;">{radius} km</div>
			</div>
			
			<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
				<button 
					class="btn btn-success" 
					style="flex: 1; min-width: 120px;"
					on:click={setNotificationRadius}
				>
					✅ Aktifkan Notifikasi
				</button>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); flex: 1; min-width: 120px;"
					on:click={() => { notificationsEnabled = false; showNotificationSettings = false; }}
				>
					❌ Batal
				</button>
			</div>
		</div>
	{/if}
	
	<!-- Collaborations -->
	{#if showCollaborations}
		<div class="card" style="margin-bottom: 2rem; border-left: 6px solid #9b59b6;">
			<h3 style="margin-bottom: 1rem; color: #9b59b6;">🔄 Kolaborasi Antar Komunitas</h3>
			
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				{#each collaborations as collab}
					<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(155, 89, 182, 0.05); border-radius: 15px; border: 1px solid rgba(155, 89, 182, 0.2);">
						<div style="font-size: 2rem;">🤝</div>
						<div style="flex: 1;">
							<h4 style="margin: 0 0 0.5rem 0;">{collab.community1} ↔ {collab.community2}</h4>
							<p style="margin: 0; color: #718096;">{collab.itemsShared} barang dibagikan • Terakhir sync: {collab.lastSync}</p>
						</div>
						<button class="btn" style="background: linear-gradient(45deg, #9b59b6, #8e44ad); padding: 0.5rem 1rem;">
							👁️ Lihat Detail
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	
	<!-- Archives -->
	{#if showArchives}
		<div class="card" style="margin-bottom: 2rem; border-left: 6px solid #f39c12;">
			<h3 style="margin-bottom: 1rem; color: #f39c12;">🗓️ Riwayat & Arsip</h3>
			
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				{#each archives as item}
					<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px; border-left: 4px solid {item.status === 'found' ? '#27ae60' : '#e74c3c'};">
						<div style="font-size: 1.5rem;">
							{item.status === 'found' ? '✅' : '🔍'}
						</div>
						<div style="flex: 1;">
							<h4 style="margin: 0 0 0.25rem 0;">{item.title}</h4>
							<p style="margin: 0; color: #718096;">Dilaporkan oleh {item.reporter} pada {item.date}</p>
						</div>
						<button class="btn" style="background: rgba(243, 156, 18, 0.1); color: #f39c12; padding: 0.5rem 1rem;">
							👁️ Lihat
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	
	<!-- Success Stories -->
	{#if showSuccessStories}
		<div class="card" style="margin-bottom: 2rem; border-left: 6px solid #e74c3c;">
			<h3 style="margin-bottom: 1rem; color: #e74c3c;">❤️ Cerita Sukses</h3>
			
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				{#each successStories as story}
					<div style="padding: 1rem; background: rgba(231, 76, 60, 0.05); border-radius: 15px; border: 1px solid rgba(231, 76, 60, 0.2);">
						<h4 style="margin: 0 0 0.5rem 0;">{story.title}</h4>
						<p style="margin: 0.5rem 0; color: #718096;">{story.content}</p>
						<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
							<span style="color: #718096; font-size: 0.9rem;">oleh {story.author} • {formatDate(story.timestamp)}</span>
							<span style="background: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">👍 {story.likes}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	
	<!-- New Post Form -->
	{#if showNewPostForm}
		<div class="card" style="margin-bottom: 2rem; border-left: 6px solid #3498db;">
			<h3 style="margin-bottom: 1rem; color: #3498db;">📝 Buat Posting Baru</h3>
			
			<div class="form-group">
				<label for="postTitle">Judul Posting *</label>
				<input 
					type="text"
					id="postTitle"
					bind:value={newPost.title}
					placeholder="Contoh: Kehilangan dompet di Mall tadi siang - Darurat"
					class="form-control"
				/>
			</div>
			
			<div class="form-group">
				<label for="postCategory">Kategori *</label>
				<select 
					id="postCategory"
					bind:value={newPost.category}
					class="form-control"
				>
					<option value="lost">🔍 Laporan Kehilangan</option>
					<option value="found">🧾 Laporan Penemuan</option>
					<option value="discussion">🗨️ Diskusi Umum</option>
					<option value="tips">💡 Tips & Edukasi</option>
					<option value="alert">🚨 Waspada Penipuan</option>
					<option value="coordination">🗺️ Koordinasi Pencarian</option>
				</select>
			</div>
			
			<div class="form-group">
				<label for="postContent">Deskripsi Lengkap *</label>
				<textarea 
					id="postContent"
					bind:value={newPost.content}
					placeholder="Jelaskan detail kejadian, ciri-ciri barang, lokasi, waktu kejadian, dan informasi kontak Anda..."
					class="form-control"
					rows="4"
				></textarea>
			</div>
			
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
				<div class="form-group">
					<label for="postLocation">Lokasi Kejadian</label>
					<input 
						type="text"
						id="postLocation"
						bind:value={newPost.location}
						placeholder="Contoh: Mall Taman Anggrek, Jakarta Barat"
						class="form-control"
					/>
				</div>
				
				<div class="form-group">
					<label for="postItemType">Jenis Barang</label>
					<select 
						id="postItemType"
						bind:value={newPost.itemType}
						class="form-control"
					>
						<option value="">Pilih jenis barang</option>
						{#each itemTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>
				
				<div class="form-group">
					<label for="postStatus">Status</label>
					<select 
						id="postStatus"
						bind:value={newPost.status}
						class="form-control"
					>
						<option value="lost">🟥 Hilang</option>
						<option value="found">🟩 Ditemukan</option>
						<option value="searching">🟦 Proses pencarian</option>
					</select>
				</div>
				
				<div class="form-group">
					<label for="postQRCode">Kode QR (Opsional)</label>
					<input 
						type="text"
						id="postQRCode"
						bind:value={newPost.qrCode}
						placeholder="Masukkan kode QR jika tersedia"
						class="form-control"
					/>
				</div>
			</div>
			
			<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
				<button 
					class="btn btn-success" 
					on:click={submitPost}
					style="flex: 1; min-width: 120px;"
				>
					📤 Posting Sekarang
				</button>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); flex: 1; min-width: 120px;"
					on:click={toggleNewPostForm}
				>
					❌ Batal
				</button>
			</div>
		</div>
	{/if}
	
	<!-- Emergency Button -->
	<div style="text-align: center; margin-bottom: 2rem;">
		<button 
			class="btn" 
			style="background: linear-gradient(45deg, #e74c3c, #c0392b); padding: 15px 30px; font-size: 18px; font-weight: 600; border-radius: 30px; box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);"
			on:click={() => {
				newPost.title = '🚨 DARURAT: Barang baru hilang - Mohon bantu sebarkan!';
				newPost.category = 'lost';
				toggleNewPostForm();
			}}
		>
			🚨 Mode Darurat - Posting Instan
		</button>
		<p style="margin-top: 0.5rem; color: #718096; font-size: 14px;">Tombol cepat untuk membuat posting darurat yang langsung tersebar ke komunitas</p>
	</div>
	
	<!-- Search Results -->
	{#if showSearchResults}
		<div style="margin-bottom: 2rem;">
			<h3 style="margin-bottom: 1rem; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
				🔍 Hasil Pencarian ({searchResults.length} hasil)
			</h3>
			
			{#if searchResults.length > 0}
				<div style="display: flex; flex-direction: column; gap: 1.5rem;">
					{#each searchResults as post}
						<div class="card item-card" style="border-left: 6px solid {post.isUrgent ? '#e74c3c' : '#667eea'};">
							<div class="item-header">
								<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
									{#if post.isPinned}
										<span style="background: rgba(241, 196, 15, 0.2); color: #f39c12; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem; font-weight: 600;">📌 Pinned</span>
									{/if}
									{#if post.isUrgent}
										<span style="background: rgba(231, 76, 60, 0.2); color: #c0392b; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem; font-weight: 600;">🚨 DARURAT</span>
									{/if}
									<h3 class="item-title" style="font-size: 1.3rem; cursor: pointer;" on:click={() => viewPost(post)}>{post.title}</h3>
								</div>
								<div style="display: flex; gap: 0.5rem;">
									<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">📍 {post.location}</span>
									<span style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">📦 {post.itemType}</span>
									{#if post.qrCode}
										<span style="background: rgba(26, 188, 156, 0.1); color: #1abc9c; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">🪪 {post.qrCode}</span>
									{/if}
								</div>
							</div>
							
							<div class="item-info" style="margin-bottom: 1rem;">
								<p style="margin: 0; color: #4a5568;">{post.content.substring(0, 150)}{post.content.length > 150 ? '...' : ''}</p>
							</div>
							
							<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
								<div style="display: flex; align-items: center; gap: 1rem;">
									<span style="color: #718096; font-size: 0.9rem;">oleh {post.author} • {formatRelativeTime(post.timestamp)}</span>
								</div>
								
								<div style="display: flex; gap: 0.5rem;">
									<button 
										class="btn" 
										style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
										on:click={() => likePost(post.id)}
									>
										👍 {post.likes}
									</button>
									<button 
										class="btn" 
										style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
										on:click={() => viewPost(post)}
									>
										💬 {post.comments} Komentar
									</button>
									<button 
										class="btn" 
										style="background: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
										on:click={() => reportPost(post.id)}
									>
										🚩 Laporkan
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="alert alert-info">
					📭 Tidak ada hasil yang ditemukan untuk pencarian "{searchQuery}"
				</div>
			{/if}
		</div>
	{/if}
	
	<!-- Posts List -->
	<div>
		<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
			<h3 style="margin: 0; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
				{#if selectedCategory === 'all'}📋 Semua Posting{:/if}
				{#if selectedCategory === 'lost'}🔍 Laporan Kehilangan{:/if}
				{#if selectedCategory === 'found'}🧾 Laporan Penemuan{:/if}
				{#if selectedCategory === 'tips'}💡 Tips & Edukasi{:/if}
				{#if selectedCategory === 'success'}❤️ Cerita Sukses{:/if}
				{#if selectedCategory === 'alert'}🚨 Waspada Penipuan{:/if}
				{#if selectedCategory === 'coordination'}🗺️ Koordinasi Pencarian{:/if}
				({filterPostsByCategory().length} posting)
			</h3>
			<button 
				class="btn" 
				style="background: linear-gradient(45deg, #e74c3c, #c0392b); padding: 8px 16px; font-size: 14px; border-radius: 20px;"
				on:click={toggleSuccessStories}
			>
				❤️ Cerita Sukses
			</button>
		</div>
		
		{#if filterPostsByCategory().length > 0}
			<div style="display: flex; flex-direction: column; gap: 1.5rem;">
				<!-- Pinned Posts -->
				{#each filterPostsByCategory().filter(p => p.isPinned) as post}
					<div class="card item-card" style="border-left: 6px solid {post.isUrgent ? '#e74c3c' : '#f1c40f'}; background: rgba(241, 196, 15, 0.05);">
						<div class="item-header">
							<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
								<span style="background: rgba(241, 196, 15, 0.2); color: #f39c12; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem; font-weight: 600;">📌 Pinned</span>
								{#if post.isUrgent}
									<span style="background: rgba(231, 76, 60, 0.2); color: #c0392b; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem; font-weight: 600;">🚨 DARURAT</span>
								{/if}
								<h3 class="item-title" style="font-size: 1.3rem; cursor: pointer;" on:click={() => viewPost(post)}>{post.title}</h3>
							</div>
							<div style="display: flex; gap: 0.5rem;">
								<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">📍 {post.location}</span>
								<span style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">📦 {post.itemType}</span>
								{#if post.qrCode}
									<span style="background: rgba(26, 188, 156, 0.1); color: #1abc9c; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">🪪 {post.qrCode}</span>
								{/if}
								<span style="background: rgba(155, 89, 182, 0.1); color: #9b59b6; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">
									{#if post.status === 'lost'}🟥 Hilang{:/if}
									{#if post.status === 'found'}🟩 Ditemukan{:/if}
									{#if post.status === 'searching'}🟦 Proses pencarian{:/if}
								</span>
							</div>
						</div>
						
						<div class="item-info" style="margin-bottom: 1rem;">
							<p style="margin: 0; color: #4a5568;">{post.content.substring(0, 150)}{post.content.length > 150 ? '...' : ''}</p>
						</div>
						
						<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
							<div style="display: flex; align-items: center; gap: 1rem;">
								<span style="color: #718096; font-size: 0.9rem;">oleh {post.author} • {formatRelativeTime(post.timestamp)}</span>
								{#if post.isVerified}
									<span style="background: rgba(46, 204, 113, 0.2); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">✅ Terverifikasi</span>
								{/if}
							</div>
							
							<div style="display: flex; gap: 0.5rem;">
								<button 
									class="btn" 
									style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
									on:click={() => likePost(post.id)}
								>
									👍 {post.likes}
								</button>
								<button 
									class="btn" 
									style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
									on:click={() => viewPost(post)}
								>
									💬 {post.comments} Komentar
								</button>
								<button 
									class="btn" 
									style="background: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
									on:click={() => reportPost(post.id)}
								>
									🚩 Laporkan
								</button>
							</div>
						</div>
					</div>
				{/each}
				
				<!-- Regular Posts -->
				{#each filterPostsByCategory().filter(p => !p.isPinned) as post}
					<div class="card item-card" style="border-left: 6px solid {post.isUrgent ? '#e74c3c' : '#667eea'};">
						<div class="item-header">
							<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
								{#if post.isUrgent}
									<span style="background: rgba(231, 76, 60, 0.2); color: #c0392b; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem; font-weight: 600;">🚨 DARURAT</span>
								{/if}
								<h3 class="item-title" style="font-size: 1.3rem; cursor: pointer;" on:click={() => viewPost(post)}>{post.title}</h3>
							</div>
							<div style="display: flex; gap: 0.5rem;">
								<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">📍 {post.location}</span>
								<span style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">📦 {post.itemType}</span>
								{#if post.qrCode}
									<span style="background: rgba(26, 188, 156, 0.1); color: #1abc9c; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">🪪 {post.qrCode}</span>
								{/if}
								<span style="background: rgba(155, 89, 182, 0.1); color: #9b59b6; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">
									{#if post.status === 'lost'}🟥 Hilang{:/if}
									{#if post.status === 'found'}🟩 Ditemukan{:/if}
									{#if post.status === 'searching'}🟦 Proses pencarian{:/if}
								</span>
							</div>
						</div>
						
						<div class="item-info" style="margin-bottom: 1rem;">
							<p style="margin: 0; color: #4a5568;">{post.content.substring(0, 150)}{post.content.length > 150 ? '...' : ''}</p>
						</div>
						
						<!-- Media Gallery -->
						{#if post.media && post.media.length > 0}
							<div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; overflow-x: auto; padding: 0.5rem;">
								{#each post.media as media}
									<div style="min-width: 150px; height: 100px; border-radius: 10px; overflow: hidden;">
										<img src={media.url} alt={media.description} style="width: 100%; height: 100%; object-fit: cover;" />
									</div>
								{/each}
							</div>
						{/if}
						
						<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
							<div style="display: flex; align-items: center; gap: 1rem;">
								<span style="color: #718096; font-size: 0.9rem;">oleh {post.author} • {formatRelativeTime(post.timestamp)}</span>
								{#if post.isVerified}
									<span style="background: rgba(46, 204, 113, 0.2); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">✅ Terverifikasi</span>
								{/if}
								{#if post.tags && post.tags.length > 0}
									{#each post.tags.slice(0, 2) as tag}
										<span style="background: rgba(52, 152, 219, 0.1); color: #3498db; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">#{tag}</span>
									{/each}
								{/if}
							</div>
							
							<div style="display: flex; gap: 0.5rem;">
								<button 
									class="btn" 
									style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
									on:click={() => likePost(post.id)}
								>
									👍 {post.likes}
								</button>
								<button 
									class="btn" 
									style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
									on:click={() => viewPost(post)}
								>
									💬 {post.comments} Komentar
								</button>
								<button 
									class="btn" 
									style="background: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
									on:click={() => reportPost(post.id)}
								>
									🚩 Laporkan
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="alert alert-info">
				📭 Tidak ada posting dalam kategori ini.
			</div>
		{/if}
	</div>
</div>

<!-- Post Detail Modal -->
{#if selectedPost}
	<div style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; overflow-y: auto;">
		<div class="card" style="max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto;">
			<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(102, 126, 234, 0.2);">
				<h2 style="margin: 0; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 1.8rem;">
					{selectedPost.title}
				</h2>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); padding: 0.5rem; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"
					on:click={closePost}
				>
					❌
				</button>
			</div>
			
			<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
				<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">📍 {selectedPost.location}</span>
				<span style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">📦 {selectedPost.itemType}</span>
				{#if selectedPost.qrCode}
					<span style="background: rgba(26, 188, 156, 0.1); color: #1abc9c; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">🪪 {selectedPost.qrCode}</span>
				{/if}
				<span style="background: rgba(155, 89, 182, 0.1); color: #9b59b6; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">
					{#if selectedPost.status === 'lost'}🟥 Hilang{:/if}
					{#if selectedPost.status === 'found'}🟩 Ditemukan{:/if}
					{#if selectedPost.status === 'searching'}🟦 Proses pencarian{:/if}
				</span>
				{#if selectedPost.isVerified}
					<span style="background: rgba(46, 204, 113, 0.2); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">✅ Terverifikasi</span>
				{/if}
				{#if selectedPost.isPinned}
					<span style="background: rgba(241, 196, 15, 0.2); color: #f39c12; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">📌 Pinned</span>
				{/if}
				{#if selectedPost.isUrgent}
					<span style="background: rgba(231, 76, 60, 0.2); color: #c0392b; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">🚨 DARURAT</span>
				{/if}
			</div>
			
			<!-- Author Info -->
			<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1rem; background: rgba(102, 126, 234, 0.05); border-radius: 15px;">
				<div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(45deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">
					{selectedPost.author.charAt(0)}
				</div>
				<div>
					<h4 style="margin: 0 0 0.25rem 0;">{selectedPost.author}</h4>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<span style="background: rgba(241, 196, 15, 0.2); color: #f39c12; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">⭐ {selectedPost.authorReputation}</span>
						{#each selectedPost.authorBadges as badge}
							<span style="background: rgba(52, 152, 219, 0.2); color: #3498db; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">{badge}</span>
						{/each}
					</div>
				</div>
				<div style="margin-left: auto; color: #718096; font-size: 0.9rem;">
					{formatDate(selectedPost.timestamp)}
				</div>
			</div>
			
			<!-- Media Gallery -->
			{#if selectedPost.media && selectedPost.media.length > 0}
				<div style="margin-bottom: 1.5rem;">
					<h3 style="margin-bottom: 0.5rem; color: #667eea;">📸 Media & Bukti Pendukung</h3>
					<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
						{#each selectedPost.media as media}
							<div class="card" style="padding: 0; overflow: hidden;">
								<img src={media.url} alt={media.description} style="width: 100%; height: 150px; object-fit: cover;" />
								<div style="padding: 0.5rem;">
									<p style="margin: 0; font-size: 0.9rem;">{media.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Post Content -->
			<div style="margin-bottom: 1.5rem; line-height: 1.6;">
				<p>{selectedPost.content}</p>
			</div>
			
			<!-- Tags -->
			{#if selectedPost.tags && selectedPost.tags.length > 0}
				<div style="margin-bottom: 1.5rem;">
					<h3 style="margin-bottom: 0.5rem; color: #667eea;">🏷️ Tags</h3>
					<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
						{#each selectedPost.tags as tag}
							<span style="background: rgba(52, 152, 219, 0.1); color: #3498db; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.9rem;">#{tag}</span>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Post Actions -->
			<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
				<button 
					class="btn" 
					style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => likePost(selectedPost.id)}
				>
					👍 Like ({selectedPost.likes})
				</button>
				<button 
					class="btn" 
					style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => toggleFollowPost(selectedPost.id)}
				>
					{#if followedPosts.includes(selectedPost.id)}🔔 Following{:/if}
					{#if !followedPosts.includes(selectedPost.id)}🔔 Follow Post{:/if}
				</button>
				<button 
					class="btn" 
					style="background: rgba(241, 196, 15, 0.1); color: #f39c12; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => togglePinPost(selectedPost.id)}
				>
					{#if selectedPost.isPinned}📌 Unpin{:/if}
					{#if !selectedPost.isPinned}📌 Pin Post{:/if}
				</button>
				<button 
					class="btn" 
					style="background: rgba(155, 89, 182, 0.1); color: #9b59b6; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => changePostStatus(selectedPost.id, selectedPost.status === 'lost' ? 'found' : selectedPost.status === 'found' ? 'searching' : 'lost')}
				>
					🔄 Ubah Status
				</button>
				<button 
					class="btn" 
					style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => verifyPost(selectedPost.id)}
				>
					✅ Verifikasi
				</button>
				<button 
					class="btn" 
					style="background: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => reportPost(selectedPost.id)}
				>
					🚩 Laporkan
				</button>
				<button 
					class="btn" 
					style="background: rgba(52, 152, 219, 0.1); color: #3498db; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;"
					on:click={() => {
						if (selectedPost.coordinates) {
							window.open(`https://www.google.com/maps?q=${selectedPost.coordinates.lat},${selectedPost.coordinates.lng}`, '_blank');
						}
					}}
					disabled={!selectedPost.coordinates}
				>
					🧭 Buka di Google Maps
				</button>
			</div>
			
			<!-- Comments Section -->
			<div>
				<h3 style="margin-bottom: 1rem; color: #667eea;">💬 Kolom Komentar ({selectedPost.comments})</h3>
				
				<!-- Add Comment Form -->
				<div style="margin-bottom: 1.5rem;">
					<textarea 
						bind:value={newComment.content}
						placeholder="Tulis komentar Anda..."
						class="form-control"
						rows="3"
						style="margin-bottom: 0.5rem;"
					></textarea>
					<button 
						class="btn btn-success" 
						on:click={() => addComment(selectedPost.id)}
						style="padding: 0.5rem 1rem;"
					>
						📤 Kirim Komentar
					</button>
				</div>
				
				<!-- Comments List -->
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					{#if comments[selectedPost.id]}
						{#each comments[selectedPost.id] as comment}
							<div style="padding: 1rem; background: rgba(102, 126, 234, 0.05); border-radius: 15px; border-left: 4px solid #667eea;">
								<!-- Comment Header -->
								<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
									<div style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(45deg, #3498db, #2980b9); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.8rem;">
										{comment.author.charAt(0)}
									</div>
									<div>
										<strong>{comment.author}</strong>
										{#if comment.isVerified}
											<span style="background: rgba(46, 204, 113, 0.2); color: #27ae60; padding: 0.1rem 0.3rem; border-radius: 5px; font-size: 0.7rem; margin-left: 0.3rem;">✅</span>
										{/if}
									</div>
									<div style="margin-left: auto; color: #718096; font-size: 0.8rem;">
										{formatRelativeTime(comment.timestamp)}
									</div>
								</div>
								
								<!-- Comment Content -->
								<div style="margin-bottom: 0.5rem;">
									<p style="margin: 0;">{comment.content}</p>
								</div>
								
								<!-- Comment Actions -->
								<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
									<button 
										class="btn" 
										style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;"
										on:click={() => likeComment(selectedPost.id, comment.id)}
									>
										👍 {comment.likes}
									</button>
									
									<!-- Reactions -->
									<div style="display: flex; gap: 0.25rem;">
										{#each Object.entries(comment.reactions) as [reaction, count]}
											<span style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">
												{reaction} {count}
											</span>
										{/each}
									</div>
									
									<div style="display: flex; gap: 0.25rem;">
										<button 
											class="btn" 
											style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;"
											on:click={() => addReaction(selectedPost.id, comment.id, '👍')}
										>
											👍
										</button>
										<button 
											class="btn" 
											style="background: rgba(241, 196, 15, 0.1); color: #f39c12; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;"
											on:click={() => addReaction(selectedPost.id, comment.id, '🙏')}
										>
											🙏
										</button>
										<button 
											class="btn" 
											style="background: rgba(52, 152, 219, 0.1); color: #3498db; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;"
											on:click={() => addReaction(selectedPost.id, comment.id, '👀')}
										>
											👀
										</button>
									</div>
								</div>
								
								<!-- Replies -->
								{#if comment.replies && comment.replies.length > 0}
									<div style="margin-top: 1rem; padding-left: 1rem; border-left: 2px solid rgba(102, 126, 234, 0.2);">
										{#each comment.replies as reply}
											<div style="padding: 0.5rem; background: rgba(255, 255, 255, 0.5); border-radius: 10px; margin-bottom: 0.5rem;">
												<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
													<div style="width: 25px; height: 25px; border-radius: 50%; background: linear-gradient(45deg, #9b59b6, #8e44ad); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.7rem;">
														{reply.author.charAt(0)}
													</div>
													<div>
														<strong>{reply.author}</strong>
													</div>
													<div style="margin-left: auto; color: #718096; font-size: 0.7rem;">
														{formatRelativeTime(reply.timestamp)}
													</div>
												</div>
												<div>
													<p style="margin: 0; font-size: 0.9rem;">{reply.content}</p>
												</div>
												<div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
													<button 
														class="btn" 
														style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.1rem 0.3rem; border-radius: 10px; font-size: 0.7rem;"
														on:click={() => likeComment(selectedPost.id, reply.id)}
													>
														👍 {reply.likes}
													</button>
												</div>
											</div>
										{/each}
									</div>
								{/if}
								
								<!-- Reply Form -->
								<div style="margin-top: 0.5rem;">
									<input 
										type="text"
										placeholder="Balas komentar ini..."
										class="form-control"
										style="margin-bottom: 0.25rem; padding: 0.5rem;"
										on:keyup={(e) => {
											if (e.key === 'Enter') {
												addReply(selectedPost.id, comment.id, e.target.value);
												e.target.value = '';
											}
										}}
									/>
								</div>
							</div>
						{/each}
					{/if}
				</div>
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
	
	.item-card {
		transition: all 0.3s ease;
		border-left: 6px solid #667eea;
	}
	
	.item-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
	}
	
	.item-header {
		margin-bottom: 1rem;
	}
	
	.item-title {
		margin: 0 0 0.5rem 0;
		color: #2d3748;
		font-weight: 600;
	}
	
	.item-info {
		margin-bottom: 0.5rem;
		color: #4a5568;
		line-height: 1.5;
	}
	
	.alert {
		padding: 1rem;
		border-radius: 10px;
		text-align: center;
		font-weight: 500;
	}
	
	.alert-info {
		background: rgba(52, 152, 219, 0.1);
		color: #3498db;
		border: 1px solid rgba(52, 152, 219, 0.2);
	}
	
	.selected {
		background: linear-gradient(45deg, #667eea, #764ba2) !important;
		color: white !important;
	}
</style>