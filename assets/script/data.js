export let data = {
    updateContent: function(file) {
        const promise = new Promise((resolve, reject) => {
            let content = ""
            let xhr = new XMLHttpRequest()
    
            xhr.open('GET', file)
    
            xhr.addEventListener('readystatechange', function() {
    
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    content =  xhr.responseText
                    resolve(content)
    
                } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
                    console.log("Error")
                    reject(xhr.status, xhr.statusText)
                }
    
            })
    
            xhr.send(null)
        })
    
        return promise
    }
}