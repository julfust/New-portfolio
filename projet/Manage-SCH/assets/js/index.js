//Initialisation de l'application
// Configuration de firebase
var firebaseConfig = {
    apiKey: "AIzaSyCvIsah7MPvXALU1hiilY6pjzm7UNZi9zc",
    authDomain: "project-classroom-c1da1.firebaseapp.com",
    databaseURL: "https://project-classroom-c1da1.firebaseio.com",
    projectId: "project-classroom-c1da1",
    storageBucket: "project-classroom-c1da1.appspot.com",
    messagingSenderId: "613309391988",
    appId: "1:613309391988:web:87116cee59aff788fe5d21"
  };
// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();




//Fonction 1: Autentification de l'utilisateur
$('form').on('submit', userConnexion);

function userConnexion(event)
{
    event.preventDefault();

    //On efface le message d'erreur à chaque nouvelle du formulaire
    $('#error-login').css('display', 'none');

    let login_Success = false;
    let pseudo = $('#sign-in-identifiant').val();
    let password = $('#sign-in-mdp').val();
    
    //Cas particulié pour l'administrateur puisque ses identifiants sont définits de base dans l'application
    if(pseudo == 'root' && password == 'root')
    {
        self.location.href = 'administrateur.html'
    }

    //On va chercher la liste des utilisateurs dans la base de donnée pour comparer avec les valeurs de l'utilisateur
    database.ref('user-list/').on('value', function(snapshot){
        snapshot.forEach(function(item){
            
            const user = item.val();

            //On redirige l'utilisateur vers sa page en fonction de son user_Type
            if(pseudo == user.pseudo && password == user.password)
            {
                login_Success = true;
                
               if(user.user_Type == 'élève')
               {
                    let token = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                    let user_Id = user.user_Id;
                    let pseudo = user.pseudo;
                    let class_Selected = user.class;

                    let data = {
                        user_Id: user_Id,
                        pseudo: pseudo,
                        class: class_Selected
                    }

                    localStorage.setItem('token', token);
                    localStorage.setItem('class', class_Selected);
                    localStorage.setItem('pseudo', pseudo);
                    localStorage.setItem('id', user_Id);

                    database.ref('user-connected/' +token+ '/data').set(data);

                    self.location.href = 'élève.html';
               }

               if(user.user_Type == 'prof')
               {
                   let token = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                   let user_Id = user.user_Id;
                   let pseudo = user.pseudo;
                   let class_Selected = user.class;

                   let data = {
                        user_Id: user_Id,
                        pseudo: pseudo,
                        class: class_Selected
                   }

                   localStorage.setItem('token', token);
                   localStorage.setItem('class', class_Selected);
                   localStorage.setItem('pseudo', pseudo);

                    database.ref('user-connected/' +token+ '/data').set(data);

                    self.location.href = 'formateur.html';
               }

            }

        })
        //Affichage du message d'erreur
        if(login_Success ==  false)
        {
            $('#error-login').css('display', 'block');
        }
    })
}

//Js complémentaire: mise en forme boutton
$(document).ready(function(){

    $('#sign-in-to-chat').mouseenter(function(){
        $('#sign-in-to-chat > p').css({
            'color' : '#eb2a5c',
            transitionDuration: '0.5s'
        })
    })

    $('#sign-in-to-chat').mouseleave(function(){
        $('#sign-in-to-chat > p').css({
            'color' : '#F7F7F2',
            transitionDuration: '0.5s'
        })
    })
})