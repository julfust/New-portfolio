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

//PARTIE CLASSE
//Partie 1: Initialisation de l'interface et affichage des données
let class_Selected = "";

//Affichage de la liste des classes
database.ref('class/').on('value', function(snapshot) 
{
    $('#dropdown-list').empty();
    $('#planning-dropdown-list').empty();

    let content = '';

    snapshot.forEach(function(item){
        const user = item.val();
        content += `<li>
                        <div class="list-item-container">
                            <div class="list-item-title">${user.class_Name}</div>
                            <div class="list-item-logo">
                                <button class="modif-class-button"><i class="fas fa-pencil-alt"></i></button>
                                <button class="delete-class-button" id=${user.class_Name}><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                    </li>`
    })

    $('#dropdown-list').append(content);
    $('#planning-dropdown-list').append(content);

   //Gestionnaire d'évenement: Selection de la classe
    setTimeout(() => {
        $('.list-item-title').click(function(){
            /*On récupère la classe selectionner lors du click dans un variable et on affiche son nom 
            sur la page*/
            class_Selected = $(this).text();

            $('#dropdown-title-class').empty();
            $('#dropdown-title-class').append(class_Selected);

            $('#dropdown-title-class-planning').empty();
            $('#dropdown-title-class-planning').append(class_Selected);

            $('#class-title').empty();
            $('#class-title').append('<i class="fas fa-chalkboard-teacher"></i>' +class_Selected);


            /*On appelle les differentes fonctions permettant d'afficher les données 
            de la classe: formateur, élève, cours*/
            showTeacher(class_Selected);
            showStudent(class_Selected);
            showCLassroom(class_Selected);
        });

        //Gestionnaire d'évenement: suppression de la classe
        $('.delete-class-button').click(function(){
            $(this).attr('class', 'delete-class-button-target');
            onDeleteClass();
        })
    }, 500);
})


//Fonction 1: Permet de montrer la liste des formateurs en fonction de la classe
function showTeacher(class_Selected)
{
    database.ref('class/' +class_Selected+ '/teacher-list').on('value', function(snapshot) {

        $('#teacher').empty();   
        
        let content = '';

        snapshot.forEach(function(item) {

            const user = item.val();

            content += `<tr>
                            <td>Prof</td>
                            <td>

                                    <button type="submit" id=${user.user_Id} class='delete-teacher-button'><i class="fas fa-times"></i></button>
                                    ${user.name}

                            </td>

                            <td>&nbsp;</td>
                            <td>&nbsp;</td>

                            <td>
                                <form class="teacher-modif-form">
                                    <p>Nom</p>
                                    <input type="text"  />
                                    <input type="hidden" value=${user.user_Id}   />
                                    <Button type="submit">Enregistrer</Button>
                                </form>
                            </td>
                        </tr>`;
        });

        $('#teacher').append(content);

        //Gestionnaire d'evenement: modification et suppression des formateurs
        setTimeout(() => {
            
            $('.delete-teacher-button').click(function(){
                $(this).attr('class', 'delete-teacher-button-target')
                onDeleteTeacher();
            })

            $('.teacher-modif-form').click(function(){
                $(this).attr('id', 'teacher-modif-form-target');
                setTimeout(() => $('#teacher-modif-form-target').on('submit', onModifTeacher), 500);
            });
  
        }, 500);
    });
}


//Fonction 2: Permet de montrer les élèves en fonction de la classe
function showStudent(class_Selected)
{
    database.ref('class/' +class_Selected+ '/student-list').on('value', function(snapshot) {

        $('#student').empty();   
        
        let content = '';

        snapshot.forEach(function(item) {

            const user = item.val();

            content += `<tr>
                            <td>Elève</td>
                            <td>

                                    <button type="submit" id=${user.user_Id} class='delete-user-button'><i class="fas fa-times"></i></button>
                                    ${user.name}

                            </td>

                            <td>${user.tel}</td>
                            <td>${user.sexe}</td>

                            <td>
                                <form class="modif-form">
                                    <select>
                                        <option value="nom">Nom et prénom</option>
                                        <option value="tel">Telephone</option>
                                        <option value="sexe">Sexe</option>
                                    </select>
                                    <input type="text"  />
                                    <input type="hidden" value=${user.user_Id}   />
                                    <Button type="submit">Enregistrer</Button>
                                </form>
                            </td>
                        </tr>`;
        });

        $('#student').append(content);
        
        //Gestionnaire d'événement: modification et suppression d'un élève.
        setTimeout(() => {
            
            $('.delete-user-button').click(function(){
                $(this).attr('class', 'delete-user-button-target');
                onDeleteStudent();
            })

            $('.modif-form').click(function(){
                $(this).attr('id', 'modif-form-target');
                setTimeout(() => $('#modif-form-target').on('submit', onModifStudent), 500);
            });
  
        }, 500);
    })
}




