// ===== detail.js – TV3: Chi tiết sản phẩm =====

// Bấm nút ☰ để mở/đóng menu trên điện thoại
function doiMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.className = "nav open";
  } else {
    menu.className = "nav";
  }
}

// Tăng/giảm số lượng (từ 1 đến 10)
function doiSL(n) {
  var so = Number(document.getElementById("sl").innerText);
  so = so + n;
  if (so < 1) { so = 1; }
  if (so > 10) { so = 10; }
  document.getElementById("sl").innerText = so;
}

// Thông tin sản phẩm của trang này
var SAN_PHAM = { ten: "Sữa tươi nguyên chất 1L", gia: 32000, hinh: "images/products/sua-tuoi.jpg" };

// Bấm "Thêm vào giỏ" -> lưu vào giỏ hàng rồi hiện thông báo 2 giây
function themGio() {
  var so = Number(document.getElementById("sl").innerText);

  // Đọc giỏ hiện có
  var gio = [];
  try { gio = JSON.parse(localStorage.getItem("gioHang")) || []; } catch (e) {}

  // Đã có sản phẩm này thì cộng thêm số lượng, chưa có thì thêm mới
  var daCo = false;
  for (var i = 0; i < gio.length; i++) {
    if (gio[i].ten === SAN_PHAM.ten) {
      gio[i].sl = Math.min(gio[i].sl + so, 10);
      daCo = true;
    }
  }
  if (!daCo) {
    gio.push({ ten: SAN_PHAM.ten, gia: SAN_PHAM.gia, hinh: SAN_PHAM.hinh, sl: so });
  }
  try { localStorage.setItem("gioHang", JSON.stringify(gio)); } catch (e) {}

  var tb = document.getElementById("thongbao");
  tb.innerText = "✔ Đã thêm " + so + " sản phẩm vào giỏ hàng";
  tb.style.display = "block";
  setTimeout(function () {
    tb.style.display = "none";
  }, 2000);
}

// Mở rộng: bấm ảnh nhỏ để đổi ảnh lớn
function doiAnh(hinh) {
  document.getElementById("anhLon").src = hinh;
}
