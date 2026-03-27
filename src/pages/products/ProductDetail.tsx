import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Separator } from '@/components/ui/separator'
import Rating from './Rating'
import { products } from '@/data/images/products'
import { formatCurrency, cn } from '@/lib/utils'

const ProductDetail = () => {
    const { id } = useParams()
    const product = products.find((p) => p.id === id)
    const [mainImage, setMainImage] = useState(product?.images[0])
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    if (!product) return <div className='container mx-auto mt-10 text-center font-bold text-2xl'>Product not found</div>

    const label = product.inventory > 1 ? 'items' : 'item'
    const isOutOfStock = product.inventory <= 0

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

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {/* Images Section */}
                <div className='flex  gap-4'>
                    <div className='aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4 lg:p-8'>
                        <img 
                            src={mainImage} 
                            alt={product.name} 
                            className='max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in'
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className='flex flex-col gap-4 overflow-x-auto pb-2 scrollbar-hide'>
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setMainImage(img)}
                                className={cn(
                                    'size-20 lg:size-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-2 bg-gray-50',
                                    mainImage === img ? 'border-[#056152] ring-2 ring-[#056152]/10 bg-white' : 'border-transparent hover:border-gray-200'
                                )}
                            >
                                <img src={img} alt="" className='w-full h-full object-contain' />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className='flex flex-col py-2'>
                    <div className='mb-6'>
                        <div className='flex items-center gap-2 mb-4'>
                            <Rating rating={product.rating} />
                            <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>| 12 Reviews</span>
                        </div>
                        <h1 className='text-3xl lg:text-4xl font-extrabold text-[#056152] mb-4 tracking-tight'>{product.name}</h1>
                        <p className='text-3xl font-bold text-gray-900 mb-6'>
                            {formatCurrency(product.price)}
                        </p>
                        <p className='text-gray-600 leading-relaxed text-lg max-w-xl'>
                            {product.description}
                        </p>
                    </div>

                    <Separator className='mb-8' />

                    {/* Meta Options */}
                    <div className='flex flex-col gap-6 mb-8'>
                        <div className='flex items-center gap-4'>
                            <span className='font-bold text-sm text-gray-700 min-w-24 uppercase tracking-wide'>Availability:</span>
                            <div className={cn(
                                'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border',
                                isOutOfStock ? 'text-red-600 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                            )}>
                                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.inventory} ${label})`}
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <span className='font-bold text-sm text-gray-700 min-w-24 uppercase tracking-wide'>Quantity:</span>
                            <div className='flex items-center border-2 border-gray-200 rounded-xl bg-white overflow-hidden h-12'>
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className='p-3 hover:bg-gray-50 transition-colors border-r-2 disabled:opacity-30'
                                    disabled={isOutOfStock || quantity <= 1}
                                >
                                    <Minus className='size-4 text-gray-600' />
                                </button>
                               
                                <input 
                                    type="number"
                                    value={quantity}
                                    disabled={isOutOfStock}
                                    onChange={(e) => {
                                        const val = Number(e.target.value)
                                        if (val >= 1 && val <= product.inventory) {
                                            setQuantity(val)
                                        } else if (val > product.inventory) {
                                            setQuantity(product.inventory)
                                        }
                                    }}
                                    className='w-20 text-center font-bold text-gray-800 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                />

                                <button 
                                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                                    className='p-3 hover:bg-gray-50 transition-colors border-l-2 disabled:opacity-30'
                                    disabled={isOutOfStock || quantity >= product.inventory}
                                >
                                    <Plus className='size-4 text-gray-600' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Button 
                            disabled={isOutOfStock}
                            className='flex-1 h-16 text-lg font-bold bg-[#056152] hover:bg-[#044c41] rounded-xl shadow-lg shadow-[#056152]/10 transition-all active:scale-95'
                        >
                            Buy Now
                        </Button>
                        <Button 
                            variant="outline"
                            disabled={isOutOfStock}
                            className='flex-1 h-16 text-lg font-bold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all active:scale-95 group gap-2'
                        >
                            <ShoppingCart className='size-5 group-hover:scale-110 transition-transform' />
                            Add to Cart
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={cn(
                                'h-16 w-16 px-0 rounded-xl border-2 transition-all active:scale-90',
                                isFavorite ? 'border-red-100 bg-red-50 text-red-500' : 'border-gray-200 hover:bg-gray-50 text-gray-400'
                            )}
                        >
                            <Heart className={cn('size-6 transition-all', isFavorite && 'fill-current')} />
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
        </div>
    )
}

export default ProductDetail