function updateCartCount(){for(var e=0,t=0,a=0;a<cartQty.length;a++)e+=parseInt(cartQty[a].value),t+=parseFloat(cartItemPrice[a].innerHTML.slice(1));document.getElementsByClassName("cart-count")[0].innerHTML=e,cartTotal[0].innerHTML="$"+t.toFixed(2)}function removeItemFromCart(e){e.remove(),updateCartCount()}function addItem(){for(var e=0;e<addToCart.length;e++)addToCart[e].addEventListener("click",function(){var e=this.parentElement.firstElementChild.firstElementChild.textContent,t=items[e],a=this.previousElementSibling.firstElementChild.value,n=(t*a).toFixed(2),r=document.createElement("p");r.innerHTML='<span class="item">'+e+'</span> <input class="qty" value='+a+'> <span class="cart-price">$'+n+'</span><button class="remove">Remove</button>',cartCont[0].appendChild(r),removeItem(),updateCartCount(),updateItemQty()})}function removeItem(){for(var e=0;e<removeFromCart.length;e++)removeFromCart[e].addEventListener("click",function(){var e=this.parentElement;removeItemFromCart(e)})}function updateItemQty(){for(var e=0;e<cartQty.length;e++)cartQty[e].addEventListener("change",function(){var e=this.parentElement,t=e.firstElementChild.innerHTML,a=e.getElementsByClassName("cart-price"),n=items[t];console.log(n);var r=this.value;if(0==r)removeItemFromCart(e);else{var m=parseFloat(n*r);a[0].innerHTML="$"+m.toFixed(2),updateCartCount()}})}var items={Train:"18.95",BulletTime:"15.95",Klutz:"13.95",Global:"13.95",Blunt:"15.95",Crowd:"17.95",Banksy:"18.95",Pico:"17.95",Hex:"17.95",Byte:"18.95"},addToCart=document.getElementsByClassName("add"),removeFromCart=document.getElementsByClassName("remove"),cartCont=document.getElementsByClassName("tooltip-text"),cartQty=document.getElementsByClassName("qty"),cartItemPrice=document.getElementsByClassName("cart-price"),cartTotal=document.getElementsByClassName("amount");addItem(),removeItem();