async function getData() {
    try {
        const response = await fetch('js/menu.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const foodItems = await response.json();
        const menuDiv = document.getElementsByClassName('card-container')[0];

        foodItems.forEach(item => {
            let quantity = 0;

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.dataset.id = item.id;

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.name;

            const name = document.createElement('h5');
            name.textContent = item.name;
            
            const desc = document.createElement('p');
            desc.textContent = item.desc;

            const price = document.createElement('h6');
            price.textContent = `₹${item.price}`;

            const button = document.createElement('button');
            button.classList.add('order');
            button.textContent = 'Order Now';

            button.addEventListener('click', () => {
                quantity += 1;
                console.log(item, quantity);
                cartProduct(item, quantity);
            });

            cardDiv.appendChild(img);
            cardDiv.appendChild(name);
            cardDiv.appendChild(desc);
            cardDiv.appendChild(price);
            cardDiv.appendChild(button);
            menuDiv.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Error fetching food items:', error);
    }
}

function cartProduct(product, pieces) {
    let products = JSON.parse(localStorage.getItem('Product')) || [];
    
    if (!Array.isArray(products)) {
        products = [];
    }

    const existingProductIndex = products.findIndex(p => p.product.id === product.id);
    if (existingProductIndex !== -1) {
        products[existingProductIndex].pieces += pieces;
    } else {
        products.push({ product, pieces });
    }

    localStorage.setItem('Product', JSON.stringify(products));
}


getData();