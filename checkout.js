/* checkout.js */

document.addEventListener('DOMContentLoaded', function () {
  const orderData = JSON.parse(localStorage.getItem('orderData'));
  const orderSummary = document.getElementById('order-summary');

  if (!orderData) {
    orderSummary.innerHTML = "<p>Tidak ada data pesanan ditemukan.</p>";
    return;
  }

  // Mapping harga ukuran
  const ukuranPrices = {
    "M": 50000,
    "L": 52000,
    "XL": 54000,
    "XXL": 56000
  };

  // Mapping harga pengiriman
  const pengirimanPrices = {
    "reguler": 8000,
    "instan": 25000
  };

  // Ambil data dari form
  const nama = orderData.nama || "";
  const alamat = orderData.alamat || "";
  const no_wa = orderData.no_wa || "";
  // Untuk warna, karena checkbox menggunakan name "warna[]" maka bisa berupa array
  let warna = orderData["warna[]"] || orderData.warna;
  if (Array.isArray(warna)) {
    warna = warna.join(', ');
  }
  const ukuran = orderData.ukuran || "";
  const jumlah = parseInt(orderData.jumlah) || 1;
  const proteksi = orderData.proteksi ? true : false;
  const pengiriman = orderData.pengiriman || "";

  // Hitung subtotal produk, biaya pengiriman, dan lain-lain
  const produkPrice = ukuranPrices[ukuran] || 0;
  const subtotalProduk = produkPrice * jumlah;
  const biayaPengiriman = pengirimanPrices[pengiriman] || 0;
  const proteksiCost = proteksi ? 8000 : 0;
  const biayaLayanan = 3000;

  // Total pembayaran
  const totalPembayaran = subtotalProduk + biayaPengiriman + proteksiCost + biayaLayanan;

  // Tampilkan rincian pembayaran
  orderSummary.innerHTML = `
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Alamat Lengkap:</strong> ${alamat}</p>
    <p><strong>Nomor WA:</strong> ${no_wa}</p>
    <p><strong>Warna:</strong> ${warna ? warna : '-'}</p>
    <p><strong>Ukuran:</strong> ${ukuran} (Rp ${produkPrice.toLocaleString('id-ID')})</p>
    <p><strong>Jumlah:</strong> ${jumlah}</p>
    <hr>
    <p><strong>Subtotal Produk:</strong> Rp ${subtotalProduk.toLocaleString('id-ID')}</p>
    <p><strong>Subtotal Pengiriman:</strong> Rp ${biayaPengiriman.toLocaleString('id-ID')}</p>
    <p><strong>Biaya Layanan:</strong> Rp ${biayaLayanan.toLocaleString('id-ID')}</p>
    <p><strong>Proteksi Kerusakan:</strong> Rp ${proteksiCost.toLocaleString('id-ID')}</p>
    <p><strong>Biaya Pengiriman:</strong> Rp ${biayaPengiriman.toLocaleString('id-ID')}</p>
    <hr>
    <p><strong>Total Pembayaran:</strong> Rp ${totalPembayaran.toLocaleString('id-ID')}</p>
  `;

  // Siapkan pesan untuk WhatsApp (kode WA dengan nomor 089522704503; pastikan pakai kode negara, misal 62 untuk Indonesia)
  const message = `Form Beli sekarang:
Nama: ${nama}
Alamat: ${alamat}
Nomor WA: ${no_wa}
Warna: ${warna ? warna : '-'}
Ukuran: ${ukuran} (Rp ${produkPrice.toLocaleString('id-ID')})
Jumlah: ${jumlah}
Subtotal Produk: Rp ${subtotalProduk.toLocaleString('id-ID')}
Subtotal Pengiriman: Rp ${biayaPengiriman.toLocaleString('id-ID')}
Biaya Layanan: Rp ${biayaLayanan.toLocaleString('id-ID')}
Proteksi Kerusakan: Rp ${proteksiCost.toLocaleString('id-ID')}
Total Pembayaran: Rp ${totalPembayaran.toLocaleString('id-ID')}`;

  const encodedMessage = encodeURIComponent(message);
  const waNumber = "6289522704503"; // nomor WA dengan kode negara (Indonesia: 62)
  const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

  // Tombol ORDER dan tombol Check Out (kedua tombol mengarah ke WhatsApp)
  document.getElementById('order-btn').addEventListener('click', function () {
    window.location.href = waUrl;
  });
  document.getElementById('whatsapp-btn').addEventListener('click', function () {
    window.location.href = waUrl;
  });
});
