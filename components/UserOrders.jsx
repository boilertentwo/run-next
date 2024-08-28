'use client'
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Separator } from "./ui/separator";
import OrderProgress from "./OrderProgress";
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// RelativeTime component for showing formatted time
export const RelativeTime = ({ date }) => {
  const formattedDate = formatDistanceToNow(parseISO(date), { addSuffix: true });
  return <span>{formattedDate}</span>;
};

export default function UserOrders({ orders }) {
  const router = useRouter();

  // Filter and sort active orders (not delivered yet)
  const activeOrders = orders
    .filter(order => !order.delievered)
    .sort((a, b) => new Date(b.orderedat) - new Date(a.orderedat));

  // Filter and sort paid orders (delivered)
  const paidOrders = orders
    .filter(order => order.delievered)
    .sort((a, b) => new Date(b.orderedat) - new Date(a.orderedat));

  return (
    <Tabs defaultValue="active">
      <TabsList className="grid w-full grid-cols-2 w-full md:w-[450px]">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="paid">Paid</TabsTrigger>
      </TabsList>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Active Orders Tab */}
        <TabsContent value="active" className='w-full flex flex-col gap-2 lg:flex-row lg:flex-wrap'>
          {activeOrders.length > 0 ? (
            activeOrders.map((obj, index) => (
              <div
                className="w-full h-fit sm:w-full md:w-full lg:w-[48%] xl:w-[32%] border-2 border-amber-400 rounded-lg shadow-md"
                key={index}
              >
                <Accordion collapsible className="w-full px-2">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="w-full flex justify-between items-center text-slate-400 p-4">
                        <strong className="text-lg font-medium text-white">Order #{index + 1}</strong>
                        {obj.paid ? (
                          <span className="text-emerald-600">Paid</span>
                        ) : (
                          <RelativeTime date={obj.orderedat} />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <section className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-2 space-y-4 lg:space-y-0">
                        {/* Image Section */}
                        <div className="relative w-full lg:w-1/3 h-32 px-4 lg:h-36 overflow-hidden">
                          <Button
                            className="size-full bg-transparent text-white border-amber-400 border-2 border-dotted"
                            onClick={() => router.push(`/model/${obj.imageid}`)}
                          >
                            Click to view design
                          </Button>
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
                            <span>₹ {obj.cost}</span>
                          </div>
                        </div>
                      </section>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="h-12 px-6 bg-transparent">
                  <OrderProgress verified={obj.verified} crafted={obj.crafted} delivered={obj.delievered} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 w-full">No active orders found.</p>
          )}
        </TabsContent>

        {/* Paid Orders Tab */}
        <TabsContent value="paid" className='w-full flex flex-col gap-2 lg:flex-row lg:flex-wrap'>
          {paidOrders.length > 0 ? (
            paidOrders.map((obj, index) => (
              <div
                className="w-full h-fit sm:w-full md:w-full lg:w-[48%] xl:w-[32%] border-2 border-amber-400 rounded-lg shadow-md"
                key={index}
              >
                <Accordion collapsible className="w-full px-2">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="w-full flex justify-between items-center text-slate-400 p-4">
                        <strong className="text-lg font-medium text-white">Order #{index + 1}</strong>
                        {obj.paid ? (
                          <span className="text-emerald-600">Paid</span>
                        ) : (
                          <RelativeTime date={obj.orderedat} />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <section className="flex flex-col sm:flex-col md:flex-col lg:flex-row lg:flex-wrap justify-between items-start lg:items-center px-4 py-2 space-y-4 lg:space-y-0">
                        {/* Image Section */}
                        <div className="relative w-full lg:w-1/3 h-32 px-4 lg:h-36 overflow-hidden">
                          <Button
                            className="size-full bg-transparent text-white border-amber-400 border-2 border-dotted"
                            onClick={() => router.push(`/model/${obj.imageid}`)}
                          >
                            Click to view design
                          </Button>
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
                        <div className="h-12 w-full pt-4 bg-transparent">
                          <OrderProgress verified={obj.verified} crafted={obj.crafted} delivered={obj.delievered} />
                        </div>
                      </section>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 w-full">No paid orders found.</p>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
