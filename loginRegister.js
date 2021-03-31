const
    // Valid users array, where user is declared as JSON with initial values to store in Local Web storage
    users = [
        {email: 'admin@mail.com', password: 'admin', name: 'Admin', address: '1 Center Street', telNo: '0877552685'}
    ],

    // Get login and sign up forms and store them in constants
    signupForm = document.getElementById('form-signup');
    loginForm = document.getElementById('form-login'),

// Add call to function in the event when the form is submitted
signupForm.addEventListener('submit', Signup);
loginForm.addEventListener('submit', Login);

// Check if local storage does not contain users (admin)
if (!localStorage.users) {
    // If not, save users array to local storage as a JSON converted to string
    localStorage.setItem('users', JSON.stringify(users));
}

// Login function used to handle login form submit action
function Login(event) {
    // Get email and password values from the login form
    let loginEmail = loginForm.elements.namedItem('inputEmail').value;
    let loginPassword = loginForm.elements.namedItem('inputPassword').value;

    // Get existing users from local storage as a string and parse it to JSON format
    const existingUsers = JSON.parse(localStorage.getItem("users"));
    // Find user with email value from login form
    // Array find functionality taken from https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
    let userExists = existingUsers.find(obj => {
        //returns user if it was found
        return obj.email === loginEmail
    });

    // If user was found
    if (userExists) {
        // Check password for found user
        if (userExists.password === loginPassword) {
            alert('Login successful');
            // Login user and save his details in the session object as a String
            sessionStorage.setItem('loggedUser', JSON.stringify(userExists));
            // Redirect to menu page
            window.location.href = "menu.html";
        } 
        else {
            // Warn user that password was incorrect
            alert('Incorrect password');
        }

    }
    else {
        // Warn user that user was incorrect
        alert('User does not exist');
    }
    // Prevent default action
    // Code taken from https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
    event.preventDefault();
}

// Signup function used to handle users sign up submit action
function Signup() {
    // Get inputs values from sign up form and store in local variable/declaring
    let passwordStr = signupForm.elements.namedItem('inputPassword').value;
    let confirmPasswordStr = signupForm.elements.namedItem('inputConfirmPassword').value;
    let emailStr = signupForm.elements.namedItem('inputEmail').value;
    let nameStr = signupForm.elements.namedItem('inputName').value;
    let addressStr = signupForm.elements.namedItem('inputAddress').value;
    let telNoStr = signupForm.elements.namedItem('inputTelNo').value;

    // Get already registered users from local storage
    let usersStr = localStorage.getItem('users');
    // Parse users string to JSON
    let users = JSON.parse(usersStr);

    // Validate email if i's already registered
    // Array find functionality taken from https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
    let emailExists = users.find(obj => {
        //returns object in case if email was found
        return obj.email === emailStr
    });

    // If email is already registered warn user and exit sign up function
    if (emailExists) {
        alert('Email is already registered.');
        return;
    }

    // Validate password
    if (passwordStr != confirmPasswordStr) {
        // If passwords don't match, warn user
        alert('Your password does not match, please try again.');
        return;
    }

    // If all fields are valid, create new user object which contains the values from the form
    let newUser = {
        email: emailStr,
        password: passwordStr,
        name: nameStr,
        address: addressStr,
        telNo: telNoStr
    };
    // Add new user to registered users array
    users.push(newUser);
    // Save existing registered users array to local storage
    localStorage.setItem('users', JSON.stringify(users));
    // Notify user with successful registration message
    alert('Thank you for registration with GMIT Eats.');
}