//Partie 2: Gestion des information de classe, d'élève et de formateur

//Partie 2-1: Gestion des classes
//Fonction 3: Permet d'ajouter une nouvelle classe dans la base de donnée
$('#new-class-form').on('submit', onAddClass);

function onAddClass(event)
{
    event.preventDefault();
    $('#form-class-error').css('display', 'none');
    $('#form-class-error2').css('display', 'none');

    let new_Class = $('#class').val();

    if(new_Class == '')
    {
        $('#form-class-error').css('display', 'block');
        return
    }

    if(new_Class.indexOf(' ') != -1)
    {
        $('#form-class-error2').css('display', 'block');
        return
    }


    database.ref('class/' +new_Class).set({class_Name: new_Class});

    $('#new-class-form')[0].reset();
}


//Fonction 4: Permet de supprimer une classe de la base de donnée
$('#delete-class').click(onDeleteClass);

function onDeleteClass()
{
    class_Target = $('.delete-class-button-target').attr('id');

    database.ref('class/' +class_Target).set(null);
    
    //Si on supprime la classe affichée, on réactualise le titre du boutton ainsi que l'affichage du tableau
    if(class_Selected == class_Target)
    {
        class_Selected = "";

        $('#dropdown-title-class').empty();
        $('#dropdown-title-class').append('Liste des classes');
        $('#dropdown-title-class-planning').empty();
        $('#dropdown-title-class-planning').append('Liste des classes');
        $('#class-title').empty();
        $('#class-title').append('<i class="fas fa-chalkboard-teacher"></i>Classe');
    }

    //Supperssion des cours de la classe
    database.ref('classroom/' +class_Target).set(null);
}





// Partie 2-2: Gestion des formateurs
//Fonction 5: Permet de rajouter un formateur dans la base de donnée
$('#new-teacher-form').on('submit', onAddTeacher);

function onAddTeacher(event)
{
    event.preventDefault();

    //On efface les messages d'erreurs à chaque nouvelle envoie de formulaire
    $('#error-title-teacher-form1').css('display', 'none');
    $('#error-title-teacher-form2').css('display', 'none');
    $('#error-title-teacher-form3').css('display', 'none');
    $('#error-title-teacher-form4').css('display', 'none');

    let teacher_Id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let name = $('#name').val();
    let pseudo = $('#teacher-pseudo').val();
    let password = $('#teacher-password').val();
    let password_Confirm = $('#teacher-password-confirm').val();
    let teacher_Classe = class_Selected;

    //Gestion des cas d'erreur
    
    //Cas 1: Aucune classe n'a étè sélèctionnées
    if(class_Selected == "")
    {
        $('#error-title-teacher-form1').css('display', 'block');
        return;
    }

    //Cas 2: Les champs sont vides
    if(name == "" || pseudo == "" || password == "" || password_Confirm == "")
    {
        $('#error-title-teacher-form2').css('display', 'block');
        return;
    }

    //Cas 3: Probleme de correspondance entre les mots de passe
    if(password != password_Confirm)
    {
        $('#error-title-teacher-form3').css('display', 'block');
        return;
    }

    let data_Teacher = {
        name: name,
        user_Id: teacher_Id,
    }


    let data_User = {
        name: name,
        pseudo: pseudo,
        password: password,
        class: teacher_Classe,
        user_Type: 'prof',
        user_Id: teacher_Id
    }

    //Liste des professeur utilisée pour l'affichage des données en fonction de la classe
    database.ref('class/' +class_Selected+ '/teacher-list/'+ teacher_Id).set(data_Teacher);

    //Liste des utilisateurs utilisé pour l'autentification
    database.ref('user-list/' +teacher_Id).set(data_User);

    $('#new-teacher-form')[0].reset();
}


