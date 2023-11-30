'use client'
// Create input box according to num of inputs
// TODO : Create Max value of 1 for each OTP Input


import React from 'react'

interface OTPINputProps {
    numInputs: number
}

const index = ({ numInputs }: OTPINputProps) => {
  return (
    <div>
        {Array.from({ length: numInputs }, (_, index) => index).map((index) => (
            <React.Fragment key={index}>
            <input
             type="text" 
             className='w-12 h-10 ring ring-blue-500 mx-2 text-black text-3xl'
             maxLength={1}
             />
            </React.Fragment>
        ))}
    </div>
  )
}

export default index