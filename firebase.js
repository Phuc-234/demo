// import {initializeApp} from "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"
// import {} from "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"
// import {} from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  onValue,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDWZgcZMQKNX0HK-EMwXvzZWqa7sWOj0GU",
  authDomain: "projectes6-f8a50.firebaseapp.com",
  projectId: "projectes6-f8a50",
  storageBucket: "projectes6-f8a50.appspot.com",
  messagingSenderId: "960445638564",
  appId: "1:960445638564:web:420ae66610fab269c14331",
  measurementId: "G-05QF8MW8T1",
  databaseURL: "https://projectes6-f8a50-default-rtdb.firebaseio.com",
};

//create your custom method
// export const getWolfs = () => {
//     return getDocs(collection(db, "yourNameCollection"));
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase());
// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
// console.log("dd",dbRef)
// var index = 0;
// get(child(dbRef, `products`)).then((snapshot) => {
//   console.log("product",snapshot.key)
//   // if (snapshot.exists()) {
//   //   if(snapshot.val().name == "san pham 1"){
//   //     console.log(snapshot.val(),"aaaa")
//   //   }
//   //   console.log(snapshot.val());
//   // } else {
//   //   console.log("No data available");
//   // }
// }).catch((error) => {
//   console.error(error);
// });
const db = getDatabase();
const starCountRef = ref(db, "products");
onValue(starCountRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    // ...
    console.log(childData, childKey);
  });
});

// set(ref(db, 'users/' + userId), {
//   username: name,
//   email: email,
//   profile_picture : imageUrl
// });

// , {
//   onlyOnce: true
// });

export function handleLoginFirebase(phoneNumber, password) {
  const tableUser = ref(db, "users");
  onValue(
    tableUser,
    (snapshot) => {
      if (snapshot.exists()) {
        let isLogin = false;
        let userName = "";
        snapshot.forEach((childSnapshot) => {
          // const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (
            phoneNumber == childData.phoneNumber &&
            password == childData.password
          ) {
            userName = childData.userName
            isLogin = true;
            // console.log("dang nhap thanh cong");
            return true;
          } else {
            // console.log("so dien thoai chua duoc dang  1");
            // return true;
          }
        });
        if (isLogin) {
          console.log("dang nhap thanh cong");
          document.cookie = `username=${userName}`;
          // document.cookie = `username=""`;

          window.location.assign("index.html")

          alert("Đăng nhập thành công");
        } else {
          console.log("so dien thoai chua duoc dang  1");
          alert("Số điện thoại hoặc mật khẩu không đúng");

        }
      } else {
        console.log("so dien thoai chua duoc dang ky 2");
        alert("Số điện thoại hoặc mật khẩu không đúng");
      }
    },
    {
      onlyOnce: true,
    }
  );
}
export function handleRegisterFirebase(
  userName,
  phoneNumber,
  location,
  email,
  password
) {
  // check userName
  const tableUser = ref(db, "users");
  onValue(
    tableUser,
    (snapshot) => {
      if (snapshot.exists()) {
        let invalid = 0;
        // 0: được phép khởi tạo
        // 1: đã tồn tại phone
        // 2: đã tồn tại email
        snapshot.forEach((childSnapshot) => {
          // const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          // console.log(childData,childKey)
          if (phoneNumber == childData.phoneNumber) {
            invalid = 1;
            return true;
            // alert("sdt người dùng đã tồn tại");
          } else if (email == childData.email) {
            invalid = 2;
            return true;
            // alert(" email đã tồn tại");
          } else {
            invalid = 0;
          }
        });
        if (invalid == 0) {
          const postListRef = ref(db, "users");
          const newPostRef = push(postListRef);
          set(newPostRef, {
            userName,
            phoneNumber,
            location,
            email,
            password,
          });
          alert("Đăng ký thành công");
          window.location.assign("login.html")
        } else if (invalid == 1) {
          alert("sdt người dùng đã tồn tại");
        } else {
          alert(" email đã tồn tại");
        }
      } else {
        const postListRef = ref(db, "users");
        const newPostRef = push(postListRef);
        set(newPostRef, {
          userName,
          phoneNumber,
          location,
          email,
          password,
        });
        alert("Đăng ký thành công");
        window.location.assign("login.html")
      }
    },
    {
      onlyOnce: true,
    }
  );
  // chec email
  //
  // create
}
// export function writeUserData(username) {
  // const db = getDatabase();

  // const tableUser = ref(db, 'users');
  // console.log("writeUserData")

  //   onValue(tableUser, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       // const childKey = childSnapshot.key;
  //       const childData = childSnapshot.val();
  //       // // ...
  //       // console.log(childData,childKey)
  //       if(username == childData.name){
  //         console.log("tồn tại user name")
  //       }
  //     });
  //   },{
  //     onlyOnce: true
  //   })

  // create
//   const postListRef = ref(db, "users");
//   const newPostRef = push(postListRef);
//   set(newPostRef, {
//     name: "ngoc phuc",
//     password: 123456,
//   });
// }

// const db = getDatabase();
// const issuesRef = ref(db, 'users');

//   onValue(issuesRef, (snapshot) => {
//     snapshot.forEach(snap => {
//       const issue = snap.val();
//       console.log(issue.name);
//     })
// });
// console.log(app);

// const db = getFirestore(app);
// const citiesCol = collection(db, 'users');
// const citySnapshot = await getDocs(citiesCol);
// const cityList = citySnapshot.docs.map(doc => doc.data());
// console.log("cityList",db.ref().child('users'))

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'users');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
// Get a list of cities from your database

// const citiesCol = collection(db, 'text');
// const citySnapshot = await getDocs(citiesCol);
// // const cityList = citySnapshot.docs.map(doc => doc.data());
// console.log(citySnapshot)
// return cityList;

// const analytics = getAnalytics(app);

// const TestFunc = () => {
//   console.log("ngoc phuc TestFunc");
// };

//create your custom method
// export const getWolfs = () => {
//   return "phuc getWolfs";
// };
