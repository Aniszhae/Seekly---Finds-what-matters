<script>
	import { onMount, onDestroy } from 'svelte';
	
	export let onScan = () => {};
	export let onClose = () => {};
	
	let videoElement;
	let stream;
	let isScanning = false;
	let scanResult = '';
	let errorMessage = '';
	
	// Initialize camera
	async function initCamera() {
		try {
			stream = await navigator.mediaDevices.getUserMedia({ 
				video: { facingMode: 'environment' } 
			});
			videoElement.srcObject = stream;
			isScanning = true;
			errorMessage = '';
			startScanning();
		} catch (err) {
			errorMessage = 'Gagal mengakses kamera. Pastikan izin kamera telah diberikan.';
			console.error('Camera error:', err);
		}
	}
	
	// Simulate QR scanning
	function startScanning() {
		if (!isScanning) return;
		
		// Simulate scanning process
		const scanInterval = setInterval(() => {
			if (!isScanning) {
				clearInterval(scanInterval);
				return;
			}
			
			// Random chance to "detect" a QR code
			if (Math.random() > 0.95) {
				scanResult = `QR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
				onScan(scanResult);
				stopScanning();
				clearInterval(scanInterval);
			}
		}, 500);
	}
	
	// Stop scanning
	function stopScanning() {
		isScanning = false;
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
		}
	}
	
	// Handle manual QR entry
	function handleManualEntry() {
		const manualCode = prompt('Masukkan kode QR secara manual:');
		if (manualCode) {
			onScan(manualCode);
			stopScanning();
		}
	}
	
	// Cleanup
	onMount(() => {
		initCamera();
	});
	
	onDestroy(() => {
		stopScanning();
	});
</script>

<div style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.9); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2000; padding: 1rem;">
	<div style="width: 100%; max-width: 500px; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);">
		<div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: linear-gradient(45deg, #667eea, #764ba2); color: white;">
			<h2 style="margin: 0; font-size: 1.5rem;">🪪 QR Scanner</h2>
			<button 
				on:click={onClose}
				style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;"
			>
				❌
			</button>
		</div>
		
		<div style="padding: 1.5rem;">
			{#if errorMessage}
				<div style="background: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; text-align: center;">
					{errorMessage}
				</div>
				
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #3498db, #2980b9); width: 100%; padding: 1rem; font-size: 1rem;"
					on:click={handleManualEntry}
				>
					✏️ Masukkan Kode QR Manual
				</button>
			{:else}
				<div style="position: relative; margin-bottom: 1.5rem;">
					<video 
						bind:this={videoElement}
						autoplay
						playsinline
						style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px; background: #000;"
					></video>
					
					{#if isScanning}
						<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none;">
							<div style="width: 200px; height: 200px; border: 3px solid #2ecc71; border-radius: 15px; animation: scanning 2s infinite;"></div>
						</div>
					{/if}
				</div>
				
				<div style="text-align: center; margin-bottom: 1.5rem;">
					<p style="color: #718096; margin-bottom: 0.5rem;">Arahkan kamera ke kode QR barang</p>
					{#if scanResult}
						<div style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 1rem; border-radius: 10px; font-weight: 600;">
							Kode terdeteksi: {scanResult}
						</div>
					{/if}
				</div>
				
				<div style="display: flex; gap: 1rem;">
					<button 
						class="btn" 
						style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); flex: 1; padding: 1rem; font-size: 1rem;"
						on:click={onClose}
					>
						❌ Batal
					</button>
					<button 
						class="btn" 
						style="background: linear-gradient(45deg, #3498db, #2980b9); flex: 1; padding: 1rem; font-size: 1rem;"
						on:click={handleManualEntry}
					>
						✏️ Manual
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@keyframes scanning {
		0% { transform: translateY(-100%); }
		50% { transform: translateY(100%); }
		100% { transform: translateY(-100%); }
	}
	
	.btn {
		border: none;
		border-radius: 15px;
		color: white;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}
</style>