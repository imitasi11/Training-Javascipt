//url to search for pokemon
const pokemonUrl="https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
//url to search for pokemon based on name or id
const getPokemonUrl=(pokemonNameOrId)=>`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`;
const input=document.getElementById("search-input");
const button=document.getElementById("search-button");
const pokemonName=document.getElementById("pokemon-name");
const pokemonId=document.getElementById("pokemon-id");
const pokemonWeight=document.getElementById("weight");
const pokemonHeight=document.getElementById("height");
const pokemonTypes=document.getElementById("types");
const pokemonHp=document.getElementById("hp");
const pokemonAttack=document.getElementById("attack");
const pokemonDefense=document.getElementById("defense");
const pokemonSpecialAttack=document.getElementById("special-attack");
const pokemonSpecialDefense=document.getElementById("special-defense");
const pokemonSpeed=document.getElementById("speed");
const pokemonImage=document.getElementById("pokemon-image");

const showPokemonImage=(imageSrc)=>{
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    imgElement.id = 'sprite';
    return imgElement;
}

button.addEventListener("click",async()=>{
    const inputValue=input.value.trim().toLowerCase();
    if(inputValue){
        try{
            const response = await fetch(getPokemonUrl(inputValue));
            if (!response.ok) {
                return alert(`Pokémon not found`);
            }
            const data = await response.json();
            showPokemon(data);
        }catch(error){
            alert(error);
        }
    }else{
        alert("Please enter a pokemon name or id");
    }
})

const showPokemon=(pokemon)=>{
    const {name,id,height,weight,types,sprites,stats}=pokemon;
    pokemonName.innerHTML=name.toUpperCase();
    pokemonId.innerHTML=id;
    pokemonHeight.innerHTML=height;
    pokemonWeight.innerHTML=weight;
    // const pokemonImage=document.getElementById("pokemon-image");
    pokemonTypes.innerHTML = '';
    // Create and append new elements for each type
    types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.textContent = type.type.name.toUpperCase();
        pokemonTypes.appendChild(typeElement);
    });
    stats.forEach(element => {
        if(element.stat.name==="hp"){
            pokemonHp.innerHTML=element.base_stat;
        }else if(element.stat.name==="attack"){
            pokemonAttack.innerHTML=element.base_stat;
        }else if(element.stat.name==="defense"){
            pokemonDefense.innerHTML=element.base_stat;
        }else if(element.stat.name==="special-attack"){
            pokemonSpecialAttack.innerHTML=element.base_stat;
        }else if(element.stat.name==="special-defense"){
            pokemonSpecialDefense.innerHTML=element.base_stat;
        }else if(element.stat.name==="speed"){
            pokemonSpeed.innerHTML=element.base_stat;
        }
    });
    pokemonImage.innerHTML = '';
    const imgElement = showPokemonImage(sprites.front_default);
    pokemonImage.appendChild(imgElement);
}