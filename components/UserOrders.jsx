'use client'

import { CldImage } from "next-cloudinary";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Separator } from "./ui/separator";
import OrderProgress from "./OrderProgress";
import { useRouter } from 'next/navigation';



export const RelativeTime = ({ date }) => {
  const formattedDate = formatDistanceToNow(parseISO(date), { addSuffix: true });
  return <span>{formattedDate}</span>;
};

export default function UserOrders({ orders }) {
    const router = useRouter()
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {orders.map((obj, index) => (
        <div className="w-full h-fit sm:w-full md:w-full lg:w-[48%] xl:w-[32%] bg-gray-800 rounded-lg shadow-md" key={index + 1}>
          <Accordion collapsible className="w-full px-2">
            <AccordionItem value={`item-${index + 1}`}>
              <AccordionTrigger>
                <div className="w-full flex justify-between items-center text-slate-400 p-4">
                  <strong className="text-lg font-medium text-white">Order #{index + 1}</strong>
                  <RelativeTime date={obj.orderedat} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-4 space-y-4 lg:space-y-0">
                  {/* Image Section */}
                  <div className="relative w-full lg:w-1/3 h-32 px-4 lg:h-36 overflow-hidden">
                    <CldImage
                      src={obj.imageid}
                      width="100"
                      height="100"
                      alt="ordered image"
                      className="object-cover w-full h-full absoulte inset-0 rounded-md"
                      angle={90}
                      onClick={()=>router.push(`/model/${obj.imageid}`)}
                    />
                  </div>
                  {/* Details Section */}
                  <div className="w-full lg:w-2/3 space-y-2 text-slate-400">
                    <div className="flex justify-between">
                      <strong>Dimensions:</strong>
                      <span>{obj.height}x{obj.width} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Material:</strong>
                      <span>{obj.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Sheets:</strong>
                      <span>{obj.sheets}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-white">
                      <strong>Total:</strong>
                      <span>₹{obj.cost}</span>
                    </div>
                  </div>
                  {
                    obj.delievered && <><div className="h-12 w-full px-6"><OrderProgress verified={obj.verified} crafted={obj.crafted} delivered={obj.delievered}/></div></>   
                  }
                </section>
                
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {
                    !obj.delievered && <><div className="h-12 px-6 bg-transparent"><OrderProgress verified={obj.verified} crafted={obj.crafted} delivered={obj.delievered}/></div></>   
         }
        </div>
      ))}
    </div>
  );
}