//Fonction 6: permet de modifier les information d'un formateur dans la base de donnée
function onModifTeacher(event)
{   
    event.preventDefault();


    let new_Value = $('#teacher-modif-form-target > input[type="text"]').val();
    let teacher_Selected = $('#teacher-modif-form-target > input[type="hidden"]').val();


    database.ref('class/' +class_Selected+ '/teacher-list/' +teacher_Selected+ '/name').set(new_Value);

    //On enleve l'id au formulaire pour éviter de marquer plusieurs formulaire avec le meme id
    $('#modif-form-target').removeAttr('id'); 
}


//Fonction 7: permet de suppprimer un formateur de la base de donnée
function onDeleteTeacher()
{
    let teacher_Selected = $('.delete-teacher-button-target').attr('id')

    //Suppression des données prof et utilisateurs
    database.ref('class/' +class_Selected+ '/teacher-list/' +teacher_Selected).set(null);
    database.ref('user-list/' +teacher_Selected).set(null);
}





//Partie 2-3: Gestion des élèves
//Fonction 8: Permet de rajouter un élève dans la base de donnée
$('#new-user-form').on('submit', onAddStudent);

function onAddStudent(event)
{
    event.preventDefault();

    //On efface les messages d'erreurs à chaque nouvelle envoie de formulaire
    $('#error-title1').css('display', 'none');
    $('#error-title2').css('display', 'none');
    $('#error-title3').css('display', 'none');

    //Data student
    let user_Id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let nom = $('#nom').val();
    let tel = $('#tel').val();
    let sexe = $("input[name='sexe']:checked").val();

    //Data user
    let pseudo = $('#pseudo').val();
    let password = $('#password').val();
    let password_Confirm = $('#password_confirm').val();

    // Gestion des cas d'erreurs
    if(class_Selected == "")
    {
        $('#error-title1').css('display', 'block');
        return;
    }

    //1 champs non remplis
    if(nom == "" || tel == "" || sexe == "" || pseudo == "" || password == "" || password_Confirm == "")
    {
        $('#error-title2').css('display', 'block');
        return;
    }

    //2 Erreur de mots de passe
    if(password != password_Confirm)
    {
        $('#error-title3').css('display', 'block');
        return;
    }

    //Data student: contient les informations de l'élève
    let data_Student = {
        name : nom,
        tel : tel,
        sexe : sexe,
        user_Id: user_Id
    };

    //Data user: contient les informations de l'utilisateur
    let data_User = {
        name: nom,
        class: class_Selected,
        pseudo: pseudo,
        password: password,
        user_Type: "élève",
        user_Id: user_Id
    }

    //On créer deux liste dans la base de données:

    //Liste des élèves affiché dans le tableau
    database.ref('class/' +class_Selected+ '/student-list/' +user_Id).set(data_Student);

    //Liste des utilisateurs utilisé pour l'autentification
    database.ref('user-list/' +user_Id).set(data_User);

    $('#new-user-form')[0].reset();
}


//Fonction 9: Permet de modifier les information d'un élève dans la base de donnée
function onModifStudent(event)
{
    event.preventDefault();

    let attribute = $('#modif-form-target > select').val();
    let new_Value = $('#modif-form-target > input[type="text"]').val();
    let user_Selected = $('#modif-form-target > input[type="hidden"]').val();


    database.ref('class/' +class_Selected+ '/student-list/' +user_Selected+ '/' +attribute).set(new_Value);

    //On enleve l'id au formulaire pour éviter de marquer plusieurs formulaire avec le meme id
    $('#modif-form-target').removeAttr('id');
}


//Fonction 10: Permet de supprimer un élève de la base de donnée
function onDeleteStudent()
{
    let user_Selected = $('.delete-user-button-target').attr('id')

    database.ref('class/' +class_Selected+ '/student-list/' +user_Selected).set(null);
    database.ref('user-list/' +user_Selected).set(null);
}




// Fonctions de Dropdown(partie classe):
//Affichage du formulaire d'ajout d'utilisateur
function dropDownFunction() 
{
    document.getElementById("myDropdown").classList.toggle("show");
}

//Affichage du formulaire d'ajout du professeur
function dropDownFunctionProfesseur() 
{
    document.getElementById("myDropdown-professeur").classList.toggle("show-prof-form");
}




