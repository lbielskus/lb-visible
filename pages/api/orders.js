import Order from '../../models/Order';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orders = await Order.find({ email: userEmail });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
