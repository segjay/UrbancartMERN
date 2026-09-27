const BASE_URL = '/api';

export async function registerUser(name, email, password) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

export async function createOrder(orderData, userId) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...orderData, userId }),
  });
  return res.json();
}

export async function getMyOrders(userId) {
  const res = await fetch(`${BASE_URL}/orders/myorders/${userId}`);
  return res.json();
}