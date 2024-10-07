import React from 'react'
import { Link } from 'react-router-dom';
function Home() {
    return (
        <div>
            <div className='flex justify-center text-4xl font-serif mt-56'>
                <h1>Hi there,</h1>
            </div>
            <div className='flex justify-center text-4xl font-serif'>
            <h1>Let's get started</h1>
            </div>
            <div className='flex justify-center text-2xl m-4'>
                <Link to="./template"> <h1>Next!</h1></Link>
            </div>
        </div>
    )
}

export default Home