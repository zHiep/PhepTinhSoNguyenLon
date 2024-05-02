

const btnnhan = document.getElementById('btnnhan');
const btnchia = document.getElementById('btnchia');
const btncong = document.getElementById('btncong');
const btntru = document.getElementById('btntru');
const btnrandom = document.getElementById('btnrandom');
const btnclear = document.getElementById('btnclear');
var result = document.getElementById('result');

btnnhan.onclick = function () {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    result.value = multiply(num1,num2);
    document.getElementById('ketqua').innerText = 'Kết quả phép nhân : '
}
btncong.onclick = function () {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    document.getElementById('ketqua').innerText = 'Kết quả phép cộng : '
    result.value = addition(num1,num2);
}
btntru.onclick = function () {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    document.getElementById('ketqua').innerText = 'Kết quả phép trừ : '
    result.value = subtraction(num1,num2);
}
btnchia.onclick = function () {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    document.getElementById('ketqua').innerText = 'Kết quả phép chia : '
    result.value = division(num1,num2,10);
}
btnclear.onclick = function () {
    document.getElementById("num1").value = '';
    document.getElementById("num2").value = '';
    document.getElementById('ketqua').innerText = 'Kết quả :'
    document.getElementById("result").value = '';
}
btnrandom.onclick = function () {
    var lengthNum1 = document.getElementById('select1').value ;
    var lengthNum2 = document.getElementById('select2').value ;
    randomNumber(lengthNum1,lengthNum2);
    document.getElementById("result").value = '';
    document.getElementById('ketqua').innerText = 'Kết quả :'
}

//Hàm so sánh 2 số, trả về số lớn hơn
function numBigger(num1, num2) {
    let numBig = "";
    if (num1.length > num2.length) {
        numBig = num1;
    } else if (num2.length > num1.length) {
        numBig = num2;
    } else if (num1.length == num2.length) {
        for (let i = 0; i < num1.length; i++) {
            if (num1.charAt(i) > num2.charAt(i)) {
                numBig = num1;
                break;
            } else if (num1.charAt(i) < num2.charAt(i)) {
                numBig = num2;
                break;
            }
        }
    }
    return numBig;
}

//Hàm thêm 0 vào đầu mảng
function addZero(arr, k) {
    let count = 0;
    while (count < k) {
        //Phương thức unshift() thêm 0 vào đầu mảng
        arr.unshift(0);
        count++;
    }
}

//Hàm Tính nhân
function multiply(num1, num2) { 
    //biến để kiểm tra xem kết quả âm hay dương
    let negative = false;
 if ((num1.charAt(0) != '-' && num2.charAt(0) === '-') || (num1.charAt(0) === '-' && num2.charAt(0) != '-')) {
        negative = true;
    }
    //xóa hết dấu âm
    num1 = num1.replace('-', '');
    num2 = num2.replace('-', '');
    let m = num1.length,
        n = num2.length;
    if (num1.replace('0', '') == ''||num2.replace('0', '') == '') {
        return "0";
    }
    //khai báo một mảng mới với m+n phần tử, và khởi tạo giá trị mặc định các phần tư là 0
    let res = Array(m + n).fill(0)
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            let temp = num1.charAt(j) * num2.charAt(i)
            //console.log('temp1: ' + temp);
            let posLow = i + j + 1
            let posHigh = i + j
            temp += res[posLow]
            res[posLow] = temp % 10
            //Hàm Math.trunc() trả về giá trị nguyên của đối số truyền vào
            res[posHigh] += Math.trunc(temp / 10)
        }
    }
    while (res[0] === 0) {
        //Hàm shift() xóa phần tử đầu tiên của mảng res
        res.shift()
    }
    var result = res.length === 0 ? "0" : res.join('');
    //thêm dấu âm nếu cần
    if (negative) result = '-' + result;
    return result;
};
//Hàm Tính Chia
function division(num1, num2, dec) {
    //biến để kiểm tra xem kết quả âm hay dương
    let negative = false;
if ((num1.charAt(0) != '-' && num2.charAt(0) === '-') || (num1.charAt(0) === '-' && num2.charAt(0) != '-')) {
        negative = true;}
    //xóa hết dấu âm
    num1 = num1.replace('-', '');
    num2 = num2.replace('-', '');
    var ans = "";
    var count = 0;
    if (num2.replace('0', '') == '') {
        ans = "Không hợp lệ, số chia phải khác 0";
        return ans;
    } else {
        if (num1.replace('0', '') == '') {
            ans = "0";
            return ans;
        } else {
            if (num1 == num2) {
                ans = "1";return ans;
            } else {
                let phandu = "";                            
                let temp = num1.substring(0, num2.length);  
                let subNum1 = temp;                         
                let flag = true;                             

                while (ans.length <= 100) {
                    for (let i = 1; i <= 10; i++) {
                        let mul = multiply(num2, i.toString());
                        if (numBigger(temp, mul) == mul) {           
                            ans += (i - 1);                       
                            phandu = subtraction(temp, multiply(num2, (i - 1).toString()));
                            break;
                        }
                    }
                    if (subNum1.length < num1.length) {
                        if (phandu == 0) phandu = "";
                        subNum1 = num1.substring(0, subNum1.length + 1);
                        temp = phandu + num1.substring(subNum1.length - 1, subNum1.length);
                    } else {
                        if (phandu == 0) {
                            break;
                        } else {
                            if (flag) {
                                ans += ".";
                                flag = false;
                            }
                            count++;
                            temp = phandu + "0";
                            if(count > dec) {break;}
                        }
                    }
                }
            }
        }
    }
    let res = ans.split('');
    while (res[0] == 0 && res[1] != '.') {
        //Hàm shift() xóa phần tử đầu tiên của mảng res
        res.shift()
    }
    var result = res.length === 0 ? "0" : res.join('');
    //thêm dấu âm nếu cần
    if (negative) result = '-' + result;
    return result;
}

