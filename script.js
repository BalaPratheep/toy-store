// Product Dataset
const products = [
  { id: 1, name: "product 1", price:100 , image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400" },
  { id: 2, name: "product 2", price:200, image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400" },
  { id: 3, name: "product 3", price:300 , image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400" },
  { id: 4, name: "product 4", price:400 , image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400" }
];

let cart = [];

// Render products dynamically1
function renderProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById("cart-count").innerText = cart.length;
  
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = cart.map(item => `<li>₹{item.name} - ₹₹{item.price.toFixed(2)}</li>`).join("");
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").innerText = total.toFixed(2);
}

function toggleCart() {
  document.getElementById("cart-modal").classList.toggle("hidden");
}

document.querySelector(".cart-status").addEventListener("click", toggleCart);

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  
  const phoneNumber = "1234567890"; // Replace with your WhatsApp Business number
  const itemNames = cart.map(i => i.name).join(", ");
  const total = document.getElementById("cart-total").innerText;
  
  const message = `Hello! I would like to order: ${itemNames}. Total Amount: $${total}`;
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
}

renderProducts();
