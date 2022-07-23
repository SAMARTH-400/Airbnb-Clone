import React from 'react'
import Image from 'next/image'
import Footer from '../components/Footer'
import InfoCard from '../components/InfoCard'
import Header  from '../components/Header'
import {selectItems} from '../slices/basketSlice'
import {useSelector , useDispatch} from 'react-redux';

function checkout() {
  const item = useSelector(selectItems);
  return (
    <div>
        <Header />
        <div className="flex flex-col">
          {item.length > 0 ? item.map(
            ({ img, description, lat, location, long, price, star, title, total,}) => (
              <cartCard
                key={img}
                img={img}
                description={description}
                lat={lat}
                location={location}
                long={long}
                price={price}
                star={star}
                title={title}
                total={total}
              />) 
           ): 
            <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] item-justify-center">
                <Image src="/static/empty-cart.svg" layout="fill" />  
              </div>
           }
        </div>
        <div className='fixed bottom-0'><Footer /></div>
    </div>
  )
}

export default checkout