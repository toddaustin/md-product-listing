// products.js
// 
var items = {
    "Train": "18.95",
    "BulletTime": "15.95",
    "Klutz": "13.95",
    "Global": "13.95",
    "Blunt": "15.95",
    "Crowd": "17.95",
    "Banksy": "18.95",
    "Pico": "17.95",
    "Hex": "17.95",
    "Byte": "18.95"
};


var addToCart = document.getElementsByClassName('add');
var removeFromCart = document.getElementsByClassName('remove');
var cartCont = document.getElementsByClassName('tooltip-text');
var cartQty = document.getElementsByClassName('qty');
var cartItem = document.getElementsByClassName('item');
var cartItemPrice = document.getElementsByClassName('cart-price');
var cartTotal = document.getElementsByClassName('amount');
var promo = document.getElementById('apply-code');

addItem();
removeItem();
applyPromo();


function nonDiscountTotal() {
    var tpi = 0;
    for (var x = 0; x < cartItem.length; x++) {
        var cartItemQty = parseInt(cartItem[x].nextElementSibling.value);
        var itemPrice = parseFloat(items[cartItem[x].textContent]);;
        tpi += parseFloat(itemPrice * cartItemQty);

    }
   
   return tpi.toFixed(2);


}

var cart = {
    'updateQty' : function() {
        var qtyVal = 0;
        for (var j = 0; j < cartQty.length; j++) {
            qtyVal += parseInt(cartQty[j].value);
        }
        return qtyVal;
    },
    'updateCartTotal' : function() {
        for (var j = 0; j < cartQty.length; j++) {
            totalVal += parseFloat(cartItemPrice[j].innerHTML.slice(1));
        }
    },
    'addToCart2' : function(){

    }
};

function updateCartCount() {
    var qtyVal = 0;
    var totalVal = 0;
    for (var j = 0; j < cartQty.length; j++) {
        qtyVal += parseInt(cartQty[j].value);
        totalVal += parseFloat(cartItemPrice[j].innerHTML.slice(1));
    }
    document.getElementsByClassName('cart-count')[0].innerHTML = qtyVal;
    cartTotal[0].innerHTML = "$" + totalVal.toFixed(2);
}

function removeItemFromCart(that) {
    that.remove();
    updateCartCount();
}

function addItem() {
    for (var i = 0; i < addToCart.length; i++) {

        addToCart[i].addEventListener('click', function() {
            var cartChild = cartCont[0].children.length;
            var curProdName = this.parentElement.firstElementChild.firstElementChild.textContent;
            var curProdPrice = items[curProdName];
            var curProdQuantity = this.previousElementSibling.firstElementChild.value;
            var cartChild = cartCont[0].children;
            var inCart = false;
            for (var c = 2; c < cartChild.length; c++) {
                var currentEntry = cartChild[c].firstElementChild;
                if (currentEntry.textContent === curProdName){
                    var curValue = parseInt(currentEntry.nextElementSibling.value);
                    curValue = curValue + parseInt(curProdQuantity);
                    currentEntry.nextElementSibling.value = curValue;
                    currentEntry.nextElementSibling.nextElementSibling.textContent = '$' + parseFloat(curValue * curProdPrice).toFixed(2);
                   inCart = true;
                }
            } 
          
          if (!inCart){
            var totalPrice = (curProdPrice * curProdQuantity).toFixed(2);
            var newP = document.createElement('p');
            newP.innerHTML = "<span class=\"item\">" + curProdName + "</span> <input class=\"qty\" value=" + curProdQuantity + "> <span class=\"cart-price\">$" + totalPrice + "</span><button class=\"remove\">Remove</button>";

            cartCont[0].appendChild(newP);
        }
            removeItem();
            updateCartCount();
            updateItemQty();
        });
    }
}


function removeItem() {
    for (var i = 0; i < removeFromCart.length; i++) {
        removeFromCart[i].addEventListener('click', function() {
            var curProd = this.parentElement;
            removeItemFromCart(curProd);
        });
    }
}

function updateItemQty() {
    for (var k = 0; k < cartQty.length; k++) {
        cartQty[k].addEventListener('change', function() {
            var curItem = this.parentElement;
            var curName = curItem.firstElementChild.innerHTML;
            var updatePrice = curItem.getElementsByClassName('cart-price');
            var curItemPrice = items[curName];
            var curAmount = this.value;
            if (curAmount == 0) {
                removeItemFromCart(curItem);
            } else {
                var newAmount = parseFloat(curItemPrice * curAmount);
                updatePrice[0].innerHTML = "$" + newAmount.toFixed(2);
                updateCartCount();
            }
        });
    }
}

function applyPromo() {
    promo.addEventListener('click', function() {
       var ndt = nonDiscountTotal();
        var pCode = this.previousElementSibling.value.toLowerCase();
        if (pCode !== ""){
            updateCartCount();
            var cartChild = cartCont[0].children;
            var priceCheck = 0;
            for (var p = 0; p < cartChild.length; p++) {
                var iName = cartChild[p].firstChild.textContent;
                if (items[iName] >= priceCheck) {
                    priceCheck = parseFloat(items[iName]);
                }
            }

            if (pCode === "10off") {
                // 10% off one item
                var tenOff = parseFloat(priceCheck * 0.10).toFixed(2);
                var newT = parseFloat((cartTotal[0].textContent.slice(1) - tenOff).toFixed(2));
                console.log(typeof newT);
                if (parseFloat(cartTotal[0].textContent.slice(1)) > newT){
                    cartTotal[0].textContent = "$" + newT.toFixed(2);
                    priceCheck = 0;
                    this.previousElementSibling.value = "";
                } else {
                    alert('You currently have the best price.');
                }
          
            } else if (pCode === "train15") {
                // 15 off Train shirts
                var discount = 0;
                var qtyToDiscount = 0;
                for (var t = 0; t < cartChild.length; t++) {
                    var iName = cartChild[t].firstChild.textContent;
                    if (iName === 'Train'){
                        qtyToDiscount = parseInt(cartChild[t].firstChild.nextElementSibling.value);
                        var d = parseFloat(items['Train'] * 0.15).toFixed(2);
                        discount = qtyToDiscount * d; 
                        currentTrainTotal = parseFloat(items['Train'] * qtyToDiscount);
                        cartChild[t].firstChild.nextElementSibling.nextElementSibling.textContent = "$" + (currentTrainTotal - parseFloat(discount.toFixed(2)));
                    }
                }
                if (qtyToDiscount !== 0){
                    var cartItemsTotal = 0;
                    for (var c = 0; c < cartItemPrice.length; c++) {
                       cartItemsTotal += parseFloat(cartItemPrice[c].textContent.slice(1)).toFixed(2);
                    }
                    cartItemsTotal = parseFloat(cartItemsTotal);
                    if (cartTotal[0].textContent.slice(1) > cartItemsTotal) {
                        cartTotal[0].textContent = "$" + cartItemsTotal;
                        priceCheck = 0;
                        this.previousElementSibling.value = "";
                    } else {
                        alert('You currently have the best price.');
                    }
                } else {
                    alert("Promo code not valid for items in cart");
                }
            
            updateCartCount();
            } else if (pCode === "5offtotal") {
                // 5% off total
                updateCartCount();
                cartTotal[0].textContent = "$" + parseFloat(cartTotal[0].textContent.slice(1) - (cartTotal[0].textContent.slice(1) * 0.05)).toFixed(2);
            } else {
                alert('Promo code is invalid');
            }
        }
    });
}