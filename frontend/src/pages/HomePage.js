const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('veecart_cart') || '[]');
  const existingItem = cart.find(item => item.productId === product.id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1
    });
  }
  
  localStorage.setItem('veecart_cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
};