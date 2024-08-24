'use client'
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CldImage } from "next-cloudinary";
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useAuthStore } from '@/lib/zustand/store';
import { cookier } from '@/app/test';
import { makeOrder } from '@/lib/appwrite.config';
import { toast } from 'sonner';

export default function ImageForm({ params }) {
  const { handleSubmit, control, watch,reset, formState: { errors } } = useForm();
  const [user, setUser] = useState();
  const [price, setPrice] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [noOfSheets, setNoOfSheets] = useState(1);
  const [materialType, setMaterialType] = useState("");
  const [userOrder, setUserOrder] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const formValues = watch();

  const calculatePrice = () => {
    let basePrice = 0;
  
    if (formValues.height && formValues.width) {
      const heightInMM = formValues.height;
      const widthInMM = formValues.width;
  
      // Convert area from square inches to square feet
      const areaInSqMM = heightInMM * widthInMM;
      const areaInSqFT = areaInSqMM / 92900; // 144 square inches = 1 square foot
  
      // Calculate the base price with the rate of ₹150 per square foot
      basePrice = areaInSqFT * 150 * noOfSheets;
    }
  
    if (formValues.materialThickness) {
      basePrice += formValues.materialThickness * 10; // Add cost for material thickness
    }
  
    // Ensure the minimum price is ₹150
    if (basePrice < 150) {
      basePrice = 150;
    }
    
    setPrice(basePrice);
  };
  
  const getUser = async () => {
    try {
      const result = await cookier(); // Fetch the user details
      setIsLoggedIn(Boolean(result));
      setUser(result.value); // Set user state
    } catch (error) {
      return
    }
  };

  useEffect(() => {
    // Fetch user once on component mount
    getUser();
  }, []);

  useEffect(() => {
    calculatePrice();
    if (Object.keys(errors).length > 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [formValues, errors]);

  const onSubmit = (data) => {
    const orderObj = {
      user: user,
      imageid: `${params.modelID}/${params.itemID}`,
      height: formValues.height,
      width: formValues.width,
      border: formValues.border,
      thickness: formValues.materialThickness,
      cost: price.toFixed(2),
      orderedat: Date.now(),
      sheets: noOfSheets,
      material: materialType
    };
    setUserOrder(orderObj);
  };

  const handlePlaceOrder = () => {
    const timeStamp = new Date().toISOString();
    const orderObj = {
      user: user,
      imageid: `${params.modelID}/${params.itemID}`,
      height: parseFloat(formValues.height),
      width: parseFloat(formValues.width),
      border: parseFloat(formValues.border),
      thickness: parseFloat(formValues.materialThickness),
      "with-material": formValues.withMaterial,
      cost: parseFloat(price.toFixed(2)),
      orderedat: timeStamp,
      sheets: noOfSheets,
      material: materialType
    };
    console.log(orderObj)
    makeOrder(orderObj)
    .then((result)=>toast('Hurray! Your order is placed',{description:'We will get back to you in 24 hours'}))
    .catch((error)=>toast('Try again',{description:'Error occured while placing order'}))
    reset()
    
  };

  return (
    <>
      <main className='h-screen w-full p-3 space-y-5 md:flex md:gap-10'>
        <div className="relative max-h-[600px] md:w-4/5 border-2 rounded-lg p-6 flex lg:mr-28 lg:px-28 lg:mt-4">
          {/* Image */}
          <div className="h-full absolute inset-0 p-3 flex-grow flex flex-row justify-center">
            <CldImage
              alt="crafted image"
              src={`${params.modelID}/${params.itemID}`}
              width="150"
              height="150"
              className="rounded-lg object-contain max-w-full max-h-full"
            />
          </div>

          {/* Form Overlay */}
          <div className="w-1/2 h-full z-0 flex flex-grow flex-col justify-around pt-10 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-10 justify-around items-end space-y-2">
                <Controller
                  name="height"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className='flex flex-row w-full justify-end'>
                      <input 
                        {...field} 
                        type="number" 
                        placeholder="Height" 
                        className={`text-center bg-transparent ${errors.height ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
                        min={25}
                        step={0.01}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="width"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className='flex flex-row w-full justify-end'>
                      <input 
                        {...field} 
                        type="number" 
                        placeholder="Width" 
                        className={`text-center bg-transparent ${errors.width ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
                        min={25}
                        step={0.01}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="border"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className='flex flex-row w-full justify-end'>
                      <input 
                        {...field} 
                        type="number" 
                        placeholder="Border" 
                        className={`text-center bg-transparent ${errors.border ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
                        min={6}
                        step={0.1}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="materialThickness"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className='flex flex-row w-full justify-end'>
                      <input 
                        {...field} 
                        type="number" 
                        placeholder="Thickness" 
                        className={`text-center bg-transparent ${errors.materialThickness ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/3`} 
                        min={6}
                        step={0.1}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="withMaterial"
                  control={control}
                  defaultValue={true}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <select 
                        {...field} 
                        className={`text-right bg-transparent ${errors.withMaterial ? 'border-red-500 text-red-500' : 'text-amber-200'} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full`}
                      >
                        <option value={true}>With Material</option>
                        <option value={false}>Without Material</option>
                      </select>
                    </div>
                  )}
                />
              </div>

              {/* Dynamic Pricing */}
              <div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button type="submit" variant={price ? '' : 'ghost'} className="btn-primary float-right min-w-1/3 text-xl">
                      {price ? <h1>₹{price.toFixed(2)}</h1> : <h1>₹ 0</h1>}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        {hasError ? (
                          <span className='text-red-400'>Please fill all measurement fields</span>
                        ) : isLoggedIn ? (
                          <span>Your order is almost done!</span>
                        ) : (
                          <span>Please login to proceed with the order!</span>
                        )}
                      </DrawerTitle>
                      <DrawerDescription>
                        {hasError ? null : isLoggedIn ? (
                          <span>Just provide some more info on your order.</span>
                        ) : null}
                      </DrawerDescription>
                    </DrawerHeader>
                    {!hasError && isLoggedIn && (
                      <div className="h-36 flex flex-col justify-around space-y-4 px-6">
                        <div className='flex justify-between'>
                          <span>No of sheets:</span>
                          <div className="flex items-center justify-around space-x-3">
                            <button
                              type="button"
                              onClick={() => setNoOfSheets(prev => Math.max(1, prev - 1))} // Ensure it doesn't go below 1
                              className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 focus:outline-none"
                            >
                              <span className='text-black text-2xl'>-</span>
                            </button>
                            <span className="text-lg">{noOfSheets}</span> {/* Display the number of sheets */}
                            <button
                              type="button"
                              onClick={() => setNoOfSheets(prev => prev + 1)}
                              className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 focus:outline-none"
                            >
                              <span className='text-black text-2xl'>+</span>
                            </button>
                          </div>
                        </div>
                        <div className='flex justify-between'>
                          <span>Choose a Material:</span>
                          <select 
                            value={materialType} 
                            onChange={(e) => setMaterialType(e.target.value)}
                            className={`text-right bg-amber-300 rounded-lg text-black border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`}
                          >
                            <option value="">Type</option>
                            <option value="MDF">MDF</option>
                            <option value="WPC">WPC</option>
                            <option value="WOOD">WOOD</option>
                            <option value="MS">MS (upcoming)</option>
                          </select>
                        </div>
                      </div>
                    )}
                    <DrawerFooter>
                      {!hasError && isLoggedIn && (
                        <DrawerClose asChild>
                          <Button className='text-xl text-white bg-emerald-600' onClick={handlePlaceOrder}>
                            Place order: ₹{price.toFixed(2)}
                          </Button>
                        </DrawerClose>
                      )}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </form>
          </div>
        </div>
        <div className="max-h-[400px] w-full p-6 border-2 rounded-lg shadow-lg">
          <ul className="list-disc w-auto flex flex-col p-3 gap-4 text-sky-200">
            <li>We are finalizing the crafting cost to offer you the best deal.</li>
            <li>As an inaugural offer, no delivery charges will be added, but soon costs will be included based on your location.</li>
            <li>Only registered users can place orders for the models shown.</li>
            <li>We may call your registered phone number to confirm your delivery location.</li>
          </ul>
        </div>
      </main>
    </>
  );
}
