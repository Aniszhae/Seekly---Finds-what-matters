import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Status constants for lost items
export const ITEM_STATUS = {
	RECEIVED: 'RECEIVED',       // 🔵 Laporan Diterima
	VERIFYING: 'VERIFYING',     // 🟠 Sedang Diverifikasi
	SEARCHING: 'SEARCHING',     // 🟡 Sedang Dicari
	FOUND: 'FOUND',             // 🟢 Barang Ditemukan
	CLOSED: 'CLOSED',           // ✅ Laporan Selesai
	CANCELLED: 'CANCELLED'      // ❌ Dibatalkan
};

// Status colors and icons
export const STATUS_CONFIG = {
	[ITEM_STATUS.RECEIVED]: { color: '#3B82F6', icon: '📋', label: 'Laporan Diterima' },
	[ITEM_STATUS.VERIFYING]: { color: '#F59E0B', icon: '🔍', label: 'Sedang Diverifikasi' },
	[ITEM_STATUS.SEARCHING]: { color: '#EAB308', icon: '🔎', label: 'Sedang Dicari' },
	[ITEM_STATUS.FOUND]: { color: '#10B981', icon: '✅', label: 'Barang Ditemukan' },
	[ITEM_STATUS.CLOSED]: { color: '#059669', icon: '🎉', label: 'Laporan Selesai' },
	[ITEM_STATUS.CANCELLED]: { color: '#EF4444', icon: '❌', label: 'Dibatalkan' }
};

// Type definitions for reference (JSDoc comments)
/**
 * @typedef {Object} LostItem
 * @property {string} id
 * @property {string} reporterName
 * @property {string} description
 * @property {string} location
 * @property {string} dateLost
 * @property {string} [contact]
 * @property {string} dateReported
 * @property {string} [status]
 * @property {string} [referenceNumber]
 * @property {StatusUpdate[]} [statusHistory]
 * @property {Comment[]} [comments]
 * @property {boolean} [isClosed]
 */

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} author
 * @property {string} message
 * @property {string} timestamp
 * @property {boolean} isAdmin
 */



/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} type
 * @property {string} message
 * @property {string} timestamp
 * @property {boolean} isRead
 */

/**
 * @typedef {Object} FoundItem
 * @property {string} id
 * @property {string} itemName
 * @property {string} description
 * @property {string} photo
 * @property {string} locationFound
 * @property {string} dateFound
 * @property {string} timeFound
 * @property {string} reporterName
 * @property {string} reporterPhone
 * @property {string} reporterEmail
 * @property {string} dateReported
 * @property {string} referenceNumber
 */

/**
 * @typedef {Object} StatusUpdate
 * @property {string} status
 * @property {string} date
 * @property {string} [notes]
 */

// Helper function to generate unique ID
function generateId() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper function to generate reference number
function generateReferenceNumber(prefix = 'LI') {
	const year = new Date().getFullYear();
	const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
	return `${prefix}-${year}-${randomNum}`;
}

// Helper functions for localStorage
function loadFromStorage(key) {
	if (!browser) return getDefaultData(key);
	
	try {
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : getDefaultData(key);
	} catch (error) {
		console.error('Error loading from localStorage:', error);
		return getDefaultData(key);
	}
}

