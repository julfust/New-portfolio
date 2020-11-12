// Initialisation de l'application
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBeCxNrbSRqvbcipNj-UVDwv7xOPjXU114",
    authDomain: "hello-world-252a7.firebaseapp.com",
    databaseURL: "https://hello-world-252a7.firebaseio.com",
    projectId: "hello-world-252a7",
    storageBucket: "hello-world-252a7.appspot.com",
    messagingSenderId: "343791207945",
    appId: "1:343791207945:web:3e6f04e37a098e8bbc5ad8",
    measurementId: "G-3NNCC2GDJW"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

// --------------------------------------------
// Initialisation des gestionnaires d'événement
// --------------------------------------------

$('#loginButtonGithub').on('click', githubLogin);
$('#loginButtonGoogle').on('click', googleLogin);
$('#loginForm').on('submit', emailPasswordLogin);

// ----------------------------------------
// Définition des gestionnaires d'événement
// ----------------------------------------

function onLoginSuccess(result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    
    var nom = user.displayName;
    var photo = user.photoURL;

    $('#results').html(`
        <h1>Bienvenue ${nom}</h1>
        <img src="${photo}" alt="" />
    `);
    // ...
}

function onLoginFail (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
}

function githubLogin() {
    // Votre code ici ...
    // Créez un provider pour Github
    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(onLoginSuccess).catch(onLoginFail);
}

function googleLogin() {
    // Votre code ici ...
    // Créez un provider pour google
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(onLoginSuccess).catch(onLoginFail);
}

function emailPasswordLogin(event) {
    event.preventDefault();

    const email = $('#emailField').val();
    const password = $('#passwordField').val();

    // Votre code ici ...
    // Utilisez les variables 'email' et 'password' pour les transmettre à Firebase via le provider "Email/Password"
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result) {

        $('#results').html(`
            <h1>Bienvenue à vous ${result.user.email}</h1>
        `);
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}