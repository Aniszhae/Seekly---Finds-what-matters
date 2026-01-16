<script>
	import { createEventDispatcher } from 'svelte';
	
	export let reportId;
	export let evidence = [];
	
	const dispatch = createEventDispatcher();
	
	let fileInput;
	let dragOver = false;
	let uploading = false;
	let previewMode = false;
	let selectedEvidence = null;
	
	const maxFileSize = 10 * 1024 * 1024; // 10MB
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
	
	function handleFileSelect(event) {
		const files = Array.from(event.target.files || event.dataTransfer?.files || []);
		uploadFiles(files);
	}
	
	function handleDrop(event) {
		event.preventDefault();
		dragOver = false;
		handleFileSelect(event);
	}
	
	function handleDragOver(event) {
		event.preventDefault();
		dragOver = true;
	}
	
	function handleDragLeave() {
		dragOver = false;
	}
	
	async function uploadFiles(files) {
		if (!files.length) return;
		
		uploading = true;
		
		for (const file of files) {
			if (!validateFile(file)) continue;
			
			try {
				// Simulate file upload (in real app, upload to server)
				const fileUrl = await simulateFileUpload(file);
				
				const newEvidence = {
					type: file.type.startsWith('image/') ? 'image' : 'video',
					url: fileUrl,
					description: `${file.type.startsWith('image/') ? 'Foto' : 'Video'} bukti tambahan`,
					uploadedBy: 'Pelapor' // In real app, get from auth
				};
				
				dispatch('newEvidence', newEvidence);
			} catch (error) {
				console.error('Upload failed:', error);
				alert('Gagal mengunggah file. Silakan coba lagi.');
			}
		}
		
		uploading = false;
		if (fileInput) fileInput.value = '';
	}
	
	function validateFile(file) {
		if (!allowedTypes.includes(file.type)) {
			alert(`Format file ${file.name} tidak didukung. Gunakan JPG, PNG, GIF, MP4, atau WebM.`);
			return false;
		}
		
		if (file.size > maxFileSize) {
			alert(`File ${file.name} terlalu besar. Maksimal 10MB.`);
			return false;
		}
		
		return true;
	}
	
	async function simulateFileUpload(file) {
		// Simulate upload delay
		await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
		
		// In real app, upload to server and return URL
		// For demo, create object URL
		return URL.createObjectURL(file);
	}
	
	function formatFileSize(bytes) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
	
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	
	function openPreview(evidenceItem) {
		selectedEvidence = evidenceItem;
		previewMode = true;
	}
	
	function closePreview() {
		previewMode = false;
		selectedEvidence = null;
	}
	
	function downloadEvidence(evidenceItem) {
		// In real app, this would download from server
		const link = document.createElement('a');
		link.href = evidenceItem.url;
		link.download = `evidence-${evidenceItem.id}`;
		link.click();
	}
	
	// Sort evidence by upload date (newest first)
	$: sortedEvidence = [...evidence].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
</script>