//PARTIE PLANNING
//Partie 1: Gestion des dates
let day = 1;
let month = 1;
let year = 20;

showPlanning();

//Fonction 1: Permet de retourner à la semaine précédente
$('#previous-date').click(()=>previousDate());

function previousDate()
{
    //Test: cas ou on tente de descendre en dessous du premier mois
    let day_Test = day;
    let month_Test = month;

    if(day_Test > 7)
            day_Test -= 7;

    else
    {
        if(day_Test == 0)
            day_Test = 1;

        day_Test = 30 + (day_Test - 7);
        month_Test--;
    }

    //Si on valide le test on effectue les calculs de la date du premier lundi de la semaine précécente
    if(month_Test > 0)
    {
        if(day > 7)
            day -= 7;

        else
        {
            if(day == 0)
                day = 1;

            day = 30 + (day - 7);
            month--;
        }

        showPlanning();
    }
}

//Fonction 2: Permet d'aller à la semaine suivante
$('#next-date').click(()=>nextDate());

function nextDate()
{
    //Test: cas ou on tente d'aller au dessus du 12ème mois
    let day_Test = day;
    let month_Test = month;

    if(day_Test <= 23)
            day_Test += 7;

    else
    {
        day_Test = 7 + (day_Test - 30);

        if(day_Test == 0)
            day_Test = 1;

        month_Test++;
    }

    //Si on valide le test on effectue les calculs de la date du premier lundi de la semaine suivante
    if(month_Test < 13)
    {
        if(day <= 23)
            day += 7;

        else
        {
            day = 7 + (day - 30);

            if(day == 0)
                day = 1;

            month++;
        }
    
        showPlanning();
    }
}

//Partie 2: Affichage des données

//Partie 2-1: Affichage du planning
//Fonction 3: Permet d'afficher le planning (et de remplir la select bar du fomulaire des absences et retards)
function showPlanning()
{
    //Partie a: Gestion du planning
    $('#planning').empty();

    //Tableau contenant l'ensemble des dates de la semaine selectionnée
    let date_Target = [];

    /*Principe on déduit à partir de la date du premier lundi la date des autres jours de la semaine qu'on 
    push dans date_Target*/
    for(let i = 0; i < 7; i++)
    {
        if(day+i <= 30)
        {
            if(day+i < 10)
                date_Target.push('0' +parseInt(day+i)+ '/0' +parseInt(month)+ '/' +parseInt(year));

            else
                date_Target.push(parseInt(day+i)+ '/0' +parseInt(month)+ '/' +parseInt(year));
        }

        else
        {
            date_Target.push('0' +parseInt(day + i - 30)+ '/0' +parseInt(month+1)+ '/' +parseInt(year));
        }
    }

    //Tableau contenant l'ensemble des classes des <td> du tableau (matin)
    let td_Morning_CLass = [];

    for(let i = 0; i < 7; i++)
    {
        if(day+i <= 30)
        {
            if(day+i < 10)
                td_Morning_CLass.push('0' +parseInt(day+i)+ '-0' +parseInt(month)+ '-' +parseInt(year)+ '-morning');

            else
                td_Morning_CLass.push(parseInt(day+i)+ '-0' +parseInt(month)+ '-' +parseInt(year)+ '-morning');
        }

        else
        {
            td_Morning_CLass.push('0' +parseInt(day + i - 30)+ '-0' +parseInt(month+1)+ '-' +parseInt(year)+ '-morning');
        }
    }

    //Tableau contenant l'ensemble des classes des <td> du tableau (apres-midi)
    let td_Afternoon_Class = [];

    for(let i = 0; i < 7; i++)
    {
        if(day+i <= 30)
        {
            if(day+i < 10)
                td_Afternoon_Class.push('0' +parseInt(day+i)+ '-0' +parseInt(month)+ '-' +parseInt(year)+ '-afternoon');

            else
                td_Afternoon_Class.push(parseInt(day+i)+ '-0' +parseInt(month)+ '-' +parseInt(year)+ '-afternoon');
        }

        else
        {
            td_Afternoon_Class.push('0' +parseInt(day + i - 30)+ '-0' +parseInt(month+1)+ '-' +parseInt(year)+ '-afternoon');
        }
    }

    let content = '';

    content += `<thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>${date_Target[0]}</th>
                        <th>${date_Target[1]}</th>
                        <th>${date_Target[2]}</th>
                        <th>${date_Target[3]}</th>
                        <th>${date_Target[4]}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>9H</td>
                        <td class="${td_Morning_CLass[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>10H</td>
                        <td class="${td_Morning_CLass[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>11H</td>
                        <td class="${td_Morning_CLass[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>12H</td>
                        <td class="${td_Morning_CLass[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>13H</td>
                        <td class="${td_Morning_CLass[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Morning_CLass[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>14H</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>

                    <tr>
                        <td>15H</td>
                        <td class="${td_Afternoon_Class[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>16H</td>
                        <td class="${td_Afternoon_Class[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>17H</td>
                        <td class="${td_Afternoon_Class[0]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[1]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[2]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[3]} tab-cell-hour">&nbsp;</td>
                        <td class="${td_Afternoon_Class[4]} tab-cell-hour">&nbsp;</td>
                    </tr>

                </tbody>`

    $('#planning').append(content);

    //Partie b: Gestion de la select bar des absences
    /*Tableau contenant l'ensemble des values des differentes options de la select bar du formulaire: 
    absence/retard*/
    let date_Selected = [];

    for(let i = 0; i < 7; i++)
    {
        if(day+i <= 30)
        {
            if(day+i < 10)
                date_Selected.push('0' +parseInt(day+i)+ '-0' +parseInt(month)+ '-' +parseInt(year));

            else
                date_Selected.push(parseInt(day+i)+ '-0' +parseInt(month)+ '-' +parseInt(year));
        }

        else
        {
            date_Selected.push('0' +parseInt(day + i - 30)+ '-0' +parseInt(month)+ '-' +parseInt(year));
        }
    }

    $('#date-selected').empty();

    content = `
                <option value=${date_Selected[0]}>${date_Target[0]}</option>
                <option value=${date_Selected[1]}>${date_Target[1]}</option>
                <option value=${date_Selected[2]}>${date_Target[2]}</option>
                <option value=${date_Selected[3]}>${date_Target[3]}</option>
                <option value=${date_Selected[4]}>${date_Target[4]}</option>`

    $('#date-selected').append(content);

    //Une fois le planning affiché, on appelle la fonction permettant d'afficher les cours
    setTimeout(() => {
        showCLassroom(class_Selected);
    }, 500);

}

