'use client'
import Button from '@/components/Button'
import { useLineCount } from '@/hooks/useLineCount'

export default function Home() {
  const paragraphElem = "<p>Lorem ipsum dolor sit amet consectetur adipisicing.   Lorem, ipsum dolor.  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> "
  const { lines, totalLineCount } = useLineCount(paragraphElem);
  console.log("🚀 ~ file: page.tsx:8 ~ Home ~ totalLineCount:", totalLineCount)
  console.log("🚀 ~ file: page.tsx:8 ~ Home ~ lines:", lines)

  return (
    <main className='p-10 flex space-x-4'>
      <h1>
        HIIIII ravi.......
      </h1>
    <div dangerouslySetInnerHTML={{__html: lines  }}  />
    </main>
  )
}