<div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all hover:shadow-lg">
	<h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 whitespace-nowrap">
		<div class="p-2 bg-amber-100 rounded-lg flex-shrink-0">
			<svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
			</svg>
		</div>
		<span class="truncate">Bukti Tambahan</span>
	</h3>
	
	<!-- Upload Area -->
	<div
		class="border-2 border-dashed rounded-xl p-8 mb-8 transition-all duration-300 
			{dragOver ? 'border-amber-400 bg-amber-50 shadow-inner' : 'border-gray-300 hover:border-amber-300'}"
		on:drop={handleDrop}
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
	>
		<div class="text-center">
			{#if uploading}
				<div class="flex flex-col items-center">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
					<p class="text-lg font-semibold text-gray-700">Mengunggah Bukti...</p>
					<p class="text-sm text-gray-500 mt-1">Harap tunggu sebentar</p>
				</div>
			{:else}
				<div class="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-2xl mb-5">
					<svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
					</svg>
				</div>
				<h4 class="text-xl font-bold text-gray-900 mb-2">Unggah Bukti Tambahan</h4>
				<p class="text-gray-600 mb-1">
					Drag & drop file atau klik tombol di bawah
				</p>
				<p class="text-sm text-gray-500 mb-6">
					Foto (JPG, PNG, GIF) atau Video (MP4, WebM) • Maksimal 10MB
				</p>

				<input
					bind:this={fileInput}
					type="file"
					multiple
					accept="image/*,video/*"
					on:change={handleFileSelect}
					class="hidden"
				/>
				
				<button
					on:click={() => fileInput?.click()}
					class="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-semibold flex items-center gap-2 mx-auto shadow-md"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
					</svg>
					Pilih File dari Perangkat
				</button>
			{/if}
		</div>
	</div>
	
	<!-- Evidence List -->
	{#if sortedEvidence.length === 0}
		<div class="text-center py-10">
			<div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-2xl mb-4">
				<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
				</svg>
			</div>
			<h4 class="text-lg font-semibold text-gray-900 mb-2">Belum Ada Bukti yang Diunggah</h4>
			<p class="text-gray-600 max-w-md mx-auto">Unggah foto atau video untuk membantu proses pencarian barang Anda. Bukti visual dapat mempercepat penemuan barang.</p>
		</div>
	{:else}
		<div class="space-y-6">
			<div class="flex items-center justify-between">
				<h4 class="text-lg font-bold text-gray-900">Bukti yang Diunggah <span class="bg-amber-100 text-amber-800 text-sm font-semibold px-2.5 py-0.5 rounded-full ml-2">({sortedEvidence.length})</span></h4>
				<p class="text-sm text-gray-500">Terbaru ditampilkan pertama</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each sortedEvidence as evidenceItem}
					<div class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-white">
						<div class="flex items-start gap-3">
							<!-- File Preview -->
							<div class="flex-shrink-0">
								{#if evidenceItem.type === 'image'}
									<img
										src={evidenceItem.url}
										alt="Evidence preview"
										class="w-12 h-12 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90"
										on:click={() => openPreview(evidenceItem)}
									/>
								{:else}
									<div 
										class="w-12 h-12 bg-red-100 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:opacity-90"
										on:click={() => openPreview(evidenceItem)}
									>
										<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
										</svg>
									</div>
								{/if}
							</div>
							
							<!-- File Info -->
							<div class="flex-1 min-w-0">
								<h5 class="font-semibold text-gray-900 truncate">{evidenceItem.description}</h5>
								<p class="text-xs text-gray-500 mt-1">
									Diunggah oleh {evidenceItem.uploadedBy} • {formatDate(evidenceItem.uploadedAt)}
								</p>
								<div class="flex gap-2 mt-2">
									<button
										on:click={() => openPreview(evidenceItem)}
										class="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
									>
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
										</svg>
										Lihat
									</button>
									<button
										on:click={() => downloadEvidence(evidenceItem)}
										class="text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
									>
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
										</svg>
										Download
									</button>
								</div>

							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<!-- Preview Modal -->
{#if previewMode && selectedEvidence}
	<div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
			<div class="flex items-center justify-between p-4 border-b border-gray-200">
				<h3 class="text-lg font-bold text-gray-900">Pratinjau Bukti</h3>
				<button
					on:click={closePreview}
					class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
			
			<div class="p-4 flex items-center justify-center bg-gray-900 max-h-[70vh]">
				{#if selectedEvidence.type === 'image'}
					<img
						src={selectedEvidence.url}
						alt="Evidence preview"
						class="max-h-[70vh] max-w-full object-contain"
					/>
				{:else}
					<video
						src={selectedEvidence.url}
						controls
						class="max-h-[70vh] max-w-full"
					></video>
				{/if}
			</div>
			
			<div class="p-4 border-t border-gray-200">
				<div class="flex items-center justify-between">
					<div>
						<h4 class="font-semibold text-gray-900">{selectedEvidence.description}</h4>
						<p class="text-sm text-gray-500">
							Diunggah oleh {selectedEvidence.uploadedBy} pada {formatDate(selectedEvidence.uploadedAt)}
						</p>
					</div>
					<button
						on:click={() => downloadEvidence(selectedEvidence)}
						class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
						</svg>
						Download
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}