// products.js

var addToCart = document.getElementsByTagName('button');


for (var i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', function() {
        alert('clicked');
       // var curProd = this.parentElement.firstChild.firstChild.textContent;
      // alert(curProd);
    });
}