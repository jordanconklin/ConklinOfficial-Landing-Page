// 'use client';

// import { useState, FormEvent } from 'react';

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     age: '',
//     position: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Registration successful', data);
//         // Redirect to login page or show success message
//       } else {
//         console.error('Registration failed');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
//       <div className="mb-4">
//         <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
//           First Name
//         </label>
//         <input
//           type="text"
//           id="first_name"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>
//       {/* Add similar input fields for last_name, age, position, email, and password */}
//       <button
//         type="submit"
//         className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
//       >
//         Register
//       </button>
//     </form>
//   );
// }