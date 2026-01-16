<script>
	import { createEventDispatcher } from 'svelte';
	
	export let notifications = [];
	
	const dispatch = createEventDispatcher();
	
	function getNotificationIcon(type) {
		switch (type) {
			case 'status_update': return '🔄';
			case 'new_comment': return '💬';
			case 'evidence_added': return '📎';
			case 'report_closed': return '✅';
			case 'admin_message': return '👨‍💼';
			default: return '📢';
		}
	}
	
	function formatDateTime(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diffInMs = now - date;
		const diffInMins = Math.floor(diffInMs / (1000 * 60));
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
		
		if (diffInMins < 1) return 'Baru saja';
		if (diffInMins < 60) return `${diffInMins} menit lalu`;
		if (diffInHours < 24) return `${diffInHours} jam lalu`;
		if (diffInDays < 7) return `${diffInDays} hari lalu`;
		
		return date.toLocaleDateString('id-ID', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
	
	function markAsRead(notificationId) {
		dispatch('markAsRead', notificationId);
	}
	
	// Sort notifications by timestamp (newest first)
	$: sortedNotifications = [...notifications].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
	$: unreadCount = notifications.filter(n => !n.isRead).length;
</script>

<div class="card">
	<div class="notification-header">
		<h3 class="section-title">
			<span class="title-icon">🔔</span>
			Notifikasi
		</h3>
		{#if unreadCount > 0}
			<span class="unread-badge">
				{unreadCount} belum dibaca
			</span>
		{/if}
	</div>
	
	{#if sortedNotifications.length === 0}
		<div class="empty-state">
			<span class="empty-icon">🔕</span>
			<p class="empty-text">Belum ada notifikasi</p>
		</div>
	{:else}
		<div class="notification-list">
			{#each sortedNotifications as notification}
				<div class="notification-item {notification.isRead ? 'read' : 'unread'}">
					<div class="notification-content">
						<!-- Notification Icon -->
						<div class="notification-icon">
							<span>{getNotificationIcon(notification.type)}</span>
						</div>
						
						<!-- Notification Text -->
						<div class="notification-text">
							<p class="notification-message {notification.isRead ? 'read' : 'unread'}">
								{notification.message}
							</p>
							
							<div class="notification-meta">
								<span class="notification-time">
									{formatDateTime(notification.timestamp)}
								</span>
								
								{#if !notification.isRead}
									<button
										on:click={() => markAsRead(notification.id)}
										class="mark-read-btn"
									>
										Tandai dibaca
									</button>
								{/if}
							</div>
						</div>
						
						<!-- Unread Indicator -->
						{#if !notification.isRead}
							<div class="unread-indicator"></div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		
		<!-- Notification Actions -->
		{#if unreadCount > 0}
			<div class="notification-actions">
				<button
					on:click={() => dispatch('markAllAsRead')}
					class="mark-all-btn"
				>
					Tandai semua sebagai dibaca
				</button>
			</div>
		{/if}
		
		<!-- Notification Settings -->
		<div class="notification-settings">
			<h4 class="settings-title">Pengaturan Notifikasi</h4>
			<div class="settings-options">
				<label class="setting-option">
					<input type="checkbox" checked class="setting-checkbox" />
					<span class="setting-label">Notifikasi perubahan status</span>
				</label>
				<label class="setting-option">
					<input type="checkbox" checked class="setting-checkbox" />
					<span class="setting-label">Notifikasi pesan baru</span>
				</label>
				<label class="setting-option">
					<input type="checkbox" class="setting-checkbox" />
					<span class="setting-label">Notifikasi email</span>
				</label>
			</div>
		</div>
	{/if}
</div>

<!-- Notification Sound (hidden audio element) -->
<audio id="notification-sound" preload="auto">
	<source src="/notification.mp3" type="audio/mpeg">
	<source src="/notification.wav" type="audio/wav">
</audio>

<style>
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

	.notification-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.unread-badge {
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	.empty-state {
		text-align: center;
		padding: 2rem 1rem;
		color: #718096;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		display: block;
	}

	.empty-text {
		font-size: 16px;
		color: #718096;
	}

	.notification-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-height: 400px;
		overflow-y: auto;
		padding-right: 4px;
	}

	.notification-item {
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 1rem;
		transition: all 0.3s ease;
		cursor: pointer;
		background: white;
	}

	.notification-item:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transform: translateY(-1px);
	}

	.notification-item.read {
		background: #f7fafc;
		border-color: #e2e8f0;
	}

	.notification-item.unread {
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
		border-color: rgba(102, 126, 234, 0.2);
	}

	.notification-content {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.notification-icon {
		flex-shrink: 0;
		font-size: 1.25rem;
	}

	.notification-text {
		flex: 1;
		min-width: 0;
	}

	.notification-message {
		font-size: 14px;
		line-height: 1.5;
		margin-bottom: 0.5rem;
	}

	.notification-message.unread {
		color: #2d3748;
		font-weight: 600;
	}

	.notification-message.read {
		color: #718096;
		font-weight: 400;
	}

	.notification-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.notification-time {
		font-size: 12px;
		color: #718096;
		font-weight: 500;
	}

	.mark-read-btn {
		font-size: 12px;
		color: #667eea;
		font-weight: 600;
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px 4px;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.mark-read-btn:hover {
		color: #553c9a;
		background: rgba(102, 126, 234, 0.1);
	}

	.unread-indicator {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		background: #667eea;
		border-radius: 50%;
		margin-top: 0.25rem;
	}

	.notification-actions {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e2e8f0;
	}

	.mark-all-btn {
		width: 100%;
		padding: 10px 16px;
		font-size: 14px;
		color: #667eea;
		background: rgba(102, 126, 234, 0.05);
		border: 1px solid rgba(102, 126, 234, 0.2);
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 500;
	}

	.mark-all-btn:hover {
		color: #553c9a;
		background: rgba(102, 126, 234, 0.1);
		border-color: rgba(102, 126, 234, 0.3);
	}

	.notification-settings {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e2e8f0;
	}

	.settings-title {
		font-size: 14px;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 0.75rem;
	}

	.settings-options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.setting-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		padding: 0.25rem 0;
	}

	.setting-checkbox {
		border-radius: 4px;
		border: 2px solid #d1d5db;
		color: #667eea;
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.setting-checkbox:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.setting-label {
		font-size: 14px;
		color: #4a5568;
		line-height: 1.4;
	}

	/* Custom scrollbar */
	.notification-list::-webkit-scrollbar {
		width: 6px;
	}

	.notification-list::-webkit-scrollbar-track {
		background: #f1f5f9;
		border-radius: 3px;
	}

	.notification-list::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 3px;
	}

	.notification-list::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.notification-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.notification-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.notification-list {
			max-height: 300px;
		}
	}
</style>