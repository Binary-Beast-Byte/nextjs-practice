'use client'

import React, { useState } from 'react'
// import OTPInput from "@/components/OTP/index"
import {OTPInput} from 'ravi-next-otp-input'

const page = () => {
  const [otp, setOtp] = useState<string>('');
  console.log('otp', otp)
  return (
    <div className='h-screen flex justify-center items-center'>
      <OTPInput numInputs={6} onChange={(values) => setOtp(values)} value={otp} placeholder='qwerty' />
    </div>
  )
}

export default page