// Get default data with sample report for demo
function getDefaultData(key) {
	if (key === 'lostItems') {
		return [{
			id: 'demo-item-1',
			reporterName: 'John Doe',
			description: 'Laptop MacBook Pro 13 inch warna silver dengan stiker Apple di belakang',
			location: 'Ruang Kuliah A101, Gedung Teknik Informatika',
			dateLost: '2024-01-10',
			contact: 'john.doe@email.com',
			dateReported: '2024-01-11T08:30:00.000Z',
			status: ITEM_STATUS.SEARCHING,
			referenceNumber: 'LI-2024-123456',
			isClosed: false,
			statusHistory: [
				{
					status: ITEM_STATUS.RECEIVED,
					date: '2024-01-11T08:30:00.000Z',
					notes: 'Laporan barang hilang telah diterima dan akan segera diproses'
				},
				{
					status: ITEM_STATUS.VERIFYING,
					date: '2024-01-11T14:15:00.000Z',
					notes: 'Tim sedang memverifikasi kelengkapan data dan informasi laporan'
				},
				{
					status: ITEM_STATUS.SEARCHING,
					date: '2024-01-12T09:00:00.000Z',
					notes: 'Tim security sedang melakukan pencarian di lokasi yang disebutkan'
				}
			],
			comments: [
				{
					id: 'comment-1',
					author: 'John Doe',
					message: 'Apakah ada progress terbaru untuk pencarian laptop saya?',
					timestamp: '2024-01-12T15:30:00.000Z',
					isAdmin: false
				},
				{
					id: 'comment-2',
					author: 'Admin Security',
					message: 'Tim kami sudah mengecek area tersebut dan sedang menunggu konfirmasi dari cleaning service.',
					timestamp: '2024-01-12T16:45:00.000Z',
					isAdmin: true
				}
			]
			// notifications array removed as per requirements
		}];
	} else if (key === 'foundReports') {
		return [{
			id: 'found-demo-1',
			itemName: 'iPhone 14 Pro Max',
			description: 'iPhone 14 Pro Max warna Deep Purple dengan case kulit hitam',
			photo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">📱 iPhone Photo</text></svg>',
			locationFound: 'Perpustakaan Pusat, Lantai 2',
			dateFound: '2024-01-13',
			timeFound: '14:30',
			reporterName: 'Jane Smith',
			reporterPhone: '08123456789',
			reporterEmail: 'jane.smith@email.com',
			dateReported: '2024-01-13T14:45:00.000Z',
			referenceNumber: 'FI-2024-789012'
		}, {
			id: 'found-demo-2',
			itemName: 'Dompet kulit coklat',
			description: 'Dompet kulit coklat merk Fossil dengan kartu identitas atas nama Michael',
			photo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" font-family="Arial" font-size="14" text-anchor="middle" fill="%23333">👛 Wallet Photo</text></svg>',
			locationFound: 'Kantin Universitas',
			dateFound: '2024-01-12',
			timeFound: '12:15',
			reporterName: 'Security Guard',
			reporterPhone: '08199887766',
			reporterEmail: 'security@university.edu',
			dateReported: '2024-01-12T12:20:00.000Z',
			referenceNumber: 'FI-2024-567890'
		}];
	}
	return [];
}

function saveToStorage(key, items) {
	if (!browser) return;
	
	try {
		localStorage.setItem(key, JSON.stringify(items));
	} catch (error) {
		console.error('Error saving to localStorage:', error);
	}
}

// Create the store with initial data from localStorage
function createLostItemsStore() {
	const { subscribe, set, update } = writable(loadFromStorage('lostItems'));

	return {
		subscribe,
		
		// Add a new lost item
		add: (item) => {
			const newItem = {
				...item,
				id: generateId(),
				dateReported: new Date().toISOString(),
				status: ITEM_STATUS.RECEIVED,
				referenceNumber: generateReferenceNumber('LI'),
				isClosed: false,
				statusHistory: [{
					status: ITEM_STATUS.RECEIVED,
					date: new Date().toISOString(),
					notes: 'Laporan barang hilang telah diterima dan akan segera diproses'
				}],
				comments: []
				// notifications array removed as per requirements
			};
			
			update(items => {
				const newItems = [...items, newItem];
				saveToStorage('lostItems', newItems);
				return newItems;
			});
			
			return newItem.referenceNumber;
		},
		
		// Update item status
		updateStatus: (id, newStatus, notes) => {
			update(items => {
				const updatedItems = items.map(item => {
					if (item.id === id) {
						const statusUpdate = {
							status: newStatus,
							date: new Date().toISOString(),
							notes
						};
						return {
							...item,
							status: newStatus,
							statusHistory: [...(item.statusHistory || []), statusUpdate]
						};
					}
					return item;
				});
				saveToStorage('lostItems', updatedItems);
				return updatedItems;
			});
		},
		
		// Add comment to item
		addComment: (id, comment) => {
			update(items => {
				const updatedItems = items.map(item => {
					if (item.id === id) {
						const newComment = {
							id: generateId(),
							...comment,
							timestamp: new Date().toISOString()
						};
						return {
							...item,
							comments: [...(item.comments || []), newComment]
						};
					}
					return item;
				});
				saveToStorage('lostItems', updatedItems);
				return updatedItems;
			});
		},
		
		
		// Close report
		closeReport: (id, notes) => {
			update(items => {
				const updatedItems = items.map(item => {
					if (item.id === id) {
						const statusUpdate = {
							status: ITEM_STATUS.CLOSED,
							date: new Date().toISOString(),
							notes: notes || 'Laporan ditutup oleh pelapor'
						};
						return {
							...item,
							status: ITEM_STATUS.CLOSED,
							isClosed: true,
							statusHistory: [...(item.statusHistory || []), statusUpdate]
						};
					}
					return item;
				});
				saveToStorage('lostItems', updatedItems);
				return updatedItems;
			});
		},
		
		// Mark notifications as read - Removed as per requirements
		/*
		markNotificationsRead: (id) => {
			update(items => {
				const updatedItems = items.map(item => {
					if (item.id === id) {
						return {
							...item,
							notifications: (item.notifications || []).map(notif => ({ ...notif, isRead: true }))
						};
					}
					return item;
				});
				saveToStorage('lostItems', updatedItems);
				return updatedItems;
			});
		},
		*/
		
		// Find item by reference number
		findByReference: (referenceNumber) => {
			return new Promise((resolve) => {
				let currentItems = [];
				
				const unsubscribe = subscribe(items => {
					currentItems = items;
				});
				unsubscribe();
				
				const found = currentItems.find(item => item.referenceNumber === referenceNumber);
				resolve(found || null);
			});
		},
		
		// Search items by keyword
		search: (keyword) => {
			return new Promise((resolve) => {
				let currentItems = [];
				
				// Get current items
				const unsubscribe = subscribe(items => {
					currentItems = items;
				});
				unsubscribe();
				
				if (!keyword.trim()) {
					resolve(currentItems);
					return;
				}
				
				const searchTerm = keyword.toLowerCase();
				const filtered = currentItems.filter(item => 
					item.description.toLowerCase().includes(searchTerm) ||
					item.location.toLowerCase().includes(searchTerm) ||
					item.reporterName.toLowerCase().includes(searchTerm)
				);
				
				resolve(filtered);
			});
		},
		
		// Reset all data
		reset: () => {
			set([]);
			if (browser) {
				localStorage.removeItem('lostItems');
			}
		},
		
		// Get items sorted by date (newest first)
		getSorted: () => {
			return new Promise((resolve) => {
				let currentItems = [];
				
				const unsubscribe = subscribe(items => {
					currentItems = items;
				});
				unsubscribe();
				
				const sorted = [...currentItems].sort((a, b) => 
					new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime()
				);
				
				resolve(sorted);
			});
		}
	};
}

