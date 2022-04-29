
var idOrder = new URL(location.href).searchParams.get("orderId");


spanOrderId = document.getElementById("orderId");
spanOrderId.textContent = idOrder;
