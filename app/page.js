import { UserReference } from '@/components/usp1/UserReference.jsx'
import Scroller from '@/components/scroller'; 
import ServeImages from '@/lib/cloudinary.config';

const HeroSlide = ({ title, bgImage }) => {
  return (
    <div
      className="flex flex-col items-center justify-center  bg-cover xl:bg-contain bg-center bg-no-repeat w-full h-full"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className=" xl:h-64 xl:w-80 mt-9 ml-11 xl:mt-48 text-3xl xl:text-4xl xl:ml-48 font-bold">{title}</h1>
       </div>
  );
};


export default function Home() {
   
  const folder2 = "ms-crafts AND tags=medium"
  return (
    <>
      <main className='h-full w-full p-3 flex flex-col justify-start items-center gap-2 overflow-y-auto scroll-smooth'>
        <div className="relative h-[575px] w-full rounded-xl flex justify-center items-center overflow-hidden">
        
          <div className="absolute inset-0 z-0  flex ">
            <Scroller>
                <HeroSlide title="PARTITION DESIGNS FOR YOUR ROOMS." description="This is the first slide" bgImage={'/4.jpg'}/>
                <HeroSlide title="SEE-THROUGH DESIGNS FOR YOUR MANDIRS." description="This is the second slide" bgImage={'/2.jpg'} />
                <HeroSlide title="PICK-UP AND CRAFTING AND DELIVERY!" description="This is the third slide" bgImage={'/3.jpg'} />
            </Scroller>
          </div>
          <div className="relative z-10 w-3/4 mt-28 mx-4 md:w-1/3 xl:w-80 xl:right-16 lg:w-1/3 lg:mx-0 xl:ml-auto">
                <UserReference />
          </div>
        </div>
        <div className="h-full w-full text-amber-300 text-xl font-bold flex flex-row justify-start items-center mt-3 px-4"><span>Panels</span></div>   
        <ServeImages folder={folder2}/>
         
      </main>
    </>
  );
}
