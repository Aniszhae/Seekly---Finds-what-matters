<script>
	import { STATUS_CONFIG } from '$lib/store.js';
	
	export let statusHistory = [];
	
	function formatDateTime(dateString) {
		const date = new Date(dateString);
		return {
			date: date.toLocaleDateString('id-ID', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			}),
			time: date.toLocaleTimeString('id-ID', { 
				hour: '2-digit', 
				minute: '2-digit' 
			})
		};
	}
	
	function getStatusIcon(status) {
		return STATUS_CONFIG[status]?.icon || '📝';
	}
	
	function getStatusColor(status) {
		return STATUS_CONFIG[status]?.color || '#6B7280';
	}
	
	function getRelativeTime(dateString) {
		const now = new Date();
		const date = new Date(dateString);
		const diffInMs = now - date;
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffInHours / 24);
		
		if (diffInHours < 1) {
			const diffInMins = Math.floor(diffInMs / (1000 * 60));
			return diffInMins < 1 ? 'Baru saja' : `${diffInMins} menit lalu`;
		} else if (diffInHours < 24) {
			return `${diffInHours} jam lalu`;
		} else if (diffInDays < 7) {
			return `${diffInDays} hari lalu`;
		} else {
			return formatDateTime(dateString).date;
		}
	}
	
	// Sort by date descending (newest first)
	$: sortedHistory = [...statusHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
</script>

<div class="card">
	<h3 class="section-title">
		<span class="title-icon">📋</span>
		Riwayat Aktivitas
	</h3>
	
	{#if sortedHistory.length === 0}
		<div class="empty-state">
			<span class="empty-icon">📝</span>
			<p class="empty-text">Belum ada aktivitas yang tercatat</p>
		</div>
	{:else}
		<div class="timeline-container">
			{#each sortedHistory as activity, index}
				{@const datetime = formatDateTime(activity.date)}
				{@const isLatest = index === 0}
				
				<div class="timeline-item {index < sortedHistory.length - 1 ? 'with-connector' : ''}">
					<!-- Activity Icon -->
					<div class="activity-icon" style="background-color: {getStatusColor(activity.status)}">
						{getStatusIcon(activity.status)}
					</div>
					
					<!-- Activity Content -->
					<div class="activity-content {isLatest ? 'latest' : ''}">
						<div class="activity-header">
							<div class="activity-info">
								<div class="activity-title-row">
									<h4 class="activity-title">
										{STATUS_CONFIG[activity.status]?.label || activity.status}
									</h4>
									{#if isLatest}
										<span class="latest-badge">Terbaru</span>
									{/if}
								</div>
								
								{#if activity.notes}
									<p class="activity-notes">{activity.notes}</p>
								{/if}
								
								<div class="activity-meta">
									<span class="meta-item">
										<svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
										</svg>
										{datetime.date}
									</span>
									<span class="meta-item">
										<svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										{datetime.time}
									</span>
									<span class="meta-separator">•</span>
									<span class="relative-time">{getRelativeTime(activity.date)}</span>
								</div>
							</div>
							
							<!-- Status Badge -->
							<div class="status-badge">
								<span class="status-badge-content" style="background-color: {getStatusColor(activity.status)}">
									{getStatusIcon(activity.status)} {STATUS_CONFIG[activity.status]?.label}
								</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<!-- Timeline Summary -->
		<div class="timeline-summary">
			<div class="summary-grid">
				<div class="summary-item">
					<div class="summary-number">{sortedHistory.length}</div>
					<div class="summary-label">Total Update</div>
				</div>
				<div class="summary-item">
					<div class="summary-number">
						{Math.ceil((new Date() - new Date(sortedHistory[sortedHistory.length - 1]?.date)) / (1000 * 60 * 60 * 24)) || 0}
					</div>
					<div class="summary-label">Hari Aktif</div>
				</div>
				<div class="summary-item">
					<div class="summary-number">
						{formatDateTime(sortedHistory[0]?.date).time || '-'}
					</div>
					<div class="summary-label">Update Terakhir</div>
				</div>
				<div class="summary-item">
					<div class="summary-number">
						{STATUS_CONFIG[sortedHistory[0]?.status]?.icon || '📝'}
					</div>
					<div class="summary-label">Status Saat Ini</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.title-icon {
		font-size: 1.125rem;
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

	.timeline-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.timeline-item {
		position: relative;
		padding-left: 2rem;
		padding-bottom: 1rem;
	}

	.timeline-item.with-connector::before {
		content: '';
		position: absolute;
		left: 0.75rem;
		top: 2rem;
		bottom: -1rem;
		width: 2px;
		background: linear-gradient(to bottom, #e2e8f0, #e2e8f0);
	}

	.activity-icon {
		position: absolute;
		left: -0.25rem;
		top: 0.25rem;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 2;
	}

	.activity-content {
		background: #f7fafc;
		border-radius: 12px;
		padding: 1rem;
		border: 1px solid #e2e8f0;
		transition: all 0.3s ease;
	}

	.activity-content.latest {
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
		background: rgba(102, 126, 234, 0.05);
		border-color: rgba(102, 126, 234, 0.3);
	}

	.activity-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.activity-info {
		flex: 1;
	}

	.activity-title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.activity-title {
		font-weight: 600;
		color: #2d3748;
		font-size: 16px;
	}

	.latest-badge {
		display: inline-flex;
		align-items: center;
		padding: 2px 8px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 600;
		background: rgba(102, 126, 234, 0.1);
		color: #667eea;
		border: 1px solid rgba(102, 126, 234, 0.2);
	}

	.activity-notes {
		color: #4a5568;
		font-size: 14px;
		margin-bottom: 0.75rem;
		line-height: 1.5;
	}

	.activity-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		font-size: 12px;
		color: #718096;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-weight: 500;
	}

	.meta-icon {
		width: 1rem;
		height: 1rem;
	}

	.meta-separator {
		color: #cbd5e1;
	}

	.relative-time {
		font-weight: 500;
	}

	.status-badge {
		display: flex;
		align-items: center;
		margin-left: 1rem;
	}

	.status-badge-content {
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 600;
		color: white;
		gap: 0.25rem;
	}

	.timeline-summary {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid #e2e8f0;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
		text-align: center;
	}

	.summary-item {
		background: #f7fafc;
		border-radius: 12px;
		padding: 0.75rem;
		border: 1px solid #e2e8f0;
		transition: all 0.3s ease;
	}

	.summary-item:hover {
		background: rgba(102, 126, 234, 0.05);
		border-color: rgba(102, 126, 234, 0.2);
		transform: translateY(-2px);
	}

	.summary-number {
		font-size: 1.125rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 0.25rem;
	}

	.summary-label {
		font-size: 12px;
		color: #718096;
		font-weight: 500;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.activity-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.status-badge {
			margin-left: 0;
			margin-top: 0.5rem;
		}

		.activity-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.summary-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.timeline-item {
			padding-left: 1.5rem;
		}

		.timeline-item.with-connector::before {
			left: 0.5rem;
		}

		.activity-icon {
			left: -0.5rem;
		}
	}
</style>