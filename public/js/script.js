
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
