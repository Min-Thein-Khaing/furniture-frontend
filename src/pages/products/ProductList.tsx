import React from 'react'
import type { Product } from '@/types'
import { Link } from 'react-router-dom'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'

const ProductList = ({ products }: { products: Product[] }) => {
    const {addItem,items} = useCartStore();
   

    const handleAddToCart = (product: Product) => {
        const isInCart = items.some((item) => item.id === product.id);
        if (isInCart) return;

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0],
        });
    };
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8'>
            {products.map((product) => {
                const isInCart = items.some((item) => item.id === product.id);
                return (
                    <div
                        key={product.id}
                        className='group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100'
                    >
                        {/* Image Section */}
                        <Link to={`/products/${product.id}`} className="block w-full overflow-hidden">
                            <AspectRatio ratio={1 / 1} className="bg-muted">
                                <img
                                    src={product.images[0].path}
                                    alt={product.name}

                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                />
                                {/* Overlay Effect */}
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                            </AspectRatio>
                        </Link>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-1 gap-5">
                            <Link to={`/products/${product.id}`} className='space-y-2'>
                                <h3 className='text-xl font-bold  text-[#056152] line-clamp-2 leading-tight  hover:underline'>
                                    {product.name}
                                </h3>
                                <p className='text-start text-[#056152]/80  font-bold'>
                                    {formatCurrency(product.price, { currency: 'USD' })}
                                    {product.discount > 0 && (
                                        <span className='text-sm ms-2 text-red-500 line-through'>{formatCurrency(product.discount)}</span>
                                    )}
                                </p>
                            </Link>


                            {product.status !== "INACTIVE" ? (
                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={isInCart}
                                    className='w-full mt-auto bg-[#056152] hover:bg-[#044a3e] text-white transition-colors disabled:bg-gray-400'
                                >
                                    {isInCart ? "In Cart" : "Add to Cart"}
                                </Button>
                            ) : (
                                <Button disabled={true} className='w-full mt-auto bg-[#056152] hover:bg-[#044a3e] text-white transition-colors'>
                                    Out of Stock
                                </Button>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductList