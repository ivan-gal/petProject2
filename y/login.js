const user = document.querySelector('.un');
const password = document.querySelector('.pass');
const submit = document.querySelector('.submit');

const auth = firebase.auth();

setTimeout(function () {
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser != null) {
            window.location = './create.html';
        }
    });
}, 2000);

function logIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const usernew = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

submit.addEventListener('click', () => {
    const getUser = user.value;
    const getPass = password.value;
    logIn(getUser, getPass);
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser != null) {
            window.open('./create.html').focus();
        }
    });
});
