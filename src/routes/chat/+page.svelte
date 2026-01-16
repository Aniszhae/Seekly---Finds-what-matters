<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let recipientName = '';
	let itemName = '';
	let messages = [];
	let newMessage = '';
	let chatContainer;
	
	onMount(() => {
		recipientName = $page.url.searchParams.get('name') || 'Pelapor';
		itemName = $page.url.searchParams.get('item') || 'Barang';
		
		// Initial automated message
		messages = [
			{
				id: 1,
				sender: 'system',
				text: `Anda sekarang terhubung dengan ${recipientName} terkait barang "${itemName}".`,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			},
			{
				id: 2,
				sender: 'them',
				text: `Halo! Saya adalah pelapor barang ${itemName}. Ada yang bisa saya bantu?`,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			}
		];
		
		scrollToBottom();
	});
	
	function sendMessage() {
		if (newMessage.trim() === '') return;
		
		const msg = {
			id: messages.length + 1,
			sender: 'me',
			text: newMessage,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		};
		
		messages = [...messages, msg];
		newMessage = '';
		
		scrollToBottom();
		
		// Simulate response
		setTimeout(() => {
			const reply = {
				id: messages.length + 1,
				sender: 'them',
				text: 'Baik, saya mengerti. Kapan kita bisa bertemu untuk serah terima?',
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			};
			messages = [...messages, reply];
			scrollToBottom();
		}, 1000);
	}
	
	function scrollToBottom() {
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 50);
	}
	
	function handleKeydown(e) {
		if (e.key === 'Enter') {
			sendMessage();
		}
	}
</script>

<svelte:head>
	<title>Chat dengan {recipientName} - Seekly</title>
</svelte:head>

<div class="chat-wrapper">
	<div class="chat-header">
		<button class="back-btn" on:click={() => window.history.back()}>←</button>
		<div class="user-info">
			<div class="avatar">{recipientName[0]}</div>
			<div class="details">
				<h3>{recipientName}</h3>
				<p>Terkait: {itemName}</p>
			</div>
		</div>
		<div class="header-actions">
			<button title="Panggilan Suara">📞</button>
			<button title="Panggilan Video">📹</button>
		</div>
	</div>

	<div class="chat-messages" bind:this={chatContainer}>
		{#each messages as msg}
			{#if msg.sender === 'system'}
				<div class="system-message">
					<span>{msg.text}</span>
				</div>
			{:else}
				<div class="message {msg.sender}">
					<div class="bubble">
						<p>{msg.text}</p>
						<span class="time">{msg.time}</span>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<div class="chat-input-area">
		<button class="attach-btn">+</button>
		<input 
			type="text" 
			bind:value={newMessage} 
			placeholder="Ketik pesan..." 
			on:keydown={handleKeydown}
		/>
		<button class="send-btn" on:click={sendMessage} disabled={!newMessage.trim()}>
			<svg viewBox="0 0 24 24" width="24" height="24">
				<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
			</svg>
		</button>
	</div>
</div>

<style>
	:global(body) {
		background-color: #F3F4F6;
		margin: 0;
		padding: 0;
	}

	.chat-wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
		max-width: 600px;
		margin: 0 auto;
		background: #FFFFFF;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.chat-header {
		display: flex;
		align-items: center;
		padding: 1rem;
		background: #FFFFFF;
		border-bottom: 1px solid #E5E7EB;
		gap: 1rem;
	}

	.back-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #4B5563;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex: 1;
	}

	.avatar {
		width: 40px;
		height: 40px;
		background: #2563EB;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.25rem;
	}

	.details h3 {
		margin: 0;
		font-size: 1rem;
		color: #111827;
	}

	.details p {
		margin: 0;
		font-size: 0.75rem;
		color: #6B7280;
	}

	.header-actions {
		display: flex;
		gap: 0.5rem;
	}

	.header-actions button {
		background: #F3F4F6;
		border: none;
		padding: 0.5rem;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.25rem;
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: #F9FAFB;
	}

	.system-message {
		text-align: center;
		margin: 1rem 0;
	}

	.system-message span {
		background: #E5E7EB;
		color: #4B5563;
		font-size: 0.75rem;
		padding: 0.25rem 0.75rem;
		border-radius: 99px;
	}

	.message {
		display: flex;
		flex-direction: column;
	}

	.message.me {
		align-items: flex-end;
	}

	.message.them {
		align-items: flex-start;
	}

	.bubble {
		max-width: 80%;
		padding: 0.75rem 1rem;
		border-radius: 1.25rem;
		position: relative;
	}

	.me .bubble {
		background: #2563EB;
		color: white;
		border-bottom-right-radius: 0.25rem;
	}

	.them .bubble {
		background: #E5E7EB;
		color: #111827;
		border-bottom-left-radius: 0.25rem;
	}

	.bubble p {
		margin: 0;
		line-height: 1.4;
	}

	.time {
		font-size: 0.65rem;
		margin-top: 0.25rem;
		display: block;
		opacity: 0.7;
	}

	.chat-input-area {
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: white;
		border-top: 1px solid #E5E7EB;
	}

	.attach-btn {
		background: #F3F4F6;
		border: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		font-size: 1.5rem;
		color: #4B5563;
		cursor: pointer;
	}

	input {
		flex: 1;
		padding: 0.75rem 1rem;
		border: 1px solid #D1D5DB;
		border-radius: 99px;
		outline: none;
		font-size: 0.95rem;
	}

	input:focus {
		border-color: #2563EB;
	}

	.send-btn {
		background: #2563EB;
		color: white;
		border: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.send-btn:disabled {
		background: #93C5FD;
		cursor: not-allowed;
	}
</style>