export const lostItems = createLostItemsStore();

// Create foundReports store
function createFoundReportsStore() {
	const { subscribe, set, update } = writable(loadFromStorage('foundReports'));

	return {
		subscribe,
		
		// Add a new found item report
		add: (item) => {
			const newItem = {
				...item,
				id: generateId(),
				dateReported: new Date().toISOString(),
				referenceNumber: generateReferenceNumber('FI')
			};
			
			update(items => {
				const newItems = [...items, newItem];
				saveToStorage('foundReports', newItems);
				return newItems;
			});
			
			return newItem.referenceNumber;
		},
		
		// Get items sorted by date (newest first)
		getSorted: () => {
			return new Promise((resolve) => {
				let currentItems = [];
				
				const unsubscribe = subscribe(items => {
					currentItems = items;
				});
				unsubscribe();
				
				const sorted = [...currentItems].sort((a, b) => 
					new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime()
				);
				
				resolve(sorted);
			});
		},
		
		// Reset all data
		reset: () => {
			set([]);
			if (browser) {
				localStorage.removeItem('foundReports');
			}
		}
	};
}

export const foundReports = createFoundReportsStore();

// Create community store
function createCommunityStore() {
	const { subscribe, set, update } = writable(loadFromStorage('communities') || []);

	return {
		subscribe,
		
		// Add a new community
		add: (community) => {
			const newCommunity = {
				...community,
				id: generateId(),
				createdAt: new Date().toISOString(),
				memberCount: 0,
				activeReports: 0,
				foundItems: 0,
				rating: 0,
				verified: false
			};
			
			update(communities => {
				const newCommunities = [...communities, newCommunity];
				saveToStorage('communities', newCommunities);
				return newCommunities;
			});
			
			return newCommunity.id;
		},
		
		// Join community
		join: (communityId, userId) => {
			update(communities => {
				const updatedCommunities = communities.map(community => {
					if (community.id === communityId) {
						return {
							...community,
							memberCount: community.memberCount + 1,
							members: [...(community.members || []), userId]
						};
					}
					return community;
				});
				saveToStorage('communities', updatedCommunities);
				return updatedCommunities;
			});
		},
		
		// Leave community
		leave: (communityId, userId) => {
			update(communities => {
				const updatedCommunities = communities.map(community => {
					if (community.id === communityId) {
						return {
							...community,
							memberCount: Math.max(0, community.memberCount - 1),
							members: (community.members || []).filter(id => id !== userId)
						};
					}
					return community;
				});
				saveToStorage('communities', updatedCommunities);
				return updatedCommunities;
			});
		},
		
		// Add report to community
		addReport: (communityId, report) => {
			update(communities => {
				const updatedCommunities = communities.map(community => {
					if (community.id === communityId) {
						return {
							...community,
							activeReports: community.activeReports + 1,
							reports: [...(community.reports || []), report]
						};
					}
					return community;
				});
				saveToStorage('communities', updatedCommunities);
				return updatedCommunities;
			});
		},
		
		// Mark item as found
		markFound: (communityId) => {
			update(communities => {
				const updatedCommunities = communities.map(community => {
					if (community.id === communityId) {
						const newFoundCount = community.foundItems + 1;
						const newRating = Math.min(5, ((community.rating * community.foundItems) + 5) / newFoundCount);
						return {
							...community,
							foundItems: newFoundCount,
							rating: parseFloat(newRating.toFixed(1)),
							activeReports: Math.max(0, community.activeReports - 1)
						};
					}
					return community;
				});
				saveToStorage('communities', updatedCommunities);
				return updatedCommunities;
			});
		},
		
		// Get communities by location
		getByLocation: (location) => {
			return new Promise((resolve) => {
				let currentCommunities = [];
				
				const unsubscribe = subscribe(communities => {
					currentCommunities = communities;
				});
				unsubscribe();
				
				const filtered = currentCommunities.filter(community => 
					community.location.toLowerCase().includes(location.toLowerCase())
				);
				
				resolve(filtered);
			});
		},
		
		// Get communities by item type
		getByItemType: (itemType) => {
			return new Promise((resolve) => {
				let currentCommunities = [];
				
				const unsubscribe = subscribe(communities => {
					currentCommunities = communities;
				});
				unsubscribe();
				
				const filtered = currentCommunities.filter(community => 
					community.itemTypes && community.itemTypes.includes(itemType)
				);
				
				resolve(filtered);
			});
		},
		
		// Search communities
		search: (keyword) => {
			return new Promise((resolve) => {
				let currentCommunities = [];
				
				const unsubscribe = subscribe(communities => {
					currentCommunities = communities;
				});
				unsubscribe();
				
				if (!keyword.trim()) {
					resolve(currentCommunities);
					return;
				}
				
				const searchTerm = keyword.toLowerCase();
				const filtered = currentCommunities.filter(community => 
					community.name.toLowerCase().includes(searchTerm) ||
					community.description.toLowerCase().includes(searchTerm) ||
					community.location.toLowerCase().includes(searchTerm) ||
					(community.itemTypes && community.itemTypes.some(type => type.toLowerCase().includes(searchTerm)))
				);
				
				resolve(filtered);
			});
		},
		
		// Get leaderboard
		getLeaderboard: () => {
			return new Promise((resolve) => {
				let currentCommunities = [];
				
				const unsubscribe = subscribe(communities => {
					currentCommunities = communities;
				});
				unsubscribe();
				
				const sorted = [...currentCommunities]
					.sort((a, b) => b.foundItems - a.foundItems)
					.slice(0, 10);
				
				resolve(sorted);
			});
		},
		
		// Reset all data
		reset: () => {
			set([]);
			if (browser) {
				localStorage.removeItem('communities');
			}
		}
	};
}

