

async function handleSubmit(event) {
    event.preventDefault();

    const search = event.target.search.value;
    console.log(search)

    const pokeData = await fetchPokeData(search);

    displayInfo(pokeData);

}

async function fetchPokeData(pokemon) {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return await response.json()

}



function displayInfo(pokemon) {
    const id = Math.floor(Math.random() * 100000)
    const liHTML = pokemon.abilities.map ( (abilityObject) => `<li>${abilityObject.ability.name}</li>`).join(" ");
    const liStats = pokemon.stats.map ( (statsObject) => `<li>Base stat: ${statsObject['base_stat']} ${statsObject.stat.name}</li>`).join(" ");
    const html = `<div class="card bg-dark border rounded shadow text-white p-4 mx-auto d-flex logo hidden" id="${id}">
                <div class="d-md-flex">
                    <div class="border rounded" id="image">
                        <img src="${pokemon.sprites.other.home['front_default']}" class="img-fluid" alt="${pokemon.name}">
                    </div>
                    <div class="mt-3 mt-md-0 ms-md-3" id="text">
                        <h1>${pokemon.name}</h1>
                        <p>Abilities</p>
                        <ul>${liHTML}</ul>
                        <div class="dropdown">
                            <button type="button" class="btn btn-outline-info dropdown-toggle mt-2" data-bs-toggle="dropdown">
                            Stats
                            </button>
                            <ul class="dropdown-menu bg-dark text-white border-white">
                            ${liStats}
                            </ul>
                            <button onclick="deleteCard(${id})" class="btn btn-outline-info mt-2 justify-content-end">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;


    const card = document.createElement('div');
    card.setAttribute('id', id)
    card.innerHTML = html;

    const display = document.getElementById('show-display');
    display.appendChild(card);

    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

}


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }

    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

function deleteCard(id) {
    const card = document.getElementById(id);
    if (card) {
        card.parentNode.removeChild(card)
    }
}