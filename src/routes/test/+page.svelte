<script>
	import { lostItems, foundReports } from '$lib/store.js';
	import { onMount } from 'svelte';
	
	let lostItemsData = [];
	let foundItemsData = [];
	
	onMount(async () => {
		lostItemsData = await lostItems.getSorted();
		foundItemsData = await foundReports.getSorted();
	});
</script>

<div class="card">
	<h2>Test Page</h2>
	<p>If you can see this page, the stores are working correctly.</p>
	
	<h3>Lost Items Count: {lostItemsData.length}</h3>
	<h3>Found Items Count: {foundItemsData.length}</h3>
</div>