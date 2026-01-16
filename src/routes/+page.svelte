<script>
	import { lostItems } from '$lib/store.js';
	
	let formData = {
		reporterName: '',
		description: '',
		location: '',
		dateLost: '',
		contact: ''
	};
	
	let isSubmitting = false;
	let showSuccess = false;
	
	function handleSubmit() {
		if (!formData.reporterName.trim() || !formData.description.trim() || 
			!formData.location.trim() || !formData.dateLost) {
			alert('Silakan isi semua kolom yang wajib diisi');
			return;
		}
		
		isSubmitting = true;
		
		// Add the item to store
		lostItems.add({
			reporterName: formData.reporterName.trim(),
			description: formData.description.trim(),
			location: formData.location.trim(),
			dateLost: formData.dateLost,
			contact: formData.contact.trim() || undefined
		});
		
		// Reset form
		formData = {
			reporterName: '',
			description: '',
			location: '',
			dateLost: '',
			contact: ''
		};
		
		isSubmitting = false;
		showSuccess = true;
		
		// Hide success message after 3 seconds
		setTimeout(() => {
			showSuccess = false;
		}, 3000);
	}
	
	// Set default date to today
	function setTodayDate() {
		const today = new Date().toISOString().split('T')[0];
		formData.dateLost = today;
	}
</script>

<svelte:head>
	<title>Laporkan Barang Hilang - Seekly</title>
</svelte:head>

<div class="card">
	<h2 style="margin-bottom: 2rem; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2.2rem; font-weight: 700; text-align: center;">📝 Laporkan Barang Hilang</h2>
	
	{#if showSuccess}
		<div class="alert alert-success">
			✨ Luar biasa! Laporan barang hilang Anda telah berhasil dikirim! 🎉
		</div>
	{/if}
	
	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="reporterName">🧍 Nama Pelapor *</label>
			<input 
				type="text" 
				id="reporterName"
				bind:value={formData.reporterName}
				placeholder="Masukkan nama lengkap Anda"
				required
			/>
		</div>
		
		<div class="form-group">
			<label for="description">📝 Deskripsi Barang *</label>
			<textarea 
				id="description"
				bind:value={formData.description}
				placeholder="Deskripsikan barang yang hilang secara detail (warna, merek, ciri khas, dll.)"
				required
			></textarea>
		</div>
		
		<div class="form-group">
			<label for="location">📍 Lokasi Kehilangan *</label>
			<input 
				type="text" 
				id="location"
				bind:value={formData.location}
				placeholder="Di mana Anda terakhir melihat barang tersebut? (contoh: Perpustakaan Universitas, Food Court Mall)"
				required
			/>
		</div>
		
		<div class="form-group">
			<label for="dateLost">📅 Tanggal Kehilangan *</label>
			<div style="display: flex; gap: 10px; align-items: center;">
				<input 
					type="date" 
					id="dateLost"
					bind:value={formData.dateLost}
					required
					style="flex: 1;"
				/>
			<button 
				type="button" 
				class="btn btn-success" 
				style="padding: 8px 16px; font-size: 14px; border-radius: 20px;"
				on:click={setTodayDate}
			>
				🎆 Hari Ini
			</button>
			</div>
		</div>
		
		<div class="form-group">
			<label for="contact">📞 Informasi Kontak (Opsional)</label>
			<input 
				type="text" 
				id="contact"
				bind:value={formData.contact}
				placeholder="Nomor telepon, email, atau metode kontak lainnya"
			/>
		</div>
		
		<button 
			type="submit" 
			class="btn"
			style="width: 100%; padding: 18px; font-size: 20px; font-weight: 600; border-radius: 25px; background: linear-gradient(45deg, #667eea, #764ba2); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); text-transform: uppercase; letter-spacing: 1px;"
			disabled={isSubmitting}
		>
			{isSubmitting ? '🔄 Mengirim Laporan...' : '📤 Kirim Laporan'}
		</button>
	</form>
</div>

<div class="card" style="margin-top: 2rem;">
	<h3 style="color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1.5rem; font-size: 1.8rem; font-weight: 600; text-align: center;">✨ Cara Kerja</h3>
	<div class="stats-grid">
		<div class="stat-card floating" style="animation-delay: 0s;">
			<div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
			<h4 style="color: #667eea; font-weight: 600; margin-bottom: 0.5rem;">1. Report</h4>
			<p style="color: #718096; font-size: 14px; line-height: 1.5;">Isi formulir dengan detail tentang barang yang hilang</p>
		</div>
		<div class="stat-card floating" style="animation-delay: 0.5s;">
			<div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
			<h4 style="color: #667eea; font-weight: 600; margin-bottom: 0.5rem;">2. Search</h4>
			<p style="color: #718096; font-size: 14px; line-height: 1.5;">Orang lain dapat mencari barang berdasarkan deskripsi atau lokasi</p>
		</div>
		<div class="stat-card floating" style="animation-delay: 1s;">
			<div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
			<h4 style="color: #667eea; font-weight: 600; margin-bottom: 0.5rem;">3. Connect</h4>
			<p style="color: #718096; font-size: 14px; line-height: 1.5;">Hubungi jika seseorang menemukan barang Anda</p>
		</div>
	</div>
</div>