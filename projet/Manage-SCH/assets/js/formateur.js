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


//Partie 1: Initialisation des données
// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let token = localStorage.getItem('token');

$('#profil-name').empty();
let pseudo = localStorage.getItem('pseudo');
$('#profil-name').text(pseudo);

let class_Selected = localStorage.getItem('class');



//Partie 2: Gestion du tableau des élèves
//Affichage du tableau des élèves
database.ref('class/' +class_Selected+ '/student-list').on('value', function(snapshot) {
    
    $('#student').empty();

    let content = '';

        snapshot.forEach(function(item) {

            const user = item.val();
            let user_Name = user.name.replace(' ', '-')

            content += `<tr>
                            <td>${user.name}</td>
                            <td>${user.tel}</td>
                            <td>${user.sexe}</td>
                            <td>
                                <form class="report-form">
                                    <input type="hidden" value=${user.user_Id}  />
                                    <input type="hidden" value=${user_Name} />

                                    <select class="date-select-bar">
                                
                                    </select>

                                    <div class="radio-container">
                                        <input type="radio" name="report" value="late" id="late"    /><label for="late">Retard</label>
                                        <input type="radio" name="report" value="absent" id="absent" /><label for="absent">Absence</label>
                                    </div>
                                    <button type="submit">Enregistrer</button>
                                </form>
                            </td>
                        </tr>`;
        });

    $('#student').append(content);

    //Gestionnaire d'évenement pour le systeme d'abscence et retard.
    //On ajoute un id au formulaire lors du click pour pouvoir le cibler en Jquery.
    setTimeout(() => {
        showPlanning();

        $('.report-form').click(function(){
            $(this).attr('id', 'report-form-target');
            setTimeout(() => $('#report-form-target').on('submit', onReportStudent), 500);
        });

    }, 500);
})


//Fonction 1: Permet d'enregistrer les abscences et retards d'un élève dans la base de données
function onReportStudent(event)
{
    event.preventDefault();

    let report_Id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let student_Selected = $("#report-form-target > input[type='hidden']:nth-child(1)").val();
    let student_Name = $("#report-form-target > input[type='hidden']:nth-child(2)").val();
    let date = $('#report-form-target > select').val();
    let report_Type = $("#report-form-target > .radio-container > input[name='report']:checked").val();

    let data_Class = {
        student_Name: student_Name,
        date: date,
        report_Id: report_Id,
        student_Id: student_Selected
    }

    let data_Student = {
        date: date
    }

    if(report_Type == 'late')
    {
        database.ref('class/' +class_Selected+ '/report-list/retard/' +report_Id).set(data_Class);
        database.ref('class/' +class_Selected+ '/student-list/' +student_Selected+ '/report-list/retard/' +report_Id).set(data_Student);
    }

    else if(report_Type == "absent")
    {
        database.ref('class/' +class_Selected+ '/report-list/absence/' +report_Id).set(data_Class);
        database.ref('class/' +class_Selected+ '/student-list/' +student_Selected+ '/report-list/absence/' +report_Id).set(data_Student);
    }

    $('#report-form-target').removeAttr('id'); 
}




//Partie 3: Gestion du planning
//Affichage du planning
let day = 1;
let month = 1;
let year = 20;

showPlanning();

$('#previous-date').click(()=>previousDate());

