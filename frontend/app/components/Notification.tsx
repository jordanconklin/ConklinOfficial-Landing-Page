// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface NotificationProps {
//   message: string;
//   isVisible: boolean;
// }

// const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -50 }}
//           className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
//         >
//           {message}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Notification;