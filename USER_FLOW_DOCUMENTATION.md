# 📋 Report Status System - User Flow Documentation

## 🎯 Overview
Sistem **Report Status** adalah fitur komprehensif yang memungkinkan pengguna untuk melacak progress laporan barang hilang mereka secara real-time dengan antarmuka yang interaktif dan mudah digunakan.

## 🌟 Fitur Utama

### 1. 📊 Progress Tracker
- **Visual progress bar** dengan persentase completion
- **Step-by-step indicator** dengan ikon dan warna berbeda
- **Status badge** untuk setiap tahap (Pending/Active/Complete)
- **Estimasi waktu** untuk setiap tahap proses

### 2. 📋 Timeline Activity
- **Riwayat lengkap** semua update status
- **Timestamp detail** dengan format yang mudah dibaca
- **Catatan admin** untuk setiap perubahan status
- **Summary statistics** (total update, hari aktif, dll)

### 3. 🔔 Notification System
- **Real-time notifications** untuk perubahan status
- **Berbagai jenis notifikasi** (status update, comment, evidence)
- **Mark as read functionality**
- **Notification settings** untuk mengatur preferensi

### 4. 💬 Chat System
- **Direct chat** dengan admin security
- **Real-time messaging** dengan typing indicator
- **Quick message templates**
- **Message history** dengan timestamp
- **Admin response simulation**

### 5. 📎 Evidence Upload
- **Drag & drop file upload**
- **Support multiple formats** (JPG, PNG, GIF, MP4, WebM)
- **File validation** (ukuran maksimal 10MB)
- **Preview modal** untuk melihat evidence
- **Download functionality**

### 6. 📱 QR Code System
- **Unique QR code** untuk setiap laporan
- **Quick access link** generation
- **Print & download** QR code
- **Share functionality** (native share API)
- **Copy to clipboard** features

### 7. ✅ Close Report Function
- **Manual close** oleh pelapor
- **Notes requirement** untuk penutupan
- **Status update** otomatis ke "CLOSED"
- **Confirmation dialog** untuk keamanan

## 🎨 Color Scheme & Status

### Status Colors
- 🔵 **RECEIVED** - `#3B82F6` (Blue) - Laporan Diterima
- 🟠 **VERIFYING** - `#F59E0B` (Orange) - Sedang Diverifikasi  
- 🟡 **SEARCHING** - `#EAB308` (Yellow) - Sedang Dicari
- 🟢 **FOUND** - `#10B981` (Green) - Barang Ditemukan
- ✅ **CLOSED** - `#059669` (Dark Green) - Laporan Selesai
- ❌ **CANCELLED** - `#EF4444` (Red) - Dibatalkan

### UI Colors
- **Primary**: Blue gradient (`#3B82F6` to `#2563EB`)
- **Success**: Green gradient (`#10B981` to `#059669`) 
- **Warning**: Yellow/Orange (`#F59E0B` to `#D97706`)
- **Danger**: Red gradient (`#EF4444` to `#DC2626`)
- **Background**: Light gray (`#F9FAFB`)
- **Cards**: White with shadow and border

## 🚀 User Flow: Dari Laporan hingga Selesai

### 1. 📝 Membuat Laporan (Starting Point)
```
[Pengguna mengisi form laporan barang hilang]
        ↓
[Sistem generate reference number & QR code]
        ↓
[Status: RECEIVED - Laporan diterima]
        ↓
[Notifikasi otomatis dikirim ke pengguna]
```

### 2. 🔍 Mengakses Status Laporan
```
Metode Akses:
├── A. Via Reference Number
│   ├── Kunjungi halaman /status
│   ├── Input nomor referensi (LI-2024-XXXXXX)
│   └── Klik "Cari Laporan"
│
├── B. Via QR Code  
│   ├── Scan QR code dengan smartphone
│   ├── Klik link yang muncul
│   └── Langsung masuk ke halaman status
│
└── C. Via Direct Link
    ├── Klik link dari email/SMS notifikasi
    └── Langsung masuk ke halaman status
```

### 3. 📊 Melihat Progress Tracker
```
[Progress Bar Visual]
├── Step 1: 📨 RECEIVED (0-20%)
├── Step 2: 🔍 VERIFYING (20-40%) 
├── Step 3: 🔎 SEARCHING (40-80%)
├── Step 4: ✅ FOUND (80-99%)
└── Step 5: 🎉 CLOSED (100%)

[Status Indicators]
├── ✅ Completed: Green circle dengan checkmark
├── 🔵 Current: Blue circle dengan ikon status
└── ⚪ Pending: Gray circle dengan nomor step
```

### 4. 📋 Monitoring Timeline Activity
```
[Newest Updates First]
├── [Timestamp] Status changed to FOUND
│   ├── 📅 Date & Time
│   ├── 📝 Admin notes  
│   └── 🏷️ Status badge
│
├── [Timestamp] Evidence uploaded
├── [Timestamp] Admin comment added
└── [Timestamp] Status changed to SEARCHING
```

### 5. 🔔 Receiving Notifications
```
[Auto Notifications Triggered]
├── Status Update
│   ├── Message: "Status laporan berubah menjadi: [Status]"
│   ├── Type: status_update
│   └── Action: Mark as read
│
├── New Comment
│   ├── Message: "Admin menambahkan komentar baru"
│   ├── Type: new_comment  
│   └── Action: View in chat
│
└── Evidence Added
    ├── Message: "Bukti baru telah ditambahkan"
    ├── Type: evidence_added
    └── Action: View evidence
```

