"use client"

import Button from "@/components/Button"

const page = () => {
  return (
    <div className="flex space-x-5 p-10">
    <Button onClick={() => console.log('button clicked')} className='bg-red-700  text-xl'>
      Click me
      </Button>

      <Button onClick={() => console.log('button 1 clicked')}  className='bg-emerald-700 hover:scale-105 text-xl rounded px-8'>
       Button 1 
      </Button>
    </div>
    
  )
}

export default page