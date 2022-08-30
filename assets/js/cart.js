// Code adapted from https://www.youtube.com/watch?v=UcrypywtAm0
/* 
// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".nav-cart-demo");

// toggle cart visibility
function showCart() {
  document.getElementById('cart').style.display = "block"
  console.log('cart shown')
}

// RENDER PRODUCTS
function renderProducts() {
  console.log('products is',products.length)
  products.forEach((product) => {
    console.log('onclick will be for',product.id)
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2>$${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                        <p><a href="/${product.id}">More details</a></p>
                    </div>
                    <div class="add-to-cart bi-bag-plus" onclick="addToCart('${product.id}')">
                        
                    </div>
                </div>
            </div>
        `;
  });
}
//renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  console.log('asked to add with id',id)
  // check if product already exist in cart
  
  if (cart.some((item) => item[id].toUpperCase() == id.toUpperCase())) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id.toUpperCase() === id.toUpperCase());
    console.log('item is',item)
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
  showCart();
}

// update cart
function updateCart() {
 
  cart = cart.filter((item) => {
    //console.log('checking ',item);
    return (item != null) })

  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    if (item != null) {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
    }
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  
  cart.forEach((item) => {

    if (item != null) {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" >
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', '${item.id}')">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', '${item.id}')">+</div>           
            </div>
        </div>
      `;
    }
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => {

    return (item.id !== id) })
  
  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;

      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;

      } else if (action === "minus" && numberOfUnits == 1) {
        numberOfUnits--;

        removeItemFromCart(id) ; 
        return
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

let products = []
fetch('https://api.stripe.com/v1/prices?expand[]=data.product', {
  method: "GET",  
  headers: {"Authorization": "Bearer rk_test_51Lbj8GHXfUM0q3dxPTHU5cP5i4WrkcPteS9kJ37ebdfhAMHQ76c2rx2dGvkRw3DSnVGpEccGOaPPOjpZECxtzLjD00Qik1x61v"}
}).then(response => response.json())
.then(json => {

  for (let element of json.data) {
    products.push({
      id: element.product.id, 
      price_id: element.id,
      name: element.product.name,
      description: element.product.description,
      imgSrc: element.product.images[0],
      price: element.unit_amount/100,
      instock: 10000
  })
  }
  
}).then(() => {renderProducts()
  if (productToAdd) {
    addToCart(productToAdd) 
    showCart()
    };})

var stripe = Stripe('pk_test_51Lbj8GHXfUM0q3dxZb4vX0Ui9hcSOmX36z6ksDLNsOPwzzdYX9C8dxAKgnADMJiahZcNUmFDclAiqfFsd1BNgBiH00fFwTvVf6');

function checkout() {
    let lineArray = []
    for (let item of cart) {
        lineArray.push({
            price: item.price_id, 
            quantity: item.numberOfUnits})
    }

    stripe.redirectToCheckout({
  lineItems: lineArray,
  mode: 'payment',
  shippingAddressCollection: {
    allowedCountries: ['US'],
  },
  successUrl: 'https://example.com/success',
  cancelUrl: 'https://example.com/cancel',
}).then(function (result) {

  console.log(result.error.message)
})};

const checkoutEl = document.querySelector(".checkout");
checkoutEl.addEventListener('click', checkout)

totalItemsInCartEl.addEventListener('click',showCart)
totalItemsInCartEl.classList.add('bi-bag')
*/


    // Get the modal
    var modal = document.getElementById("cartModal");
    console.log('modal is',modal)
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
