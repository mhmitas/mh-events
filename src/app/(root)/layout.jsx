import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-grow'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout