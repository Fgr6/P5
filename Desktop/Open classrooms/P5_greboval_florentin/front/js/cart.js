 /* On requête le tableau produit du Local Storage */
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

const elementDom = document.querySelector("#cart__items");
 /* Si le panier est vide on afficher le message suivant sur la page */
if(produitLocalStorage === null || produitLocalStorage == 0){
    let panierVide = "Votre panier est vide !"
    document.querySelector("h1").textContent = panierVide;

    let prixPanier = document.getElementById("totalPrice");
    prixPanier.textContent = "0";

    let qtePanier = document.getElementById("totalQuantity");
    qtePanier.textContent = "0";
}else{
     /* Si il y a des produits dans le panier alors on vient les afficher comme ceci est calculer la quantité total et le prix total */
    let prixTotal = [];
    /* Calcul du prix total du panier */
    for (let p = 0; p < produitLocalStorage.length; p++){
    let prixProduitPanier = produitLocalStorage[p].prix * produitLocalStorage[p].quantité;

    prixTotal.push(prixProduitPanier);
    }

    const additionPrix = (accumulator, currentValue) => accumulator + currentValue;
    const prixTot = prixTotal.reduce(additionPrix, 0);


    let qteTotal = [];
    /* Calcul de la quantité total du panier */
    for (let q = 0; q < produitLocalStorage.length; q++){
    var nombreQte = produitLocalStorage[q].quantité;
    var quantitéTotalPanier = parseInt(nombreQte);

    qteTotal.push(quantitéTotalPanier);
    }

    const additionQte = (accumulator, currentValue) => accumulator + currentValue;
    const qteTot = qteTotal.reduce(additionQte, 0);

    let cartItem = document.getElementById("cart__items");

    let prixPanier = document.getElementById("totalPrice");
    prixPanier.textContent = prixTot;

    let qtePanier = document.getElementById("totalQuantity");
    qtePanier.textContent = qteTot;

    /* Boucle pour chaque produit du Local Storage on récupère les données et on les affiche dans le DOM */
    for (let i = 0; i < produitLocalStorage.length; i++){

        let articleItem = document.createElement("article");
        articleItem.classList.add("cart__item");
        articleItem.dataset.id;
        articleItem.dataset.id = produitLocalStorage[i].id;
        articleItem.dataset.color;
        articleItem.dataset.color = produitLocalStorage[i].couleur;

        
        let divImage = document.createElement("div");
        divImage.classList.add("cart__item__img");

        let imageItem = document.createElement("img");
        imageItem.src = produitLocalStorage[i].image;
        imageItem.alt = produitLocalStorage[i].imageDesc;

        let divItem = document.createElement("div");
        divItem.classList.add("cart__item__content");

        let divDesc = document.createElement("div");
        divDesc.classList.add("cart__item__content__description");

        let nomProduit = document.createElement("h2");
        nomProduit.textContent = produitLocalStorage[i].nom;

        let couleurProduit = document.createElement("p");
        couleurProduit.textContent = produitLocalStorage[i].couleur;

        let prixProduit = document.createElement("p");
        prixProduit.classList.add("prix__produit");
        prixProduit.textContent = produitLocalStorage[i].prix + "€";

        let divItemSetting = document.createElement("div");
        divItemSetting.classList.add("cart__item__content__settings");

        let divItemSettingQuantite = document.createElement("div");
        divItemSettingQuantite.classList.add("cart__item__content__settings__quantity");

        let pQte = document.createElement("p");
        pQte.textContent = "Qté :";

        let itemQuantite = document.createElement("input");
        itemQuantite.classList.add("itemQuantity");
        itemQuantite.type = "number";
        itemQuantite.name = "itemQuantity";
        itemQuantite.value = produitLocalStorage[i].quantité;
        itemQuantite.min = "1";
        itemQuantite.max = "100";
        

        let divDelete = document.createElement("div");
        divDelete.classList.add("cart__item__content__settings__delete");

        let pDelete = document.createElement("p");
        pDelete.classList.add("deleteItem");
        pDelete.textContent = "Supprimer";

        


        cartItem.appendChild(articleItem);
        articleItem.appendChild(imageItem);
        divImage.append(imageItem);
        articleItem.append(divImage, divItem, divDesc);
        divItem.append(divDesc, divItemSetting);
        divDesc.append(nomProduit, couleurProduit, prixProduit);
        divItemSetting.append(divItemSettingQuantite, divDelete);
        divItemSettingQuantite.append(pQte, itemQuantite);
        divDelete.appendChild(pDelete);
        
    }

}
let suppElement = document.querySelectorAll(".deleteItem");

 /* On écoute le click du bouton supprimer*/
