import { motion } from 'framer-motion';

export default function OrdersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className='min-h-screen flex flex-col justify-center items-center px-4'
    >
      Orders
    </motion.div>
  );
}
