// Code adapted from https://www.youtube.com/watch?v=UcrypywtAm0

let stripe_key = document.querySelector('[data-stripekey]').dataset['stripekey']
let stripe_pub_key = document.querySelector('[data-stripepubkey]').dataset['stripepubkey']
let stripe_returnurl = document.querySelector('[data-returnurl]').dataset['returnurl']
let stripe_cancelurl = document.querySelector('[data-cancelurl]').dataset['cancelurl']

// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".nav-cart");

// toggle cart visibility
function showCart() {
  document.getElementById('cartModal').style.display = "block"
  
}

// RENDER PRODUCTS
function renderProducts() {
  console.log('products is',products.length)
  products.forEach((product) => {
    console.log('onclick will be for',product.id)
    productsEl.innerHTML += `

    <article data_slug=${product.slug} class="u-shadow post">
    <div class="pricetag" id="${product.slug}" style="position: absolute; transform: translate(1rem, 0); z-index: 25; ">$${product.price}</div>

<figure class="post-media">
    <div class="u-placeholder same-height rectangle">
    <img src="${product.imgSrc}" alt="${product.name}" class="post-image u-object-fit" loading="lazy">    

    </div>
</figure>

<div class="post-wrapper">

<header class="post-header">

    <h2 class="post-title">
    ${product.name}
    </h2>
</header>

    <div class="post-excerpt">
    ${product.description}
    </div>

</div>

<footer class="post-footer">
<span class="post-more"><a class="post-link" href="/products/${product.slug}">Details</a></span>
<span style="z-index: 10" data_slug="${product.slug}" class="post-more addtocart">Add to cart</span>

</footer>


        `;
  });
}


// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  console.log('asked to add with id',id)
  // check if product already exist in cart
  
  if ((cart.some((item) => item['slug'] == id)) || (cart.some((item) => item['id'] == id))) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.slug === id);
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
  totalItemsInCartEl.innerHTML = "CART("+totalItems+")";
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
                ${item.name}
            </div>
            <div class="unit-price">
                $${item.price}
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

    return (item.slug !== id) })
  
  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  console.log('called changeNumberOfUnits with ', action, id)
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.slug === id || item.id === id) {
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
//DON'T NEED THIS FOR GENERIC PAGE ?

let products = []
fetch('https://api.stripe.com/v1/prices?expand[]=data.product', {
  method: "GET",  
  headers: {"Authorization": "Bearer " + stripe_key}
}).then(response => response.json())
.then(json => {

  for (let element of json.data) {
    products.push({
      id: element.product.id, 
      slug: element.product.id.toLowerCase(),
      price_id: element.id,
      name: element.product.name,
      description: element.product.description,
      imgSrc: element.product.images[0],
      price: element.unit_amount/100,
      instock: 10000
  })
  }
  
}).then(() => {
  for (let item of products) {
    console.log('item is',item)
    let El = document.getElementById(item.slug)
    if (El) {El.innerHTML = "$" + item.price}
    
  }
  if (productsEl) {
    // this is a page with a place for displaying products
    renderProducts()
  }
  
})

var stripe = Stripe(stripe_pub_key);

function checkout() {
  console.log('checkout called')
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
  successUrl: stripe_returnurl,
  cancelUrl: stripe_cancelurl,
}).then(function (result) {

  console.log(result.error.message)
})};

const checkoutEl = document.querySelector(".checkout");
checkoutEl.addEventListener('click', checkout)

totalItemsInCartEl.addEventListener('click',showCart)
totalItemsInCartEl.classList.add('bi-bag')



    // Get the modal
    var modal = document.getElementById("cartModal");
    console.log('modal is',modal)
    // Get the button that opens the modal
    var btn = document.getElementsByClassName("nav-cart")[0];
    btn.innerHTML = "CART"
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
  //  window.onclick = function(event) {
  //    console.log('logging ',event)
  //    if (event.target == modal) {
  //      modal.style.display = "none";
  //    }
  //  }

// Need to update the cart items display on header
renderSubtotal() ;


 const cartEls = document.querySelectorAll('.addtocart');

cartEls.forEach(element=> {
  element.addEventListener('click', function handleClick(event) {
  console.log(event.target.getAttribute("data_slug"));
  addToCart(event.target.getAttribute("data_slug"))

  });
});

