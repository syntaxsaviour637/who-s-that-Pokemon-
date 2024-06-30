gsap.from('#pokeball', {
    y: -50,
    opacity: 0,
    delay: 0.4,
    duration: 0.8,
    stagger: 0.3,
    rotate: 360
});

let correctPokemon = "";
let score = 0;

async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // PokeAPI has 898 Pokémon in Gen 1-8
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    correctPokemon = data.species.name;
    document.getElementById('pokemon-image').src = data.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemon-image').style.filter = "brightness(0)";
    document.getElementById('guess').value = "";
    document.getElementById('result').textContent = "I don't know!";
    animatePokemonImage();
}

function animatePokemonImage() {
    gsap.from('#pokemon-image', {
        opacity: 0,
        duration: 0.8,
        delay: 1,
        scale: 0
    });
}

document.getElementById('guess').addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

document.getElementById('result').addEventListener('click', function () {
    document.getElementById('pokemon-image').style.filter = "brightness(1)";
    document.getElementById('guess').value = correctPokemon
    setTimeout(fetchRandomPokemon, 2000);
});

function checkGuess() {
    const userGuess = document.getElementById('guess').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');
    if (userGuess === correctPokemon.toLowerCase()) {
        resultElement.textContent = "Correct!";
        score++;
        document.getElementById('score').textContent = score;
        document.getElementById('pokemon-image').style.filter = "brightness(1)";
        setTimeout(fetchRandomPokemon, 2000); // Fetch new Pokémon after 2 seconds
    } else {
        resultElement.textContent = "Try again!";

    }
}

// Initial fetch
fetchRandomPokemon();