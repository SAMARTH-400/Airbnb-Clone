import React from 'react'

function Checkout() {
  return (
            <div class="bg-white shadow-lg rounded-lg h-full w-1/4">

                <div class="bg-gray-100 text-center px-5 py-6">
                    <h3 class="text-xl font-semibold text-gray-500 mb-1">SUBTOTAL</h3>
                    <div class="text-lg mb-6 mt-3"><strong class="font-bold">$2.700</strong></div>
                    <button type="submit" class="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">PROCEED TO PAY</button>
                </div>
            </div>
  )
}

export default Checkout