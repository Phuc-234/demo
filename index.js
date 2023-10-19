
import {  } from './firebase.js';


let x = document.cookie;
console.log("coockie",x)
let giohang = [];
// document.cookie = `username=`;
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
function checkCookie() {
    let username = getCookie("username");
    if (username != "") {
        document.getElementById("hrefLogout").style.display = 'block';
        document.getElementById("hrefLogin").style.display = 'none';
     alert("Welcome " + username);
     // 2 the a: 
    //  #1 login
    // #2 logout
    // TH 1 : dang nhap thanh cong check cookie có userName : show thẻ a logout & ẩn thẻ a login
   

    // hrefLogin

    
     
    } else {

        // TH 2
     document.getElementById("hrefLogout").style.display = 'none'
     document.getElementById("hrefLogin").style.display = 'block'


    //   username = prompt("Please enter your name:", "");
    //   if (username != "" && username != null) {
    //     setCookie("username", username, 365);
    //   }
    }
  }
  

checkCookie()


//  const themvaogiohang = (x) => {
//     const boxsp = x.parentElement.children;
//     const hinh = boxsp[0].children[0].src;
//     const gia = boxsp[1].children[0].innerText;
//     const tensp = boxsp[2].innerText;
//     const soluong = 1;

//     const existingProductIndex = checkspgiohang(tensp);
//     if (existingProductIndex >= 0) {
//         capnhatslsp(existingProductIndex);
//     } else {
//         const sp = [hinh, gia, tensp, soluong];
//         giohang.push(sp);
//     }
//     document.getElementById("countsp").innerHTML = giohang.length;
//     sessionStorage.setItem("giohang", JSON.stringify(giohang));
// };

const onLogout = () =>{
      document.cookie = `username=`;
      window.location.assign("login.html")
}

let elementHrefLogout = document.getElementById('hrefLogout');
elementHrefLogout.addEventListener('click', onLogout);

const capnhatslsp = (vitri) => {
    giohang[vitri][3] += 1;
};

const checkspgiohang = (x) => {
    return giohang.findIndex(item => item[2] === x);
};