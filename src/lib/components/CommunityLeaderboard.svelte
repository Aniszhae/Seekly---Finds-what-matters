<script>
	import { onMount } from 'svelte';
	
	export let showLeaderboard = false;
	export let onClose = () => {};
	
	// Sample leaderboard data
	let communityLeaderboard = [
		{ id: 'community-1', name: 'Komunitas Pencari Barang Hilang Jakarta Selatan', foundItems: 156, rating: 4.8, members: 2156, badge: '🥇' },
		{ id: 'community-2', name: 'Lost & Found Bandung', foundItems: 89, rating: 4.7, members: 1247, badge: '🥈' },
		{ id: 'community-3', name: 'Komunitas Barang Hilang Hewan Peliharaan', foundItems: 67, rating: 4.9, members: 892, badge: '🥉' },
		{ id: 'community-4', name: 'Komunitas Pencari Barang Hilang Surabaya', foundItems: 54, rating: 4.6, members: 756, badge: '🏅' },
		{ id: 'community-5', name: 'Komunitas Kendaraan Hilang Jakarta', foundItems: 43, rating: 4.5, members: 987, badge: '🏅' }
	];
	
	let volunteerLeaderboard = [
		{ id: 'volunteer-1', name: 'Budi Santoso', community: 'Komunitas Jakarta Selatan', itemsFound: 24, badge: '🥇' },
		{ id: 'volunteer-2', name: 'Siti Rahayu', community: 'Lost & Found Bandung', itemsFound: 18, badge: '🥈' },
		{ id: 'volunteer-3', name: 'Ahmad Prasetyo', community: 'Komunitas Hewan Peliharaan', itemsFound: 15, badge: '🥉' },
		{ id: 'volunteer-4', name: 'Maria Susanti', community: 'Komunitas Surabaya', itemsFound: 12, badge: '🏅' },
		{ id: 'volunteer-5', name: 'Joko Widodo', community: 'Komunitas Jakarta Pusat', itemsFound: 9, badge: '🏅' }
	];
	
	// Stats data
	let stats = {
		weeklyReports: 42,
		itemsFound: 28,
		dailyActiveMembers: 127
	};
</script>

{#if showLeaderboard}
	<div style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1rem;">
		<div class="card" style="max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto;">
			<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(102, 126, 234, 0.2);">
				<h2 style="margin: 0; color: transparent; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2rem;">
					💡 Leaderboard & Statistik
				</h2>
				<button 
					class="btn" 
					style="background: linear-gradient(45deg, #95a5a6, #7f8c8d); padding: 0.5rem; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"
					on:click={onClose}
				>
					❌
				</button>
			</div>
			
			<!-- Stats Overview -->
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
				<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 15px; border: 1px solid rgba(102, 126, 234, 0.2);">
					<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📋</div>
					<div style="font-size: 2rem; font-weight: 700; color: #667eea;">{stats.weeklyReports}</div>
					<div style="color: #718096;">Laporan Minggu Ini</div>
				</div>
				
				<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1)); border-radius: 15px; border: 1px solid rgba(46, 204, 113, 0.2);">
					<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✅</div>
					<div style="font-size: 2rem; font-weight: 700; color: #27ae60;">{stats.itemsFound}</div>
					<div style="color: #718096;">Barang Ditemukan</div>
				</div>
				
				<div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(241, 196, 15, 0.1), rgba(243, 156, 18, 0.1)); border-radius: 15px; border: 1px solid rgba(241, 196, 15, 0.2);">
					<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👥</div>
					<div style="font-size: 2rem; font-weight: 700; color: #f39c12;">{stats.dailyActiveMembers}</div>
					<div style="color: #718096;">Anggota Aktif Harian</div>
				</div>
			</div>
			
			<!-- Tabs -->
			<div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(102, 126, 234, 0.2);">
				<button 
					class="btn" 
					style="padding: 0.75rem 1.5rem; border-radius: 10px 10px 0 0; background: linear-gradient(45deg, #667eea, #764ba2); color: white;"
				>
					🏆 Komunitas Terbaik
				</button>
				<button 
					class="btn" 
					style="padding: 0.75rem 1.5rem; border-radius: 10px 10px 0 0; background: rgba(102, 126, 234, 0.1); color: #667eea;"
				>
					🦸 Relawan Teraktif
				</button>
			</div>
			
			<!-- Community Leaderboard -->
			<div style="margin-bottom: 2rem;">
				<h3 style="margin-bottom: 1rem; color: #667eea; display: flex; align-items: center; gap: 0.5rem;">
					👥 Komunitas Terbaik
				</h3>
				
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					{#each communityLeaderboard as community, i}
						<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.9); border-radius: 15px; border-left: 4px solid {i === 0 ? '#f1c40f' : i === 1 ? '#e67e22' : i === 2 ? '#e74c3c' : '#95a5a6'}; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
							<div style="font-size: 2rem;">
								{community.badge}
							</div>
							<div style="flex: 1;">
								<h4 style="margin: 0 0 0.25rem 0; font-size: 1.1rem;">{community.name}</h4>
								<div style="display: flex; gap: 1rem; font-size: 0.9rem; color: #718096;">
									<span>📦 {community.foundItems} barang ditemukan</span>
									<span>⭐ {community.rating} rating</span>
									<span>👥 {community.members} anggota</span>
								</div>
							</div>
							<button 
								class="btn" 
								style="background: linear-gradient(45deg, #3498db, #2980b9); padding: 0.5rem 1rem; font-size: 0.9rem;"
							>
								👁️ Lihat
							</button>
						</div>
					{/each}
				</div>
			</div>
			
			<!-- Volunteer Leaderboard -->
			<div>
				<h3 style="margin-bottom: 1rem; color: #667eea; display: flex; align-items: center; gap: 0.5rem;">
					🦸 Relawan Teraktif
				</h3>
				
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					{#each volunteerLeaderboard as volunteer, i}
						<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.9); border-radius: 15px; border-left: 4px solid {i === 0 ? '#f1c40f' : i === 1 ? '#e67e22' : i === 2 ? '#e74c3c' : '#95a5a6'}; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
							<div style="font-size: 2rem;">
								{volunteer.badge}
							</div>
							<div style="flex: 1;">
								<h4 style="margin: 0 0 0.25rem 0; font-size: 1.1rem;">{volunteer.name}</h4>
								<div style="display: flex; gap: 1rem; font-size: 0.9rem; color: #718096;">
									<span>🏢 {volunteer.community}</span>
									<span>📦 {volunteer.itemsFound} barang ditemukan</span>
								</div>
							</div>
							<button 
								class="btn" 
								style="background: linear-gradient(45deg, #2ecc71, #27ae60); padding: 0.5rem 1rem; font-size: 0.9rem;"
							>
								🏆 Apresiasi
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
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
	
	.card {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		padding: 30px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
</style>