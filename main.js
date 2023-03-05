const baseURL = 'https://rickandmortyapi.com/api/character'
const allCharacters = []
// console.log(allCharacters) // funciona

const showcase$$ = document.querySelector('.showcase')
const inputSearch$$ = document.querySelector('.search__input')




const filterCharacters = () => {
    const charactersFiltered = allCharacters.filter((character) =>{
        console.log(character.name) // Ojo, que el console log solo va a aparecer cuando se empiece a teclear algo
        return character.name
        .toLowerCase()
        .includes(inputSearch$$.value.toLowerCase())
    })
    showCharacters(charactersFiltered)
}

    inputSearch$$.addEventListener('input', filterCharacters)


const createModal = (character) => {
    console.log(character.name)
    const modal$$ = document.createElement('div')
    const modalImage$$ = document.createElement('img')
    const modalContainer$$ = document.createElement('div')
    const closeButton$$ = document.createElement('span')
    const modalName$$ = document.createElement('h2')

        modal$$.classList.add('modal')
        modalImage$$.classList.add('modal__img')
        modalContainer$$.classList.add('modalContainer')
        closeButton$$.classList.add('modal__close')
        modalName$$.classList.add('modalContainer__h2')

            closeButton$$.textContent = 'x'
            modalName$$.textContent = character.name

                document.body.appendChild(modal$$)
                modal$$.append(modalImage$$,modalContainer$$,closeButton$$)
                modalContainer$$.append(modalName$$)

        closeButton$$.addEventListener('click', () => {
            modal$$.remove()
        })


}


const showCharacters = (allCharacters) => {
    
    showcase$$.innerHTML ='';

    for (const character of allCharacters) {
        // console.log(character)

        let name = character.name;
        let species = character.species;
        let gender = character.gender;
        let status = character.alive;
        let id = character.id;
        let image = character.image;

            const card$$ = document.createElement('div')
            const image$$ = document.createElement('img')
            const detailsCard$$ = document.createElement('div')
            const name$$ = document.createElement('h3')
            const id$$ = document.createElement('h4')
            const species$$ = document.createElement('p')
            const status$$ = document.createElement('p')
            const gender$$ = document.createElement('p')

                card$$.classList.add('card')
                image$$.classList.add('card__img')
                detailsCard$$.classList.add('cardDetails')
                name$$.classList.add('card__h3')
                id$$.classList.add('card__h4')
                species$$.classList.add('card__p')
                status$$.classList.add('card__p')
                gender$$.classList.add('card__p')

                    name$$.textContent = name
                    id$$.textContent = ('#00')+id
                    image$$.src = image;
                    species$$.textContent = species;
                    status$$.textContent = status;
                    gender$$.textContent = gender
    
                        showcase$$.appendChild(card$$)
                        card$$.append(image$$,detailsCard$$)
                        detailsCard$$.append(name$$,id$$)
        

            card$$.addEventListener('click', () => {
                createModal({
                    name: character.name
                })
            })
    }


}



const getAllCharacters = async () => {
    try{
        const getInfo = await fetch (baseURL)
        const translatedInfo = await getInfo.json()
        for (const detail of translatedInfo.results) {
            allCharacters.push(detail)
        }

        showCharacters(allCharacters)

    } catch (error) {
        console.log('No se puede acceder a la base de Datos')
    }
}


getAllCharacters()