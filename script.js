/* script.js */

// Tangkap event submit pada form order-form
document.getElementById('order-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};

  // Untuk setiap input, jika terdapat lebih dari satu nilai (checkbox dengan nama sama) maka dikumpulkan dalam array
  formData.forEach((value, key) => {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  });

  // Simpan data pesanan ke localStorage
  localStorage.setItem('orderData', JSON.stringify(data));

  // Redirect ke halaman checkout
  window.location.href = 'checkout.html';
});
