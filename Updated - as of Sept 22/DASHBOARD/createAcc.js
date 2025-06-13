// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Web app's Firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyCcXmseabLqGA24zL2-S8bIDBLHIq9TooA",
    authDomain: "admin-login-139c0.firebaseapp.com",
    projectId: "admin-login-139c0",
    storageBucket: "admin-login-139c0.appspot.com",
    messagingSenderId: "844158706891",
    appId: "1:844158706891:web:a0872a1c5e7819fda6274e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(); // Initialize Firestore

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                role: 'admin' // Add role or other necessary fields if required
            };
            try {
                // Save additional user info in Firestore
                await setDoc(doc(firestore, 'create-account', user.uid), userData);
                alert('Signed up successfully');
                window.location.href = "adminLogin.html"; // Redirect to login page after successful signup
            } catch (error) {
                console.error("Error writing document", error);
                alert('Error saving user data: ' + error.message);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                alert('Email Address Already Exists !!!');
            } else {
                alert('Error: ' + errorMessage);
            }
            console.error(errorCode, errorMessage);
        });
});