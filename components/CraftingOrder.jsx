'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useRouter } from 'next/navigation';
import { RelativeTime } from './ListAdmin';
import { Separator } from './ui/separator';
import { updateUserDocument } from '@/app/admin/appwrite.admin';
import { toast } from 'sonner';

export default function CraftOrder({ craftOrders }) {
  const router = useRouter();
  
  // Initialize state for all orders
  const [checkedStates, setCheckedStates] = useState(
    craftOrders.map(order => Array(order.sheets).fill(false))
  );

  // Handle checkbox state change
  const handleCheckboxChange = (orderIndex, sheetIndex) => {
    const updatedStates = [...checkedStates];
    updatedStates[orderIndex][sheetIndex] = !updatedStates[orderIndex][sheetIndex];
    setCheckedStates(updatedStates);
  };

  // Check if all checkboxes are checked for a specific order
  const allChecked = (orderIndex) => {
    return checkedStates[orderIndex].every(state => state);
  };

  // Submit handler
  const handleSubmit = (orderIndex,id) => {
    if (allChecked(orderIndex)) {
      const crafting = {'crafted':true}
      updateUserDocument(id,crafting)
      .then((result)=>
        {toast('Order crafted.',{description:'Ready to be delivered'})
         router.refresh()
        })
      .catch((error)=>toast('Error occured',{description:'Check for network connection!'}))
    }
  };

  return (
      
        craftOrders.map((obj, orderIndex) => (
          <div
            className="w-full h-fit sm:w-full md:w-full lg:w-[48%] xl:w-[32%] border-2 border-amber-400 rounded-lg shadow-md"
            key={orderIndex}
          >
            <Accordion collapsible className="w-full px-2">
              <AccordionItem value={`item-${orderIndex}`}>
                <AccordionTrigger>
                  <div className="w-full flex justify-between items-center text-slate-400 p-4">
                    <strong className="text-lg font-medium text-white text-emerald-500">Verified #{orderIndex + 1}</strong>
                    {obj.paid ? (
                      <span className="text-emerald-600">Paid</span>
                    ) : (
                      <RelativeTime date={obj.orderedat} />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <section className="flex flex-col sm:flex-col md:flex-col lg:flex-row lg:flex-wrap justify-between items-start lg:items-center px-4 py-2 space-y-4 lg:space-y-0">
                    
                    <div className="relative w-full lg:w-1/3 h-32 px-4 lg:h-36 overflow-hidden">
                      <Button
                        className="size-full bg-transparent lg:text-center text-white border-amber-400 border-2 border-dotted"
                        onClick={() => router.push(`/model/${obj.imageid}`)}
                      >
                        Click to view design
                      </Button>
                    </div>
                
                    <div className="w-full lg:w-2/3 space-y-2 text-slate-400">
                      <div className="flex flex-row flex-wrap gap-10">
                        {Array.from({ length: obj.sheets }).map((_, sheetIndex) => (
                          <label key={sheetIndex} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checkedStates[orderIndex][sheetIndex]}
                              onChange={() => handleCheckboxChange(orderIndex, sheetIndex)}
                            />
                            {obj.material} {sheetIndex + 1}
                          </label>
                        ))}
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold text-white">
                        <strong>Dimension:</strong>
                        <span>{obj.height} x {obj.width} x {obj.thickness} Cmm</span>
                      </div>
                      <div className="flex justify-between font-bold text-white">
                        <strong>Border:</strong>
                        <span>{obj.border} mm</span>
                      </div>

                      <div className="flex justify-between font-bold text-white">
                        <strong>Total:</strong>
                        <span>₹{obj.cost}</span>
                      </div>
                    </div>
                  </section>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className='w-full flex justify-end items-center p-2'>
                <Button
                variant="secondary"
                type="submit"
                onClick={() => handleSubmit(orderIndex, obj.$id)}
                disabled={!allChecked(orderIndex)}
                >
                Submit
                </Button>
            </div>
            
          </div>
        ))
      )
  
}
