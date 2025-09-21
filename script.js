// Initialize total cost variable
let totalCost = 0;

document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
    productContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart-button')) {
            addToCart(event.target);
        }
    });

    document.getElementById('clear-cart').addEventListener('click', clearCart);
});

function addToCart(button) {
    const pro = button.closest('.desk');
    const id = pro.getAttribute('data-id');
    const name = pro.getAttribute('data-name');
    const priceString = pro.getAttribute('data-price');

    // Check if the price is a valid number
    const price = parseFloat(priceString);
    if (isNaN(price)) {
        console.error(`Invalid price for product with ID ${id}: ${priceString}`);
        return;
    }

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', id);
    cartItem.innerHTML = `
        <span>${name} - $${price.toFixed(2)}</span>
        <button onclick="removeFromCart(${id}, ${price})">Remove</button>
    `;

    document.getElementById('shopping-cart').appendChild(cartItem);

    // Update total cost
    totalCost += price;
    updateTotal();
}
function removeFromCart(id, price) {
    const cartItem = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (cartItem) {
        cartItem.remove();
        // Update total cost
        totalCost -= price;
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById('total').textContent = `Total: $${totalCost.toFixed(2)}`;
}

function clearCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        const priceString = cartItem.querySelector('span').textContent.split('$')[1];
        const price = parseFloat(priceString);

        if (!isNaN(price)) {
            totalCost -= price;
        }

        cartItem.remove();
    });

    updateTotal();
}