### 6. 💬 Interacting via Chat
```
[Chat Interface]
├── User Message
│   ├── Bubble: Blue (right aligned)
│   ├── Timestamp: Relative time
│   └── Status: ✓ (sent)
│
├── Admin Response  
│   ├── Bubble: White with border (left aligned)
│   ├── Admin badge: 👨‍💼 Admin Security
│   ├── Timestamp: Relative time
│   └── Auto-response simulation
│
└── Quick Actions
    ├── "Bagaimana progress pencarian?"
    ├── "Ada update terbaru?"
    ├── "Kapan bisa diambil?"
    └── "Terima kasih"
```

### 7. 📎 Uploading Evidence
```
[Upload Process]
├── File Selection
│   ├── Drag & drop area
│   ├── File browser button
│   └── Format validation
│
├── Upload Progress
│   ├── Loading spinner
│   ├── Progress indication
│   └── Error handling
│
└── Evidence Display
    ├── Thumbnail preview
    ├── File information
    ├── View/Download actions
    └── Modal preview
```

### 8. 📱 Using QR Code Features
```
[QR Code Generation]
├── Auto-generated on report creation
├── Contains: Report reference + access URL
└── Visual: 200x200px canvas with pattern

[QR Code Actions]  
├── 📱 Show/Hide toggle
├── 💾 Download as PNG
├── 🖨️ Print with details
├── 📋 Copy reference number
├── 🔗 Copy status link
├── 📤 Native share (if supported)
└── 📧 Email share
```

### 9. ✅ Closing Report
```
[Close Report Process]
├── Conditions
│   ├── Status ≠ CLOSED
│   ├── Status ≠ CANCELLED
│   └── User is reporter
│
├── Action Flow
│   ├── Click "Tutup Laporan" button
│   ├── Modal dialog appears
│   ├── Enter closing notes (required)
│   ├── Confirm action
│   └── Status updated to CLOSED
│
└── Result
    ├── Progress bar shows 100%
    ├── Timeline updated with close event
    ├── Notification sent
    └── Report marked as isClosed: true
```

## 📱 Responsive Design Features

### Mobile Optimization
- **Touch-friendly buttons** (minimum 44px)
- **Swipe gestures** untuk carousel evidence
- **Collapsible sections** untuk menghemat ruang
- **Sticky header** dengan status summary

### Tablet Optimization  
- **Two-column layout** untuk progress & timeline
- **Side panel** untuk chat dan notifications
- **Grid view** untuk evidence gallery

### Desktop Optimization
- **Multi-column layout** dengan semua fitur visible
- **Keyboard shortcuts** untuk navigasi cepat
- **Tooltips** untuk guidance tambahan

## 🔧 Technical Implementation

### Components Structure
```
/status/+page.svelte (Main Page)
├── ProgressTracker.svelte
├── TimelineActivity.svelte  
├── NotificationPanel.svelte
├── ChatSystem.svelte
├── EvidenceUpload.svelte
└── QRCodeDisplay.svelte
```

### Store Updates
```javascript
// Enhanced store.js features
├── Status management (6 states)
├── Comment system  
├── Evidence handling
├── Notification queue
├── QR code generation
└── Close report functionality
```

### Key Functions
- `lostItems.findByReference()` - Cari laporan by ref number
- `lostItems.updateStatus()` - Update status + create notification
- `lostItems.addComment()` - Tambah komentar dengan timestamp
- `lostItems.addEvidence()` - Upload dan simpan evidence
- `lostItems.closeReport()` - Tutup laporan dengan notes
- `lostItems.markNotificationsRead()` - Mark notifications as read

## 💡 User Experience Tips

### Clarity & Guidance
- **Clear visual hierarchy** dengan ikon dan warna
- **Contextual help text** pada setiap section
- **Progress indicators** untuk semua async operations
- **Success feedback** untuk setiap action

### Accessibility  
- **Screen reader support** dengan proper ARIA labels
- **Keyboard navigation** untuk semua interactive elements
- **High contrast** color combinations
- **Text alternatives** untuk semua visual elements

### Performance
- **Lazy loading** untuk evidence images
- **Efficient state management** dengan Svelte stores
- **Optimized QR generation** dengan canvas
- **Debounced search** untuk reference lookup

## 🎯 Success Metrics

### User Engagement
- **Time spent** on status page
- **Frequency** of status checks
- **Chat interaction** rate
- **Evidence upload** completion

### System Efficiency
- **Response time** untuk status lookup
- **Notification delivery** success rate
- **File upload** success rate  
- **Report resolution** time

### User Satisfaction
- **Ease of use** ratings
- **Feature utilization** rates
- **Support ticket** reduction
- **Completion rate** untuk report closure

---

## 🚀 Quick Start Guide untuk Pengguna

### Langkah 1: Akses Status Laporan
1. Buka halaman **Report Status** dari menu navigasi
2. Masukkan nomor referensi laporan Anda (format: LI-2024-XXXXXX)
3. Klik tombol **"Cari Laporan"**

### Langkah 2: Monitor Progress
1. Lihat **Progress Tracker** untuk status terkini
2. Check **Timeline Activity** untuk riwayat update
3. Baca **Notifications** untuk info penting

### Langkah 3: Interaksi Aktif
1. Gunakan **Chat** untuk komunikasi dengan admin
2. Upload **Evidence** tambahan jika diperlukan
3. **Share QR Code** dengan keluarga untuk tracking bersama

### Langkah 4: Penutupan Laporan
1. Ketika barang ditemukan, klik **"Tutup Laporan"**
2. Berikan catatan penutupan
3. Konfirmasi untuk menyelesaikan proses

---

*Sistem ini dirancang untuk memberikan transparansi maksimal dan kemudahan tracking bagi pengguna, dengan fokus pada user experience yang intuitif dan informatif.*