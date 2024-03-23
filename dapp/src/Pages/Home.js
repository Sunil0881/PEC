import React from 'react'
import bro from "../assets/bro.png"
import Button from '../Components/Navbar'


const Home = () => {
  return (
  <div className='h-screen bg-green-200 font-serif'>
    <Button />
    <div className='grid grid-cols-2'>
      <div className='items-center pt-48 ml-32'>
        <div className='font-bold text-6xl '>Build Your</div>
        <div className='font-bold text-6xl'>Business with us</div>
        <div className='pt-3 pb-10 text-2xl font-thin'>Experience a revolution in online shopping with our decentralized e-commerce platform, where buyers and sellers connect directly, free from intermediaries, ensuring transparency, security, and empowerment for all.</div>
          <button className=' text-xl font-bold  px-10 py-2 bg-green-600 hover:shadow-2xl text-white rounded-md hover:bg-green-500'>Shop Now →</button>
      </div>
      <div className='pl-20 pt-32'>
         <img src={bro} width={500} alt='img'></img> 
      </div>
      </div>
  </div>
  )
}

export default Home