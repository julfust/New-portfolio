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

let token = localStorage.getItem('token');

$('#profil-name').empty();
let pseudo = localStorage.getItem('pseudo');
$('#profil-name').text(pseudo);

let class_Selected = localStorage.getItem('class');
let student_Id = localStorage.getItem('id');


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
    
    setTimeout(() => {
            showCLassroom(class_Selected);
        }, 500);
}


function showCLassroom(class_Selected)
{
    //Affichage des cours
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

    setTimeout(() => {
        showReport(student_Id);
    }, 500);
}

function showReport(student_Id)
{
    $('#count-ctnr').empty();

    //Affichage des abscence et retard
    database.ref('class/' +class_Selected+ '/student-list/' +student_Id+ '/report-list/retard/').on('value', function(snapshot){
        
        let count = 0;

        snapshot.forEach(function(item){
            
            const late = item.val();

            if(late.date.indexOf('day') != -1)
            {
                let date_Target = late.date.replace('-day', '');
                $(`td[class*=${date_Target}]`).append('<i class="fas fa-user-clock"></i>')
                $(`td[class*=${date_Target}]`).css('background-color', 'rgba(245, 92, 0, 0.5)');
            }

            else
            {
                $(`td[class*=${late.date}]`).append('<i class="fas fa-user-clock"></i>')
                $(`td[class*=${late.date}]`).css('background-color', 'rgba(245, 92, 0, 0.5)');
            }

            count++;

        });  

        $('#count-ctnr').append(`<span><i class="fas fa-exclamation-circle"></i> Vous avez actuellement <span id="number-abs" style="color: orange">${parseInt(count)}</span> retard(s)</span>`);

    })

    database.ref('class/' +class_Selected+ '/student-list/' +student_Id+ '/report-list/absence/').on('value', function(snapshot){
        
        let count = 0;

        snapshot.forEach(function(item){
            
            const late = item.val();

            if(late.date.indexOf('day') != -1)
            {
                let date_Target = late.date.replace('-day', '');
                $(`td[class*=${date_Target}]`).append('<i class="fas fa-user-times"></i>');
                $(`td[class*=${date_Target}]`).css('background-color','rgba(221, 35, 40, 0.6)' );
            }

            else
            {
                $(`td[class*=${late.date}]`).append('<i class="fas fa-user-times"></i>');
                $(`td[class*=${late.date}]`).css('background-color', 'rgba(221, 35, 40, 0.6)' );        
            }

            count++

        });

        $('#count-ctnr').append(` <span>et <span id="number-rtd" style="color: red;">${parseInt(count)}</span> absence(s) injustifié(es)</span>`);
    })
}

//Deconnexion de l'utilisateur
$('#btn-logout').click(function(){
    database.ref('user-connected/' +token).set(null);
    localStorage.setItem('token', '');
    localStorage.setItem('class', '');
    localStorage.setItem('pseudo', '');
    localStorage.setItem('id', '');
    self.location.href = 'index.html';
})

$('#btn-logout').mouseenter(function(){
    $('#btn-logout > a').css({
        'color' : '#eb2a5c',
        transitionDuration: '0.8s'
    })
})

$('#btn-logout').mouseleave(function(){
    $('#btn-logout > a').css({
        'color' : '#F7F7F2',
        transitionDuration: '0.8s'
    })
})
