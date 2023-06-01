class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.shoppingCart = [];
  }

  addToCart(product) {
    this.shoppingCart.push(product);
    console.log(`Product '${product}' added to the shopping cart.`);
  }
  
  saveToLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this));
    console.log('User data saved to localStorage.');
  }
  
  static loadFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const loadedUser = new User(user.name, user.email);
      loadedUser.shoppingCart = user.shoppingCart;
      console.log('User data loaded from localStorage.');
      return loadedUser;
    }
    console.log('No user data found in localStorage.');
    return null;
  }
}

function addToCart() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const product = document.getElementById("product").value;

  const user = new User(name, email);
  user.addToCart(product);
  user.saveToLocalStorage();

  document.getElementById("output").innerText = `Product '${product}' added to the shopping cart.`;
}

// Перевірка, чи є дані користувача в localStorage при завантаженні сторінки
window.onload = function() {
  const loadedUser = User.loadFromLocalStorage();
  if (loadedUser) {
    document.getElementById("name").value = loadedUser.name;
    document.getElementById("email").value = loadedUser.email;
  }
};
