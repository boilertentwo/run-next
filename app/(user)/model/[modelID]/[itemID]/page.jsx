'use client'
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CldImage } from "next-cloudinary";
import { Button } from '@/components/ui/button';

export default function ImageForm({ params }) {
  const { handleSubmit, control, watch, formState: { errors } } = useForm();
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('INR');

  const formValues = watch();

  const calculatePrice = () => {
    let basePrice 

    if (formValues.height && formValues.width) {
      basePrice = formValues.height * formValues.width * 90/144;
    }

    if (formValues.border) {
      basePrice += formValues.border * 10; // Assuming each unit of border adds Rs. 10
    }

    if (formValues.materialThickness) {
      basePrice += formValues.materialThickness * 10;
    }

    if (formValues.withMaterial === 'without') {
      basePrice -= 50; // Discount if without material
    }

    setPrice(basePrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [formValues]);

  const onSubmit = data => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="relative min-h-full min-w-full p-6 flex lg:mr-28 lg:px-28 lg:mt-4">
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
      <div className="w-1/3 h-full z-0 flex flex-grow flex-col justify-between p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-10 justify-between items-end space-y-2">
            <Controller
              name="metrics"
              control={control}
              defaultValue="inches"
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <select 
                    {...field} 
                    className={`text-right bg-transparent ${errors.metrics ? 'border-red-500 text-red-500' : 'text-slate-500'} border-b border-gray-300 focus:outline-none focus:border-blue-500`}
                  >
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="inches">inches</option>
                    <option value="feet">feet</option>
                  </select>
                  </div>
              )}
            />
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
                    className={`text-right bg-transparent ${errors.height ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
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
                    className={`text-right bg-transparent ${errors.width ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
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
                    className={`text-right bg-transparent ${errors.border ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
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
                    className={`text-right bg-transparent ${errors.materialThickness ? 'border-red-500' : ''} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-1/4`} 
                  />
                  </div>
              )}
            />
            <Controller
              name="withMaterial"
              control={control}
              defaultValue="with"
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <select 
                    {...field} 
                    className={`text-right bg-transparent ${errors.withMaterial ? 'border-red-500 text-red-500' : 'text-amber-200'} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full`}
                  >
                    <option value="with">With Material</option>
                    <option value="without">Without Material</option>
                  </select>
                  
                </div>
              )}
            />
          </div>

          {/* Dynamic Pricing */}
          
              
              <div>
              <Button type="submit" className=" btn-primary float-right text-xl">
              {price?<h1>₹{price.toFixed(2)}</h1>:<h1>₹ 90/sqft</h1>}
              </Button>
              </div>
              
          
          
        </form>
      </div>
    </div>
  );
}