//Hàm tính trừ
function subtraction(num1, num2) {
    if ((num1.charAt(0) != '-' && num2.charAt(0) === '-') || (num1.charAt(0) === '-' && num2.charAt(0) != '-')) {
        if (num1.charAt(0) === '-') {
            return addition(num1, '-' + num2);
        } else {
            return addition(num1, num2.replace('-', ''));
        }
    } else {
        //biến để kiểm tra xem kết quả cần đảo dấu
        let negative = false;
        if (num1.charAt(0) === '-') {
            negative = true;
        }
        //xóa hết dấu âm
        num1 = num1.replace('-', '');
        num2 = num2.replace('-', '');
        //convert String to Array
        var Arr1 = num1.split('');
        var Arr2 = num2.split('');
//map(Number) lấy từng giá trị trong mảng xử lý và trả về kết quả theo kiểu đối tượng Number và truyền các tham số tới Number
        var res = Arr1.map(Number);
        var sub = Arr2.map(Number);
        let reminder = 0;
        let diff = res.length - sub.length;
        if (numBigger(num1, num2) == num1 || numBigger(num1, num2) == "") {
            addZero(sub, diff)
            let count = res.length - 1
            while (count >= 0) {
                let sum = res[count] - sub[count] - reminder;
                if (sum < 0) {
                    res[count] = sum + 10
                    reminder = 1
                } else {
                    res[count] = sum
                    reminder = 0
                }
                count--;
            }
            while (res[0] === 0) {
                res.shift();
            }
            if (negative && res.length != 0) {
                res.unshift(0);
                res[0] = '-';
            }
        } else {
            ///Math.abs() trả về giá trị tuyệt đối của một số
            addZero(res, Math.abs(diff))
            let count = res.length - 1
            while (count >= 0) {
                let sum = sub[count] - res[count] - reminder;
                if (sum < 0) {
                    res[count] = sum + 10
                    reminder = 1
                } else {
                    res[count] = sum
                    reminder = 0
                }
                count--;
            }

            while (res[0] === 0) {
                res.shift();
            }
            if (!negative && res.length != 0) {
                res.unshift(0);
                res[0] = '-';
            }
        }
        var result = res.length == 0 ? "0" : res.join('');
        return result;
    }
}
// Hàm tính cộng 
function addition(num1, num2) {
    //var start = performance.now();
    if ((num1.charAt(0) != '-' && num2.charAt(0) === '-') || (num1.charAt(0) === '-' && num2.charAt(0) != '-')) {
        if (num1.charAt(0) === '-') {
            return subtraction(num2, num1.replace('-', ''));
        } else {
            return subtraction(num1, num2.replace('-', ''));
        }
    } else {
        //biến để kiểm tra xem kết quả cần đảo dấu
        let negative = false;

        if (num1.charAt(0) === '-') {
            negative = true;
        }
        //xóa hết dấu âm
        num1 = num1.replace('-', '');
        num2 = num2.replace('-', '');
        //convert String to Array
        var Arr1 = num1.split('');
        var Arr2 = num2.split('');
        //map(Number) lấy từng giá trị trong mảng xử lý và trả về kết quả theo kiểu đối tượng Number và truyền các tham số tới Number
        var res = Arr1.map(Number);
        var sub = Arr2.map(Number);
        var reminder = 0;
        let diff = res.length - sub.length;
        if (diff > 0) {
            addZero(sub, diff)
        } else if (diff < 0) {
            ///Math.abs() trả về giá trị tuyệt đối của một số
            addZero(res, Math.abs(diff));
        }
        let count = res.length - 1
        while (count >= 0) {
            let sum = res[count] + sub[count] + reminder;
            res[count]=sum%10; 
//Lấy giá trị hàng đơn vị, chia dư lấy 10 
            reminder = Math.floor(sum / 10); 
//Lấy giá trị nhớ reminder, dùng math floor lấy giá trị nguyên làm tròn phép chia của kết quả vừa được / cho 10
            count--;
        }
        if (reminder === 1) {
            res.unshift(1);
        }
        while (res[0] === 0) {
            res.shift();
        }
        if (negative && res.length != 0) {
            res.unshift(0);
            res[0] = '-';
        }
        //convert những giá trị của mảng res sang string
        var result = res.length === 0 ? "0" : res.join(''); 
        //var per = performance.now() - start;
        //document.getElementById("runningTime").value = per;
        return result;
    }
}