//Partie 2-2: Affichage des cours
//Fonction 4: Permet d'afficher les cours en fonctions des classes
function showCLassroom(class_Selected)
{
    database.ref('classroom/' +class_Selected).on('value', function(snapshot) {

        $('.tab-cell-hour').css('background-color', '#f1f1f1');
        $('.tab-cell-hour').empty()
    
        snapshot.forEach(function(item){

            const classroom = item.val();
    
            if(classroom.hour == "day")
            {
                $(`td[class*=${classroom.date}]`).css('background-color', '#e2e2e2');
                $(`td[class*=${classroom.date}]`).append(`
                    <div class="classroom-title">
                        <button class="delete-classroom-button" id=${classroom.classroom_Id}><i class="fas fa-times"></i></button>
                        <div>
                            <h4>${classroom.title}</h4>
                            <h4>${classroom.teacher}</h4>
                        </div>
                    </div>`);
            }

            else
            {
                let table_Target = '.' +classroom.date+ '-' +classroom.hour;
            
                $(table_Target).css('background-color', '#e2e2e2');
                $(table_Target).append(`
                <div class="classroom-title">
                    <button class="delete-classroom-button" id=${classroom.classroom_Id}><i class="fas fa-times"></i></button>
                    <div>
                        <h4>${classroom.title}</h4>
                        <h4>${classroom.teacher}</h4>
                    </div>
                </div>`);
            }
        });

        //Gestionnaire d'événement: suppresion d'un cours
        setTimeout(() => {
            $('.delete-classroom-button').click(function(){
                $(this).attr('class', 'delete-classroom-button-target');
                onDeleteCLassroom();
            });
        });
    })
}

//Partie 3: Gestion des données
//Fonction 5: Permet d'ajouter un cour dans la base de données 
$('#classroom-form').on('submit', onAddClassroom);

