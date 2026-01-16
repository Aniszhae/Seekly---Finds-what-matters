<script>
	// Test importing components
	import ProgressTracker from '$lib/components/ProgressTracker.svelte';
	import TimelineActivity from '$lib/components/TimelineActivity.svelte';
	import ChatSystem from '$lib/components/ChatSystem.svelte';
	
	let testData = {
		status: 'RECEIVED',
		referenceNumber: 'LI-2024-123456',
		description: 'Test item',
		location: 'Test location',
		dateLost: '2024-01-10',
		dateReported: '2024-01-11T08:30:00.000Z',
		reporterName: 'Test User',
		statusHistory: [
			{
				status: 'RECEIVED',
				date: '2024-01-11T08:30:00.000Z',
				notes: 'Laporan barang hilang telah diterima'
			}
		],
		comments: []
	};
</script>

<div class="card">
	<h2>Component Test</h2>
	<p>If you can see this page, the components are importing correctly.</p>
	
	<ProgressTracker reportData={testData} />
	
	<TimelineActivity statusHistory={testData.statusHistory} />
	
	<ChatSystem 
		reportId="test-123" 
		comments={testData.comments} 
	/>
</div>