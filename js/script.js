"use strict"
const limparElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild)
    }
}



const carregarStatus = (status,pesquisa) =>{
    const container = document.querySelector(".status")
    const novoStatus = document.createElement("p")
    novoStatus.classList = ".txt-padrao"
    novoStatus.innerHTML = `${status.total} fotos de : ${pesquisa}`
    container.appendChild(novoStatus)
}



const pesquisarImagens = async(evento) =>{
    if(evento.key == "Enter"){
        const pesquisa = evento.target.value
        const url = `https://pixabay.com/api/?key=24138697-5235aecb224247eca4d0ac3e2&q=${pesquisa}&image_type=`
        const responsividade = await fetch(url)
        const imagens = await responsividade.json()
        console.log(imagens)



        limparElementos(document.querySelector("#container-galeria"))
        limparElementos(document.querySelector(".status"))



        carregarGaleria(imagens.hits)
        carregarStatus(imagens,pesquisa)


    }
}




const criarItem = item =>{
    const container = document.querySelector("#container-galeria")
    const novoCard =document.createElement("div")
    const divNova = item.tags.replace(/,+/g, '')
    novoCard.innerHTML = `
                <a class="img-perfil" href="https://pixabay.com/users/${item.user}-${item.user_id}/">
                    <img class="img-perfil" src="${item.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${divNova}</div>
                    <div class="row">
                        <div class="row info"><img src="img/like.png">${item.likes}</div>
                        <div class="row info"><img src="img/comentario.png">${item.comments}</div>
                        <div class="row info"><img src="img/save.png"></div>
                    </div>
                </div>
                <a class="card-image"href="${item.pageURL}">
                <img class="card-image" src="${item.webformatURL}">
                </a>
            
            `

    container.appendChild(novoCard)
}




const carregarGaleria = imagens => imagens.forEach(criarItem)
document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens)