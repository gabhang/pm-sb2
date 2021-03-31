// Get user details update form
const userUpdateForm = document.getElementById('form-update-user-details');

// Get the currently logged in user object from session
let user = JSON.parse(sessionStorage.getItem('loggedUser'));

// Fill in the user details update form by calling a populateUserDetailsForm function when html page is loaded
$(document).ready(function () {
    populateUserDetailsForm();
});

// Add call to function in the event when the user details update form is submitted
userUpdateForm.addEventListener('submit', UpdateUserDetails);

// Function used to populate user details form input values available to be modified by user
function populateUserDetailsForm() {
    // If user is not found redirect to home page
    if (!user) {
        location.replace("home.html")
    } 
    else {
        // Get inputs by id and set values with user's data
        document.getElementById('inputName').value = user.name;
        document.getElementById('inputAddress').value = user.address;
        document.getElementById('inputTelNo').value = user.telNo;
        document.getElementById('inputEmail').value = user.email;
    }
}

// Signup function used to handle users sign up submit action
function UpdateUserDetails(key, value) {
    // Alert user if he wants to proceed with update and save the choice result in a variable
    let userChoice = confirm("Are you sure you want to update these details?");
    // If user confirms the update bu selecting OK, then do update
    if (userChoice == true) {
        // Get inputs values from update user details form
        user.name = document.getElementById('inputName').value;
        user.address = document.getElementById('inputAddress').value;
        user.telNo = document.getElementById('inputTelNo').value;

        // Update session storage logged user details with new values
        sessionStorage.setItem("loggedUser", JSON.stringify(user));

        // Get already registered users from local storage
        let usersStr = localStorage.getItem('users');
        // Parse users string to JSON
        let users = JSON.parse(usersStr);

        // Find user by email in array of registered users
        // Array find functionality taken from https://stackoverflow.com/questions/35206125/javascript-es6-es5-find-in-array-and-change
        let foundIndex = users.findIndex(x => x.email == user.email);
        users[foundIndex] = user;

        // Save updated users array to local storage
        localStorage.setItem('users', JSON.stringify(users));
        // Notify user with successful registration message
        alert("Your details were updated.");
    } 
    else {
        // Notify user with his choice to cancel it
        alert("You cancelled updates.");
    }
}