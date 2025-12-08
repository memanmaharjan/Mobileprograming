
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, set, get, ref, update, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

 const firebaseConfig = {
    apiKey: "AIzaSyA-ABYv-zyk6SePE9n_UXV-ALzLQCzx01Y",
    authDomain: "mobile-app-5b414.firebaseapp.com",
    projectId: "mobile-app-5b414",
    storageBucket: "mobile-app-5b414.firebasestorage.app",
    messagingSenderId: "589117044624",
    appId: "1:589117044624:web:4c6084ab35d030dc29a515",
    measurementId: "G-LHT73970E6"
  };

const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)

console.log(db)

function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
// Example usage:
updateUserData(1, {firstname: "Abiral", lastname: "Khanal"});

function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}


deleteUserData(1);
