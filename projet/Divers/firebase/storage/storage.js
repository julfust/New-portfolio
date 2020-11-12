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

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

import {
    initActionButtons, // Créér et affiche des boutons d'action dans la page web
    initProgressBar, // Réinitialise et affiche la barre de progression dans la page web.
    updateProgressBar, // Change la valeur de progression de la barre.
    successProgressBar, // Définit la barre de progression en mode "Téléchargement terminé"
    cancelProgressBar, // Définit la barre de progression en mode "Téléchargement annulé"
    playPauseProgressBar // Définit la barre de progression en mode "Play/Pause" (1 fois sur 2)
} from './functions.js'

// Installation du gestionnaire d'événement pour écouter la sélection d'un fichier sur l'ordinateur
$('#file').on('change', onSelectFile);

const storageRef = firebase.storage().ref();

//Initialisation de la liste des fichiers uplodés

async function pageTokenExample(){
    let content = '';
    // Create a reference under which you want to list
    var listRef = storageRef.child('/photos/');
    // Fetch the first page of 100.
    var firstPage = await listRef.list({ maxResults: 100});
    console.log(firstPage);

    let fileNameList = firstPage.items;

    for(let i = 0; i < fileNameList.length; i++)
    {
        content += "<li>" + fileNameList[i].name + "</li>";
    }

    $("#uploded-list").empty();
    $("#uploded-list").html(content);
}

pageTokenExample();


// Quand un visiteur a sélectionné un fichier sur son ordinateur, cette fonction est appelée...
function onSelectFile(event) {
    // Affichage des boutons d'action
    initActionButtons(onPause, onResume, onCancel);
    // Affichage de la barre de progression
    initProgressBar();

    // Récupération de l'objet `File` envoyé
    // (Documentation MDN : https://developer.mozilla.org/fr/docs/Web/API/File)
    const file = event.target.files[0];

    /*
        À vous de jouer ! Écrivez ici le code permettant de télécharger le fichier
        sur votre compte Firebase, dans un emplacement nommé :
            
            photos/<NOM_DU_FICHIER>

        Note : Les objets `File` ont une propriété `.name` contenant le nom
        du fichier uploadé, par exemple :

            console.log(file.name); // affichera "imageSelectionnee.jpg"
    */
    
    // Votre code ici ...
    let fileName = document.getElementById('file').files[0].name;
    const uploadTask = storageRef.child(`/photos/${fileName}`).put(file);

    /*
        Une fois le code du chargement écrit,
        écrivez ici le code permettant de gérer le chargement
        (pause, resume et cancel)
    */

    // Quand le visiteur clique sur "pause"
    function onPause() {
        // Votre code ici ...
        $('#pause').click(function(){
            uploadTask.pause();
            playPauseProgressBar();
            console.log("Pause!");
        });
    }
    // Quand le visiteur clique sur "reprendre"
    function onResume() {
        // Votre code ici ...
        $('#resume').click(function(){
            uploadTask.resume();
            playPauseProgressBar();
            console.log("Reprise");
        });
    }
    // Quand le visiteur clique sur "annuler"
    function onCancel() {
        // Votre code ici ...
        $('#cancel').click(function(){
            uploadTask.cancel();
            cancelProgressBar();
            console.log("Annuler");
        });
    }

    uploadTask.on('state_changed', onStateChanged, onError, onComplete);
    function onStateChanged(snapshot) {
        snapshot.state;            // 'paused' ou 'running'
        snapshot.bytesTransferred; // nb d'octets déjà téléchargés
        snapshot.totalBytes;      // taille totale du fichier en octets
        updateProgressBar(snapshot.bytesTransferred);
    }
    function onError(error) {
        console.error('Oops…', error);
    }

    function onComplete() {
        console.log('File uploaded!');
        successProgressBar();
        pageTokenExample();
    }
}