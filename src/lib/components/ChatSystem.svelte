<script>
	import { createEventDispatcher } from 'svelte';
	
	export let reportId;
	export let comments = [];
	
	const dispatch = createEventDispatcher();
	
	let newMessage = '';
	let isTyping = false;
	let chatContainer;
	
	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
	
	function sendMessage() {
		if (!newMessage.trim()) return;
		
		const comment = {
			author: 'Pelapor', // In real app, this would come from auth
			message: newMessage.trim(),
			isAdmin: false
		};
		
		dispatch('newComment', comment);
		newMessage = '';
		
		// Simulate admin response for demo
		if (Math.random() > 0.7) {
			setTimeout(() => {
				const adminResponse = {
					author: 'Admin Security',
					message: getRandomAdminResponse(),
					isAdmin: true
				};
				dispatch('newComment', adminResponse);
			}, 2000 + Math.random() * 3000);
		}
		
		setTimeout(scrollToBottom, 100);
	}
	
	function getRandomAdminResponse() {
		const responses = [
			'Terima kasih atas informasi tambahan. Kami akan segera menindaklanjuti.',
			'Tim security sedang memverifikasi informasi yang Anda berikan.',
			'Kami akan memberikan update dalam 1-2 hari ke depan.',
			'Sudah kami catat. Jika ada perkembangan akan kami informasikan segera.',
			'Terima kasih. Kami akan koordinasi dengan tim terkait.'
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
	
	// Sort comments by timestamp
	$: sortedComments = [...comments].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
	
	// Auto-scroll when new messages arrive
	$: if (sortedComments.length > 0) {
		setTimeout(scrollToBottom, 100);
	}
</script>

<div class="card">
	<div class="chat-header">
		<h3 class="section-title">
			<span class="title-icon">💬</span>
			Chat dengan Admin
		</h3>
		<div class="online-status">
			<div class="status-dot"></div>
			<span class="status-text">Online</span>
		</div>
	</div>
	
	<!-- Chat Messages -->
	<div 
		bind:this={chatContainer}
		class="chat-container"
	>
		{#if sortedComments.length === 0}
			<div class="empty-chat">
				<span class="empty-icon">💭</span>
				<p class="empty-title">Belum ada percakapan</p>
				<p class="empty-subtitle">Mulai chat dengan mengirim pesan</p>
			</div>
		{:else}
			{#each sortedComments as comment}
				<div class="message-row {comment.isAdmin ? 'admin' : 'user'}">
					<div class="message-bubble">
						<!-- Message Bubble -->
						<div class="bubble {comment.isAdmin ? 'admin' : 'user'}">
							{#if comment.isAdmin}
								<div class="admin-header">
									<span class="admin-badge">👨‍💼 {comment.author}</span>
								</div>
							{/if}
							
							<p class="message-text">{comment.message}</p>
						</div>
						
						<!-- Message Info -->
						<div class="message-info {comment.isAdmin ? 'admin' : 'user'}">
							<span class="message-time">
								{formatTime(comment.timestamp)}
							</span>
							{#if !comment.isAdmin}
								<span class="message-status">✓</span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/if}
		
		<!-- Typing Indicator -->
		{#if isTyping}
			<div class="message-row admin">
				<div class="message-bubble">
					<div class="bubble admin typing">
						<div class="typing-indicator">
							<span class="typing-text">Admin sedang mengetik</span>
							<div class="typing-dots">
								<div class="dot"></div>
								<div class="dot"></div>
								<div class="dot"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
	
	<!-- Message Input -->
	<div class="input-section">
		<div class="input-container">
			<textarea
				bind:value={newMessage}
				on:keydown={handleKeyPress}
				placeholder="Ketik pesan Anda disini..."
				class="message-input"
				rows="2"
			></textarea>
		</div>
		<button
			on:click={sendMessage}
			disabled={!newMessage.trim()}
			class="send-btn {!newMessage.trim() ? 'disabled' : ''}"
		>
			<svg class="send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
			</svg>
			Kirim
		</button>
	</div>
	
	<!-- Chat Guidelines -->
	<div class="chat-guidelines">
		<h4 class="guidelines-title">Tips Chat:</h4>
		<ul class="guidelines-list">
			<li>• Berikan informasi yang jelas dan spesifik</li>
			<li>• Admin online pada jam kerja (08:00 - 17:00)</li>
			<li>• Respons biasanya dalam 1-4 jam kerja</li>
			<li>• Gunakan bahasa yang sopan dan profesional</li>
		</ul>
	</div>
	
	<!-- Quick Actions -->
	<div class="quick-actions">
		<h4 class="quick-title">Pesan Cepat:</h4>
		<div class="quick-buttons">
			{#each ['Bagaimana progress pencarian?', 'Ada update terbaru?', 'Kapan bisa diambil?', 'Terima kasih'] as quickMessage}
				<button
					on:click={() => { newMessage = quickMessage; }}
					class="quick-btn"
				>
					{quickMessage}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar */
	.overflow-y-auto::-webkit-scrollbar {
		width: 6px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-track {
		background: #f1f5f9;
		border-radius: 3px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 3px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}
	
	/* Typing animation */
	@keyframes bounce {
		0%, 80%, 100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.title-icon {
		font-size: 1.125rem;
	}

	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.online-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: #10b981;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.status-text {
		font-size: 14px;
		color: #718096;
		font-weight: 500;
	}

	.chat-container {
		height: 300px;
		overflow-y: auto;
		margin-bottom: 1rem;
		padding: 1rem;
		background: #f7fafc;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.empty-chat {
		text-align: center;
		padding: 2rem 1rem;
		color: #718096;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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

	.message-bubble {
		max-width: 320px;
		display: flex;
		flex-direction: column;
	}

	.bubble {
		padding: 12px 16px;
		border-radius: 18px;
		position: relative;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.bubble.admin {
		background: white;
		border: 1px solid #e2e8f0;
		color: #2d3748;
		border-bottom-left-radius: 6px;
	}

	.bubble.user {
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		border-bottom-right-radius: 6px;
	}

	.message-input {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid #e2e8f0;
		border-radius: 12px;
		font-size: 14px;
		transition: all 0.3s ease;
		resize: none;
		font-family: 'Poppins', sans-serif;
		background: white;
	}

	.message-input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.send-btn {
		padding: 10px 14px;
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		border: none;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 13px;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.send-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
	}

	.send-btn.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.send-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.input-section {
		display: flex;
		gap: 0.75rem;
		align-items: flex-end;
	}

	.input-container {
		flex: 1;
	}

	.chat-guidelines {
		margin-top: 1rem;
		padding: 0.75rem;
		background: rgba(102, 126, 234, 0.05);
		border: 1px solid rgba(102, 126, 234, 0.2);
		border-radius: 12px;
	}

	.quick-actions {
		margin-top: 1rem;
	}

	.quick-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.quick-btn {
		padding: 6px 12px;
		font-size: 12px;
		background: #f7fafc;
		color: #4a5568;
		border: 1px solid #e2e8f0;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.quick-btn:hover {
		background: rgba(102, 126, 234, 0.1);
		color: #667eea;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-bounce {
		animation: bounce 1.4s infinite;
	}
</style>