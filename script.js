// TASK 20 - I wrote this with help of Google and YouTube
// I am still learning JavaScript, so some parts I had to search

// My 15+ services list - I typed all manually
let allServices = [
    {name: "Wash & Fold", price: 99},
    {name: "Dry Cleaning", price: 199},
    {name: "Ironing Only", price: 49},
    {name: "Wash & Iron", price: 149},
    {name: "Stain Removal", price: 79},
    {name: "Delicate Care", price: 129},
    {name: "Bedding Service", price: 299},
    {name: "Curtain Cleaning", price: 399},
    {name: "Shoe Cleaning", price: 99},
    {name: "Leather Care", price: 499},
    {name: "Wool Cleaning", price: 159},
    {name: "Express Service", price: 199},
    {name: "Bulk Discount", price: 49},
    {name: "Eco-Friendly Wash", price: 89},
    {name: "Premium Packaging", price: 59}
];

// My cart array - starts empty
let myCart = [];

// Try to load saved cart from localStorage
// I had to Google how to do this
let savedData = localStorage.getItem('myLaundryCart');
if(savedData) {
    myCart = JSON.parse(savedData); // Learned what JSON.parse does
}

// This function shows all services on the page
function showAllServices() {
    let container = document.getElementById('servicesList');
    container.innerHTML = '';
    
    // Loop through all services - I know for loop
    for(let i = 0; i < allServices.length; i++) {
        let s = allServices[i];
        
        // Create HTML for each service
        let card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h3>${s.name}</h3>
            <p class="price">₹${s.price}</p>
            <button onclick="addToCart('${s.name}', ${s.price})">Add to Cart</button>
            <button class="skip-btn" onclick="skipThisService(this)">Skip</button>
        `;
        container.appendChild(card);
    }
}

// Add item to cart
function addToCart(serviceName, servicePrice) {
    // Add to my cart array
    myCart.push({
        name: serviceName,
        price: servicePrice,
        quantity: 1
    });
    
    // Save to localStorage - I learned this from YouTube
    localStorage.setItem('myLaundryCart', JSON.stringify(myCart));
    
    // Update the cart display
    showMyCart();
    
    // Show message
    alert(serviceName + ' added to your cart!');
    
    // Fill the form with selected service
    document.getElementById('serviceName').value = serviceName;
    calculateTotalPrice();
}

// Show cart items
function showMyCart() {
    let cartContainer = document.getElementById('cartItems');
    let total = 0;
    cartContainer.innerHTML = '';
    
    // Loop through cart
    for(let i = 0; i < myCart.length; i++) {
        let item = myCart[i];
        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;
        
        // Create cart item HTML
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <strong>${item.name}</strong><br>
            ₹${item.price} x ${item.quantity} = ₹${itemTotal}
            <br><button class="remove-btn" onclick="removeCartItem(${i})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    }
    
    document.getElementById('totalPrice').innerHTML = total;
}

// Remove item from cart
function removeCartItem(index) {
    myCart.splice(index, 1); // splice removes item at index
    localStorage.setItem('myLaundryCart', JSON.stringify(myCart));
    showMyCart();
}

// Skip service - hides the service card
function skipThisService(buttonElement) {
    let card = buttonElement.parentElement;
    card.style.display = 'none';
    alert('This service is hidden');
}

// Calculate total based on quantity
function calculateTotalPrice() {
    let service = document.getElementById('serviceName').value;
    let qty = document.getElementById('qty').value;
    
    // Find price of selected service
    let price = 0;
    for(let i = 0; i < allServices.length; i++) {
        if(allServices[i].name === service) {
            price = allServices[i].price;
        }
    }
    
    let total = price * qty;
    document.getElementById('finalTotal').value = total;
}

// EmailJS - I followed a tutorial for this
// You need to sign up at emailjs.com and replace with your keys
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Get from emailjs.com

function sendBookingEmail(userName, userEmail, service, total) {
    // This sends email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: userName,
        to_email: userEmail,
        service_name: service,
        total_amount: total,
        message: "Your laundry booking is confirmed!"
    }).then(function(response) {
        console.log("Email sent success");
    }).catch(function(error) {
        console.log("Email failed");
    });
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page refresh
    
    // Get all form values
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let service = document.getElementById('serviceName').value;
    let qty = document.getElementById('qty').value;
    let total = document.getElementById('finalTotal').value;
    
    // Check if all fields are filled
    if(name === "") {
        alert("Please enter your name");
        return;
    }
    if(phone === "") {
        alert("Please enter phone number");
        return;
    }
    if(email === "") {
        alert("Please enter email");
        return;
    }
    if(service === "") {
        alert("Please select a service first");
        return;
    }
    if(qty === "" || qty < 1) {
        alert("Please enter valid quantity");
        return;
    }
    
    // Check email format - simple check
    if(!email.includes("@") || !email.includes(".")) {
        alert("Please enter valid email");
        return;
    }
    
    // Update username in header
    let firstName = name.split(" ")[0];
    document.getElementById('userName').innerHTML = firstName;
    
    // Send email
    sendBookingEmail(name, email, service, total);
    
    // Show thank you message
    let thankYouDiv = document.getElementById('thankyouMessage');
    let orderDetails = document.getElementById('orderDetails');
    orderDetails.innerHTML = `Name: ${name}<br>Service: ${service}<br>Quantity: ${qty}<br>Total: ₹${total}`;
    thankYouDiv.style.display = 'block';
    
    // Scroll to thank you message
    thankYouDiv.scrollIntoView();
    
    // Clear cart
    myCart = [];
    localStorage.removeItem('myLaundryCart');
    showMyCart();
    
    // Clear form
    document.getElementById('bookingForm').reset();
    document.getElementById('serviceName').value = '';
    document.getElementById('finalTotal').value = '';
});

// Newsletter subscription
function subscribeMe() {
    let name = document.getElementById('newsName').value;
    let email = document.getElementById('newsEmail').value;
    
    if(name === "" || email === "") {
        alert("Please enter both name and email");
    } else if(!email.includes("@")) {
        alert("Please enter valid email");
    } else {
        alert("Thanks " + name + "! You are now subscribed!");
        document.getElementById('newsName').value = '';
        document.getElementById('newsEmail').value = '';
    }
}

// Quantity input - update total when user types
document.getElementById('qty').addEventListener('input', function() {
    calculateTotalPrice();
});

// Load everything when page opens
showAllServices();
showMyCart();