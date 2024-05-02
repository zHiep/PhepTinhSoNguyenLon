const APP = {
  data: [],
  init() {
    APP.addListeners();
  },
  addListeners() {
    const form = document.querySelector('#collect form');
    form.addEventListener('submit', APP.saveData);

    document
      .getElementById('btnExport')
      .addEventListener('click', APP.exportData);
  },
  saveData(ev) {
    ev.preventDefault();

    // Lấy giá trị từ các trường input
    var macbValue = document.getElementById('macb').value.trim();
    var nameValue = document.getElementById('name').value.trim();
    var luongValue = document.getElementById('luong').value.trim();

    // Kiểm tra xem các trường đã được điền đầy đủ hay không
    if (macbValue === '' || nameValue === '' || luongValue === '') {
        alert('Vui lòng nhập đủ thông tin cho tất cả các trường!');
        return; // Dừng xử lý tiếp theo nếu có một trường không được nhập
    }
    // Kiểm tra xem giá trị nhập vào có phải là số hay không
    if (isNaN(luongValue)) {
        alert('Vui lòng nhập một số cho mục lương!');
        return; // Dừng xử lý tiếp theo nếu giá trị không phải là số
    }

    // Kiểm tra mã cán bộ trùng lặp
    // Lấy thẻ <table> bằng ID
    var table = document.getElementById('table');

    // Khởi tạo mảng để lưu trữ giá trị của cột "Ma can bo"
    var maCanBoArray = [];

    // Lặp qua các dòng trong tbody của bảng
    for (var i = 0, row; row = table.rows[i]; i++) {
        // Lấy giá trị của cột "Ma can bo" trong dòng hiện tại
        var maCanBo = row.cells[0].innerHTML;
        
        // Thêm giá trị vào mảng
        maCanBoArray.push(maCanBo);
    }

    if (maCanBoArray.indexOf(macbValue) !== -1) {
      alert("Mã cán bộ này đã tồn tại!");
      return;
    }


    const form = ev.target;
    const formdata = new FormData(form);
    //lưu dữ liệu trong APP.data
    APP.cacheData(formdata);
    //xây dựng một hàng trong bảng
    APP.buildRow(formdata);
    //xóa biểu mẫu
    form.reset();

    document.getElementById('macb').focus();

    document.getElementById('tongLuong').value = "";
    document.getElementById('tbLuong').value = "";
  },
  cacheData(formdata) {
    //trích xuất dữ liệu từ đối tượng FormData và cập nhật APP.data
    APP.data.push(Array.from(formdata.values()));
    console.log(Array.from(formdata.values()))
    console.table(APP.data);
  },
  buildRow(formdata) {
    const tbody = document.querySelector('#display > table > tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = '';
    let col = 0;
    console.log(formdata.entries())
    //lặp qua các mục đối tượng FormData và tạo một hàng với
    for (let entry of formdata.entries()) {
      tr.innerHTML += `<td>${entry[1]}</td>`;
      col++;
    }
    tbody.append(tr);
  },
  exportData() {
    //chèn hàng tiêu đề
    APP.data.unshift(['Ma can bo', 'Ho ten can bo', 'Luong']);
    //chuyển đổi mảng thành chuỗi có \n ở cuối
    let str = '';
    APP.data.forEach((row) => {
      str += row
        .map((col) => JSON.stringify(col))
        .join(',')
        .concat('\n');
    });

    //tạo file
    let filename = `dsCanBo.${Date.now()}.csv`;
    let file = new File([str], filename, { type: 'text/csv' });

    //tạo thẻ liên kết với thuộc tính "tải xuống"
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  }
};

export { APP }

document.addEventListener('DOMContentLoaded', APP.init);
