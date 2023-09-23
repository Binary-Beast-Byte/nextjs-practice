import './animate.css'

const page = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <div className="flex space-x-3">
    {items.map((item, index) => (
        <div className='w-screen'>
            <CarouselCard index={index} key={index} />
        </div>
    //   <div className="item w-[200px] h-[200px] bg-blue-400 rounded shadow" key={index}>
    //     {item}
    //   </div>
    ))}
  </div>

  )
}

export default page

const CarouselCard = ({ index }: { imgSrc: string }) => {
    const classNames = `game--card-${index}`;
  
    console.log('classNames', classNames, index);
    return (
      <div className={`w-[200px] h-[200px] bg-slate-400  mx-auto md:mx-0 ${classNames}  `}>
      </div>
    );
  };