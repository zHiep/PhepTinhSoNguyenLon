import { APP } from './xuatfile.js'

(function () {
    var DELIMITER = ',';
    var NEWLINE = '\n';
    var qRegex = /^"|"$/g;
    var i = document.getElementById('file');
    var clearTable = document.getElementById('clearTable');
    var table = document.getElementById('table');

    if (!i) {
        return;
    }

    i.addEventListener('change', function () {
        if (!!i.files && i.files.length > 0) {
            parseCSV(i.files[0]);
        }
    });

    clearTable.addEventListener('click', function () {
        console.log(APP)
        var tbody = table.getElementsByTagName('tbody')[0];

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        var fileInput = document.getElementById('file');
        fileInput.value = ''; // Thiết lập giá trị của input type file thành rỗng
        if (fileInput.value === '') {
            // Nếu giá trị của input type file đã được thiết lập thành rỗng,
            // tạo một sự kiện change để cập nhật trạng thái của input type file
            var event = new Event('change');
            fileInput.dispatchEvent(event);
        }
        document.getElementById('tongLuong').value = "";
        document.getElementById('tbLuong').value = "";
        APP.data = [];
    });

    function parseCSV(file) {
        if (!file || !FileReader) {
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            toTable(e.target.result);
        };

        reader.readAsText(file);
    }

    function toTable(text) {
        if (!text || !table) {
            return;
        }

        // clear table
        while (!!table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }
        console.log(text)
        var rows = text.split(NEWLINE);
        var headers = rows.shift().trim().split(DELIMITER);
        var hd = document.createElement('thead');
        var bd = document.createElement('tbody');
        var htr = document.createElement('tr');
        
        headers.forEach(function (h) {
            var th = document.createElement('th');
            var ht = h.trim();

            if (!ht) {
                return;
            }

            th.textContent = ht.replace(qRegex, '');
            htr.appendChild(th);
        });

        hd.appendChild(htr);
        table.appendChild(hd);

        var rtr;
        rows.forEach(function (r) {
            r = r.trim();

            if (!r) {
                return;
            }

            var cols = r.split(DELIMITER);

            if (cols.length === 0) {
                return;
            }

            rtr = document.createElement('tr');

            var arr = [];
            cols.forEach(function (c) {
                var td = document.createElement('td');
                var tc = c.trim();
                td.textContent = tc.replace(qRegex, '');
                arr.push(tc.replace(qRegex, ''))
                rtr.appendChild(td);
            });
            APP.data.push(arr);

            bd.appendChild(rtr);
        });
        table.appendChild(bd);
    }
})();