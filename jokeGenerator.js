
async function fetchJoke() {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=pt");
        const data = await response.json();
        if (data.type === "single") {
            return data.joke;
        } else if (data.type === "twopart") {
            return `${data.setup} ${data.delivery}`;
        } else {
            return "Não foi possível obter uma piada.";
        }
    } catch (error) {
        console.error("Erro ao buscar piada:", error);
        return "Erro ao buscar piada.";
    }
}


async function fetchAnimalImage(animalType) {
    const apiUrl = animalType === "cat"
        ? "https://api.thecatapi.com/v1/images/search"
        : "https://dog.ceo/api/breeds/image/random";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (animalType === "cat") {
            return data[0].url;
        } else if (animalType === "dog") {
            return data.message;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Erro ao buscar imagem de ${animalType}:`, error);
        return null;
    }
}


async function generateJokeWithReaction() {
    const jokeElement = document.getElementById("joke");
    const reactionImageElement = document.getElementById("reaction");

    
    reactionImageElement.style.display = "none";
    reactionImageElement.src = "";

    
    const joke = await fetchJoke();
    jokeElement.textContent = `Piada: ${joke}`;

    
    const animalType = Math.random() < 0.5 ? "cat" : "dog";

   
    const reactionImageUrl = await fetchAnimalImage(animalType);
    if (reactionImageUrl) {
        reactionImageElement.style.display = "block";
        reactionImageElement.src = reactionImageUrl;
    }
}

const generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", generateJokeWithReaction);
