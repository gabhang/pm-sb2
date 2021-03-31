// Check if user is logged in
if (sessionStorage.loggedUser) {
    // Get logged in user from session storage and parse users string to JSON
    let userLoggedin = JSON.parse(sessionStorage.getItem('loggedUser'));
    // Show greeting and manage account and logout links
    document.getElementById("userGreeting").hidden = false;
    document.getElementById("userAccount").hidden = false;
    document.getElementById("logoutUser").hidden = false;
    // Hide login sign up link
    document.getElementById("loginSignup").hidden = true;
    // Add user name to the greeting message text
    document.getElementById("userGreetingText").innerHTML = "Hello " + userLoggedin.name;
}

// Function used to logout user and clear session data associated
function logout() {
    // Check if user is logged in
    if (sessionStorage.loggedUser) {
        // Remove logged user from session
        sessionStorage.removeItem("loggedUser");
    }
    // Redirect to home page
    location.replace("home.html");
}

// Function to check whether order exist and whether user logged in 
function checkOrderAndLogin() {
    // Get order from sessionStorage to check
    orderList = JSON.parse(sessionStorage.getItem('order'));
    if (orderList === null) {
        // Alert text if order not exist
        alert("No order has been made yet.")
    }
    else {
        // Check whether user logged in
        checkLogin();
    }
}

// Function to check whether user logged in
function checkLogin() {
    if (sessionStorage.loggedUser) {
        // If logged in, redirect to checkout page when checkout button is clicked
        window.location.href = "checkout.html";
    }
    else {
        // Alert text if not logged in
        alert("Please Login or Sign Up.");
    }
}