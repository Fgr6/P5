let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

const elementDom = document.querySelector("#cart__items");

if(produitLocalStorage === null || produitLocalStorage == 0){
    let panierVide = "Votre panier est vide !"
    document.querySelector("h1").textContent = panierVide;

    let prixPanier = document.getElementById("totalPrice");
    prixPanier.textContent = "0";

    let qtePanier = document.getElementById("totalQuantity");
    qtePanier.textContent = "0";
}else{
    let prixTotal = [];

    for (let p = 0; p < produitLocalStorage.length; p++){
    let prixProduitPanier = produitLocalStorage[p].prix * produitLocalStorage[p].quantité;

    prixTotal.push(prixProduitPanier);
    }

    const additionPrix = (accumulator, currentValue) => accumulator + currentValue;
    const prixTot = prixTotal.reduce(additionPrix, 0);


    let qteTotal = [];

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


for (let s = 0; s < suppElement.length; s++){
    suppElement[s].addEventListener("click" , (event) =>{
        event.preventDefault();

        let idSupp = produitLocalStorage[s].id && produitLocalStorage[s].couleur;

        produitLocalStorage = produitLocalStorage.filter(el => el.id && el.couleur !== idSupp);
        

        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        alert("Le produit a été supprimer du panier");
        window.location.href = "../html/cart.html";
        
    })
}
let changeQte = document.querySelectorAll(".itemQuantity");

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

for (let z = 0; z < changeQte.length; z++){
    changeQte[z].addEventListener('change' , (event) => {
    var newPrix = produitLocalStorage[z].prix * produitLocalStorage[z].quantité;
    changePrix.textContent = newPrix;

})
}

let formulaire = document.querySelector(".cart__order__form");

formulaire.addEventListener("submit", function(e){
    e.preventDefault();
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
    

    if (prenom.value == ""){
        e.preventDefault();
        erreurPrenom.innerHTML = "Veuillez écrire votre Prénom.";
    }
    if (nom.value == ""){
        e.preventDefault();
        erreurNom.innerHTML = "Veuillez écrire votre Nom.";
    }
    if (adresse.value == ""){
        e.preventDefault();
        erreurAdresse.innerHTML = "Veuillez écrire votre adresse.";
    }
    if (ville.value == ""){
        e.preventDefault();
        erreurVille.innerHTML = "Veuillez écrire votre Ville.";
    }
        
    if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){

    }else{
            e.preventDefault();
            erreurEmail.innerHTML = "Veuillez écrire un email valide.";
    }

    const contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
        product: produitLocalStorage,
    }
    
    const promise1 = fetch('http://localhost:3000/api/order', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(contact),
        
    })
    console.log(contact);
    promise1.then( async(response)=>{
        try{
            console.log(response);
        }catch(e){
            console.log(e);
        }
    })
})


