'use client'

import React, { useState } from 'react'
import OTPInput from "@/components/OTP/index"

const page = () => {
  const [otp, setOtp] = useState<string>('');
  console.log('otp', otp)
  return (
    <div className='h-screen flex justify-center items-center'>
      <OTPInput numInputs={8} onChange={(values) => setOtp(values)} value={otp} />
    </div>
  )
}

export default page