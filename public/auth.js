import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBs3duoVUKxNZ1LcSJsu8GlHvPbC_6U8og",
  authDomain: "chat-app-412d3.firebaseapp.com",
  projectId: "chat-app-412d3",
  storageBucket: "chat-app-412d3.firebasestorage.app",
  messagingSenderId: "582625065800",
  appId: "1:582625065800:web:938f5817e8913eaec1d17d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.currentUser = null;
document.getElementById("googleLogin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    window.currentUser = result.user;

    // Store Google display name as username and redirect to chat
    localStorage.setItem('username', result.user.displayName);
    window.location.href = '/chat';
  } catch (error) {
    console.error(error);
  }
});
