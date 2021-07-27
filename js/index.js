const fnameE1 = document.querySelector('#fname');
const lnameE1 = document.querySelector('#lname');
const emailE1 = document.querySelector('#email');
const passwordE1 = document.querySelector('#password');

const form = document.querySelector('#signup');

const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (id, input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    console.log(typeof (formField));

    // add the error class
    formField.classList.add('error');

    document.querySelector("#" + id).classList.add('icon');

    // show the error message
    const error = formField.querySelector('.msg');
    error.textContent = message;
};

const showSuccess = (id, input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');


    document.querySelector("#" + id).classList.remove('icon');

    // hide the error message
    const error = formField.querySelector('.msg');
    error.textContent = '';
}

const checkFName = () => {
    let valid = false;
    const fname = fnameE1.value.trim();

    if (!isRequired(fname)) {
        showError('fn', fnameE1, 'First Name cannot be empty');
    }
    else {
        showSuccess('fn', fnameE1);
        valid = true;
    }
    return valid;
}

const checkLName = () => {
    let valid = false;
    const lname = lnameE1.value.trim();

    if (!isRequired(lname)) {
        showError('ln', lnameE1, 'Last Name cannot be empty');
    }
    else {
        showSuccess('ln', lnameE1);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailE1.value.trim();
    if (!isRequired(email)) {
        showError('ea', emailE1, 'Email cannot be empty');
    } else if (!isEmailValid(email)) {
        showError('ea', emailE1, 'Looks like this is not an email')
    } else {
        showSuccess('ea', emailE1);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {

    let valid = false;

    const password = passwordE1.value.trim();

    if (!isRequired(password)) {
        showError('pw', passwordE1, 'Password cannot be empty');
    } else if (!isPasswordSecure(password)) {
        showError('pw', passwordE1, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess('pw', passwordE1);
        valid = true;
    }

    return valid;
};

form.addEventListener('submit', function (e) {

    e.preventDefault();

    // validate forms
    let isFNameValid = checkFName(),
        isLNameValid = checkLName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isFNameValid &&
        isLNameValid &&
        isEmailValid &&
        isPasswordValid;

    // if (isFormValid) {
    //      // prevent the form from submitting
    //      form.submit();
    // }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkFName();
            break;
        case 'lname':
            checkLName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));