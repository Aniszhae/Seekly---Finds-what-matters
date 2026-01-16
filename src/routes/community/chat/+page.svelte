<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	// State variables
	let community = null;
	let messages = [];
	let newMessage = '';
	let currentUser = 'Pengguna'; // In a real app, this would come from auth
	let isLoading = true;
	
	// Sample community data (in a real app, this would be fetched from store/API)
	const sampleCommunities = [
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
			rating: 4.8
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
			rating: 4.9
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
			rating: 4.7
		}
	];
	
	// Sample messages data
	const sampleMessages = [
		{
			id: 'msg-1',
			sender: 'Admin Komunitas',
			message: 'Selamat datang di grup chat komunitas! Silakan perkenalkan diri Anda.',
			timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
			isAdmin: true
		},
		{
			id: 'msg-2',
			sender: 'Budi Santoso',
			message: 'Halo semua, saya baru saja bergabung. Saya kehilangan kunci motor di daerah Pondok Indah minggu lalu.',
			timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
			isAdmin: false
		},
		{
			id: 'msg-3',
			sender: 'Siti Rahmawati',
			message: 'Hai Budi, saya anggota komunitas ini. Mungkin bisa bantu cari di sekitar lokasi yang kamu sebutkan?',
			timestamp: new Date(Date.now() - 1200000).toISOString(), // 20 minutes ago
			isAdmin: false
		},
		{
			id: 'msg-4',
			sender: 'Admin Komunitas',
			message: 'Terima kasih atas partisipasi semua. Jangan lupa untuk selalu update jika ada perkembangan.',
			timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
			isAdmin: true
		}
	];
	
	// Initialize
	onMount(() => {
		// Get community ID from URL params
		const urlParams = new URLSearchParams(window.location.search);
		const communityId = urlParams.get('id') || 'community-1';
		
		// Find community by ID
		community = sampleCommunities.find(c => c.id === communityId) || sampleCommunities[0];
		
		// Load messages
		messages = [...sampleMessages];
		
		isLoading = false;
		
		// Scroll to bottom
		setTimeout(scrollToBottom, 100);
	});
	
	function scrollToBottom() {
		const chatContainer = document.querySelector('.chat-messages');
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
	
	function sendMessage() {
		if (!newMessage.trim()) return;
		
		const message = {
			id: `msg-${Date.now()}`,
			sender: currentUser,
			message: newMessage.trim(),
			timestamp: new Date().toISOString(),
			isAdmin: false
		};
		
		messages = [...messages, message];
		newMessage = '';
		
		// Scroll to bottom after a short delay
		setTimeout(scrollToBottom, 100);
		
		// Simulate admin response for demo
		if (Math.random() > 0.7) {
			setTimeout(() => {
				const adminResponse = {
					id: `msg-${Date.now()}`,
					sender: 'Admin Komunitas',
					message: getRandomAdminResponse(),
					timestamp: new Date().toISOString(),
					isAdmin: true
				};
				messages = [...messages, adminResponse];
				setTimeout(scrollToBottom, 100);
			}, 2000 + Math.random() * 3000);
		}
	}
	
	function getRandomAdminResponse() {
		const responses = [
			'Terima kasih atas partisipasi Anda dalam komunitas ini.',
			'Kami akan bantu sebarkan informasi ini ke anggota komunitas.',
			'Jika ada perkembangan, kami akan segera memberitahukan.',
			'Terima kasih sudah aktif berpartisipasi di komunitas ini.',
			'Pastikan Anda selalu update informasi terbaru di grup ini.'
		];
		return responses[Math.floor(Math.random() * responses.length)];
	}
	
	function formatTime(timestamp) {
		const date = new Date(timestamp);
		const now = new Date();
		const diffInMs = now - date;
		const diffInMins = Math.floor(diffInMs / (1000 * 60));
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		
		if (diffInMins < 1) return 'Baru saja';
		if (diffInMins < 60) return `${diffInMins}m`;
		if (diffInHours < 24) return `${diffInHours}j`;
		
		return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
	}
	
	function handleKeyPress(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<svelte:head>
	<title>Chat Komunitas - {community?.name || 'Seekly'}</title>
</svelte:head>

<div class="chat-container">
	<!-- Chat Header -->
	<div class="chat-header">
		<a href="/community" class="back-button">
			←
		</a>
		<div class="community-info">
			<h1 class="community-name">{community?.name || 'Komunitas'}</h1>
			<p class="member-count">{community?.memberCount?.toLocaleString() || 0} anggota</p>
		</div>
		<div class="header-actions">
			<button class="action-button">
				⋯
			</button>
		</div>
	</div>
	
	<!-- Chat Messages -->
	{#if isLoading}
		<div class="loading-container">
			<div class="spinner"></div>
			<p>Memuat percakapan...</p>
		</div>
	{:else}
		<div class="chat-messages">
			{#each messages as message}
				<div class="message-row {message.isAdmin ? 'admin' : 'user'}">
					<div class="message-content">
						<div class="message-sender">
							{message.sender}
							{#if message.isAdmin}
								<span class="admin-badge">Admin</span>
							{/if}
						</div>
						<div class="message-bubble {message.isAdmin ? 'admin' : 'user'}">
							<p class="message-text">{message.message}</p>
						</div>
						<div class="message-time">
							{formatTime(message.timestamp)}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	
	<!-- Message Input -->
	<div class="input-container">
		<textarea
			bind:value={newMessage}
			on:keydown={handleKeyPress}
			placeholder="Ketik pesan Anda..."
			class="message-input"
			rows="1"
		></textarea>
		<button
			on:click={sendMessage}
			disabled={!newMessage.trim()}
			class="send-button {!newMessage.trim() ? 'disabled' : ''}"
		>
			<svg class="send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
			</svg>
		</button>
	</div>
</div>

<style>
	.chat-container {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 2rem);
		max-width: 1000px;
		margin: 0 auto;
		background: white;
		border-radius: 20px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	
	.chat-header {
		display: flex;
		align-items: center;
		padding: 1rem 1.5rem;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.back-button {
		font-size: 1.5rem;
		color: white;
		text-decoration: none;
		margin-right: 1rem;
		padding: 0.5rem;
		border-radius: 50%;
		transition: background-color 0.2s ease;
	}
	
	.back-button:hover {
		background: rgba(255, 255, 255, 0.1);
	}
	
	.community-info {
		flex: 1;
	}
	
	.community-name {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 250px;
	}
	
	.member-count {
		font-size: 0.875rem;
		opacity: 0.9;
		margin: 0;
	}
	
	.header-actions {
		margin-left: 1rem;
	}
	
	.action-button {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		font-size: 1.25rem;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	
	.action-button:hover {
		background: rgba(255, 255, 255, 0.2);
	}
	
	.loading-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: #718096;
	}
	
	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(102, 126, 234, 0.2);
		border-top: 4px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		background: #f9f9fb;
	}
	
	.message-row {
		display: flex;
		width: 100%;
	}
	
	.message-row.admin {
		justify-content: flex-start;
	}
	
	.message-row.user {
		justify-content: flex-end;
	}
	
	.message-content {
		max-width: 75%;
		display: flex;
		flex-direction: column;
	}
	
	.message-sender {
		font-size: 0.75rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.admin-badge {
		background: #667eea;
		color: white;
		padding: 0.125rem 0.5rem;
		border-radius: 20px;
		font-size: 0.625rem;
		font-weight: 600;
	}
	
	.message-bubble {
		padding: 0.75rem 1rem;
		border-radius: 18px;
		position: relative;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		word-wrap: break-word;
	}
	
	.message-bubble.admin {
		background: white;
		color: #2d3748;
		border-bottom-left-radius: 6px;
	}
	
	.message-bubble.user {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border-bottom-right-radius: 6px;
	}
	
	.message-text {
		margin: 0;
		line-height: 1.5;
	}
	
	.message-time {
		font-size: 0.75rem;
		margin-top: 0.25rem;
		opacity: 0.7;
	}
	
	.input-container {
		display: flex;
		align-items: flex-end;
		padding: 1rem 1.5rem;
		background: white;
		border-top: 1px solid #e2e8f0;
		gap: 0.75rem;
	}
	
	.message-input {
		flex: 1;
		padding: 0.75rem 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 20px;
		font-size: 1rem;
		transition: all 0.3s ease;
		resize: none;
		font-family: 'Poppins', sans-serif;
		background: #f7fafc;
		max-height: 120px;
	}
	
	.message-input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
		background: white;
	}
	
	.send-button {
		width: 44px;
		height: 44px;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		border-radius: 50%;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}
	
	.send-button:hover:not(.disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
	}
	
	.send-button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}
	
	.send-icon {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}
	
	@media (max-width: 768px) {
		.chat-container {
			height: 100vh;
			border-radius: 0;
		}
		
		.community-name {
			font-size: 1.125rem;
			max-width: 180px;
		}
		
		.message-content {
			max-width: 85%;
		}
		
		.message-bubble {
			padding: 0.625rem 0.875rem;
		}
	}
</style>