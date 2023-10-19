// import { getDatabase, ref, set, child, update, remove, onValue,get,push } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"

let giohang = [];
let thanhtoan = [];

// import {TestFunc} from './firebase.js'

const logingetgo = () => {
  const kq = document.getElementById("boxlogin").children;
  const user = kq[1].value;
  const num = kq[2].value;
  const where = kq[3].value;
  const pass = kq[4].value;
  const pas = kq[5].value;

  const item = [user, num, where, pass, pas];
  thanhtoan.push(item);
  console.log(item);
  sessionStorage.setItem("thanhtoan", JSON.stringify(thanhtoan));
  window.location.assign("dk.html");
};

function login() {
  const tht = JSON.parse(sessionStorage.getItem("thanhtoan"));
  const kq = document.getElementById("boxlogin").children;
  const phoneNumber = kq[1].value;
  const password = kq[2].value;

  console.log("login", { phoneNumber, password });

  // for (let i = 0; i < tht.length; i++) {
  //     if (num == tht[i][1] && pass == tht[i][4]) {
  //         window.location.href = "index.html";
  //     } else {
  //         alert("Tài khoản hoặc mật khẩu không chính xác");
  //     }
  // }
}

const dangkydi = () => {
  window.location.href = "registerAccount.html";
};

const themvaogiohang = (x) => {
  const boxsp = x.parentElement.children;
  const hinh = boxsp[0].children[0].src;
  const gia = boxsp[1].children[0].innerText;
  const tensp = boxsp[2].innerText;
  const soluong = 1;

  const existingProductIndex = checkspgiohang(tensp);
  if (existingProductIndex >= 0) {
    capnhatslsp(existingProductIndex);
  } else {
    const sp = [hinh, gia, tensp, soluong];
    giohang.push(sp);
  }
  document.getElementById("countsp").innerHTML = giohang.length;
  sessionStorage.setItem("giohang", JSON.stringify(giohang));
  
};





const capnhatslsp = (vitri) => {
  giohang[vitri][3] += 1;
};

const checkspgiohang = (x) => {
  return giohang.findIndex((item) => item[2] === x);
};

const loaddata = () => {
  const gh = JSON.parse(sessionStorage.getItem("giohang"));
  document.getElementById("countsp").innerHTML = gh.length;
};

const showmycart = () => {
  const gh = JSON.parse(sessionStorage.getItem("giohang"));
  // var gh = giohang;
  // var giohang=gh;
  let kq = "";
  let tong = 0;

  for (let i = 0; i < gh.length; i++) {
    const tt = parseInt(gh[i][1] * gh[i][3]);
    console.log(gh[i])
    tong += tt;
    kq += `<tr>
            <th>${i + 1}</th>
            <th><img src="${gh[i][0]}" alt=""></th>
            <th>${gh[i][2]}</th>
            <th>${gh[i][1]}VNĐ</th>
            <th><button onclick="giam(this,`+i+`)">-</button><span>${gh[i][3]}</span><button onclick="tang(this,`+i+`)">+</button> </th>
            <th>${tt}VNĐ</th>
            <th>
            <button onclick="xoasp(this)" >X</button>
            </th>
        </tr>`;
        
  }
 
  kq += `<tr>
        <th colspan="4">Tổng đơn hàng</th>
        <th colspan="2">${tong}VNĐ</th>
    </tr>
    <tr>
        <th colspan="6"> <a href="checkout.html" style="color: #fff;">
        <button style="width:50%;text-transform: uppercase;background-color: rgb(242, 58, 58);font-weight:bold; padding: 5px;">
        Thanh toán
        </button></a>
        </th>
    </tr>`;
 
  document.getElementById("showcart").innerHTML = kq;
  document.getElementById("countsp").innerHTML = gh.length;
  
  
};
function tang(x,i){
  var td= x.parentElement;
  var sl= parseInt(td.childNodes[1].innerHTML);
  var slmoi=sl+1;
  td.childNodes[1].innerHTML=slmoi;
  gh[i][3]=slmoi;
  console.log(gh[i][3])
  
  showmycart();
  
  //alert(sl);
};
function giam(x, i) {
  var td = x.parentElement;
  var sl = parseInt(td.childNodes[1].innerHTML);

  if (sl > 1) {
      var slmoi = sl - 1;
      td.childNodes[1].innerHTML = slmoi;
      gh[i][3] = slmoi;
  } else {
      alert("bạn không giảm được nữa ");
  }
}
//chat gpt

// xóa sp
function xoasp(x){
  // xóa tr
  var tr=x.parentElement.parentElement;
  var tensp=tr.children[2].innerText;
  tr.remove();
  // xóa sp trong mảng
  for (let i = 0; i < giohang.length; i++){
    if (giohang[i][1] == tensp){
      giohang.splice(i, 1);
     }
  }
 
};


