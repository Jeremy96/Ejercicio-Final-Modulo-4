/**
 * Funcion generadora de urls de personajes
 * @param rango rango de personajes
 */
function* personajesUrls(rango){
    let [inicio, fin] = rango.split('-').map(Number)
    for (let i = inicio; i<= fin && i < inicio + 5; i++){ // aqui se agrega i < inicio + 5 para que se tomen solo 5 personajes por rango
        yield `https://swapi.dev/api/people/${i}/`
    }
}

/**
 * funcion que genera las tarjetas de personajes 
 * @param rango rango de personajes
 */
async function mostrarPersonajes(rango) {
    var infoPersonajes = ""
    // Aqui dependiendo del rango se selecciona un contenedor para agregar a los personajes 
    if (rango === "1-5"){
        infoPersonajes = document.getElementById("personajes-principales")
    }else if (rango === "6-11"){
        infoPersonajes = document.getElementById("personajes-secundarios")
    }else{
        infoPersonajes = document.getElementById("personajes-significativos")
    }
    // Se limpia el contenedor
    infoPersonajes.innerHTML = ''
    // Se agrega las url a una constante
    const generadorUrl = personajesUrls(rango)
    // Ciclo para generar las tarjetas de personajes
    for (let url of generadorUrl){
        try{
            const response = await fetch(url)
            const personaje = await response.json()

            const tarjetaPersonaje = document.createElement('div')
            tarjetaPersonaje.classList.add('tarjeta-personaje')
            tarjetaPersonaje.innerHTML = `
                <h4>${personaje.name}</h4>
                <p>Altura: ${personaje.height} cm.</p>
                <p>Peso: ${personaje.mass} kg.</p>
            `
            infoPersonajes.appendChild(tarjetaPersonaje)
        }catch (error){
            console.error('NO se pueden obtener los datos:', error)
        }
    }
}

// Si el mouse esta dentro de un rango se activa la funcion mostrarPersonajes segun el rango seleccionado
document.querySelectorAll('.rango-principal').forEach(rangeElement => {
    rangeElement.addEventListener('mouseover', () => {
        const rango = rangeElement.getAttribute('data-range')
        mostrarPersonajes(rango)
    })
})
document.querySelectorAll('.rango-secundario').forEach(rangeElement => {
    rangeElement.addEventListener('mouseover', () => {
        const rango = rangeElement.getAttribute('data-range');
        mostrarPersonajes(rango)
    })
})
document.querySelectorAll('.rango-significativo').forEach(rangeElement => {
    rangeElement.addEventListener('mouseover', () => {
        const rango = rangeElement.getAttribute('data-range');
        mostrarPersonajes(rango)
    })
})
