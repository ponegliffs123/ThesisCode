// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Initialize Firebase with the correct configuration for 'create-account' database
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
const firestore = getFirestore(app); // Initialize Firestore

// Function to handle user sign-in
export async function signInUser(email, password) {
    try {
        // Sign in the user using Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Query Firestore to check if the user's email exists in the 'create-account' collection
        const createAccountCollection = collection(firestore, 'create-account');
        const emailQuery = query(createAccountCollection, where('email', '==', email));
        const querySnapshot = await getDocs(emailQuery);

        if (!querySnapshot.empty) {
            // If the email exists in the Firestore 'create-account', allow login and redirect
            console.log("Login successful, redirecting to dashboard...");
            window.location.href = "dashboard.html";
        } else {
            // If the email does not exist in Firestore, inform the user
            throw new Error("No admin account found. Please create an account first.");
        }
    } catch (error) {
        console.error("Error during sign-in:", error.code, error.message);
        // Display a user-friendly message
        document.getElementById('loginError').textContent = error.message || "Invalid email or password.";
    }
}

// Event listener for login button
document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    signInUser(email, password); // Call the login function
});