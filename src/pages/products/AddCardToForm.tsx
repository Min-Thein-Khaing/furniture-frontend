import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus } from 'lucide-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";

const productFormSchema = z.object({
    quantity: z.number().min(1),
})

type ProductFormValues = z.infer<typeof productFormSchema>
const AddCardToForm = () => {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            quantity: 1,
        },
    })
    const { control, setValue, watch, handleSubmit, formState: { errors }, reset } = form
    const quantity = watch('quantity')
    const onSubmit = (data: ProductFormValues) => {
        console.log(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-4'>
            <span className='font-bold text-sm text-gray-700 min-w-24 uppercase tracking-wide'>Quantity:</span>
            <div className='flex items-center border-2 border-gray-200 rounded-xl bg-white overflow-hidden h-12'>
                <button
                    type="button"
                    onClick={() => setValue('quantity', Math.max(1, quantity - 1))}
                    className='w-12 h-full flex items-center justify-center hover:bg-gray-100 transition-colors'
                >
                    <Minus className='size-4 text-gray-600' />
                </button>
                <Controller
                    control={control}
                    name="quantity"
                    render={({ field }) => (
                        <input
                            type="number"
                            {...field}
                            value={field.value || 1}
                            onChange={(e) => {
                                let val = Number(e.target.value);

                                if (val < 1) val = 1;
                                if (val > 100) val = 100;

                                field.onChange(val); // ✅ IMPORTANT
                            }}
                            className="w-16 h-full text-center text-lg font-bold border-x-2 border-gray-200 focus:outline-none focus:ring-0"
                            min="1"
                            max="100"
                        />
                    )}
                />
                <button
                    type="button"
                    onClick={() => setValue('quantity', Math.min(100, quantity + 1))}
                    className='w-12 h-full flex items-center justify-center hover:bg-gray-100 transition-colors'
                >
                    <Plus className='size-4 text-gray-600' />
                </button>
            </div>
        </form>
    )
}

export default AddCardToForm