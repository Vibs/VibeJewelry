const jewelryWrapper = document.getElementById("jewelry-wrapper");

const jewelryId = document.getElementById('current-jewelry-id').innerText;

fetch(`/api/jewelry/${jewelryId}`)
.then(response => response.json())
.then(jewelryList => jewelryList.forEach(jewelry => createSingleJewelryView(jewelry)))
.catch(error => {
    console.log("Error in showing single jewelry", error);
    alert("Der skete en fejl med at hente smykket");
});

function createSingleJewelryView(jewelry){
    const jewelryDiv = document.createElement('div');
    jewelryDiv.classList.add("single-jewelry");

    jewelryDiv.innerHTML = `

        ${escapeHTML(jewelry.image_path) 
            ? `<img class="single-jewelry-image" alt="${escapeHTML(jewelry.name)}" src="/assets/images/jewelry/${escapeHTML(jewelry.image_path)}">`
            : `<img class="single-jewelry-image" alt="default_jewelry_image" src="/assets/images/default_jewelry.jpg">`
        }

        <p class="name">${escapeHTML(jewelry.name)}<p>
        <p class="price"> ${escapeHTML(jewelry.price)} dkk</p>

        ${jewelry.stock > 0 ?
            `<div id="sold-out" hidden class="button">Udsolgt</div>
            <button id="add-to-cart" class="button">Læg i kurv</button>`
            :
            `<div id="sold-out" class="button">Udsolgt</div>
            <button id="add-to-cart" hidden class="button">Læg i kurv</button>`
        }`;

    jewelryWrapper.appendChild(jewelryDiv);
    
    //så tilføj eventlistener på knap
    const addToCartButton = document.getElementById("add-to-cart");
    addToCartButton.addEventListener('click', checkIfLoggedIn);
}


function checkIfLoggedIn() {
    fetch("/api/users/loggedIn", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8', // denne linje siger at dataen som vi sender er en string 
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.loggedIn){
            addToCart();
        } else {
            alert("Du skal være logget ind for at kunne tilføje noget til din kurv.");
        }
    });
}

function addToCart(){

    const cartItem = {
        jewelryId: jewelryId,
        amount: 1
    }

    fetch("/api/cartItems" , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8', // denne linje siger at dataen som vi sender er en string 
        },
        body: JSON.stringify(cartItem),
        credentials: 'include'
    })
    .then(res => {
        if(res.ok){
            console.log("res", res.status);
            alert("Tilføjet til kurven");
        } else {
            throw new Error(`${res.status}: ${res.statusText}`);
        }
    })
    .catch(error => console.log(error));
}
