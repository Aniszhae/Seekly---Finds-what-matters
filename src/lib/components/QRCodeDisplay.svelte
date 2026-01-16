<script>
	import { onMount } from 'svelte';
	
	export let qrCode;
	export let referenceNumber;
	
	let qrCanvas;
	let showQR = false;
	
	onMount(() => {
		generateQR();
	});
	
	function generateQR() {
		if (!qrCanvas) return;
		
		// Simple QR-like pattern for demo (in real app, use QR library like qrcode.js)
		const ctx = qrCanvas.getContext('2d');
		const size = 200;
		const moduleSize = size / 25;
		
		// Clear canvas
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, size, size);
		
		// Generate pattern based on reference number
		ctx.fillStyle = '#000000';
		
		// Create a pseudo-QR pattern
		for (let i = 0; i < 25; i++) {
			for (let j = 0; j < 25; j++) {
				// Create pattern based on reference number and position
				const seed = referenceNumber.charCodeAt(i % referenceNumber.length) + i + j;
				if (seed % 3 === 0) {
					ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
				}
			}
		}
		
		// Add corner squares (typical QR code feature)
		drawCornerSquare(ctx, 0, 0, moduleSize);
		drawCornerSquare(ctx, 18 * moduleSize, 0, moduleSize);
		drawCornerSquare(ctx, 0, 18 * moduleSize, moduleSize);
	}
	
	function drawCornerSquare(ctx, x, y, moduleSize) {
		// Outer square
		ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize);
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize);
		ctx.fillStyle = '#000000';
		ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
	}
	
	function downloadQR() {
		if (!qrCanvas) return;
		
		const link = document.createElement('a');
		link.download = `qr-code-${referenceNumber}.png`;
		link.href = qrCanvas.toDataURL();
		link.click();
	}
	
	function printQR() {
		const printWindow = window.open('', '_blank');
		if (!printWindow) return;
		
		const qrDataUrl = qrCanvas.toDataURL();
		
		printWindow.document.write(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>QR Code - ${referenceNumber}</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						text-align: center;
						padding: 20px;
					}
					.qr-container {
						border: 2px solid #333;
						padding: 20px;
						display: inline-block;
						margin: 20px;
					}
					.qr-code {
						border: 1px solid #ccc;
						margin: 10px 0;
					}
					.reference {
						font-size: 18px;
						font-weight: bold;
						margin: 10px 0;
					}
					.instructions {
						font-size: 12px;
						color: #666;
						margin-top: 15px;
						max-width: 300px;
						margin-left: auto;
						margin-right: auto;
					}
				</style>
			</head>
			<body>
				<div class="qr-container">
					<h2>QR Code Laporan Barang Hilang</h2>
					<img src="${qrDataUrl}" alt="QR Code" class="qr-code" />
					<div class="reference">${referenceNumber}</div>
					<div class="instructions">
						Scan QR Code ini untuk mengakses status laporan secara cepat.
						Simpan kode ini sebagai referensi.
					</div>
				</div>
			</body>
			</html>
		`);
		
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
		printWindow.close();
	}
	
	function copyToClipboard() {
		const url = `${window.location.origin}/status?ref=${referenceNumber}`;
		navigator.clipboard.writeText(url).then(() => {
			alert('Link status berhasil disalin ke clipboard!');
		}).catch(() => {
			// Fallback for browsers that don't support clipboard API
			const textArea = document.createElement('textarea');
			textArea.value = url;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			alert('Link status berhasil disalin!');
		});
	}
	
	function shareStatus() {
		const url = `${window.location.origin}/status?ref=${referenceNumber}`;
		const text = `Status Laporan Barang Hilang ${referenceNumber}`;
		
		if (navigator.share) {
			navigator.share({
				title: text,
				text: 'Cek status laporan barang hilang',
				url: url
			});
		} else {
			// Fallback - copy to clipboard
			copyToClipboard();
		}
	}
</script>

<div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all hover:shadow-lg">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-xl font-bold text-gray-900 flex items-center gap-3 whitespace-nowrap">
			<div class="p-2 bg-blue-100 rounded-lg flex-shrink-0">
				<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
				</svg>
			</div>
			<span class="truncate">QR Code & Akses Cepat</span>
		</h3>
		<button
			on:click={() => showQR = !showQR}
			class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 shadow-sm whitespace-nowrap"
		>
			{#if showQR}
				<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L3 3m6.88 6.88L21 21m-3.24-5.12a3 3 0 00-4.24-4.24l4.24 4.24z"></path>
				</svg>
				<span class="hidden sm:inline">Sembunyikan</span>
				<span class="sm:hidden">Sembunyi</span>
			{:else}
				<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
				</svg>
				<span class="hidden sm:inline">Tampilkan QR</span>
				<span class="sm:hidden">Tampil QR</span>
			{/if}
		</button>
	</div>
	
	{#if showQR}
		<div class="grid md:grid-cols-2 gap-8">
			<!-- QR Code -->
			<div class="text-center bg-gray-50 rounded-xl p-6">
				<div class="bg-white p-4 rounded-lg border-2 border-blue-300 inline-block shadow-md">
					<canvas
						bind:this={qrCanvas}
						width="200"
						height="200"
						class="border border-gray-300 rounded"
					></canvas>
				</div>
				
				<div class="mt-4 space-y-3">
					<p class="text-gray-700 flex items-center justify-center gap-2 font-medium">
						<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
						</svg>
						Scan untuk akses cepat ke status laporan
					</p>
					<p class="font-mono text-sm text-gray-600 bg-white px-3 py-2 rounded-lg inline-block border border-gray-200">
						{referenceNumber}
					</p>
				</div>
				
				<!-- QR Actions -->
				<div class="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
					<button
						on:click={downloadQR}
						class="px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Download PNG
					</button>
					<button
						on:click={printQR}
						class="px-4 py-2.5 text-sm font-semibold bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
						</svg>
						Cetak QR
					</button>
				</div>
			</div>
			
			<!-- Quick Actions -->
			<div class="space-y-6">
				<div class="bg-blue-50 rounded-xl p-5 border border-blue-100">
					<h4 class="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
						<div class="p-1.5 bg-blue-500 rounded-lg">
							<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
							</svg>
						</div>
						Akses Cepat
					</h4>
					<div class="space-y-3">
						<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div class="flex items-center gap-3">
								<div class="p-2 bg-blue-100 rounded-lg">
									<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
									</svg>
								</div>
								<div>
									<p class="font-semibold text-gray-900">Nomor Referensi</p>
									<p class="text-sm text-gray-600 font-mono">{referenceNumber}</p>
								</div>
							</div>
							<button
								on:click={() => navigator.clipboard.writeText(referenceNumber)}
								class="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
								title="Salin Nomor Referensi"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"></path>
								</svg>
							</button>
						</div>
						
						<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div class="flex items-center gap-3">
								<div class="p-2 bg-green-100 rounded-lg">
									<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.102m-.758 4.899L21 12H3"></path>
									</svg>
								</div>
								<div>
									<p class="font-semibold text-gray-900">Link Status</p>
									<p class="text-sm text-gray-600 truncate max-w-[150px]">/status?ref={referenceNumber}</p>
								</div>
							</div>
							<button
								on:click={copyToClipboard}
								class="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
								title="Salin Link Status"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.102m-.758 4.899L21 12H3"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
				
				<div class="bg-purple-50 rounded-xl p-5 border border-purple-100">
					<h4 class="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
						<div class="p-1.5 bg-purple-500 rounded-lg">
							<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
							</svg>
						</div>
						Bagikan Laporan
					</h4>
					<div class="grid grid-cols-2 gap-3">
						<button
							on:click={shareStatus}
							class="px-4 py-2.5 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
							</svg>
							Share
						</button>
						<button
							on:click={() => {
								const mailBody = `Status laporan barang hilang dapat dilihat di: ${window.location.origin}/status?ref=${referenceNumber}`;
								window.location.href = `mailto:?subject=Status Laporan ${referenceNumber}&body=${encodeURIComponent(mailBody)}`;
							}}
							class="px-4 py-2.5 text-sm font-semibold bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-md"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
							Email
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<!-- QR Instructions -->
		<div class="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
			<h4 class="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
				<div class="p-1 bg-blue-500 rounded-full">
					<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
					</svg>
				</div>
				Cara Menggunakan QR Code:
			</h4>
			<ul class="text-gray-700 space-y-2">
				<li class="flex items-start gap-3">
					<span class="mt-1 flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
					<span>Buka aplikasi kamera bawaan ponsel atau aplikasi QR scanner</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
					<span>Arahkan kamera ke QR code di atas hingga terdeteksi</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
					<span>Tap notifikasi yang muncul untuk membuka link status laporan</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
					<span>Simpan screenshot QR code untuk akses di kemudian hari</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
					<span>Bagikan QR code kepada keluarga untuk tracking bersama</span>
				</li>
			</ul>
		</div>
	{:else}
		<div class="text-center py-10">
			<div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-5">
				<svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
				</svg>
			</div>
			<h3 class="text-xl font-bold text-gray-900 mb-2">Akses Cepat dengan QR Code</h3>
			<p class="text-gray-600 mb-6 max-w-md mx-auto">QR Code memungkinkan Anda mengakses status laporan secara instan tanpa perlu mengetik nomor referensi</p>
			<button
				on:click={() => showQR = true}
				class="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto font-semibold shadow-lg"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
				</svg>
				Tampilkan QR Code & Akses Cepat
			</button>
		</div>
	{/if}
</div>