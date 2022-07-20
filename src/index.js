// call Object from the Firebase to Initialize app
// لتهيئة التطبيق Firebase   من ال  Object  استدعاء
import { initializeApp } from "firebase/app";

// Import Data Base
// استيراد قاعدة البيانات
import { getFirestore } from "firebase/firestore";

// Import Collection
// استيراد المجموعة
import { collection } from "firebase/firestore";

// Import Data Of Collection
// استيراد بيانات المجموعة
// import { getDocs } from "firebase/firestore";

// Import Object onSnapshot
import { onSnapshot } from "firebase/firestore";

// Import Object Add Doc
//  Object Add Doc استيراد
import { addDoc } from "firebase/firestore";

// Import Object delete Doc
//  Object delete Doc استيراد
import { deleteDoc } from "firebase/firestore";

// Import Object Doc
//  Object Doc استيراد
import { doc } from "firebase/firestore";

// Import Object Query
//  Object Query استيراد
import { query } from "firebase/firestore";

// Import Object Where
//  Object Where استيراد
import { where } from "firebase/firestore";

// Import Object orderBy
//  Object orderBy استيراد
import { orderBy } from "firebase/firestore";

// Import Object serverTimestamp
//  Object serverTimestamp استيراد
import { serverTimestamp } from "firebase/firestore";

// Import Data Of Collection Element
// استيراد بيانات عنصر من المجموعة
import { getDoc } from "firebase/firestore";

// Import Object updateDoc
// Object updateDoc استيراد
import { updateDoc } from "firebase/firestore";

// Import Auth
// استيراد  المصادقة
import { getAuth } from "firebase/auth";

// Import create User With Email And Password
// استيراد  create User With Email And Password
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import sign Out
// استيراد  sign Out
import { signOut } from "firebase/auth";

// Import sign In With Email And Password
// استيراد  sign In With Email And Password
import { signInWithEmailAndPassword } from "firebase/auth";

// Import on Auth State Changed
// استيراد  on Auth State Changed
import { onAuthStateChanged } from "firebase/auth";

// Config Project
// تكوين المشروع ( بيانات المشروع )
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV9Kfe8Yrn1J2kt6T-rjjZntDIiXLEz_I",
  authDomain: "fir-9-explain-8b6e5.firebaseapp.com",
  projectId: "fir-9-explain-8b6e5",
  storageBucket: "fir-9-explain-8b6e5.appspot.com",
  messagingSenderId: "989554164830",
  appId: "1:989554164830:web:c0f33ecee4d2e76bade0cf",
  measurementId: "G-G67JSPDLEL",
};

// initialize firebase App
// تهيئة التطبيق
initializeApp(firebaseConfig);

// init services ( Database )
// تهيئة خدمات قاعدة بيانات
const Database = getFirestore();

// Call Object From The Firebase To Initialize Services ( Auth )
const Auth = getAuth();

// Get The Collection From Database by Collection Name
// احصل على المجموعة من قاعدة البيانات حسب اسم المجموعة
// collection ref
const colRef = collection(Database, "movies");

// Fetching Data
// جلب البيانات
// getDocs(colRef)
//   .then((snapshot) => {
//     console.log("snapshot: ", snapshot.docs);
//     let movies = [];
//     snapshot.docs.forEach((doc) => {
//       movies.push({ ...doc.data(), id: doc.id });
//     });
//     console.log("movies: ", movies);
//     showMovies(movies);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

let SearchMovieForm = document.querySelector(".Search");

SearchMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputSearch = document.getElementById("InputSearch");
  console.log("inputSearch: ", inputSearch.value);
});
// queries
// استفسارات
const queries = query(colRef, orderBy("createdAt"));
// const queries = query(colRef, where("title", "==", "Ip"));
// const queries = query(colRef, where("title", "==", InputSearch.value));
// const queries = query( colRef, where( "imgUrl", "==", "https://images.hdqwalls.com/download/ip-man-4-the-finale-q0-1280x800.jpg" ) , orderBy('createdAt'));

// realtime collection data
onSnapshot(queries, (snapshot) => {
  console.log("snapshot: ", snapshot.docs);
  let movies = [];
  snapshot.docs.forEach((doc) => {
    movies.push({ ...doc.data(), id: doc.id });
  });
  showMovies(movies);
  console.log("movies: ", movies);
});

let inner = document.getElementById("inner");
function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, imgUrl, id } = movie;
    let movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${imgUrl}" alt="${title}" />
    <div class="title">${title}</div>
    <span class='delete-icon' data-id='${id}'>
      <i class="fas fa-trash"></i>
    </span>
    `;
    inner.appendChild(movieEl);
  });
}

// Adding Documents

let addMovieForm = document.querySelector(".add");

addMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addMovieForm.title.value,
    imgUrl: addMovieForm.imgUrl.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addMovieForm.reset();
  });
});

// 4
// Deleting Documents
let deleteMovieForm = document.querySelector(".delete");
deleteMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let colRef = doc(Database, "movies", deleteMovieForm.id.value);
  deleteDoc(colRef).then(() => {
    deleteMovieForm.reset();
  });
});

window.onload = function () {
  let iconDelete = document.querySelectorAll(".delete-icon");
  setTimeout(() => {
    console.log("iconDelete: ", iconDelete);
  }, 10000);
};

// fetching a single document (& realtime)
const docRef = doc(Database, "movies", "XmfuWkORdzhGtifMIqnj");

// getDoc(docRef)
//   .then(doc => {
//     console.log(doc.data(), doc.id)
//   })

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let docRef = doc(Database, "movies", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signing users up
const signupForm = document.querySelector(".signup");
const userName = document.getElementById("userName");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // hossam@yahoo.com
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(Auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      userName.innerHTML = cred.user.email;
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// logging  out
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(Auth)
    .then(() => {
      console.log("user signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// logging in
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(Auth, email, password)
    .then((cred) => {
      console.log("user logged in:", cred.user);
      loginForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// subscribing to Auth changes
onAuthStateChanged(Auth, (user) => {
  console.log("user status changed:", user);
  console.log("user displayName:", user.displayName);
  console.log("user email:", user.email);
  console.log("user uid:", user.uid);
  console.log("user phoneNumber:", user.phoneNumber);
  console.log("user photoURL:", user.photoURL);
});
