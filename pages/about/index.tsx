import React, { useState } from 'react'



const about = ({ data }) => {
    const [clicked, setClicked] = useState<number>(0)
    console.log("rendering in ............")
    console.log("🚀 ~ file: index.tsx:17 ~ about ~ data:", data.slice(0, 1))
    return (
        <div className='bg-green-500'>i am inside about page
            <button onClick={() => setClicked(clicked + 1)} className='p-4 bg-gray-700 text-white'>
                click me
            </button>

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