function previousDate()
{
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


$('#next-date').click(()=>nextDate());

function nextDate()
{
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


//Fonction 11: Permet d'afficher le planning
function showPlanning()
{
    $('#planning').empty();

    let date_Target = [];

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

    $('.date-select-bar').empty();
    
    content = `
                <option value=${date_Selected[0]}>${date_Target[0]}</option>
                <option value=${date_Selected[1]}>${date_Target[1]}</option>
                <option value=${date_Selected[2]}>${date_Target[2]}</option>
                <option value=${date_Selected[3]}>${date_Target[3]}</option>
                <option value=${date_Selected[4]}>${date_Target[4]}</option>`

    $('.date-select-bar').append(content);
    
    setTimeout(() => {
            showCLassroom(class_Selected);
        }, 500);
}

//Affichage des cours en fonction de la classe du formateur
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
                    <h4>${classroom.title}</h4>
                    <h4>${classroom.teacher}</h4>
                `);
            }

            else
            {
                let table_Target = '.' +classroom.date+ '-' +classroom.hour;
            
                $(table_Target).css('background-color', '#e2e2e2');
                $(table_Target).append(`
                    <h4>${classroom.title}</h4>
                    <h4>${classroom.teacher}</h4>
                `);
            }
        });

    })
}




//Partie 4: Gestion du tableau des absence et retard
//Affichage des absences
database.ref('class/' +class_Selected+ '/report-list/absence').on('value', function(snapshot) {
    
    $('#student-absente').empty();

    let content = '';

        snapshot.forEach(function(item) {

            const user = item.val();
            let date = user.date.slice(0, 8);

            content += `<tr>
                            <td><button id=${user.report_Id} class="delete-absente-button" type="submit"><i class="fas fa-times"></i></button><span style="display: none">${user.student_Id}</span>Absence</td>
                            <td>${user.student_Name}</td>
                            <td>${date}</td>
                        </tr>`;
        });

    $('#student-absente').append(content);

    //Gestionnaire d'évenement pour le systeme d'abscence et retard.
    //On ajoute un id au formulaire lors du click pour pouvoir le cibler en Jquery.
    setTimeout(() => {
        $('.delete-absente-button').click(function(){
            $(this).attr('class', 'delete-absente-button-target');
            onDeleteAbsent();
        });
    }, 500);
})

//Fonction 3: Permet de supprimer une absence de la base de donnée (EN DEVELOPPEMENT)
function onDeleteAbsent()
{
    let report_Selected = $('.delete-absente-button-target').attr('id');
    let student_Selected = $('.delete-absente-button-target + span').text();

    database.ref('class/' +class_Selected+ '/report-list/absence/' +report_Selected).set(null);
    database.ref('class/' +class_Selected+ '/student-list/' +student_Selected+ '/report-list/absence/' +report_Selected).set(null);
}


//Affichage des retards
database.ref('class/' +class_Selected+ '/report-list/retard').on('value', function(snapshot) {
    
    $('#student-late').empty();

    let content = '';

        snapshot.forEach(function(item) {

            const user = item.val();
            let date = user.date.slice(0, 8);

            content += `<tr>
                            <td><button id=${user.report_Id} class="delete-late-button" type="submit"><i class="fas fa-times"></i></button><span style="display: none">${user.student_Id}</span>Retard</td>
                            <td>${user.student_Name}</td>
                            <td>${date}</td>
                        </tr>`;
        });

    $('#student-late').append(content);

    //Gestionnaire d'évenement pour le systeme d'abscence et retard.
    //On ajoute un id au formulaire lors du click pour pouvoir le cibler en Jquery.
    setTimeout(() => {
        $('.delete-late-button').click(function(){
            $(this).attr('class', 'delete-late-button-target');
            onDeleteLate();
        });
    }, 500);
})

//Fonction 4: Permet de supprimer un retard de la base de donnée (EN DEVELOPPEMENT)
function onDeleteLate()
{   
    let report_Selected = $('.delete-late-button-target').attr('id');
    let student_Selected = $('.delete-late-button-target + span').text();

    database.ref('class/' +class_Selected+ '/report-list/retard/' +report_Selected).set(null);
    database.ref('class/' +class_Selected+ '/student-list/' +student_Selected+ '/report-list/retard/' +report_Selected).set(null);
}




//Partie 5: Fonctions complémentaires: déconnexion, router, mise en forme...
//Deconnexion de l'utilisateur
$('#btn-logout').click(function(){
    database.ref('user-connected/' +token).set(null);
    localStorage.setItem('token', '');
    localStorage.setItem('class', '');
    localStorage.setItem('pseudo', '');
    self.location.href = 'index.html';
})


//Gestion du router
//Affichage tableau des élèves
$('#classroom-section-title').click(function(){
    $('#classroom-section-title').css("height", "50px");
    $('#planning-section-title').css("height", "35px");
    $('#report-section-title').css("height", "35px");

    $('#classroom-section').css("display", "block");
    $('#planning-section').css("display", "none");
    $('#report-section').css("display", "none");
})

//Affichage tableau planning
$('#planning-section-title').click(function(){
    $('#classroom-section-title').css("height", "35px");
    $('#planning-section-title').css("height", "50px");
    $('#report-section-title').css("height", "35px");

    $('#classroom-section').css("display", "none");
    $('#planning-section').css("display", "block");
    $('#report-section').css("display", "none");
})

//Affichage tableau abscence et retard
$('#report-section-title').click(function(){
    $('#classroom-section-title').css("height", "35px");
    $('#planning-section-title').css("height", "35px");
    $('#report-section-title').css("height", "50px");

    $('#classroom-section').css("display", "none");
    $('#planning-section').css("display", "none");
    $('#report-section').css("display", "block");
})


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