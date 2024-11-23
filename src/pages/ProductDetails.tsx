import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const param=useParams();

    console.log("param product id: ",param.id)

  return (
    <div className='text-white'>ProductDetails</div>
  )
}

export default ProductDetails