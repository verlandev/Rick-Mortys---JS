const charactersURL = 'https://rickandmortyapi.com/api/character/'
let allCharacters = []
const episodesURL ='https://rickandmortyapi.com/api/episode'
const allEpisodes = []
 
const showcase$$ = document.querySelector('.showcase')
const inputSearch$$ = document.querySelector('.search__input')
let currentModal = null;



const filterCharacters = () => {
    const charactersFiltered = allCharacters.filter((character) =>{
        // console.log(character.name) // Ojo, que el console log solo va a aparecer cuando se empiece a teclear algo
        return character.name
        .toLowerCase()
        .includes(inputSearch$$.value.toLowerCase())
    })
    showCharacters(charactersFiltered)
}

    inputSearch$$.addEventListener('input', filterCharacters)


const createModal = (character) => {
  
   

    const modal$$ = document.createElement('div')
    const modalImage$$ = document.createElement('img')
    const modalContainer$$ = document.createElement('div')
    const closeButton$$ = document.createElement('span')
    const modalName$$ = document.createElement('h2')
    const modalId$$ = document.createElement('h2')
    const species$$ = document.createElement('p')
    const status$$ = document.createElement('p')
    const gender$$ = document.createElement('p')
    const location$$ = document.createElement('p')
    // const episode$$ = document.createElement('p')
    const overlay$$ = document.createElement('div')

        modal$$.classList.add('modal')
        modalImage$$.classList.add('modal__img')
        closeButton$$.classList.add('modal__close')
        modalContainer$$.classList.add('modalContainer')
        modalName$$.classList.add('modalContainer__h2')
        modalId$$.classList.add('modalContainer__h2--id')
        species$$.classList.add('modalContainer__p')
        status$$.classList.add('modalContainer__p')
        gender$$.classList.add('modalContainer__p')
        location$$.classList.add('modalContainer__p--location')
        // episode$$.classList.add('modalContainer__p--episode')
        overlay$$.classList.add('overlay')

            closeButton$$.textContent = 'x'
            modalName$$.textContent = character.name
            modalId$$.textContent = ('#00') + character.id
            modalImage$$.src = character.image
            species$$.innerHTML = (`<strong>Specie</strong>: `) + character.species;
            status$$.innerHTML = (`<strong>Status</strong>: `) + character.status;
            gender$$.innerHTML = (`<strong>Gender</strong>: `) + character.gender
            location$$.innerHTML = (`<strong>Last known location</strong>: <br>`) + character.location.name
            // episode$$.innerHTML = (`<strong>First seen in chapter</strong>: <br>`) + allEpisodes.name

                document.body.appendChild(overlay$$)
                document.body.appendChild(modal$$)
                modal$$.append(modalImage$$,modalContainer$$,closeButton$$)
                modalContainer$$.append(modalName$$, modalId$$, species$$,status$$,gender$$,location$$)

        closeButton$$.addEventListener('click', () => {
            modal$$.remove()
            overlay$$.remove()
            currentModal = null;
        })
        currentModal = modal$$
        return modal$$

};

const openModal = (character) => {
    if (currentModal) {
        currentModal.querySelector('.modal').remove();
        currentModal = null;
    }
    const modal$$ = createModal(character);
    currentModal = modal$$
}


const showCharacters = (allCharacters) => {

    showcase$$.innerHTML = "";
    
    for (const character of allCharacters) {
        let name = character.name;
        let image = character.image;

            const card$$ = document.createElement('div')
            const image$$ = document.createElement('img')
            const detailsCard$$ = document.createElement('div')
            const name$$ = document.createElement('h3')
            

                card$$.classList.add('card')
                image$$.classList.add('card__img')
                detailsCard$$.classList.add('cardDetails')
                name$$.classList.add('card__h3')
    
                
                    name$$.textContent = name
                    image$$.src = image;
                    
    
                        showcase$$.appendChild(card$$)
                        card$$.append(image$$,detailsCard$$)
                        detailsCard$$.appendChild(name$$)
        

            card$$.addEventListener('click', () => {
              
                if(currentModal) {
                    currentModal.querySelector('.modalContainer__h2').textContent = name;
                } else {
                    const modal$$ = createModal(character);
                    modal$$.querySelector('.modalContainer__h2').textContent = name;
                }
            })
    }
}

let currentPage = 1;
let lastPage;

const previousButton$$ = document.querySelector('.previousButton')
const nextButton$$ = document.querySelector('.nextButton')
const page$$ = document.querySelector('.page')

previousButton$$.addEventListener('click', () => {
    
    if(currentPage > 1){
        currentPage -= 1;
        page$$.textContent = currentPage 
        getAllCharacters(currentPage)
    } 

    if(currentPage === 1 ){
        previousButton$$.classList.add('nobutton')
    } else {
        previousButton$$.classList.remove('nobutton')
    }
})

nextButton$$.addEventListener('click', () => {
    
    if(currentPage <= lastPage){
        currentPage += 1;
        page$$.textContent = currentPage 
        getAllCharacters(currentPage)
    } if (currentPage === lastPage){
        nextButton$$.classList.add('nobutton')
    } else {
        nextButton$$.classList.remove('nobutton')
        previousButton$$.classList.remove('nobutton')
    }
})

const getAllCharacters = async (page) => {
    try{
        const getInfo = await fetch (charactersURL + `?page=${page}`)
        const translatedInfo = await getInfo.json()
        lastPage = (translatedInfo.info.pages)
        // console.log(lastPage)
        console.log(translatedInfo.results)
        allCharacters = []
            for (const detail of translatedInfo.results) {
            console.log(detail)
            allCharacters.push(detail)
            }
        
        showCharacters(allCharacters)

        
        
    } catch (error) {
        console.log('No se puede acceder a los datos')
    }
}

getAllCharacters(currentPage)



// const getAllEpisodes = async() => {
//    try {

//     const getEpisodes = await fetch (episodesURL)
//     const translatedEpisodes = await getEpisodes.json()
//     // console.log(translatedEpisodes.results)
//     for (const episodesInfo of translatedEpisodes.results) {
//         // console.log(episodesInfo.name)
//         allEpisodes.push(episodesInfo.name)
        
//     }
    
    
//    } catch (error) {
//     console.log('No es posible acceder a los episodios')
    
//    }
// }

// getAllEpisodes()