const showtt = () => {
  const gh = JSON.parse(sessionStorage.getItem("giohang"));
  const tht = JSON.parse(sessionStorage.getItem("thanhtoan"));
  let kq1 = "";

  for (let i = 0; i < tht.length; i++) {
    kq1 = `<div>
            <label>Họ và tên</label>
            <input style="color: #000;" type="text" placeholder="Doe" value="${tht[i][0]}">
        </div>            
        <div>
            <label>Số điện thoại</label>
            <input style="color: #000;" type="text" placeholder="+123 456 789" value="${tht[i][1]}">
        </div>
        <div>
            <label>Địa Chỉ</label>
            <input style="color: #000;" type="text" placeholder="123 Street" value="${tht[i][2]}">
        </div>
        <div>
            <label>E-mail</label>
            <input style="color: #000;" type="text" placeholder="example@email.com" value="${tht[i][3]}">
        </div>`;
  }

  let kq = "";
  for (let i = 0; i < gh.length; i++) {
    const tt = parseInt(gh[i][1] * gh[i][3]);
    kq += `<tr>
            <th>${i + 1}</th>
            <th><img src="${gh[i][0]}" alt=""></th>
            <th>${gh[i][2]}</th>
            <th>${gh[i][1]}VNĐ</th>
            <th>${gh[i][3]}</th>
            <th>${tt}VNĐ</th>
        </tr>`;
  }

  document.getElementById("showcart").innerHTML = kq;
  // document.getElementById("hoahoe").innerHTML = kq1;
};

const butt = () => {
  const kq = document.getElementById("hoahoe").children;
  const userName = kq[1].value;
  const phoneNumber = kq[2].value;
  const location = kq[3].value;
  const email = kq[4].value;
  const password = kq[5].value;

  const item = [userName, phoneNumber, location, password,email];
  thanhtoan.push(item);
  console.log(userName);
  sessionStorage.setItem("thanhtoan", JSON.stringify(thanhtoan));
  window.location.href = "donhang.html";
  document.getElementById('thanhtoan')

};


const showttnn = () => {
  const hd = "HD" + Math.round(Math.random() * 10000);
  const gh = JSON.parse(sessionStorage.getItem("giohang"));
  const tht = JSON.parse(sessionStorage.getItem("thanhtoan"));
  let kq1 = "";

  for (let i = 0; i < tht.value; i++) {
    kq1 = `<div style="font-weight: 500;">
            <div>
                <label>Họ và tên</label>
                ${tht[i][1]}
            </div>            
            <div>
                <label>Số Điện Thoại</label>
                ${tht[i][1]}
            </div>
            <div>
                <label>Địa Chỉ</label>
                ${tht[i][1]}
            </div>
            <div>
                <label>E-mail</label>
                ${tht[i][1]}
            </div>
        </div>`;
  }

  let kq = "";
  let tong = 0;
  for (let i = 0; i < gh.length; i++) {
    const tt = parseInt(gh[i][1] * gh[i][3]);
    tong += tt;
    kq += `<tr>
            <th>${i + 1}</th>
            <th><img src="${gh[i][0]}" alt=""></th>
            <th>${gh[i][2]}</th>
            <th>${gh[i][1]}VNĐ</th>
            <th>${gh[i][3]}</th>
            <th>${tt}VNĐ</th>
        </tr>`;
  }

  kq += `<tr>
        <th colspan="4">Tổng đơn hàng</th>
        <th colspan="2">${tong}VNĐ</th>
    </tr>`;

  document.getElementById("tentuoi").innerHTML = kq1;
  document.getElementById("tentuo").innerHTML = kq;
  document.getElementById("random").innerHTML = hd;
};
// const apiEndpoint ="http://localhost:3000/products";
// const display = document.querySelector("#display-data");

// const getData = async ()=>{
//   const res = await fetch(apiEndpoint);
//   const data = await res.json();
//   console.log(data);
//   return data
// }
// getData();
var listCoursesBlock = document.querySelector('#main-menu')
var courseApi = "http://localhost:3000/products"
function start(){
  getCourses(renderCourses);
    
}
start();
// function
function getCourses(callback){
  fetch(courseApi).then(function(response){
    return response.json();
  })
  .then(callback);
}
function renderCourses(courses){
  var listCoursesBlock = document.querySelector('#demo')
  var htmls = courses.map(function(course){
    return`
    <div class="boxsp">
    <div class="row img"><img src="${course.images}" alt=""></div>
    
    <p align="center"> Giá:
    <span>${course.price}</span> VNĐ</p><a href="">${course.name}</a> <br>
    <button onclick="themvaogiohang(this)">Đặt hàng</button>
</div>
    `
  });
  listCoursesBlock.innerHTML = htmls.join('');
}