// const jokeContainer = document.getElementById("joke");
// const btn = document.getElementById("btn");
// const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";


// let getJoke = () => {
//     jokeContainer.classList.remove("fade");
//     fetch(url)
//     .then(data => data.json())
//     .then(item => {
//         jokeContainer.textContent = `${item.joke}`;
//         // jokeContainer.classList.add("fade");
//     }); j
// }

// btn.addEventListener("click", getJoke);
// getJoke();

const app = Vue.createApp({
    data() {
        return {
            jokes: ""
        }
    },
    methods: {
        async getJokes() {

            const res = await axios.get('https://icanhazdadjoke.com', {
                headers: {
                    Accept: 'application/json',
                }
            });
            const data = res.data.joke
            console.log(data);
            this.jokes = data
            const u = new SpeechSynthesisUtterance();
            u.text = data;
            u.lang = 'en-US';
            u.rate = 1.2;
            speechSynthesis.speak(u);

           
        },
        toggle() {
            this.getJokes()
        }
    },

    mounted() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true

        recognition.addEventlistener('result', (e) => {
            const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

            if (transcript == "tell me a joke") {
                this.getJokes
            }
        })
        recognition.addEventlistener('end', recognition.start)
        recognition.start();

    }
})
app.mount("#jokeApp");



