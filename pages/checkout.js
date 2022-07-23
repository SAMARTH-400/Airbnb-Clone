import React from 'react'
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
          {item?.map(
            ({ img, description, lat, location, long, price, star, title, total,}) => (
              <InfoCard
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
           )}
        </div>
        <Footer />
    </div>
  )
}

export default checkout