for (let s = 0; s < suppElement.length; s++){
    suppElement[s].addEventListener("click" , (event) =>{
        event.preventDefault();
         /* Au click sur ce bouton on vient récupérer l'id et la couleur du produit à supprimer puis à laide de filter on garde tout les autres produits */
        let idSupp = produitLocalStorage[s].id && produitLocalStorage[s].couleur;

        produitLocalStorage = produitLocalStorage.filter(el => el.id && el.couleur !== idSupp);
        
        /* On envoie le nouveau panier dans le local storage, on afficher un message d'alert et on actutalise la page */
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        alert("Le produit a été supprimer du panier");
        window.location.href = "../html/cart.html";
        
    })
}
let changeQte = document.querySelectorAll(".itemQuantity");
 /* Au changement de quantité d'un produit , on récupère la nouvelle quantité on l'envoie dans le Local Storage et on actualise la page pour que le calcul de la nouvelle quantité total et du nouveau prix total s'effectue */
for (let c = 0; c < changeQte.length; c++){
    changeQte[c].addEventListener('change' , (event) => {
        const result = document.querySelector('#totalQuantity');
        result.textContent = parseInt(event.target.value);
        produitLocalStorage[c].quantité = parseInt(event.target.value);

        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        window.location.href = "../html/cart.html";
        
    })
  
}

let changePrix = document.querySelector("#totalPrice");
 /* Quand la quantité d'un produit change on vient récupérer les nouvelles quandités pour effectuer le nouveau calcul du prix total */
for (let z = 0; z < changeQte.length; z++){
    changeQte[z].addEventListener('change' , (event) => {
    var newPrix = produitLocalStorage[z].prix * produitLocalStorage[z].quantité;
    changePrix.textContent = newPrix;

})
}

let formulaire = document.querySelector(".cart__order__form");

 /* Lors de l'envoie du formulaire de commande on affiche un message d'erreur si une case est pas ou mal remplie */
formulaire.addEventListener("submit", function(e){

    var prenom = document.getElementById("firstName");
    var nom = document.getElementById("lastName");
    var adresse = document.getElementById("address");
    var ville = document.getElementById("city");
    var email = document.getElementById("email");

    var erreurPrenom = document.getElementById("firstNameErrorMsg");
    var erreurNom = document.getElementById("lastNameErrorMsg");
    var erreurAdresse = document.getElementById("addressErrorMsg");
    var erreurVille = document.getElementById("cityErrorMsg");
    var erreurEmail = document.getElementById("emailErrorMsg");
    

    if (prenom.value.match(/^[a-zA-Z\-]+$/)){

    }else{
        e.preventDefault();
        erreurPrenom.innerHTML = "Veuillez écrire un prénom valide.";
        return false;
    }
    if (nom.value.match(/^[a-zA-Z\-]+$/)){
       
    }else{
        e.preventDefault();
        erreurNom.innerHTML = "Veuillez écrire un nom valide.";
        return false;
    }
    if (adresse.value.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)){
        
    }else{
        e.preventDefault();
        erreurAdresse.innerHTML = "Veuillez écrire une adresse valide.";
        return false;
    }
    if (ville.value.match(/^[a-zA-Z\-]+$/)){
        
    }else{
        e.preventDefault();
        erreurVille.innerHTML = "Veuillez écrire une ville valide.";
        return false;
    }
        
    if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){

    }else{
            e.preventDefault();
            erreurEmail.innerHTML = "Veuillez écrire un email valide.";
            return false;
    }
     /* On créer une constante contact pour récupérer les données du formulaire */
    const contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
    }
    
    let products = []
    let local = produitLocalStorage;
    
     /* On récupère aussi les ID des produits du panier et on les stock dans un tableau */
    for(let d = 0; d < local.length; d++){
    
        products.push(local[d].id);
    }
    /* On effectue une requete POST sur l'API pour obtenir le numéro de commande */
    const promise1 = fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({contact, products}),
        
    })
     /* On récupère la réponse de notre requete et on met l'Order ID dans l'url de redirection*/
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        resultOrderId = data.orderId;
        orderId = resultOrderId;
        window.location.href = "../html/confirmation.html?orderId=" + orderId; 
    });
    /* On supprime les éléments du panier */
    localStorage.removeItem("produit");
   
})


