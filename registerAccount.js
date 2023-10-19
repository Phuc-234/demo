import {handleRegisterFirebase} from './firebase.js'
 function login (){
    // TestFileUtil()
    console.log("handle login")
}

const onRegister = ()=>{
    const kq = document.getElementById("boxlogin").children;
    const userName = kq[1].value;
    const phoneNumber = kq[2].value;
    const location = kq[3].value;
    const email = kq[4].value;
    const password = kq[5].value;
    console.log("registerAccount",{userName,phoneNumber,location,email,password})
    handleRegisterFirebase(userName,phoneNumber,location,email,password)

}

let button = document.getElementById('btnRegister');
button.addEventListener('click', onRegister);