function onAddClassroom(event)
{
    event.preventDefault();

    $('#error-title-classroom-form1').css('display', 'none');
    $('#error-title-classroom-form2').css('display', 'none');

    let classroom_Id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let classroom_Name = $('#classroom-name').val();
    let teacher_Name = $('#teacher-name').val();
    let date_Selected = $('#date-selected').val();
    let hour_Selected = $('#hour-select').val();

    if(class_Selected == '')
    {
        $('#error-title-classroom-form1').css('display', 'block');
        return;
    }

    if(classroom_Name == '' || teacher_Name == '')
    {
        $('#error-title-classroom-form2').css('display', 'block');
        return;
    }

    data = {
        title: classroom_Name,
        class: class_Selected,
        teacher: teacher_Name,
        date: date_Selected,
        hour: hour_Selected,
        classroom_Id: classroom_Id
    }

    database.ref('classroom/' +class_Selected+ '/' +classroom_Id).set(data);

    $('#classroom-form')[0].reset();

    showPlanning();
}

//Fonction 6: Permet de suprimer un cour de la base de donnée
function onDeleteCLassroom()
{
    let classroom_Target = $('.delete-classroom-button-target').attr('id');

    //Suppression de la classe ainsi que des données élèves qu'elle contient
    database.ref('classroom/' +class_Selected+ '/' +classroom_Target).set(null);

    showPlanning();
}


//Fonction 7: Permet d'ajouter un classe dans le formulaire d'ajout du planning
$('#planning-new-class-form').on('submit', onAddClassPlanning);

function onAddClassPlanning(event)
{
    event.preventDefault();

    let new_Class = $('#planning-Class').val();

    database.ref('class/' +new_Class).set({class_Name: new_Class});
}

//Fonction de dropdown (partie planning)
//Affichage du formulaire d'ajout d'un cours
function dropDownFunctionCours() 
{
    document.getElementById("myDropdown-cours").classList.toggle("show-cours-form");
}



//PARTIE COMPLEMENTAIRE (mise en forme, router etc...)
//Partie 1: Gestion router
//Affichage tableau des élèves
$('#classroom-section-title').click(function(){
    $('#classroom-section-title').css("height", "50px");
    $('#planning-section-title').css("height", "35px");
    $('#classroom-section').css("display", "block");
    $('#planning-section').css("display", "none");
})

//Affichage tableau planning
$('#planning-section-title').click(function(){
    $('#classroom-section-title').css("height", "35px");
    $('#planning-section-title').css("height", "50px");
    $('#classroom-section').css("display", "none");
    $('#planning-section').css("display", "block");
})


//Partie 2: Gestion effets css
//Coloration bouton
$('#btn-logout').mouseenter(function(){
    $('#btn-logout > a').css({
        'color' : '#eb2a5c',
        transitionDuration: '0.5s'
    })
})

$('#btn-logout').mouseleave(function(){
    $('#btn-logout > a').css({
        'color' : '#F7F7F2',
        transitionDuration: '0.5s'
    })
})

$('#register-student').mouseenter(function(){
    $('#register-student > p').css({
        'color' : '#eb2a5c',
        transitionDuration: '0.5s'
    })
})

$('#register-student').mouseleave(function(){
    $('#register-student > p').css({
        'color' : '#F7F7F2',
        transitionDuration: '0.5s'
    })
})

$('.dropbtn').mouseenter(function(){
    $('.dropbtn > p').css({
        'color' : '#eb2a5c',
        transitionDuration: '0.5s'
    })
})

$('.dropbtn').mouseleave(function(){
    $('.dropbtn > p').css({
        'color' : '#F7F7F2',
        transitionDuration: '0.5s'
    })
})

$('.dropbtn-professeur').mouseenter(function(){
    $('.dropbtn-professeur > p').css({
        'color' : '#eb2a5c',
        transitionDuration: '0.5s'
    })
})

$('.dropbtn-professeur').mouseleave(function(){
    $('.dropbtn-professeur > p').css({
        'color' : '#F7F7F2',
        transitionDuration: '0.5s'
    })
})

$('.dropbtn-cours').mouseenter(function(){
    $('.dropbtn-cours > p').css({
        'color' : '#eb2a5c',
        transitionDuration: '0.5s'
    })
})

$('.dropbtn-cours').mouseleave(function(){
    $('.dropbtn-cours > p').css({
        'color' : '#F7F7F2',
        transitionDuration: '0.5s'
    })
})