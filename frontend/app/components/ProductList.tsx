import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <motion.div 
          key={product.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;