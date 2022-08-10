import React from 'react'
import moment from 'moment'

function OrderCard( { id, amount, items, timestamp, images } ) {
  return (
        <div className="relative border rounded-md mb-5 ">
          <div className="flex items-center space-x-10 p-5 bg-indigo-100 text-sm text-gray-600">
            <div>
              <p className="font-bold text-sm">ORDER PLACED</p>
              <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
            </div>
            <div>
              <p className="text-sm font-bold">TOTAL</p>
              <p>₹{amount}</p>
            </div>
            <div>
              <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-sm "> <span className='font-bold mr-5'>ORDER ID #</span> {id.split("_")[2]} </p> 
            </div>  
          </div>
          <div className="p-5 sm:p-10 ">
            <div className="flex space-x-6 overflow-x-auto">  {images.map((image) => (
              <img src={image} alt="" className='h-20 object-contain sm:h-32' />
              ))}
            </div>
          </div>
        </div>
  )
}

export default OrderCard