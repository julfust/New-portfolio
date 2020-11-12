// Mettez ici votre config
// Initialisation de l'application
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCqw9khUKGUR9XU4cMSeX7_gTZYmVKlmJQ",
    authDomain: "ultimate-ninja-67.firebaseapp.com",
    databaseURL: "https://ultimate-ninja-67.firebaseio.com",
    projectId: "ultimate-ninja-67",
    storageBucket: "ultimate-ninja-67.appspot.com",
    messagingSenderId: "246024766381",
    appId: "1:246024766381:web:50eb134eb0659e461d9724"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialisation des gestionnaires d'événement
$('#addMessageForm').on('submit', onAddMessage);
$('#addUserForm').on('submit', onAddUser);

// ----------------------------------------
// 1) [À FAIRE] Complétez les gestionnaires d'événement onAddMessage() et onAddUser()
// ----------------------------------------

function onAddMessage (event) {
    event.preventDefault();

    const pseudo = $('#pseudo').val();
    const message = $('#message').val();

    // Votre code ici ...
    // Ajouter le pseudo et le message dans la database ...
    firebase.database().ref('messages/').push({
        pseudo,
        message
    });
}

function onAddUser (event) {
    event.preventDefault();

    const nom = $('#nom').val();
    const age = $('#age').val();

    // Votre code ici ...
    // Ajouter le nom et l'age dans la database ...
    firebase.database().ref('users/').push({
        nom,
        age
    });
}

// ----------------------------------------
// 2) [À FAIRE] Écrivez le code qui permet de récupérer les messages ET les utilisateurs de la base
// ----------------------------------------

// Récupération des messages...
firebase.database().ref('messages/').on('value', function(snapshot) {

    let content = '';
    snapshot.forEach(function(item) {
        const message = item.val()
        content += `<li>Message de <b>${message.pseudo}</b> : « ${message.message} »</li>`;
    });
    
    $('#messages').html(content);
});

// Récupération des utilisateurs...
firebase.database().ref('/users').on('value', function (snapshot) {

    let content = '';
    snapshot.forEach(function(item) {
        const user = item.val()
        content += `<li>${user.nom} (${user.age} ans)</li>`;
    });

    $('#users').html(content);

});