export const communities = createCommunityStore();

// Create volunteer store
function createVolunteerStore() {
	const { subscribe, set, update } = writable(loadFromStorage('volunteers') || []);

	return {
		subscribe,
		
		// Add a new volunteer
		add: (volunteer) => {
			const newVolunteer = {
				...volunteer,
				id: generateId(),
				joinedAt: new Date().toISOString(),
				itemsFound: 0,
				rating: 0,
				badges: []
			};
			
			update(volunteers => {
				const newVolunteers = [...volunteers, newVolunteer];
				saveToStorage('volunteers', newVolunteers);
				return newVolunteers;
			});
			
			return newVolunteer.id;
		},
		
		// Add found item to volunteer
		addFoundItem: (volunteerId) => {
			update(volunteers => {
				const updatedVolunteers = volunteers.map(volunteer => {
					if (volunteer.id === volunteerId) {
						const newFoundCount = volunteer.itemsFound + 1;
						const newRating = Math.min(5, ((volunteer.rating * volunteer.itemsFound) + 5) / newFoundCount);
						return {
							...volunteer,
							itemsFound: newFoundCount,
							rating: parseFloat(newRating.toFixed(1))
						};
					}
					return volunteer;
				});
				saveToStorage('volunteers', updatedVolunteers);
				return updatedVolunteers;
			});
		},
		
		// Add badge to volunteer
		addBadge: (volunteerId, badge) => {
			update(volunteers => {
				const updatedVolunteers = volunteers.map(volunteer => {
					if (volunteer.id === volunteerId) {
						return {
							...volunteer,
							badges: [...(volunteer.badges || []), badge]
						};
					}
					return volunteer;
				});
				saveToStorage('volunteers', updatedVolunteers);
				return updatedVolunteers;
			});
		},
		
		// Get leaderboard
		getLeaderboard: () => {
			return new Promise((resolve) => {
				let currentVolunteers = [];
				
				const unsubscribe = subscribe(volunteers => {
					currentVolunteers = volunteers;
				});
				unsubscribe();
				
				const sorted = [...currentVolunteers]
					.sort((a, b) => b.itemsFound - a.itemsFound)
					.slice(0, 10);
				
				resolve(sorted);
			});
		},
		
		// Reset all data
		reset: () => {
			set([]);
			if (browser) {
				localStorage.removeItem('volunteers');
			}
		}
	};
}

export const volunteers = createVolunteerStore();