//Hàm sinh Số Ngẫu Nhiên
function randomNumber(lengthNum1, lenghtNum2) {
    //var biggerLength = num1Length >= num2Length ? num1Length : num2Length;
    var biggerLengthNum1 =  Math.floor(Math.random() * lengthNum1); // random từ 0 -> length
    var biggerLengthNum2 =  Math.floor(Math.random() * lenghtNum2);
    var num1 = "0";
    var num2 = "0";
    ///tạo ra số ngẫu nhiên
    for (let i = 0; i < biggerLengthNum1 + 1; i++) {
        num1+= Math.floor(Math.random() * 10);
    }
    for (let i = 0; i < biggerLengthNum2 + 1; i++) {
        num2+= Math.floor(Math.random() * 10);
    }
    //convert String to Array
    var Arr1 = num1.split('');
    var Arr2 = num2.split('');
    while (Arr1[0] === '0' && Arr1.length > 1) {
        Arr1.shift();
    }
    while (Arr2[0] === '0' && Arr2.length > 1) {
        Arr2.shift();
    }
    if(Arr1[0] != '0') {
        Arr1.unshift(randomDau());
    }
    if(Arr2[0] != '0') {
        Arr2.unshift(randomDau());
    }
    var res1 = Arr1.join('');
    var res2 = Arr2.join('');
    
    console.log(res1)
    console.log(res1)
    ////Phương thức toLocaleString để show fullwide của number và tránh ký tự khoa học với số lớn.
    document.getElementById("num1").value = res1;
    document.getElementById("num2").value = res2;
}

//Hàm random dấu (-) (+)
function randomDau() {
    // Sinh ra một số ngẫu nhiên từ 0 đến 1
    var randomNumber = Math.random();
  
    // Nếu số ngẫu nhiên lớn hơn hoặc bằng 0.5, trả về dấu trừ, ngược lại trả về dấu cộng
    if (randomNumber >= 0.5) {
      return "-";
    } else {
      return "";
    }
  }

//Hàm tính trung bình lương
function trungBinhLuong() {
    // Lấy reference đến table
    var table = document.getElementById('table');
    
    // Lấy reference đến tbody trong table
    var tbody = table.getElementsByTagName('tbody')[0];

    // Lấy tất cả các dòng trong tbody
    var rows = tbody.getElementsByTagName('tr');

    // Đếm số lượng cán bộ
    var count = 1;

    const tongLuong = document.getElementById('tongLuong');
    const tbLuong = document.getElementById('tbLuong');

    var sum = rows[0].getElementsByTagName('td')[2].textContent;
    // Duyệt qua từng dòng trong tbody
    for (var i = 1; i < rows.length; i++) {
        // Lấy reference đến cell lương của dòng hiện tại
        
        var salaryCell = rows[i].getElementsByTagName('td')[2];
        // Lấy lương từ cell và chuyển đổi thành số
        var salary = salaryCell.textContent;
        sum = addition(sum,salary)
        count++;
    }

    tongLuong.value = formatNumber(sum) + ' VNĐ';

    // Tính lương trung bình
    var luongtb = division(sum,count.toString(),2);

    // Hiển thị kết quả
    tbLuong.value = formatNumber(luongtb) + ' VNĐ';
}

function formatNumber(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function openTab(evt, tabName) {
    // Get all elements with class="tab-content" and hide them
    var tabcontent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tab-button" and remove the class "active"
    var tablinks = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}






