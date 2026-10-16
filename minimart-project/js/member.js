// ===== member.js – TV5: Hội viên & Ưu đãi =====

// Bấm nút ☰ để mở/đóng menu trên điện thoại
function doiMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.className = "nav open";
  } else {
    menu.className = "nav";
  }
}

// Email hợp lệ (bản đơn giản): có chữ @ và có dấu chấm sau @
function emailHopLe(email) {
  var viTri = email.indexOf("@");
  return viTri > 0 && email.indexOf(".", viTri) > viTri + 1 && email.charAt(email.length - 1) !== ".";
}

// ----- Đăng ký -----
function dangKy() {
  var ten = document.getElementById("dkTen").value.trim();
  var email = document.getElementById("dkEmail").value.trim();
  var matKhau = document.getElementById("dkMatKhau").value;
  var hopLe = true;

  document.getElementById("loiDkTen").innerText = "";
  document.getElementById("loiDkEmail").innerText = "";
  document.getElementById("loiDkMatKhau").innerText = "";
  document.getElementById("dkThanhCong").style.display = "none";

  if (ten === "") {
    document.getElementById("loiDkTen").innerText = "Vui lòng nhập họ tên";
    hopLe = false;
  }
  if (email === "") {
    document.getElementById("loiDkEmail").innerText = "Vui lòng nhập email";
    hopLe = false;
  } else if (!emailHopLe(email)) {
    document.getElementById("loiDkEmail").innerText = "Email không hợp lệ (thiếu @ hoặc tên miền)";
    hopLe = false;
  }
  if (matKhau === "") {
    document.getElementById("loiDkMatKhau").innerText = "Vui lòng nhập mật khẩu";
    hopLe = false;
  } else if (matKhau.length < 6) {
    document.getElementById("loiDkMatKhau").innerText = "Mật khẩu phải có ít nhất 6 ký tự";
    hopLe = false;
  }

  if (hopLe) {
    var tb = document.getElementById("dkThanhCong");
    tb.innerText = "✔ Đăng ký thành công! Chào mừng " + ten + ", hãy đăng nhập ở khung bên cạnh.";
    tb.style.display = "block";
  }
}

// ----- Đăng nhập -----
function dangNhap() {
  var email = document.getElementById("dnEmail").value.trim();
  var matKhau = document.getElementById("dnMatKhau").value;
  var hopLe = true;

  document.getElementById("loiDnEmail").innerText = "";
  document.getElementById("loiDnMatKhau").innerText = "";

  if (email === "") {
    document.getElementById("loiDnEmail").innerText = "Vui lòng nhập email";
    hopLe = false;
  } else if (!emailHopLe(email)) {
    document.getElementById("loiDnEmail").innerText = "Email không hợp lệ (thiếu @ hoặc tên miền)";
    hopLe = false;
  }
  if (matKhau === "") {
    document.getElementById("loiDnMatKhau").innerText = "Vui lòng nhập mật khẩu";
    hopLe = false;
  }

  // Hợp lệ -> ẩn khu khách, hiện khu hội viên
  if (hopLe) {
    document.getElementById("khuKhach").style.display = "none";
    document.getElementById("khuHoiVien").style.display = "block";
    window.scrollTo(0, 0);
  }
}

// ----- Đăng xuất: quay lại khu khách -----
function dangXuat() {
  document.getElementById("khuHoiVien").style.display = "none";
  document.getElementById("khuKhach").style.display = "block";
  document.getElementById("dnEmail").value = "";
  document.getElementById("dnMatKhau").value = "";
  window.scrollTo(0, 0);
}
