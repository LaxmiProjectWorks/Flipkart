let newUserSignup = () => {
    var username_newUser = document.querySelector("#username_signup").value;
    var mail_newUser = document.querySelector("#mail_signup").value;
    var contact_newUser = document.querySelector("#contact_signup").value;
    var password_newUser = document.querySelector("#password_signup").value;

    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/;

    if (!username_newUser || !mail_newUser || !contact_newUser || !password_newUser) {

        showNewSignupError("Please fill all the fields");
        return;
    }

    if (!usernameRegex.test(username_newUser)) {
        showNewSignupError("Username must be 3–15 characters (letters/numbers only)");
        return;
    }

    if (!emailRegex.test(mail_newUser)) {
        showNewSignupError("Enter a valid email address");
        return;
    }

    if (!contactRegex.test(contact_newUser)) {
        showNewSignupError("Contact must be 10 digits only");
        return;
    }

    if (!passwordRegex.test(password_newUser)) {
        showNewSignupError("Password must have 1 uppercase, 1 number, 1 special char (min 6 chars)");
        return;
    }

    var newUserDetails = {
        username: username_newUser,
        mail: mail_newUser,
        contact: contact_newUser,
        password: password_newUser
    }

    axios({
        method: "POST",
        url: "http://localhost:3000/newUserRegistration/signup",
        data: newUserDetails
    }).then(function (response) {
        console.log(response);
        var signupResultDOMNode = document.querySelector(".signupResult");
        signupResultDOMNode.style.visibility = "visible";
        if (response.data.msg == "DataInsertedIntoDB") {
            signupResultDOMNode.innerText = "Registered successfully";
            signupResultDOMNode.style.color = "Green";
            document.querySelector("#username_signup").value = "";
            document.querySelector("#mail_signup").value = "";
            document.querySelector("#contact_signup").value = "";
            document.querySelector("#password_signup").value = "";
        } else if (response.data.msg == "MailIDExisting") {
            signupResultDOMNode.innerText = "An account is already created with given mail ID. Please try register with another mail ID.";
        }
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        console.log("New Signup process finished.");
    });
}

function showNewSignupError(message) {
    var signupResult = document.querySelector(".signupResult");

    signupResult.innerText = message;
    signupResult.style.visibility = "visible";
    signupResult.style.color = "red";

}
