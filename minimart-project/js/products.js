// ===== products.js – TV2: Lọc danh mục + tìm kiếm =====

// Danh mục đang chọn (mặc định: tất cả)
var loaiHienTai = "tatca";

// Bấm nút ☰ để mở/đóng menu trên điện thoại
function doiMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.className = "nav open";
  } else {
    menu.className = "nav";
  }
}

// Bấm nút danh mục
function loc(loai, nut) {
  loaiHienTai = loai;

  // Đổi màu nút đang chọn
  var cacNut = document.getElementsByClassName("btn-loc");
  for (var i = 0; i < cacNut.length; i++) {
    cacNut[i].className = "btn-loc";
  }
  nut.className = "btn-loc active";

  capNhat();
}

// Gõ vào ô tìm kiếm
function timKiem() {
  capNhat();
}

// Ẩn/hiện thẻ theo cả danh mục và từ khóa
function capNhat() {
  var tuKhoa = document.getElementById("timkiem").value.toLowerCase().trim();
  var cacThe = document.getElementsByClassName("the");
  var soThe = 0; // đếm số thẻ đang hiện

  for (var i = 0; i < cacThe.length; i++) {
    var ten = cacThe[i].getElementsByClassName("card-ten")[0].innerText.toLowerCase();
    var dungLoai = (loaiHienTai === "tatca" || cacThe[i].dataset.category === loaiHienTai);
    var dungTen = ten.includes(tuKhoa);

    if (dungLoai && dungTen) {
      cacThe[i].style.display = "block";
      soThe = soThe + 1;
    } else {
      cacThe[i].style.display = "none";
    }
  }

  // Không có thẻ nào -> hiện dòng "Không tìm thấy"
  var dong = document.getElementById("khongthay");
  if (soThe === 0) {
    dong.style.display = "block";
  } else {
    dong.style.display = "none";
  }
}

// Bấm "Thêm vào giỏ" trên một thẻ sản phẩm
function themGio(nut) {
  var the = nut.closest(".the");
  var ten = the.getElementsByClassName("card-ten")[0].innerText;
  var gia = Number(the.getElementsByClassName("card-gia")[0].innerText.replace(/\D/g, "")); // "32.000đ" -> 32000
  var hinh = the.getElementsByTagName("img")[0].getAttribute("src"); // đường dẫn ảnh

  var gio = [];
  try { gio = JSON.parse(localStorage.getItem("gioHang")) || []; } catch (e) {}

  var daCo = false;
  for (var i = 0; i < gio.length; i++) {
    if (gio[i].ten === ten) {
      gio[i].sl = Math.min(gio[i].sl + 1, 10);
      daCo = true;
    }
  }
  if (!daCo) {
    gio.push({ ten: ten, gia: gia, hinh: hinh, sl: 1 });
  }
  try { localStorage.setItem("gioHang", JSON.stringify(gio)); } catch (e) {}

  var tb = document.getElementById("thongbao");
  tb.innerText = "✔ Đã thêm \"" + ten + "\" vào giỏ hàng";
  tb.style.display = "block";
  setTimeout(function () {
    tb.style.display = "none";
  }, 2000);
}
