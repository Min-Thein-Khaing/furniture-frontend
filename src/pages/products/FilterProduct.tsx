import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { filterList } from '@/data/images/products'
import { Button } from "@/components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FilterProduct = () => {
    // defaultValues ကို Array အနေနဲ့ အရင်သတ်မှတ်ပေးရပါမယ်
    const filterSchema = z.object({
        categories: z.array(z.string()),
        types: z.array(z.string()),
    })
    type FilterSchema = z.infer<typeof filterSchema>

    const { control, handleSubmit,reset } = useForm<FilterSchema>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            categories: [],
            types: [],
        },
    })

    const onSubmit = (data: FilterSchema) => {
        console.log("Filter Data:", data) // အခုဆိုရင် ID array တွေ ထွက်လာပါလိမ့်မယ်
        reset()
    }

    return (
        <form className='min-h-screen' onSubmit={handleSubmit(onSubmit)}>
            {/* --- Section 1: Categories --- */}
            <div className='mb-10'>
                <h1 className='lg:text-2xl text-xl font-bold text-[#056152] mb-6'>Furniture-Made-By</h1>
                <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                        <FieldGroup>
                            {filterList.categories.map((category) => (
                                <Field key={category.id} orientation="horizontal" className="gap-3">
                                    <Checkbox
                                        id={`cat-${category.id}`}
                                        checked={field.value?.includes(category.id)}
                                        onCheckedChange={(checked) => {
                                            const updatedValue = checked
                                                ? [...field.value, category.id]
                                                : field.value.filter((val: string) => val !== category.id);
                                            field.onChange(updatedValue);
                                        }}
                                        className='size-5 border-2 border-[#056152] data-[state=checked]:bg-[#056152] data-[state=checked]:text-white focus-visible:ring-[#056152]'
                                    />
                                    <FieldLabel htmlFor={`cat-${category.id}`} className="cursor-pointer">
                                        {category.label}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    )}
                />
            </div>

            {/* --- Section 2: Types --- */}
            <div className='mb-5'>
                <h1 className='lg:text-2xl text-xl font-bold text-[#056152] mb-6'>Furniture Types</h1>
                <Controller
                    name="types"
                    control={control}
                    render={({ field }) => (
                        <FieldGroup>
                            {filterList.types.map((type) => (
                                <Field key={type.id} orientation="horizontal" className="gap-3">
                                    <Checkbox
                                        id={`type-${type.id}`}
                                        checked={field.value?.includes(type.id)}
                                        onCheckedChange={(checked) => {
                                            const updatedValue = checked
                                                ? [...field.value, type.id]
                                                : field.value.filter((val: string) => val !== type.id);
                                            field.onChange(updatedValue);
                                        }}
                                        className='size-5 border-2 border-[#056152] data-[state=checked]:bg-[#056152] data-[state=checked]:text-white focus-visible:ring-[#056152]'
                                    />
                                    <FieldLabel htmlFor={`type-${type.id}`} className="cursor-pointer">
                                        {type.label.charAt(0).toUpperCase() + type.label.slice(1)}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    )}
                />
            </div>

            <Button type="submit" className='w-full mt-6 bg-[#056152] hover:bg-[#044a3e] text-white'>
                Filter Now
            </Button>
        </form>
    )
}

export default FilterProduct