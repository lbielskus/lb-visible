import UserOrder from '../models/UserOrder';

export const createOrder = async (userId, orderDetails) => {
  try {
    const userOrder = new UserOrder({ userId, ...orderDetails });
    await userOrder.save();
    return userOrder;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

export const getUserOrders = async (userId) => {
  try {
    const orders = await UserOrder.find({ userId });
    return orders;
  } catch (error) {
    throw new Error('Failed to retrieve user orders');
  }
};
