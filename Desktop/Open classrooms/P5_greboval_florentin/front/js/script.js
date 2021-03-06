let url = 'http://localhost:3000/api/products';

/* Variable pour stocker les données de l'api */
let articles = [];
/* Fonction de requete sur l'api et sotckage des données */
async function requete(){
    await fetch(url)
    .then((response) => 
    response.json().then((data) => articles = data));
}

/* Fonction de selection de l'id Items sur le DOM */
async function cardKanap() {
    await requete();
    let items = document.getElementById("items");
    /* Boucle for pour créer et parametrer les éléments de l'item */
    for (let i = 0; i < articles.length; i++) {

       let lien = document.createElement("a");
       lien.href = `./product.html?id=${articles[i]._id}`;

       let article = document.createElement("article");

       let image = document.createElement("img");
       image.alt = articles[i].altTxt;
       image.src = articles[i].imageUrl;

       let name = document.createElement("h3");
       name.classList.add("productName");
       name.textContent = articles[i].name;

       let description = document.createElement("p");
       description.classList.add("productDescription");
       description.textContent = articles[i].description;

       /* On lui dit que lien et l'enfant de items etc pour placer les éléments dans le Dom*/
       items.appendChild(lien);
       lien.appendChild(article);
       article.append(image,name,description);
    }
}
cardKanap();
