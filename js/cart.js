document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('Product')) || [];
    const cardElement = document.querySelector('.card');
    const cartElement = document.querySelector('.cart');
    const summaryElement = document.querySelector('.summary');
    const itemsCountElement = document.getElementById('items-count');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalPriceElement = document.getElementById('total-price');
    const shippingSelect = document.getElementById('shipping');

    function updateCart() {
        if (cartItems.length === 0) {
            // Cart is empty
            cardElement.classList.add('empty-cart');
            cartElement.innerHTML = `
                <div class="empty-cart-message">
                    <h2>Your cart is empty</h2>
                    <p>Add some items to your cart and come back!</p>
                </div>
            `;
            summaryElement.style.display = 'none';
        } else {
            // Cart has items
            cardElement.classList.remove('empty-cart');
            // cartElement.innerHTML = `
            //     <div class="title">
            //         <h2>Shopping Cart</h2>
            //         <span id="items-count">0</span>
            //     </div>
            //     <div id="cart-items"></div>
            //     <div class="back-to-shop">
            //         <a href="#">&larr; Back to shop</a>
            //     </div>
            // `;
            summaryElement.style.display = 'block';

            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';
            let totalItems = 0;
            let subtotal = 0;

            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                    <img src="${item.product.img}" alt="${item.product.name}">
                    <div class="item-details">
                        <div class="item-name">${item.product.name}</div>
                        <div class="item-category">₹${item.product.price}</div>
                    </div>
                    <div class="item-quantity">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.pieces}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="item-price">₹ ${(item.product.price * item.pieces).toFixed(2)}</div>
                    <button class="remove" onclick="removeItem(${index})">&times;</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalItems += item.pieces;
                subtotal += item.product.price * item.pieces;
            });
            const tax = subtotal * 0.05;
            const shipping = parseFloat(shippingSelect.value);
            const total = subtotal + tax + shipping;

            itemsCountElement.innerText = `${totalItems} Items`;
            subtotalElement.textContent = `₹ ${subtotal.toFixed(2)}`;
            taxElement.textContent = `₹ ${tax.toFixed(2)}`;
            totalPriceElement.textContent = `₹ ${total.toFixed(2)}`;
        }

        localStorage.setItem('Product', JSON.stringify(cartItems));
    }

    window.changeQuantity = (index, change) => {
        cartItems[index].pieces += change;
        if (cartItems[index].pieces < 1) {
            cartItems.splice(index, 1);
        }
        updateCart();
    };

    window.removeItem = (index) => {
        cartItems.splice(index, 1);
        updateCart();
    };

    shippingSelect.addEventListener('change', updateCart);

    updateCart();
});