import React from 'react'

function Payment() {
  return (
    <div>
        <section className="flex flex-col justify-center antialiased bg-gray-200 text-gray-600 min-h-screen p-4">
    <div className="h-full">
        <div className="max-w-[360px] mx-auto">
            <div className="bg-white shadow-lg rounded-lg mt-9">
                <header className="text-center px-5 pb-5 mt-20">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Payment    </h3>
                </header>
                <div className="bg-gray-100 text-center px-5 py-6">
                    <div className="text-sm mb-6"><strong className="font-semibold">$2.700</strong> due Jan 27, 2022</div>
                    <button type="submit" className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-red-400 hover:bg-red-500 text-white focus:outline-none focus-visible:ring-2">Pay Now</button>
                </div>
            </div>
        </div>
    </div>
</section>
</div>
  )
}

export default Payment