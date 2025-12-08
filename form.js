import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase, ref, set, push, update, remove, onValue
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

 const firebaseConfig = {
    apiKey: "AIzaSyA-ABYv-zyk6SePE9n_UXV-ALzLQCzx01Y",
    authDomain: "mobile-app-5b414.firebaseapp.com",
    projectId: "mobile-app-5b414",
    storageBucket: "mobile-app-5b414.firebasestorage.app",
    messagingSenderId: "589117044624",
    appId: "1:589117044624:web:4c6084ab35d030dc29a515",
    measurementId: "G-LHT73970E6"
  };

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

// Create a reference to the 'users' node in the database
const userRef = ref(db, 'users');

// Get references to DOM elements
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');
const userIdInput = document.getElementById('userId');
const userTableBody = document.getElementById('userTableBody');

// helper to escape single quotes for inline onclick attributes
function escForAttr(s) {
  if (s === undefined || s === null) return '';
  return String(s).replace(/'/g, "\\'").replace(/\"/g, '\\"');
}

// Handle form submission for adding/updating a user. The 'submit' event fires when the user submits the form (e.g., by clicking the "Save" button).
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get input values
  const name = nameInput.value;
  const email = emailInput.value;
  const address = addressInput ? addressInput.value : '';
  const phone = phoneInput ? phoneInput.value : '';
  const userId = userIdInput.value;

  if (userId) {
    // If userId is present, update the existing user's data
    update(ref(db, 'users/' + userId), { name, email, address, phone });
  } else {
    // If userId is not present, create a new user entry
    const newUserRef = push(userRef); // Generate a new unique key
    set(newUserRef, { name, email, address, phone }); // Save the new user data
  }

  // Reset form and clear hidden ID
  form.reset();
  userIdInput.value = ""; // <-- important!
});

// onValue is a listener function that continuously listens for changes at a particular location (node) in the users table and update the HTML table
onValue(userRef, (snapshot) => {
  userTableBody.innerHTML = ''; // Clear the table before rendering

  snapshot.forEach((child) => {
    const data = child.val(); // Get user data
    const tr = document.createElement('tr'); // Create a new table row
  
    tr.innerHTML = `
      <td>${data.name || ''}</td>
      <td>${data.email || ''}</td>
      <td>${data.address || ''}</td>
      <td>${data.phone || ''}</td>
      <td class="text-center">
        <button class="btn btn-warning btn-sm" onclick="editUser('${child.key}', '${escForAttr(data.name)}', '${escForAttr(data.email)}', '${escForAttr(data.address)}', '${escForAttr(data.phone)}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteUser('${child.key}')">Delete</button>
      </td>
    `;
    userTableBody.appendChild(tr); // Append the row to the table body
  });
});

// Function to populate the form with existing user data for editing
window.editUser = function (id, name, email, address, phone) {
  // decode possible escaped quotes
  function unescapeAttr(s) {
    if (!s) return '';
    return String(s).replace(/\\'/g, "'").replace(/\\\"/g, '"');
  }
  nameInput.value = unescapeAttr(name);
  emailInput.value = unescapeAttr(email);
  if (addressInput) addressInput.value = unescapeAttr(address);
  if (phoneInput) phoneInput.value = unescapeAttr(phone);
  userIdInput.value = id; // Set hidden input to keep track of user ID
};

// Function to delete a user from the database
window.deleteUser = function (id) {
  // Ask for confirmation before deleting
  if (confirm("Are you sure you want to delete this user?")) {
    remove(ref(db, 'users/' + id)); // Remove the user from Firebase
  }
};

  