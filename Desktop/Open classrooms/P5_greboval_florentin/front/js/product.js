/* Variable pour stocker les données de l'api */
let url = 'http://localhost:3000/api/products';

(async function(){
    const articleId = resultArticleId()
    const article =  await resultArticle(articleId)
    hydrateArticle(article)
})()
/* Récupération de l'ID du produit dans l'URL de la page */
function resultArticleId() {
    return new URL(location.href).searchParams.get("id");
}
/* Requête sur l'API et stockage des données du produit séléctionné */
function resultArticle(articleId){  
    return fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((response) => 
    response.json().then((data) => articles = data));
}
/* Modification du DOM avec les éléments du produit */
function hydrateArticle(article) {   
    document.getElementById("title").textContent = article.name
    document.getElementById("price").textContent = article.price
    document.getElementById("description").textContent = article.description

    document.getElementsByTagName("img").item(5).src = article.imageUrl
    document.getElementsByTagName("img").item(5).alt = article.altTxt
    document.getElementsByTagName("img").item(5).style.width = "100%"
    document.getElementsByTagName("img").item(5).style.borderRadius = "25px"
   
    
    select = document.getElementById("colors")

    for (let i = 0; i < article.colors.length; i++){
        option = document.createElement("option");
        option.value = option.text = article.colors[i];
        select.add(option);
    }

    const selectColor = document.querySelector("#colors");

    const choixColor = selectColor.value;

    const boutonEnvoie = document.querySelector("#addToCart");
/* Ecoute du click sur le bouton d'ajout au panier */
boutonEnvoie.addEventListener("click", (e)=>{
    e.preventDefault();
    /* Créartion objet pour envoie sur le Local Storage */    
    const nbQte = parseInt(document.querySelector("#quantity").value);
    
    let valeurArticle = {
        id: article._id,
        image: article.imageUrl,
        imageDesc: article.altTxt,
        nom: article.name,
        prix: article.price,
        couleur: document.querySelector("#colors").value,
        quantité: nbQte,
    }
    /* Fenetre de confirmation d'ajout au panier */
    const fenetreConfirm = () =>{
        if(window.confirm( `${article.name} a bien été ajouté au panier`)){
            window.location.href = "../html/cart.html";
        }else{
            window.location.href = "../html/index.html";
            localStorage.removeItem("produit");
        }
    }

    let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); 
    
    /* Si un produit est déjà dans le panier alors on ajoute juste +1 à la quantité */
    if(produitLocalStorage){
        let getProduct = produitLocalStorage.find(
            (element) => 
            element.id == valeurArticle.id && element.couleur == valeurArticle.couleur
    
        );
        if(getProduct){
            getProduct.quantité += valeurArticle.quantité;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            fenetreConfirm();
            return;
        }else{
             /* Sinon on créer le produit dans le panier */
            produitLocalStorage.push(valeurArticle);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            fenetreConfirm();
        }
    }else{
            /* Si la pniaer est vide on créer le tableau dans le local storage pour ajouter au panier le produit demandé */
            produitLocalStorage = [];
            produitLocalStorage.push(valeurArticle);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            fenetreConfirm();
    }
   

}
)}
