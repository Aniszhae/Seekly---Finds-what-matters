<script>
	import { ITEM_STATUS, STATUS_CONFIG } from '$lib/store.js';
	
	export let reportData;
	
	const statusFlow = [
		ITEM_STATUS.RECEIVED,
		ITEM_STATUS.VERIFYING, 
		ITEM_STATUS.SEARCHING,
		ITEM_STATUS.FOUND,
		ITEM_STATUS.CLOSED
	];
	
	function getStepStatus(stepStatus) {
		const currentIndex = statusFlow.indexOf(reportData.status);
		const stepIndex = statusFlow.indexOf(stepStatus);
		
		if (stepIndex < currentIndex) return 'completed';
		if (stepIndex === currentIndex) return 'current';
		return 'pending';
	}
	
	function getProgressPercentage() {
		const currentIndex = statusFlow.indexOf(reportData.status);
		if (currentIndex === -1) return 0;
		return ((currentIndex + 1) / statusFlow.length) * 100;
	}
	
	function getStepNumber(stepStatus) {
		return statusFlow.indexOf(stepStatus) + 1;
	}
</script>

<div class="card">
	<h3 class="section-title">Progress Laporan</h3>
	
	<!-- Progress Bar -->
	<div class="progress-section">
		<div class="progress-header">
			<span class="progress-label">Progress</span>
			<span class="progress-percentage">{Math.round(getProgressPercentage())}%</span>
		</div>
		<div class="progress-bar">
			<div 
				class="progress-fill"
				style="width: {getProgressPercentage()}%"
			></div>
		</div>
	</div>
	
	<!-- Status Steps -->
	<div class="status-timeline">
		<!-- Connection Line -->
		<div class="timeline-connector"></div>
		
		{#each statusFlow as stepStatus, index}
			{@const status = getStepStatus(stepStatus)}
			{@const config = STATUS_CONFIG[stepStatus]}
			
			<div class="timeline-step">
				<!-- Step Circle -->
				<div class="step-circle {status}">
					{#if status === 'completed'}
						<svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
						</svg>
					{:else if status === 'current'}
						<span class="status-emoji">{config.icon}</span>
					{:else}
						<span class="step-number">{getStepNumber(stepStatus)}</span>
					{/if}
				</div>
				
				<!-- Step Content -->
				<div class="step-content">
					<div class="step-header">
						<div class="step-info">
							<h4 class="step-title {status}">
								{config.label}
							</h4>
							<p class="step-description">
								{#if stepStatus === ITEM_STATUS.RECEIVED}
									Laporan telah diterima dan akan diproses dalam 1-2 hari kerja
								{:else if stepStatus === ITEM_STATUS.VERIFYING}
									Tim sedang memverifikasi kelengkapan data dan informasi laporan
								{:else if stepStatus === ITEM_STATUS.SEARCHING}
									Tim security sedang mencari barang sesuai deskripsi yang diberikan
								{:else if stepStatus === ITEM_STATUS.FOUND}
									Barang telah ditemukan dan siap untuk diambil
								{:else if stepStatus === ITEM_STATUS.CLOSED}
									Laporan telah selesai dan ditutup
								{/if}
							</p>
						</div>
						
						<!-- Status Badge -->
						<div class="step-badge">
							{#if status === 'current'}
								<div class="badge current">
									<div class="pulse-dot"></div>
									<span class="badge-text">Aktif</span>
								</div>
							{:else if status === 'completed'}
								<div class="badge completed">
									<svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="badge-text">Selesai</span>
								</div>
							{/if}
						</div>
					</div>
					
					<!-- Time Information -->
					{#if reportData.statusHistory}
						{@const stepHistory = reportData.statusHistory.find(h => h.status === stepStatus)}
						{#if stepHistory}
							<div class="step-time">
								<span class="time-info">📅 {new Date(stepHistory.date).toLocaleDateString('id-ID', { 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit'
								})}</span>
								{#if stepHistory.notes}
									<p class="step-notes">{stepHistory.notes}</p>
								{/if}
							</div>
						{/if}
					{/if}
				</div>
			</div>
		{/each}
	</div>
	
	<!-- Special Status Handling -->
	{#if reportData.status === ITEM_STATUS.CANCELLED}
		<div class="alert alert-danger">
			<div class="alert-content">
				<span class="alert-icon">❌</span>
				<div class="alert-text">
					<h4 class="alert-title">Laporan Dibatalkan</h4>
					<p class="alert-message">Laporan ini telah dibatalkan oleh sistem atau admin.</p>
				</div>
			</div>
		</div>
	{/if}
	
	<!-- Estimated Time -->
	{#if reportData.status !== ITEM_STATUS.CLOSED && reportData.status !== ITEM_STATUS.CANCELLED}
		<div class="estimate-section">
			<h4 class="estimate-title">
				<span class="estimate-icon">⏱️</span>
				Estimasi Waktu
			</h4>
			<p class="estimate-text">
				{#if reportData.status === ITEM_STATUS.RECEIVED}
					Laporan akan diverifikasi dalam 1-2 hari kerja
				{:else if reportData.status === ITEM_STATUS.VERIFYING}
					Verifikasi akan selesai dalam 1-3 hari kerja
				{:else if reportData.status === ITEM_STATUS.SEARCHING}
					Pencarian aktif dilakukan, estimasi 3-7 hari kerja
				{:else if reportData.status === ITEM_STATUS.FOUND}
					Silakan hubungi security untuk pengambilan barang
				{/if}
			</p>
		</div>
	{/if}
</div>

<style>
	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 1.5rem;
	}

	.progress-section {
		margin-bottom: 2rem;
	}

	.progress-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.progress-label {
		font-size: 14px;
		color: #718096;
		font-weight: 500;
	}

	.progress-percentage {
		font-size: 14px;
		color: #718096;
		font-weight: 600;
	}

	.progress-bar {
		width: 100%;
		height: 8px;
		background: #e2e8f0;
		border-radius: 20px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(45deg, #667eea, #764ba2);
		border-radius: 20px;
		transition: width 0.5s ease;
		box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
	}

	.status-timeline {
		position: relative;
	}

	.timeline-connector {
		position: absolute;
		left: 1.5rem;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(to bottom, #e2e8f0 0%, #e2e8f0 100%);
		z-index: 1;
	}

	.timeline-step {
		position: relative;
		display: flex;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	.timeline-step:last-child {
		margin-bottom: 0;
	}

	.step-circle {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		border: 2px solid #e2e8f0;
		background: white;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.step-circle.completed {
		border-color: #2ecc71;
		background: #2ecc71;
		box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
	}

	.step-circle.current {
		border-color: #667eea;
		background: #667eea;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.check-icon {
		width: 1.5rem;
		height: 1.5rem;
		color: white;
	}

	.status-emoji {
		font-size: 1.25rem;
	}

	.step-number {
		font-size: 1.5rem;
		color: #a0aec0;
		font-weight: 600;
	}

	.step-content {
		flex: 1;
		margin-left: 1.5rem;
	}

	.step-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.step-info {
		flex: 1;
	}

	.step-title {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.step-title.current {
		color: #667eea;
	}

	.step-title.completed {
		color: #2ecc71;
	}

	.step-title.pending {
		color: #718096;
	}

	.step-description {
		color: #718096;
		font-size: 14px;
		line-height: 1.5;
	}

	.step-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
	}

	.badge.current {
		background: rgba(102, 126, 234, 0.1);
		color: #667eea;
	}

	.badge.completed {
		background: rgba(46, 204, 113, 0.1);
		color: #2ecc71;
	}

	.pulse-dot {
		width: 6px;
		height: 6px;
		background: #667eea;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.badge-icon {
		width: 1rem;
		height: 1rem;
	}

	.badge-text {
		font-size: 12px;
		font-weight: 600;
	}

	.step-time {
		margin-top: 0.75rem;
	}

	.time-info {
		font-size: 12px;
		color: #718096;
		font-weight: 500;
	}

	.step-notes {
		margin-top: 0.25rem;
		font-size: 12px;
		color: #4a5568;
		line-height: 1.4;
	}

	.alert {
		margin-top: 1.5rem;
		padding: 1rem;
		border-radius: 12px;
		border: 1px solid;
	}

	.alert-danger {
		background: rgba(231, 76, 60, 0.1);
		border-color: rgba(231, 76, 60, 0.3);
		color: #c53030;
	}

	.alert-content {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.alert-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.alert-title {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.alert-message {
		font-size: 14px;
		line-height: 1.5;
	}

	.estimate-section {
		margin-top: 1.5rem;
		padding: 1rem;
		background: rgba(102, 126, 234, 0.1);
		border: 1px solid rgba(102, 126, 234, 0.2);
		border-radius: 12px;
	}

	.estimate-title {
		color: #4c51bf;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.estimate-icon {
		font-size: 1.125rem;
	}

	.estimate-text {
		color: #553c9a;
		font-size: 14px;
		line-height: 1.5;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.step-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.timeline-connector {
			left: 1rem;
		}

		.step-circle {
			width: 2.5rem;
			height: 2.5rem;
		}

		.step-content {
			margin-left: 1rem;
		}
	}
</style>