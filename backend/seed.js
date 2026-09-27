const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/product');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with 30hr battery life.',
    price: 2499,
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: 4.3,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight breathable running shoes for daily use.',
    price: 1899,
    category: 'Footwear',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    rating: 4.1,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smart watch with heart rate monitor.',
    price: 3499,
    category: 'Electronics',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    rating: 4.6,
  },
  {
    name: 'Backpack',
    description: 'Water-resistant laptop backpack, 25L capacity.',
    price: 1299,
    category: 'Accessories',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    rating: 4.0,
  },
  {
    name: 'Sunglasses',
    description: 'UV400 protection polarized sunglasses.',
    price: 899,
    category: 'Accessories',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    rating: 3.9,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with 12hr playtime.',
    price: 1599,
    category: 'Electronics',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    rating: 4.4,
  },
  {
    name: 'Casual T-Shirt',
    description: 'Cotton round-neck casual t-shirt, available in multiple colors.',
    price: 499,
    category: 'Clothing',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    rating: 4.0,
  },
  {
    name: 'Denim Jeans',
    description: 'Slim fit stretchable denim jeans for everyday wear.',
    price: 1199,
    category: 'Clothing',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
    rating: 4.2,
  },
  {
    name: 'Laptop Stand',
    description: 'Adjustable aluminium laptop stand for desk use.',
    price: 1499,
    category: 'Accessories',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1629317480872-45e07211ffd4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches.',
    price: 2999,
    category: 'Electronics',
    stock: 7,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
    rating: 4.7,
  },
  {
    name: 'Water Bottle',
    description: 'Stainless steel insulated water bottle, 1 litre.',
    price: 699,
    category: 'Accessories',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    rating: 4.3,
  },
  {
    name: 'Sports Sneakers',
    description: 'Cushioned sole sports sneakers for gym and casual use.',
    price: 2199,
    category: 'Footwear',
    stock: 14,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop',
    rating: 4.1,
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'Classic book on JavaScript best practices by Douglas Crockford.',
    price: 599,
    category: 'Books',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
    rating: 4.8,
  },
  {
    name: 'Hoodie',
    description: 'Warm fleece hoodie with front pocket, perfect for winters.',
    price: 1399,
    category: 'Clothing',
    stock: 22,
    image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.3,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with silent click.',
    price: 999,
    category: 'Electronics',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    rating: 4.2,
  },
  // 10 NEW PRODUCTS
  {
    name: 'Noise Cancelling Earbuds',
    description: 'True wireless earbuds with active noise cancellation and 24hr battery.',
    price: 1899,
    category: 'Electronics',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    rating: 4.5,
  },
  {
    name: 'Formal Leather Shoes',
    description: 'Premium genuine leather formal shoes for office and events.',
    price: 2799,
    category: 'Footwear',
    stock: 9,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&h=300&fit=crop',
    rating: 4.4,
  },
  {
    name: 'Polo T-Shirt',
    description: 'Classic polo t-shirt in premium cotton blend.',
    price: 699,
    category: 'Clothing',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=300&h=300&fit=crop',
    rating: 4.1,
  },
  {
    name: 'Clean Code',
    description: 'A Handbook of Agile Software Craftsmanship by Robert C. Martin.',
    price: 799,
    category: 'Books',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop',
    rating: 4.9,
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader.',
    price: 1799,
    category: 'Electronics',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
    rating: 4.3,
  },
  {
    name: 'Winter Jacket',
    description: 'Waterproof windproof winter jacket with fleece lining.',
    price: 2499,
    category: 'Clothing',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop',
    rating: 4.5,
  },
  {
    name: 'The Pragmatic Programmer',
    description: 'Your journey to mastery — must read for every developer.',
    price: 899,
    category: 'Books',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop',
    rating: 4.7,
  },
  {
    name: 'Sandals',
    description: 'Comfortable casual sandals for everyday wear.',
    price: 699,
    category: 'Footwear',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop',
    rating: 3.8,
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and USB charging port.',
    price: 1099,
    category: 'Accessories',
    stock: 16,
    image: 'https://images.unsplash.com/photo-1621177555452-bedbe4c28879?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.2,
  },
  {
    name: 'Wireless Charging Pad',
    description: '15W fast wireless charging pad compatible with all Qi devices.',
    price: 1299,
    category: 'Electronics',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=300&h=300&fit=crop',
    rating: 4.4,
  },
  {
    name: 'Canvas Sneakers',
    description: 'Classic canvas sneakers — lightweight and stylish for daily wear.',
    price: 1199,
    category: 'Footwear',
    stock: 22,
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=300&h=300&fit=crop',
    rating: 4.2,
  },
  {
    name: 'Gym Gloves',
    description: 'Anti-slip gym gloves with wrist support for weight training.',
    price: 499,
    category: 'Accessories',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop',
    rating: 4.1,
  },
  {
    name: 'Atomic Habits',
    description: 'An Easy and Proven Way to Build Good Habits by James Clear.',
    price: 499,
    category: 'Books',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=300&fit=crop',
    rating: 4.9,
  },
  {
    name: 'Smart LED Bulb',
    description: 'WiFi enabled smart LED bulb — 16 million colors, voice control.',
    price: 799,
    category: 'Electronics',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    rating: 4.3,
  },
  {
    name: 'Oversized Shirt',
    description: 'Trendy oversized cotton shirt — perfect for casual outings.',
    price: 849,
    category: 'Clothing',
    stock: 33,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop',
    rating: 4.2,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();