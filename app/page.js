import { UserReference } from '@/components/usp1/UserReference.jsx'
import Scroller from '@/components/scroller'; 
import ServeImages from '@/lib/cloudinary.config';
import AutoScrollSection from '@/components/MaterialBoard';
import { AccordionTrigger, Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';

const HeroSlide = ({ title, bgImage }) => {
  return (
    <div
      className="flex flex-row items-center justify-center bg-cover md:bg-contain bg-center bg-no-repeat w-full h-full"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-center md:w-96 md:h-64 md:w-80 md:mt-48 mt-10 text-3xl md:text-4xl lg:ml-24 font-bold">{title}</h1>
    </div>
  );
};


export default function Home() {
  const folder1 = "ms-crafts AND tags=medium"
  const folder2 = "ms-crafts AND tags=lg"
  return (
    <>
      <main className='h-full w-full p-3 flex flex-col justify-start items-center gap-5 overflow-y-auto scroll-smooth'>
        <Accordion collapsible className='w-full text-transparent border-2 border-amber-300 bg-gradient-to-r from-amber-300 to-amber-700 bg-clip-text rounded-lg px-4'>
          <AccordionItem value='item-1'>
                  <AccordionTrigger className='h-10'>
                    <span className='font-extrabold text-center'>Welcome to CNCy | Craft N Carve  </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='p-4 bg-transparent '>
                    <ol className='flex flex-col justify-around'>
                      <li>1. Use "Post us" to get instant quotations on any designs you have.</li>
                      <li>2. Use our catalogue to get instant quotations on any designs</li>
                    </ol>

                    </div>
                    
                  </AccordionContent>
          </AccordionItem>
          
        </Accordion>
        <div className="relative h-[575px] w-full rounded-xl border-2 border-amber-300 flex justify-center items-center overflow-hidden">
        
          <div className="absolute inset-0 z-0  flex ">
            <Scroller>
                <HeroSlide title="PARTITION DESIGNS FOR YOUR ROOMS." description="This is the first slide" bgImage={'/4.jpg'}/>
                <HeroSlide title="SEE-THROUGH DESIGNS FOR YOUR MANDIRS." description="This is the second slide" bgImage={'/2.jpg'} />
                <HeroSlide title="PICK-UP, CRAFTING AND DELIVERY!" description="This is the third slide" bgImage={'/3.jpg'} />
            </Scroller>
          </div>
          <div className="relative z-10 w-3/4 mt-28 mx-4 md:w-1/3 md:w-80 md:right-10 md:w-1/3 md:mx-0 md:ml-auto">
                <UserReference />
          </div>
        </div>
        <AutoScrollSection/>

        <div className='hidden min-h-48 w-full text-center md:flex flex-col gap-2 justify-center items-center'><span className='md:text-3xl lg:text-4xl font-extrabold '>or choose from our catalogue</span><span className='font-light bg-gradient-to-r from-sky-200 to-sky-700 bg-clip-text text-transparent md:text-lg lg:text-xl'>Click on any design to get instant quotation</span></div>
        <div className="h-full w-full text-xl font-bold flex flex-row lg:text-2xl justify-start items-center mt-1 px-4"><span className='bg-gradient-to-r from-amber-300 to-amber-900 bg-clip-text text-transparent'>Panels</span></div>   
        <ServeImages folder={folder2}/>
        <div className="h-full w-full text-amber-300 text-xl font-bold flex flex-row lg:text-2xl justify-start items-center mt-1 px-3"><span className='bg-gradient-to-r from-amber-300 to-amber-900 bg-clip-text text-transparent'>Borders</span></div>   
        <ServeImages folder={folder1}/>
         
      </main>
    </>
  );
}