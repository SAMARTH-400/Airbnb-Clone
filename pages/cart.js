import React from 'react'
import Image from 'next/image'
import Footer from '../components/Footer'
import CartCard from '../components/CartCard'
import Header  from '../components/Header'
import Checkout from '../components/Checkout';
import {selectItems} from '../slices/basketSlice'
import {useSelector , useDispatch} from 'react-redux';
import {ShoppingCartIcon} from '@heroicons/react/outline'

export default function cart() {
  const item = useSelector(selectItems);
  return (
    <div>
        <Header />
        <div className="flex flex-col m-10">
          {item.length > 0 ? 
          <div>
            <div className="flex flex-col">
              <div className='flex'>
                <p className="flex items-center"><ShoppingCartIcon className="h-7" /></p>
                <h1 className="text-2xl font-semibold mt-10 mb-10 mx-4">YOUR CART</h1>
              </div>
            <div className='flex justify-between pr-5'>
              <div className='w-1/2'>{item.map(
                ({ img, description, location, price, star, title}) => (
                  <CartCard key={img} img={img} description={description} location={location} price={price} star={star} title={title} />
                )
              )}</div>
              <Checkout />
            </div>
          </div>
          </div>
          : 
            <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] item-justify-center">
              <Image src="/static/empty-cart.svg" layout="fill" />  
            </div>
          }
        </div>
        <Footer />
    </div>
  )
}