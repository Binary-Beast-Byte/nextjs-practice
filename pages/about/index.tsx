import React from 'react'
const { useState  }  = React

import '../../src/app/globals.css'
import { Button } from '@/components/Button'

const about = ({ data }) => {
    const [clicked, setClicked] = useState<number>(0)
    return (
        <div className='h-screen p-10'>
            <Button className='bg-emerald-600 px-10 hover:bg-green-500'   onClick={() => setClicked(clicked + 1)} 
            >
                click me
            </Button>

            {clicked}
        </div>
    )
}

export default about


export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const response = await res.json()
    console.log('rendering in server')
    return {
        props: { data: response }
    }


} 