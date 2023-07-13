"use client"

import axios from 'axios'
import { useEffect, useState } from "react"


const page = () => {

  const [data, setData] = useState(null)

  const getApiData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    setData(response.data)
  }

  useEffect(() => {
    getApiData()
  }, [])

  return (
    <div className="p-5 py-3">
    {data?.map((data, index) => (
      <h1 className="text-center text-3xl text-blue-300">
        {data.title}
      </h1>
    ))}
</div>
 
  )
}

export default page