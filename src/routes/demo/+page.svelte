<script>
	import { onMount } from 'svelte';
	import { lostItems } from '$lib/store.js';
	
	let demoRef = 'LI-2024-123456';
	
	function copyDemoRef() {
		navigator.clipboard.writeText(demoRef).then(() => {
			alert('Demo reference number copied!');
		});
	}
	
	function openStatusDemo() {
		window.open(`/status?ref=${demoRef}`, '_blank');
	}
</script>

<svelte:head>
	<title>Report Status Demo - Lost Items App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
				🔍 Report Status System
			</h1>
			<p class="text-xl text-gray-600 mb-8">
				Sistem tracking laporan barang hilang yang komprehensif dan interaktif
			</p>
			
			<!-- Demo CTA -->
			<div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
				<h2 class="text-2xl font-semibold text-gray-900 mb-4">
					🎯 Try Demo Report
				</h2>
				<p class="text-gray-600 mb-6">
					Coba fitur lengkap dengan data demo yang sudah disiapkan
				</p>
				
				<div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
					<div class="bg-gray-50 px-4 py-2 rounded-lg font-mono text-sm">
						{demoRef}
					</div>
					<button
						on:click={copyDemoRef}
						class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
					>
						📋 Copy
					</button>
					<button
						on:click={openStatusDemo}
						class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
					>
						🚀 Open Demo
					</button>
				</div>
			</div>
		</div>

		<!-- Features Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
			<!-- Progress Tracker -->
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
						📊
					</div>
					<h3 class="ml-3 text-lg font-semibold text-gray-900">Progress Tracker</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">
					Visual progress bar dengan 5 tahap status dari laporan diterima hingga selesai
				</p>
				<ul class="text-xs text-gray-500 space-y-1">
					<li>• 🔵 RECEIVED - Laporan diterima</li>
					<li>• 🟠 VERIFYING - Sedang diverifikasi</li>
					<li>• 🟡 SEARCHING - Sedang dicari</li>
					<li>• 🟢 FOUND - Barang ditemukan</li>
					<li>• ✅ CLOSED - Laporan selesai</li>
				</ul>
			</div>

			<!-- Timeline Activity -->
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
						📋
					</div>
					<h3 class="ml-3 text-lg font-semibold text-gray-900">Timeline Activity</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">
					Riwayat lengkap semua update dengan timestamp dan catatan admin
				</p>
				<ul class="text-xs text-gray-500 space-y-1">
					<li>• Chronological order (newest first)</li>
					<li>• Detailed timestamps</li>
					<li>• Admin notes for each update</li>
					<li>• Activity summary statistics</li>
				</ul>
			</div>

			<!-- Notifications -->
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
						🔔
					</div>
					<h3 class="ml-3 text-lg font-semibold text-gray-900">Smart Notifications</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">
					Notifikasi real-time untuk semua update penting pada laporan
				</p>
				<ul class="text-xs text-gray-500 space-y-1">
					<li>• Status change notifications</li>
					<li>• New comment alerts</li>
					<li>• Evidence upload notifications</li>
					<li>• Mark as read functionality</li>
				</ul>
			</div>

			<!-- Chat System -->
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
						💬
					</div>
					<h3 class="ml-3 text-lg font-semibold text-gray-900">Live Chat</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">
					Chat langsung dengan admin security untuk komunikasi real-time
				</p>
				<ul class="text-xs text-gray-500 space-y-1">
					<li>• Direct messaging with admin</li>
					<li>• Quick message templates</li>
					<li>• Typing indicators</li>
					<li>• Message history</li>
				</ul>
			</div>

			<!-- Evidence Upload -->
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
						📎
					</div>
					<h3 class="ml-3 text-lg font-semibold text-gray-900">Evidence Upload</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">
					Upload foto dan video sebagai bukti tambahan untuk membantu pencarian
				</p>
				<ul class="text-xs text-gray-500 space-y-1">
					<li>• Drag & drop interface</li>
					<li>• Multiple file formats (JPG, PNG, MP4)</li>
					<li>• Preview modal</li>
					<li>• Download functionality</li>
				</ul>
			</div>

			<!-- QR Code -->
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
						📱
					</div>
					<h3 class="ml-3 text-lg font-semibold text-gray-900">QR Code Access</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">
					QR code unik untuk akses cepat dan sharing laporan status
				</p>
				<ul class="text-xs text-gray-500 space-y-1">
					<li>• Unique QR for each report</li>
					<li>• Print & download options</li>
					<li>• Native share functionality</li>
					<li>• Quick copy to clipboard</li>
				</ul>
			</div>
		</div>

		<!-- User Flow -->
		<div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
			<h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
				🚀 User Flow: Dari Laporan hingga Selesai
			</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="text-center">
					<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
						📝
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">1. Buat Laporan</h3>
					<p class="text-sm text-gray-600">
						Isi form laporan barang hilang dengan detail lengkap
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
						🔍
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">2. Track Status</h3>
					<p class="text-sm text-gray-600">
						Monitor progress melalui halaman status dengan reference number
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
						💬
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">3. Komunikasi</h3>
					<p class="text-sm text-gray-600">
						Chat dengan admin dan upload evidence tambahan
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
						✅
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">4. Selesai</h3>
					<p class="text-sm text-gray-600">
						Tutup laporan setelah barang ditemukan
					</p>
				</div>
			</div>
		</div>

		<!-- Quick Access -->
		<div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
			<h2 class="text-2xl font-bold mb-4">Ready to Try?</h2>
			<p class="mb-6 opacity-90">
				Gunakan reference number di atas atau buat laporan baru untuk mencoba semua fitur
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/status"
					class="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
				>
					🔍 Check Status
				</a>
				<a
					href="/"
					class="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold border border-white/20"
				>
					📝 Create Report
				</a>
			</div>
		</div>
	</div>
</div>