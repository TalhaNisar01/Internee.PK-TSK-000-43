import { toast } from 'react-toastify';

export const ADD = (item) => {
  toast.success(`${item.rname} added to cart!`);
  return {
    type: "ADD_CART",
    payload: item
  }
}

export const DLT = (id) => {
  toast.error(`Item removed from cart!`);
  return {
    type: "RMV_CART",
    payload: id
  }
}

export const REMOVE = (item) => {
  toast.info(`${item.rname} quantity updated!`);
  return {
    type: "RMV_ONE",
    payload: item
  }
}
