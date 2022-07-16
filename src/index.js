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
import { getDocs } from "firebase/firestore";

// Import Object Add Doc
//  Object Add Doc استيراد
import { addDoc } from "firebase/firestore";

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

// Get The Collection From Database by Collection Name
// احصل على المجموعة من قاعدة البيانات حسب اسم المجموعة
// collection ref
const colRef = collection(Database, "movies");

// Fetching Data
// جلب البيانات
getDocs(colRef)
  .then((snapshot) => {
    console.log("snapshot: ", snapshot.docs);
    let movies = [];
    snapshot.docs.forEach((doc) => {
      movies.push({ ...doc.data(), id: doc.id });
    });
    console.log("movies: ", movies);
    showMovies(movies);
  })
  .catch((err) => {
    console.log(err.message);
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
  }).then(() => {
    addMovieForm.reset();
  });
});

// Import Object delete Doc
//  Object delete Doc استيراد
import { deleteDoc } from "firebase/firestore";

// Import Object Doc
//  Object Doc استيراد
import { doc } from "firebase/firestore";

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
