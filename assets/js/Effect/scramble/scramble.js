export function scramble(el, word, duration) {
    const promise = new Promise((resolve) => {

        let randomCharList = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

        function randomIndex() {
            return Math.floor(Math.random() * randomCharList.length)
        }
    
        function randomString(Length) {
            let scrambledString = '';
            for(let i = 0; i < Length; i++) {
                scrambledString += randomCharList[randomIndex()];
            }
            return scrambledString;
        }
    
        function generate(str) {
            let wordLength = str.length;
            
            el.innerHTML = '';
            
            let animationScramble = setInterval(function() {

                el.setAttribute('data-before', randomString(wordLength / 2));
                el.setAttribute('data-after', randomString(wordLength / 2));
                if(duration > 0) {
                    duration--;
                }
                else {
                    if(wordLength < str.length) {
                        el.innerHTML += str[str.length - wordLength - 1];
                    }
                    wordLength--;
                    if(wordLength === -1) {
                        clearInterval(animationScramble);
                        resolve()
                    }
                }
            }, 32);
        }
    
        generate(word);
    })

    return promise
}