
let users = [];

// !============================== this is for validate Name ====================================

function validateName(name) {
    name = name.trim();
    if (name.replaceAll(" ", "").length < 5) {
        return false;
    }
    if (/[^a-zA-Z\s]/.test(name)) {
        return false;
    }
    let words = name.split(" ");
    for (let word of words) {
        if (word[0] !== word[0].toUpperCase()) {
            return false;
        }
        if (word.slice(1) !== word.slice(1).toLowerCase()) {
            return false;
        }
    }
    return true;
}

// !============================== this is for validate email ====================================

function validateEmail(email) {
    email = email.trim().toLowerCase();
    if (email.includes(" ")) {
        return false;
    }
    if (email.length < 10) {
        return false;
    }
    let parts = email.split("@")
    if (parts.length !== 2) {
        return false;
    }
    let [local, domain] = parts;
    if (local.length < 1 || domain.length < 3) {
        return false;
    }
    if (!domain.includes(".")) {
        return false;
    }
    return true;
}

function emailExists(email) {
    return users.some(
        user => user.email === email
    );
}

// !============================== this is for validate age ====================================
function validateAge(age) {
    age = age.trim();
    if (!/^\d+$/.test(age)) {
        return false;
    }
    if (age <= 0) {
        return false;
    }
    if (age.length >= 3) {
        return false;
    }
    return true;
}

// !============================== this is for validate password ====================================
function validatePassword(password) {
    password = password.trim();
    if (password.includes(" ")) {
        return false;
    }
    if (password.length < 7) {
        return false;
    }
    let specialChars = [
        "@",
        "#",
        "-",
        "+",
        "*",
        "/"];
    let hasSpecial = specialChars.some(char => password.includes(char)
    );
    return hasSpecial;
}

// !====================   this is for signing up ( creating a new account )   =========================================

function signUp() {

    // *======================= this is full name======================
    let fullName;
    while (true) {
        fullName = prompt("Enter Full Name");
        if (fullName === null || fullName.toLowerCase() === "exit") {
            return;
        }
        if (validateName(fullName)) {
            break;
        }
        alert("Invalid Name. Example: Farah El Farouk");
    }

    // *================================ this is for email =======================================
    let email;
    while (true) {
        email = prompt("Enter your Email");
        if (email === null || email.toLowerCase() === "exit") {
            return;
        }
        if (!validateEmail(email)) {
            alert("Invalid Email");
            continue;
        }
        // todo ================================ check if the email already exists =============================
        if (emailExists(email)) {
            alert("Email Already Exists");
            console.log("Email Already Exists");
            continue;
        }
        break;
    }

    // * ========================================== this is for age ====================================

    let age;
    while (true) {
        age = prompt("Enter your Age");
        if (age === null || age.toLowerCase() === "exit") {
            return;
        }
        if (!validateAge(age)) {
            alert("Invalid Age");
            continue;
        }
        break;
    }
    // * ========================================== this is for password ====================================

    let password;
    while (true) {
        password = prompt("Password");
        if (password === null || password.toLowerCase() === "exit") {
            return;
        }
        if (!validatePassword(password)) {
            alert("Invalid Password");
            continue;
        }
        break;
    }
    // * ========================================== this is for confirm password ====================================

    let confirmPassword;
    while (true) {
        confirmPassword = prompt("Confirm Password");
        if (confirmPassword === null || confirmPassword.toLowerCase() === "exit") {
            return;
        }
        if (password !=== confirmPassword) {
            alert("Password Confirmation Failed");
            continue;
        }
        break;
    }

    // * ========================================== enter the users bank balance ====================================

    let balance = Number(
        prompt("Initial Balance")
    );

    // *========================================== save user information in an array=======================================
    users.push({
        fullName,
        email,
        age,
        password,
        balance,
    });
    alert("Account Created Success fully");
    console.log("Account Created Successfully");
}
