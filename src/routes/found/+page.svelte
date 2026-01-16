<script>
	import { foundReports } from '$lib/store.js';
	import { goto } from '$app/navigation';
	
	let formData = {
		itemName: '',
		description: '',
		photo: null,
		locationFound: '',
		dateFound: '',
		timeFound: '',
		reporterName: '',
		reporterPhone: '',
		reporterEmail: ''
	};
	
	let photoPreview = '';
	let isSubmitting = false;
	let showSuccess = false;
	let referenceNumber = '';
	let errors = {};
	
	// Location options
	const locationOptions = [
		'Universitas',
		'Mall/Pusat Perbelanjaan',
		'Stasiun/Terminal',
		'Rumah Sakit',
		'Kantor',
		'Sekolah',
		'Taman/Tempat Umum',
		'Transportasi Umum',
		'Restoran/Kafe',
		'Lainnya'
	];
	
	function validateForm() {
		errors = {};
		
		if (!formData.itemName.trim()) {
			errors.itemName = 'Nama barang wajib diisi';
		}
		
		if (!formData.description.trim()) {
			errors.description = 'Deskripsi barang wajib diisi';
		}
		
		if (!formData.photo) {
			errors.photo = 'Foto barang wajib diunggah';
		}
		
		if (!formData.locationFound.trim()) {
			errors.locationFound = 'Lokasi ditemukan wajib diisi';
		}
		
		if (!formData.dateFound) {
			errors.dateFound = 'Tanggal ditemukan wajib diisi';
		}
		
		if (!formData.timeFound) {
			errors.timeFound = 'Waktu ditemukan wajib diisi';
		}
		
		if (!formData.reporterName.trim()) {
			errors.reporterName = 'Nama pelapor wajib diisi';
		}
		
		if (!formData.reporterPhone.trim()) {
			errors.reporterPhone = 'Nomor telepon wajib diisi';
		} else if (!/^[\d\s\-\+\(\)]+$/.test(formData.reporterPhone)) {
			errors.reporterPhone = 'Format nomor telepon tidak valid';
		}
		
		if (!formData.reporterEmail.trim()) {
			errors.reporterEmail = 'Email wajib diisi';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reporterEmail)) {
			errors.reporterEmail = 'Format email tidak valid';
		}
		
		return Object.keys(errors).length === 0;
	}
	
	function handlePhotoUpload(event) {
		const file = event.target.files[0];
		
		if (file) {
			// Check file size (5MB limit)
			if (file.size > 5 * 1024 * 1024) {
				errors.photo = 'Ukuran file maksimal 5MB';
				return;
			}
			
			// Check file type
			if (!file.type.startsWith('image/')) {
				errors.photo = 'File harus berupa gambar';
				return;
			}
			
			// Clear photo error
			delete errors.photo;
			
			const reader = new FileReader();
			reader.onload = (e) => {
				photoPreview = e.target.result;
				formData.photo = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
	
	function getCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					formData.locationFound = `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
				},
				(error) => {
					console.error('Error getting location:', error);
					alert('Tidak dapat mengakses lokasi GPS');
				}
			);
		} else {
			alert('GPS tidak didukung di browser ini');
		}
	}
	
	function setCurrentDateTime() {
		const now = new Date();
		formData.dateFound = now.toISOString().split('T')[0];
		formData.timeFound = now.toTimeString().split(' ')[0].substr(0, 5);
	}
	
	function handleSubmit() {
		if (!validateForm()) {
			return;
		}
		
		isSubmitting = true;
		
		// Add the found item report
		referenceNumber = foundReports.add({
			itemName: formData.itemName.trim(),
			description: formData.description.trim(),
			photo: formData.photo,
			locationFound: formData.locationFound.trim(),
			dateFound: formData.dateFound,
			timeFound: formData.timeFound,
			reporterName: formData.reporterName.trim(),
			reporterPhone: formData.reporterPhone.trim(),
			reporterEmail: formData.reporterEmail.trim()
		});
		
		isSubmitting = false;
		showSuccess = true;
		
		// Auto redirect to found items history after 3 seconds
		setTimeout(() => {
			goto('/temuan');
		}, 3000);
	}
</script>

<svelte:head>
	<title>Lapor Barang Temuan - Seekly – Find What Matters</title>
</svelte:head>

<div class="card">
	<h2 style="margin-bottom: 2rem; color: transparent; background: linear-gradient(45deg, #27ae60, #2ecc71); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2.2rem; font-weight: 700; text-align: center;">📦 Lapor Barang Temuan</h2>
	
	{#if showSuccess}
		<div class="alert alert-success">
			🎉 Luar biasa! Laporan barang temuan berhasil dibuat!<br>
			<strong>Nomor Referensi: {referenceNumber}</strong><br>
			Mengalihkan ke halaman riwayat dalam 3 detik...
		</div>
	{:else}
		<form on:submit|preventDefault={handleSubmit}>
			<!-- Item Information -->
			<div class="form-section">
				<h3>📋 Informasi Barang</h3>
				
				<div class="form-group">
					<label for="itemName">Nama Barang *</label>
					<input 
						type="text" 
						id="itemName"
						bind:value={formData.itemName}
						placeholder="Contoh: iPhone 14, Dompet kulit coklat, dll"
						class:error={errors.itemName}
						required
					/>
					{#if errors.itemName}
						<span class="error-message">{errors.itemName}</span>
					{/if}
				</div>
				
				<div class="form-group">
					<label for="description">Deskripsi Detail *</label>
					<textarea 
						id="description"
						bind:value={formData.description}
						placeholder="Jelaskan ciri-ciri barang secara detail (warna, merek, kondisi, dll)"
						class:error={errors.description}
						required
					></textarea>
					{#if errors.description}
						<span class="error-message">{errors.description}</span>
					{/if}
				</div>
				
				<div class="form-group">
					<label for="photo">Foto Barang *</label>
					<input 
						type="file" 
						id="photo"
						accept="image/*"
						on:change={handlePhotoUpload}
						class:error={errors.photo}
						required
					/>
					{#if errors.photo}
						<span class="error-message">{errors.photo}</span>
					{/if}
					<small style="color: #718096; margin-top: 5px; display: block;">Maksimal 5MB, format gambar</small>
					
					{#if photoPreview}
						<div style="margin-top: 15px;">
							<img src={photoPreview} alt="Preview" style="max-width: 200px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />
						</div>
					{/if}
				</div>
			</div>
			
			<!-- Location & Time -->
			<div class="form-section">
				<h3>📍 Lokasi & Waktu Ditemukan</h3>
				
				<div class="form-group">
					<label for="locationFound">Lokasi Ditemukan *</label>
					<div style="display: flex; gap: 10px; align-items: center;">
						<select bind:value={formData.locationFound} style="flex: 1;" class:error={errors.locationFound} required>
							<option value="">Pilih lokasi...</option>
							{#each locationOptions as location}
								<option value={location}>{location}</option>
							{/each}
						</select>
						<button 
							type="button" 
							class="btn btn-primary" 
							style="padding: 8px 16px; font-size: 14px;"
							on:click={getCurrentLocation}
						>
							🎯 GPS
						</button>
					</div>
					{#if errors.locationFound}
						<span class="error-message">{errors.locationFound}</span>
					{/if}
				</div>
				
				<div class="form-group-row">
					<div class="form-group">
						<label for="dateFound">Tanggal Ditemukan *</label>
						<input 
							type="date" 
							id="dateFound"
							bind:value={formData.dateFound}
							class:error={errors.dateFound}
							required
						/>
						{#if errors.dateFound}
							<span class="error-message">{errors.dateFound}</span>
						{/if}
					</div>
					
					<div class="form-group">
						<label for="timeFound">Waktu Ditemukan *</label>
						<input 
							type="time" 
							id="timeFound"
							bind:value={formData.timeFound}
							class:error={errors.timeFound}
							required
						/>
						{#if errors.timeFound}
							<span class="error-message">{errors.timeFound}</span>
						{/if}
					</div>
					
					<div style="align-self: end;">
						<button 
							type="button" 
							class="btn btn-success" 
							style="padding: 8px 16px; font-size: 14px;"
							on:click={setCurrentDateTime}
						>
							🕐 Sekarang
						</button>
					</div>
				</div>
			</div>
			
			<!-- Reporter Information -->
			<div class="form-section">
				<h3>👤 Informasi Pelapor</h3>
				
				<div class="form-group">
					<label for="reporterName">Nama Lengkap *</label>
					<input 
						type="text" 
						id="reporterName"
						bind:value={formData.reporterName}
						placeholder="Masukkan nama lengkap Anda"
						class:error={errors.reporterName}
						required
					/>
					{#if errors.reporterName}
						<span class="error-message">{errors.reporterName}</span>
					{/if}
				</div>
				
				<div class="form-group-row">
					<div class="form-group">
						<label for="reporterPhone">Nomor Telepon *</label>
						<input 
							type="tel" 
							id="reporterPhone"
							bind:value={formData.reporterPhone}
							placeholder="081234567890"
							class:error={errors.reporterPhone}
							required
						/>
						{#if errors.reporterPhone}
							<span class="error-message">{errors.reporterPhone}</span>
						{/if}
					</div>
					
					<div class="form-group">
						<label for="reporterEmail">Email *</label>
						<input 
							type="email" 
							id="reporterEmail"
							bind:value={formData.reporterEmail}
							placeholder="email@example.com"
							class:error={errors.reporterEmail}
							required
						/>
						{#if errors.reporterEmail}
							<span class="error-message">{errors.reporterEmail}</span>
						{/if}
					</div>
				</div>
			</div>
			
			<button 
				type="submit" 
				class="btn"
				style="width: 100%; padding: 18px; font-size: 20px; font-weight: 600; border-radius: 25px; background: linear-gradient(45deg, #27ae60, #2ecc71); box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3); text-transform: uppercase; letter-spacing: 1px; margin-top: 2rem;"
				disabled={isSubmitting}
			>
				{isSubmitting ? '🔄 Mengirim Laporan...' : '📤 Kirim Laporan Temuan'}
			</button>
		</form>
	{/if}
</div>

<style>
	.form-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: rgba(39, 174, 96, 0.05);
		border-radius: 15px;
		border-left: 4px solid #27ae60;
	}
	
	.form-section h3 {
		color: #27ae60;
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 1rem;
		border-bottom: 2px solid rgba(39, 174, 96, 0.2);
		padding-bottom: 0.5rem;
	}
	
	.form-group-row {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: 1rem;
		align-items: start;
	}
	
	.form-group select {
		width: 100%;
		padding: 15px 20px;
		border: 2px solid #e2e8f0;
		border-radius: 15px;
		font-size: 16px;
		transition: all 0.3s ease;
		background: rgba(255, 255, 255, 0.8);
		font-family: 'Poppins', sans-serif;
	}
	
	.form-group select:focus {
		outline: none;
		border-color: #27ae60;
		box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
		background: white;
		transform: translateY(-2px);
	}
	
	.error {
		border-color: #e74c3c !important;
		box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
	}
	
	.error-message {
		color: #e74c3c;
		font-size: 14px;
		margin-top: 5px;
		display: block;
		font-weight: 500;
	}
	
	@media (max-width: 768px) {
		.form-group-row {
			grid-template-columns: 1fr;
		}
		
		.form-section {
			padding: 1rem;
		}
	}
</style>