import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { filterList } from '@/data/images/products'
import { Button } from "@/components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from "react"

// 1. အတွင်းပိုင်း data အရင်သတ်မှတ်မယ်
type Category = { id: string; name: string };
type Type = { id: string; name: string };

// 2. API က ပြန်လာတဲ့ structure အတိုင်း အတိအကျရေးမယ်
interface CategoryTypeResponse {
    message: string;
    data: {
        categories: Category[];
        types: Type[];
    };
}

// 3. Props အတွက် interface (Parent က ပို့ပေးမယ့် object)
interface FilterProductProps {
    categoryType: CategoryTypeResponse;
    setSearchParams: (params: URLSearchParams) => void;
}


const FilterProduct: FC<FilterProductProps> = ({ categoryType, setSearchParams }) => {
    // defaultValues ကို Array အနေနဲ့ အရင်သတ်မှတ်ပေးရပါမယ်
    const filterSchema = z.object({
        categories: z.array(z.string()),
        types: z.array(z.string()),
    })
    type FilterSchema = z.infer<typeof filterSchema>

    const { control, handleSubmit, reset } = useForm<FilterSchema>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            categories: [],
            types: [],
        },
    })

    const onSubmit = (data: FilterSchema) => {

        const params = new URLSearchParams();
        if (data.categories.length > 0) {
            params.set("categories", data.categories.join(","));
        }else{
            params.delete("categories");
        }

        if (data.types.length > 0) {
            params.set("types", data.types.join(","));
        }else{
             params.delete("types");       
        }

        // setSearchParams ကို Object ပုံစံနဲ့ တိုက်ရိုက် ပို့ပေးလိုက်ပါ
        setSearchParams(params);
    }

    return (
        <form className='min-h-screen mx-5 lg:mx-0' onSubmit={handleSubmit(onSubmit)}>
            {/* --- Section 1: Categories --- */}
            <div className='mb-10 '>
                <h1 className='lg:text-2xl text-xl font-bold text-[#056152] mb-6'>Furniture-Made-By</h1>
                <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                        <FieldGroup>
                            {categoryType.data.categories.map((category) => (
                                <Field key={category.id} orientation="horizontal" className="gap-3">
                                    <Checkbox
                                        id={`cat-${category.id}`}
                                        checked={field.value?.includes(String(category.id))}
                                        onCheckedChange={(checked) => {
                                            const updatedValue = checked
                                                ? [...field.value, String(category.id)]
                                                : field.value.filter((val: string) => val !== String(category.id));
                                            field.onChange(updatedValue);
                                        }}
                                        className='size-5 border-2 border-[#056152] data-[state=checked]:bg-[#056152] data-[state=checked]:text-white focus-visible:ring-[#056152]'
                                    />
                                    <FieldLabel htmlFor={`cat-${category.id}`} className="cursor-pointer">
                                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
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
                            {categoryType.data.types.map((type) => (
                                <Field key={type.id} orientation="horizontal" className="gap-3">
                                    <Checkbox
                                        id={`type-${type.id}`}
                                        checked={field.value?.includes(String(type.id))}
                                        onCheckedChange={(checked) => {
                                            const updatedValue = checked
                                                ? [...field.value, String(type.id)]
                                                : field.value.filter((val: string) => val !== String(type.id));
                                            field.onChange(updatedValue);
                                        }}
                                        className='size-5 border-2 border-[#056152] data-[state=checked]:bg-[#056152] data-[state=checked]:text-white focus-visible:ring-[#056152]'
                                    />
                                    <FieldLabel htmlFor={`type-${type.id}`} className="cursor-pointer">
                                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
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