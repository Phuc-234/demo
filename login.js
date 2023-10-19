
import {handleLoginFirebase} from './firebase.js'
 function login (){
    // TestFileUtil()
    console.log("handle login")
}

const onLogin = ()=>{
    const kq = document.getElementById("boxlogin").children;
    const phoneNumber = kq[1].value;
    const password = kq[2].value;
    console.log("login",{phoneNumber,password})
    handleLoginFirebase(phoneNumber,password)

}

let button = document.getElementById('btnLogin');
button.addEventListener('click', onLogin);