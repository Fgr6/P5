 /* On récupère l'order id dans l'url et on l'injecte dans le dom */
var idOrder = new URL(location.href).searchParams.get("orderId");


spanOrderId = document.getElementById("orderId");
spanOrderId.textContent = idOrder;
