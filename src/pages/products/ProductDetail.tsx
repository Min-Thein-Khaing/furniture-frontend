import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { Link, useLoaderData, useParams } from 'react-router'
import { Separator } from '@/components/ui/separator'
import Rating from './Rating'
import { products } from '@/data/images/products'
import { formatCurrency, cn } from '@/lib/utils'
import Addwhitlist from './Addwhitlist'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { AccordionItem, AccordionTrigger, Accordion, AccordionContent } from '@/components/ui/accordion'
import { ProductCard } from '@/components/products/ProductCard'
import type { Product } from '@/types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { productQuery, proudctOneDetailQuery } from '@/api/query'

const productFormSchema = z.object({
    quantity: z.number().min(1),
})

type ProductFormValues = z.infer<typeof productFormSchema>

const ProductDetail = () => {
    const { id } = useParams()
    const { data: productsData } = useSuspenseQuery(productQuery("limit=100"))
    const { data: oneProductData } = useSuspenseQuery(proudctOneDetailQuery(Number(id)))
    


    const [mainImage, setMainImage] = useState(oneProductData?.data?.images[0].path)

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
        toast.success('Product added to cart', { position: 'top-right' })
        reset()
    }

    // random show 4 product
    const relatedProducts = productsData?.data
        .filter((p: any) => (p.id) !== Number(id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    if (!oneProductData) return <div className='container mx-auto mt-10 text-center font-bold text-2xl'>Product not found</div>

    const label = oneProductData.data.inventory > 1 ? 'items' : 'item'
    const isOutOfStock = oneProductData.data.inventory <= 0

    return (
        <div className='container mx-auto mt-10 px-4 lg:px-0 mb-20'>
            {/* Back Button */}
            <Link
                to="/products"
                className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#056152] transition-colors mb-8 group'
            >
                <ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform' />
                Back to All Products
            </Link>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mx-5'>
                {/* Images Section */}
                <div className='flex gap-4'>
                    <div className='aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4 lg:p-8'>
                        <img
                            src={mainImage}
                            alt={oneProductData.data.name}
                            className='max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in'
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className='flex flex-col gap-4  pb-2 scrollbar-hide'>
                        {oneProductData.data.images.map((img: any, index: number) => (
                            <button
                                key={index}
                                onClick={() => setMainImage(img.path)}
                                className={cn(
                                    'size-20 lg:size-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-2 bg-gray-50',
                                    mainImage === img.path ? 'border-[#056152] ring-2 ring-[#056152]/10 bg-white' : 'border-transparent hover:border-gray-200'
                                )}
                            >
                                <img src={img.path} alt="" className='w-full h-full object-contain' />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Section with integrated Form */}
                <div
                    className='flex flex-col py-2'
                >
                    <div className='mb-6'>
                        <div className='flex items-center gap-2 mb-4'>
                            <Rating rating={oneProductData.data.rating} />
                            <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>| 12 Reviews</span>
                        </div>
                        <h1 className='text-3xl lg:text-4xl font-extrabold text-[#056152] mb-4 tracking-tight'>{oneProductData.data.name}</h1>
                        <p className='text-3xl font-bold text-gray-900 mb-6'>
                            {formatCurrency(oneProductData.data.price)}
                        </p>
                        <Accordion type="single" collapsible defaultValue='item-1'>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className='font-medium text-[#056152] underline '>Description</AccordionTrigger>
                                <AccordionContent>
                                    <p className='text-gray-600 leading-relaxed text-lg max-w-xl'>
                                        {oneProductData.data.description}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <Separator className='mb-8' />

                    {/* Meta Options */}
                    <div className='flex flex-col gap-6 mb-8'>
                        <div className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <span className='font-bold text-sm text-gray-700 min-w-24 uppercase tracking-wide'>Availability:</span>
                                <div className={cn(
                                    'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border',
                                    isOutOfStock ? 'text-red-600 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                                )}>
                                    {isOutOfStock ? 'Out of Stock' : `In Stock (${oneProductData.data.inventory} ${label})`}
                                </div>
                            </div>
                            <div className=''>
                                <Addwhitlist productId={Number(oneProductData.data.id)} rating={oneProductData.data.rating} isFavorite={oneProductData.data.users.length > 0} />
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <span className='font-bold text-sm text-gray-700 min-w-24 uppercase tracking-wide'>Quantity:</span>
                            <div className='flex items-center border-2 border-gray-200 rounded-xl bg-white overflow-hidden h-12'>
                                <button
                                    type="button"
                                    onClick={() => setValue('quantity', Math.max(1, quantity - 1))}
                                    className='p-3 hover:bg-gray-50 transition-colors border-r-2 disabled:opacity-30'
                                    disabled={isOutOfStock || quantity <= 1 || oneProductData.data.status === "INACTIVE"}
                                >
                                    <Minus className='size-4 text-gray-600' />
                                </button>

                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="number"
                                            disabled={isOutOfStock || oneProductData.data.status === "INACTIVE"}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value)
                                                if (!isNaN(val)) {
                                                    field.onChange(Math.min(oneProductData.data.inventory, Math.max(1, val)))
                                                }
                                            }}
                                            className='w-20 text-center font-bold text-gray-800 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        />
                                    )}
                                />

                                <button
                                    type="button"
                                    onClick={() => setValue('quantity', Math.min(oneProductData.data.inventory, quantity + 1))}
                                    className='p-3 hover:bg-gray-50 transition-colors border-l-2 disabled:opacity-30'
                                    disabled={isOutOfStock || quantity >= oneProductData.data.inventory || oneProductData.data.status === "INACTIVE"}
                                >
                                    <Plus className='size-4 text-gray-600' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Button
                            type="button"
                            disabled={isOutOfStock || oneProductData.data.status === "INACTIVE"}
                            className='flex-1 h-16 text-lg font-bold bg-[#056152] hover:bg-[#044c41] rounded-xl shadow-lg shadow-[#056152]/10 transition-all active:scale-95'
                        >
                            Buy Now
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            variant="outline"
                            disabled={isOutOfStock || oneProductData.data.status === "INACTIVE"}

                            className='flex-1 h-16 text-lg font-bold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all active:scale-95 group gap-2'
                        >
                            <ShoppingCart className='size-5 group-hover:scale-110 transition-transform' />
                            Add to Cart
                        </Button>
                    </div>

                    {/* Additional Details Placeholder */}
                    <div className='mt-12 pt-8 border-t border-dashed border-gray-200'>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-gray-400 uppercase tracking-tighter font-bold text-[10px]'>Category</span>
                                <span className='font-medium text-gray-700 uppercase'>Living Room</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-gray-400 uppercase tracking-tighter font-bold text-[10px]'>Delivery</span>
                                <span className='font-medium text-gray-700'>Free Standard Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Popular Products Section */}
            <div className='mt-20 border-t pt-20'>
                <div className='flex items-center justify-between mb-10'>
                    <h2 className='text-2xl lg:text-3xl font-extrabold text-[#056152] tracking-tight'>
                        Popular Products
                    </h2>
                    <Link
                        to="/products"
                        className='text-sm font-bold text-[#056152] hover:underline underline-offset-4 uppercase tracking-widest'
                    >
                        View All
                    </Link>
                </div>
                <ProductCard products={relatedProducts} />
            </div>
        </div>
    )
}

export default ProductDetail