import axios from 'axios';
import { authorizationHeader } from './auth';

export function createBasket() {
  localStorage.setItem('basket', '[]');
  return [];
}
export function removeBasket() {
  localStorage.removeItem('basket');
  return [];
}

export function getBasket() {
  return JSON.parse(localStorage.getItem('basket')) || createBasket();
}

export function writeBasket(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
}

export function getItem(basket, itemId) {
  return basket.find(item => item._id === itemId);
}
//maybe change result back to item.

export function addItem(itemToAdd, quantity) {
  const basket = getBasket();
  itemToAdd.item = itemToAdd._id; // Useful for the backend Purchase model
  if (!getItem(basket, itemToAdd._id))
    basket.push(itemToAdd);
  // incrementQuantity(basket, itemToAdd._id, quantity);
  writeBasket(basket);
}

// export function incrementQuantity(basket, itemId, quantity) {
//   const item = getItem(basket, itemId);
//   item.quantity = (item.quantity || 0) + quantity;
// }

export function updateQuantity(itemId, updatedQuantity) {
  const basket = getBasket();
  getItem(basket, itemId).quantity = updatedQuantity;
  writeBasket(basket);
}

export function removeItem(itemId) {
  const basket = getBasket();
  const item = getItem(basket, itemId);
  basket.splice(basket.indexOf(item), 1);
  writeBasket(basket);
}

export function totalBasketPrice() {
  const basket = getBasket();
  return basket.map(item => item.newPrice)
    .reduce((total, itemTotal) => total += itemTotal, 0);
}

export function checkout() {
  axios.post('/api/checkout', getBasket(), authorizationHeader())
    .then(() => {
      createBasket();
      this.props.history.push('/purchases');
    });
}

export default {
  createBasket, getBasket, writeBasket, getItem, addItem,
  updateQuantity, removeItem, totalBasketPrice,
  checkout
};
