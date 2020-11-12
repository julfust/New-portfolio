const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',

	init: function() {

		/* Ensemble des selecteurs JQuery déclencheur des différentes fonctions */
		$('#bt_ping').on('click', app.ping);
		$('#create').on('click', app.signup);
		$('#connexion').on('click', app.login);
		$('#button-ctnr').on('click', app.disconect);

		$('#submit').on('click', function(){
			//Condition pour empecher d'envoyer si le champs est vide
			if($('#message-submit').val()){
			app.say();
			$('#message-submit').val("");
			}
		})
		//Gestion de la touche d'entrée
		$('#message-submit').keypress(function (event) {
				if($('#message-submit').val()){
					var keycode = (event.keyCode ? event.keyCode : event.which);
					if (keycode == 13) {
					app.say();
					$('#message-submit').val("");
				}
			}
		})
	},

	/* Fonction permettant de renvoyer le temps de réponse au serveur (Liée à la page index.html) */
	ping: function() {
		$.ajax({
			url: app.kwick_api_url + 'ping',
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				localStorage.setItem('time', result.kwick.completed_in);
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	/* Fonction permettant de créer un compte (liée à la page inscription.html) */
	signup: function(){

		let pseudo = $('#pseudo').val();
		let pass = $('#pass').val();
		let confirmation_pass = $('#confirmation').val();

		if(pseudo)	$('#pseudo').css('border', '');
		if(pass)	$('#pass').css('border', '');
		if(confirmation_pass)	$('#confirmation').css('border', '');		

		if(pass == confirmation_pass){

			$.ajax({
				url: app.kwick_api_url + 'signup/' + pseudo + '/' + pass,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					alert(result.result.message);

					if(result.result.status == "done"){
						localStorage.setItem('id', result.result.id);
						localStorage.setItem('token', result.result.token);
						localStorage.setItem('pseudo', pseudo);
						localStorage.setItem('time', result.kwick.completed_in);
						window.location.href = 'messagerie.html';
						return false;
					}

					else{
						$('#pseudo').css('border-color', 'red');
					}
				},

				error: function(xhr, status, error) {
					alert('Erreur: Veuillez renseigner tout les champs du formulaire');
					if(!(pseudo))	$('#pseudo').css('border-color', 'red');
					if(!(pass))	$('#pass').css('border-color', 'red');
					if(!(confirmation_pass))	$('#confirmation').css('border-color', 'red');
				}
			});
		}

		else{
			alert("Les champs des mots de passe ne sont pas identique, veuillez recommencer");
			$('#confirmation').css('border-color', 'red');
			$('#pass').css('border-color', 'red');
		}
	},

	/* Fonction permettant de se connecter à partir d'un login et d'un mots de passe */
	login: function(){
		
		let pseudo = $('#pseudo').val();
		let pass = $('#pass').val();

		$.ajax({
			url: app.kwick_api_url + 'login/' + pseudo + '/' + pass,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				alert(result.result.message);

				if(result.result.status == "done"){
					localStorage.setItem('id', result.result.id);
					localStorage.setItem('token', result.result.token);
					localStorage.setItem('pseudo', pseudo);
					localStorage.setItem('time', result.kwick.completed_in);
					window.location.href = 'messagerie.html';
					return false;
				}

				else{
					$('#pseudo').css('border-color', 'red');
					$('#pass').css('border-color', 'red');
				}
			},

			error: function(xhr, status, error) {
				alert('Erreur : Veuillez renseigner tout les champs');
				$('#pseudo').css('border-color', 'red');
				$('#pass').css('border-color', 'red');
			}
		});
	},

	/*Fonction permettant de se déconnecter en utilisant le token (liée à la page messagerie.html) */
	disconect: function() {
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('id');

		$.ajax({
			url: app.kwick_api_url + 'logout/' + token + '/' + id,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				localStorage.setItem('id', '');
				localStorage.setItem('token', '');
				localStorage.setItem('pseudo', '');
				localStorage.setItem('recuplast', '');
				localStorage.setItem('time', result.kwick.completed_in);
				window.location.href = 'index.html';
            	return false;
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	/* Fonction permettant d'afficher l'ensemble des utilisateurs connectés (liée à la page messagerie.html) */
	
	logged: function(){
		let token = localStorage.getItem('token');
		let pseudo = localStorage.getItem('pseudo');

		$.ajax({
			url: app.kwick_api_url + 'user/logged/' + token,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {

				for(let i = 0; i < result.result.user.length; i++){
					if(result.result.user[i] == pseudo){
						$("#title-contact-ctnr").after("<div class=\"contact-item\"><i class=\"fas fa-user\" style=\"color:blue\"></i><h3 style=\"color:red\">" + result.result.user[i] + "</h3></div>");
						continue;
					}
					$("#title-contact-ctnr").after("<div class=\"contact-item\"><i class=\"fas fa-user\" style=\"color:green\"></i><h3>" + result.result.user[i] + "</h3></div>");
				}
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		})
	},

	/* Fonction permettant d'envoyer des messages (liée à la page messagerie.html) */
	say: function(){
		let token = localStorage.getItem('token');
		let user_id = localStorage.getItem('id');
		let message = encodeURI($('#message-submit').val());

		$.ajax({
			url: app.kwick_api_url + 'say/' + token + '/' + user_id + '/' + message,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {				
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		})
	},

	/* Fonction permettant d'afficher les messages du chat (liée à la page messagerie.html) */

	updateTalk: function(){
		let token = localStorage.getItem('token');

		$.ajax({
			url: app.kwick_api_url + 'talk/list/' + token + '/0',
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				localStorage.setItem('recuplast', result.result.last_timestamp);
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		})	
	},

	talkList: function(){

		let token = localStorage.getItem('token');
		let timeStamp = (localStorage.getItem('recuplast') - 2000);

		$.ajax({
			url: app.kwick_api_url + 'talk/list/' + token + '/' + timeStamp,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				$("#message-registre").empty();

				if(result.result.status == "done"){

					for(let i = 0; i < result.result.talk.length; i++)
					{
						$("#message-registre").append("<p><span style=\"color:green\">message n°" + (i+1) + "</span> <span style=\"color:red\">" + result.result.talk[i].user_name + "</span> : " + result.result.talk[i].content + "</p><br />");
					}
				}
			
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		})
	},
}