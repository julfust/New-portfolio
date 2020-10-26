export let modele = {
    updateContent(file) {
        const promise = new Promise((resolve, reject) => {
            let content = ""
            let xhr = new XMLHttpRequest()

            xhr.open('GET', file)

            xhr.addEventListener('readystatechange', function() {

                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    content =  xhr.responseText
                    resolve(content)

                } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
                    reject(xhr.status, xhr.statusText)
                }

            })

            xhr.send(null)
        })

        return promise
    }
}

function loadFile(file) {
  
    let xhr = new XMLHttpRequest();

    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', file);

    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone

        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur

            document.querySelector('.topic-content').innerHTML = '<div>' + xhr.responseText + '</div>'; // Et on affiche !
            section2.callBack.initBlackScreen()

        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
            alert("Une erreur est survenue ! \n\nCode :" + xhr.status + "\nTexte : " + xhr.statusText)
        }

    });

    xhr.send(null); // La requête est prête, on envoie tout !

}