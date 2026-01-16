<script>
	import { page } from '$app/stores';
	
	// Main navigation - priority features
	const mainNavigation = [
		{ name: 'Laporkan Barang Hilang', href: '/' },
		{ name: 'Laporkan Barang Temuan', href: '/found' }
	];
	
	// Secondary navigation - other features
	const secondaryNavigation = [
		{ name: 'Cari Barang', href: '/search' },
		{ name: 'Semua Laporan', href: '/reports' },
		{ name: 'Status Laporan', href: '/status' },
		{ name: 'Cari Komunitas', href: '/community' }
		// { name: 'Location History', href: '/locations' } - Removed as per requirements
		// { name: 'Notifications', href: '/notifications' } - Removed as per requirements
	];
</script>

<svelte:head>
	<title>Seekly – Temukan Yang Penting</title>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		body {
			font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
			line-height: 1.6;
			color: #2d3748;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			min-height: 100vh;
		}
		
		.container {
			max-width: 1200px;
			margin: 0 auto;
			padding: 0 20px;
		}
		
		.card {
			background: rgba(255, 255, 255, 0.95);
			border-radius: 20px;
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
			padding: 30px;
			margin-bottom: 25px;
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.2);
			transition: transform 0.3s ease, box-shadow 0.3s ease;
		}
		
		.card:hover {
			transform: translateY(-5px);
			box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
		}
		
		.btn {
			background: linear-gradient(45deg, #ff6b6b, #ee5a24);
			color: white;
			border: none;
			padding: 12px 24px;
			border-radius: 25px;
			cursor: pointer;
			font-size: 16px;
			font-weight: 500;
			transition: all 0.3s ease;
			box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		
		.btn:hover {
			background: linear-gradient(45deg, #ee5a24, #ff6b6b);
			transform: translateY(-2px);
			box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
		}
		
		.btn:active {
			transform: translateY(0);
		}
		
		.btn-danger {
			background: linear-gradient(45deg, #e74c3c, #c0392b);
			box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
		}
		
		.btn-danger:hover {
			background: linear-gradient(45deg, #c0392b, #e74c3c);
			box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
		}
		
		.btn-primary {
			background: linear-gradient(45deg, #3498db, #2980b9);
			box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
		}
		
		.btn-primary:hover {
			background: linear-gradient(45deg, #2980b9, #3498db);
			box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
		}
		
		.btn-success {
			background: linear-gradient(45deg, #2ecc71, #27ae60);
			box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
		}
		
		.btn-success:hover {
			background: linear-gradient(45deg, #27ae60, #2ecc71);
			box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
		}
		
		.form-group {
			margin-bottom: 20px;
		}
		
		.form-group label {
			display: block;
			margin-bottom: 8px;
			font-weight: 600;
			color: #2d3748;
			font-size: 14px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		
		.form-group input,
		.form-group textarea {
			width: 100%;
			padding: 15px 20px;
			border: 2px solid #e2e8f0;
			border-radius: 15px;
			font-size: 16px;
			transition: all 0.3s ease;
			background: rgba(255, 255, 255, 0.8);
			font-family: 'Poppins', sans-serif;
		}
		
		.form-group input:focus,
		.form-group textarea:focus {
			outline: none;
			border-color: #667eea;
			box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
			background: white;
			transform: translateY(-2px);
		}
		
		.form-group textarea {
			height: 120px;
			resize: vertical;
		}
		
		.search-box {
			width: 100%;
			padding: 20px 25px;
			font-size: 18px;
			border: 3px solid #667eea;
			border-radius: 25px;
			margin-bottom: 25px;
			background: rgba(255, 255, 255, 0.9);
			transition: all 0.3s ease;
			font-family: 'Poppins', sans-serif;
			box-shadow: 0 10px 25px rgba(102, 126, 234, 0.1);
		}
		
		.search-box:focus {
			outline: none;
			border-color: #764ba2;
			box-shadow: 0 0 0 5px rgba(118, 75, 162, 0.1);
			background: white;
			transform: translateY(-3px);
		}
		
		.item-card {
			border-left: 6px solid #667eea;
			margin-bottom: 20px;
			position: relative;
			overflow: hidden;
		}
		
		.item-card::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(45deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
			pointer-events: none;
		}
		
		.item-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15px;
			position: relative;
			z-index: 1;
		}
		
		.item-title {
			font-size: 20px;
			font-weight: 600;
			color: #667eea;
			text-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
		}
		
		.item-date {
			color: #718096;
			font-size: 14px;
			font-weight: 500;
			background: rgba(102, 126, 234, 0.1);
			padding: 4px 12px;
			border-radius: 20px;
		}
		
		.item-info {
			margin: 12px 0;
			position: relative;
			z-index: 1;
		}
		
		.item-info strong {
			color: #4a5568;
			font-weight: 600;
		}
		
		.alert {
			padding: 20px;
			margin-bottom: 25px;
			border-radius: 15px;
			font-weight: 500;
			border: none;
			position: relative;
			overflow: hidden;
		}
		
		.alert::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
			animation: shimmer 2s infinite;
		}
		
		@keyframes shimmer {
			0% { left: -100%; }
			100% { left: 100%; }
		}
		
		.alert-success {
			background: linear-gradient(135deg, #2ecc71, #27ae60);
			color: white;
			box-shadow: 0 10px 25px rgba(46, 204, 113, 0.3);
		}
		
		.alert-info {
			background: linear-gradient(135deg, #3498db, #2980b9);
			color: white;
			box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
		}
		
		.alert-warning {
			background: linear-gradient(135deg, #f39c12, #e67e22);
			color: white;
			box-shadow: 0 10px 25px rgba(243, 156, 18, 0.3);
		}
		
		.stats-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 20px;
			margin: 20px 0;
		}
		
		.stat-card {
			text-align: center;
			padding: 25px;
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
			border-radius: 20px;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
			transition: transform 0.3s ease;
			border: 1px solid rgba(255, 255, 255, 0.3);
		}
		
		.stat-card:hover {
			transform: translateY(-5px);
		}
		
		.stat-number {
			font-size: 2.5rem;
			font-weight: 700;
			margin-bottom: 10px;
			background: linear-gradient(45deg, #667eea, #764ba2);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		
		.stat-label {
			font-weight: 600;
			color: #4a5568;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			font-size: 14px;
		}
		
		@keyframes float {
			0%, 100% { transform: translateY(0px); }
			50% { transform: translateY(-10px); }
		}
		
		.floating {
			animation: float 3s ease-in-out infinite;
		}
		
		@media (max-width: 768px) {
			.container {
				padding: 0 15px;
			}
			
			.card {
				padding: 20px;
				margin-bottom: 20px;
			}
			
			.item-header {
				flex-direction: column;
				align-items: flex-start;
				gap: 10px;
			}
		}
	</style>
</svelte:head>

<header style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 1.5rem 0; margin-bottom: 3rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
	<div class="container">
		<h1 style="margin-bottom: 1.5rem; font-size: 2.5rem; font-weight: 700; text-align: center; background: linear-gradient(45deg, #fff, #f8f9fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" class="floating">🔍 Seekly – Find What Matters</h1>
		<nav>
			<!-- Main Navigation - Priority Features -->
			<div style="margin-bottom: 1.5rem;">
				<h3 style="color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 600; text-align: center; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">📱 Tindakan Utama</h3>
				<ul style="list-style: none; display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
					{#each mainNavigation as item}
						<li>
							<a 
								href={item.href}
								style="color: white; text-decoration: none; padding: 15px 30px; border-radius: 30px; font-weight: 600; transition: all 0.3s ease; background: {$page.url.pathname === item.href ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'}; border: 2px solid rgba(255,255,255,0.4); backdrop-filter: blur(10px); text-transform: uppercase; letter-spacing: 0.8px; font-size: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);"
								on:mouseenter={(e) => {e.target.style.background = 'rgba(255,255,255,0.35)'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)'}}
								on:mouseleave={(e) => {e.target.style.background = $page.url.pathname === item.href ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'}}
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			
			<!-- Secondary Navigation - Other Features -->
			<div>
				<h3 style="color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 500; text-align: center; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;">🔧 Fitur Lainnya</h3>
				<ul style="list-style: none; display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
					{#each secondaryNavigation as item}
						<li>
							<a 
								href={item.href}
								style="color: rgba(255,255,255,0.8); text-decoration: none; padding: 8px 16px; border-radius: 20px; font-weight: 400; transition: all 0.3s ease; background: {$page.url.pathname === item.href ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); font-size: 12px;"
								on:mouseenter={(e) => {e.target.style.background = 'rgba(255,255,255,0.2)'; e.target.style.color = 'white'}}
								on:mouseleave={(e) => {e.target.style.background = $page.url.pathname === item.href ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'; e.target.style.color = 'rgba(255,255,255,0.8)'}}
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
	</div>
</header>

<main class="container">
	<slot />
</main>

<footer style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)); backdrop-filter: blur(10px); color: white; text-align: center; padding: 3rem 0; margin-top: 4rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
	<div class="container">
		<p style="font-weight: 500; font-size: 16px; margin-bottom: 10px;">💝 Dibuat dengan cinta untuk komunitas</p>
		<p style="opacity: 0.8; font-size: 14px;">&copy; 2025 Seekly – Temukan Yang Penting - Membantu menyatukan orang dengan barang-barang mereka ✨</p>
	</div>
</footer>