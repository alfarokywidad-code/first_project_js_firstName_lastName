
let users = [];
let currentUser = null;

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
        email = email.trim().toLowerCase();
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
        if (password !== confirmPassword) {
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
        loan: 0,
        loanPaid: 0,
        investedAmount: 0,
        investmentReturned: 0,
        history: []
    });
    alert("Account Created Success fully");
    console.log("Account Created Successfully");
}

// !============================================ this is for logging into the account ==================================================

function login() {

    // * ========================================== this is for email ====================================
    let email = prompt("Email").trim().toLowerCase();
    let user = users.find(
        user => user.email === email
    );
    if (!user) {
        alert("Email Not Found");
        return;
    }

    // * ========================================== this is for password ====================================
    let password = prompt("Password");
    if (user.password !== password) {
        alert("Wrong Password");
        return;
    }
    alert("Login Success");
    currentUser = user;
    applyLoanPenalty(user);
    applyInvestmentProfit(user);
    dashboard(user);
}

// !======================================================== this is for change password ====================================
function changePassword() {

    // *================================ this is for email =======================================
    let email = prompt("Enter Email");
    if (email === null || email.trim().toLowerCase() === "exit") {
        return;
    }
    email = email.trim().toLowerCase();
    let user = users.find(user => user.email === email);
    if (!user) {
        alert("Email Not Found");
        return;
    }

    // *================================ this is for old password =======================================
    let oldPassword = prompt("Enter Current Password");
    if (oldPassword === null || oldPassword.toLowerCase() === "exit") {
        return;
    }
    if (oldPassword !== user.password) {
        alert("Wrong Current Password");
        return;
    }
    // *================================ this is for new password =======================================
    let newPassword = prompt("Enter New Password");
    if (newPassword === null || newPassword.toLowerCase() === "exit") {
        return;
    }
    if (!validatePassword(newPassword)) {
        alert("Invalid Password");
        return;
    }
    // *================================ this is for confirm new password =======================================
    let confirmPassword = prompt("Confirm New Password");
    if (confirmPassword === null || confirmPassword.toLowerCase() === "exit") {
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("Password Confirmation Failed");
        return;
    }
    // *================================ this is for roplace the old code with the new code =======================================
    user.password = newPassword;
    user.history.push("Password Changed");
    alert("Password Updated Successfully");
}
// !=============================================== This is main dashboard after login: handles all banking operations =================

function dashboard(user) {
    currentUser = user;
    while (currentUser) {
        let choice = prompt(`Balance: ${currentUser.balance}
1. Withdraw Money
2. Deposit Money
3. Take Loan
4. Invest
5. History
6. Logout`);
        if (choice === "1") withdrawMoney(currentUser);
        else if (choice === "2") depositMoney(currentUser);
        else if (choice === "3") takeLoan(currentUser);
        else if (choice === "4") investMoney(currentUser);
        else if (choice === "5") showHistory(currentUser);
        else if (choice === "6") {
            currentUser = null;
            alert("Logged out");
            return;
        }
        else alert("Invalid choice");
    }
}

// !============================================ allow users to withdraw money from account balance =====================

function withdrawMoney(user) {
    let amount = prompt("Amount To Withdraw");
    if (amount === null || amount.toLowerCase() === "exit") {
        return;
    }
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid Amount");
        return;
    }
    if (amount > user.balance) {
        alert("Insufficient Funds");
        return;
    }
    user.balance -= amount;
    user.history.push(`Withdraw: ${amount} DH`);
    console.log(`Withdraw: ${amount} DH`);
    console.log(`New balance: ${user.balance}`);
    alert("Withdraw Successful");
}

// !============================================ this is for deposit money ==================================

function depositMoney(user) {
    let amount = prompt("Amount To Deposit");
    if (amount === null || amount.toLowerCase() === "exit") {
        return;
    }
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid Amount");
        return;
    }
    if (amount > 1000) {
        alert("Maximum Deposit = 1000 DH");
        return;
    }
    user.balance += amount;
    user.history.push(`Deposit: ${amount} DH`);
    console.log(`Deposit: ${amount} DH`);
    console.log(`New balance: ${user.balance}`);
    alert("Deposit Successful");
}

// !============================================ Take loan (20% max of balance) ==================================
function takeLoan(user) {

    if (user.loan > 0) {
        alert("You already have a loan");
        return;
    }
    let maxLoan = user.balance * 0.2;
    let amount = prompt(`Max Loan = ${maxLoan}`);
    if (amount === null || amount.toLowerCase() === "exit") {
        return;
    }
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0 || amount > maxLoan) {
        alert("Invalid Loan Amount");
        return;
    }
    user.loan = amount;
    user.loanPaid = 0;
    user.balance += amount;
    user.history.push(
        "Loan Taken : " +
        amount +
        " DH"
    );
    alert("Loan Approved");
}

// !============================================ Apply 10% loan deduction per login ==================================
function applyLoanPenalty(user) {
    if (user.loan <= 0) {
        return;
    }
    let deduction = user.loan * 0.1;
    if (user.loanPaid + deduction > user.loan) {
        deduction = user.loan - user.loanPaid;
    }
    user.balance -= deduction;
    user.loanPaid += deduction;
    user.history.push(
        "Loan Deduction : " +
        deduction +
        " DH"
    );
    if (user.loanPaid >= user.loan) {
        user.loan = 0;
        user.loanPaid = 0;
    }
}

// !============================================ This function handles user investment process ==================================
function investMoney(user) {
    let amount = prompt("Investment Amount");
    if (amount === null || amount.toLowerCase() === "exit") {
        return;
    }
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0 || amount > user.balance) {
        alert("Invalid Amount");
        return;
    }
    user.balance -= amount;
    user.investedAmount += amount;
    user.history.push(
        "Invested : " +
        amount +
        " DH");

    alert("Investment Added");
}
// !============================================  tis is for Applies 20% investment profit up to 120% ==================================
function applyInvestmentProfit(user) {
    if (user.investedAmount <= 0) {
        return;
    }
    let maxProfit = user.investedAmount * 1.2;
    if (user.investmentReturned >= maxProfit) {
        return;
    }
    let profit = user.investedAmount * 0.2;
    user.investmentStep++;
    let totalPossible = user.investmentStep * profit;
    if (totalPossible > maxProfit) {
        profit = maxProfit - user.investmentReturned;
    }
    user.balance += profit;
    user.investmentReturned += profit;
    user.history.push("Investment Profit: " + profit + " DH");
}

// !============================== this is for storing all user transactions history ====================================
function showHistory(user) {

    if (user.history.length === 0) {
        alert("No History");
        return;
    }
    alert(user.history.join("\n"));
}
// !============================================ Main menu loop (keeps asking the user for choices) ==================================================

while (true) {

    let choice = prompt(`
1. Sign Up
2. Login
3. Change Password
`);

    if (choice === "1") {
        signUp()
    }
    else if (choice === "2") {
        login()

    }
    else if (choice === "3") {
        changePassword()

    }
    else {
        alert("Invalid choice");
    }
}


