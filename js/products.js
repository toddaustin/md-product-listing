// products.js
// 

var addToCart = document.getElementsByClassName('add');
var removeFromCart = document.getElementsByClassName('remove');
var cartCont = document.getElementsByClassName('tooltip-text');
var cartQty = document.getElementsByClassName('qty');

addItem();
removeItem();

function updateCartCount() {
    var qtyVal = 0;
    for (var j = 0; j < cartQty.length; j++ ){
        qtyVal += parseInt(cartQty[j].innerHTML); 
    }
    document.getElementsByClassName('cart-count')[0].innerHTML = qtyVal;
}

function addItem() {
    for (var i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener('click', function() {
            var curProdName = this.parentElement.firstElementChild.firstElementChild.textContent;
            var curProdPrice = this.parentElement.firstElementChild.firstElementChild.nextSibling.textContent;
            curProdPrice = curProdPrice.slice(1);

            var curProdQuantity = this.previousElementSibling.firstElementChild.value;
            var totalPrice = (curProdPrice * curProdQuantity).toFixed(2);
            console.log(curProdName + ": " + curProdPrice + " for " + curProdQuantity);
            var newP = document.createElement('p');
            newP.innerHTML = "<span class=\"item\">" + curProdName + "</span> <span class=\"qty\">"+ curProdQuantity + "</span> <span class=\"cart-price\">$" + totalPrice +"</span><button class=\"remove\">Remove</button>";
       
            cartCont[0].appendChild(newP);
            removeItem();
            updateCartCount();
        });
    }
}


function removeItem() {
    for (var i = 0; i < removeFromCart.length; i++) {
        removeFromCart[i].addEventListener('click', function() {
            var curProd = this.parentElement;
            var cartCont = document.getElementsByClassName('tooltip-text');
           curProd.remove();
           updateCartCount();
        });
    }
}


