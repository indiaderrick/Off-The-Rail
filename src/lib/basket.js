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

export function addItem(itemToAdd) {
  const basket = getBasket();
  itemToAdd.item = itemToAdd._id;
  if (!getItem(basket, itemToAdd._id))
    basket.push(itemToAdd);
  writeBasket(basket);
}


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

export function totalSavings() {
  const basket = getBasket();
  return basket.map(item => (item.retailPrice - item.newPrice))
    .reduce((total, itemTotal) => total += itemTotal, 0);
}

export function checkout() {
  axios.post('/api/checkout', getBasket(), authorizationHeader())
    .then(() => {
      createBasket();
      console.log('checking out!!');
      this.props.history.push('/purchases');
    });
}
//change to purchases

export default {
  createBasket, totalSavings, getBasket, writeBasket, getItem, addItem,
  updateQuantity, removeItem, totalBasketPrice,
  checkout
};


// export function addItem(itemToAdd, quantity) {
//   const basket = getBasket();
//   itemToAdd.item = itemToAdd._id; // Useful for the backend Purchase model
//   if (!getItem(basket, itemToAdd._id))
//     basket.push(itemToAdd);
//   // incrementQuantity(basket, itemToAdd._id, quantity);
//   writeBasket(basket);
// }
