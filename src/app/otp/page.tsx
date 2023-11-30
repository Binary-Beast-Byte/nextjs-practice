import React from 'react'
import OTPInput from "@/components/OTP/index"

const page = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
            <OTPInput numInputs={8} />
    </div>
  )
}

export default page