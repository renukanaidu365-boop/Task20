// Laundry Service Booking - Simple JavaScript

// Get all elements
let bookButtons = document.querySelectorAll('.book-btn');
let skipButtons = document.querySelectorAll('.skip-btn');
let cartDiv = document.getElementById('cartItems');
let totalSpan = document.getElementById('totalAmount');
let bookingForm = document.getElementById('bookingForm');
let serviceInput = document.getElementById('service');
let priceInput = document.getElementById('price');
let quantityInput = document.getElementById('quantity');
let totalPriceInput = document.getElementById('totalPrice');
let newsletterForm = document.getElementById('newsletterForm');
let displayUsername = document.getElementById('displayUsername');

// Cart array
let cart = [];

// Load cart from localStorage
let savedCart = localStorage.getItem('laundryCart');
if (savedCart) {
    cart = JSON.parse(savedCart);
    showCart();
}

// Show cart function
function showCart() {
    cartDiv.innerHTML = '';
    let total = 0;
    
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;
        
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.service} - ${item.quantity} × ₹${item.price} = ₹${itemTotal}</span>
            <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
        `;
        cartDiv.appendChild(cartItem);
    }
    
    totalSpan.innerHTML = total;
}

// Remove item function
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('laundryCart', JSON.stringify(cart));
    showCart();
}

// Add to cart
for (let i = 0; i < bookButtons.length; i++) {
    bookButtons[i].addEventListener('click', function() {
        let service = this.getAttribute('data-service');
        let price = parseInt(this.getAttribute('data-price'));
        let quantity = 1;
        
        cart.push({
            service: service,
            price: price,
            quantity: quantity
        });
        
        localStorage.setItem('laundryCart', JSON.stringify(cart));
        showCart();
        alert(service + ' added to cart!');
        
        serviceInput.value = service;
        priceInput.value = price;
        updateTotalPrice();
    });
}

// Skip item functionality
for (let i = 0; i < skipButtons.length; i++) {
    skipButtons[i].addEventListener('click', function() {
        let serviceId = this.getAttribute('data-service-id');
        let card = document.getElementById(serviceId);
        
        // Hide the skipped service
        card.style.display = 'none';
        alert('Item skipped! It will not appear in services.');
    });
}

// Update total price when quantity changes
quantityInput.addEventListener('input', function() {
    updateTotalPrice();
});

function updateTotalPrice() {
    let price = parseInt(priceInput.value);
    let quantity = parseInt(quantityInput.value);
    
    if (price && quantity && quantity > 0) {
        let total = price * quantity;
        totalPriceInput.value = total;
    } else {
        totalPriceInput.value = '';
    }
}

// Booking form validation
bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let quantity = quantityInput.value;
    let service = serviceInput.value;
    let total = totalPriceInput.value;
    
    // Validate email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name) {
        alert('Please enter your full name');
    } else if (!password) {
        alert('Please enter password');
    } else if (!emailPattern.test(email)) {
        alert('Please enter valid email address');
    } else if (!quantity || quantity < 1) {
        alert('Please enter valid quantity (minimum 1)');
    } else if (!service) {
        alert('Please select a service first');
    } else if (!total) {
        alert('Please calculate total price');
    } else {
        displayUsername.innerHTML = name.split(' ')[0];
        alert('✅ Booking Confirmed!\n\nName: ' + name + '\nService: ' + service + '\nQuantity: ' + quantity + '\nTotal: ₹' + total + '\n\nThank you for using LaundryHub!');
        
        bookingForm.reset();
        serviceInput.value = '';
        priceInput.value = '';
        totalPriceInput.value = '';
    }
});

// Newsletter subscription
newsletterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('newsletterEmail').value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!fullname) {
        alert('Please enter your full name');
    } else if (!emailPattern.test(email)) {
        alert('Please enter valid email address');
    } else {
        alert('Thank you ' + fullname + '! You have subscribed to our newsletter.');
        newsletterForm.reset();
    }
});