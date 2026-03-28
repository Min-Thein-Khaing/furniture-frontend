"use client"

import { products } from '@/data/images/products'
import FilterProduct from './FilterProduct'
import ProductList from './ProductList'
import { PaginationDemo } from '@/components/pagination'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import { useState, useEffect } from 'react'

const Product = () => {
    const [isOpen, setIsOpen] = useState(false)

    // Close sheet when switching to desktop
    useEffect(() => {
        const query = window.matchMedia("(min-width: 1024px)")
        const handler = (e: MediaQueryListEvent) => {
            if (e.matches) setIsOpen(false)
        }
        query.addEventListener("change", handler)
        return () => query.removeEventListener("change", handler)
    }, [])

    return (
        <div className='mx-auto container min-h-screen px-4 lg:px-0'>
            {/* Mobile Filter Trigger */}
            <div className='lg:hidden flex justify-end mb-4 mt-5  '>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className='gap-2 border-[#056152] text-[#056152] hover:bg-[#056152] hover:text-white transition-all rounded-lg'>
                            <ListFilter size={20} />
                            Filter Products
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader className='border-b pb-4 mb-4 text-left'>
                            <SheetTitle className='text-[#056152] font-bold text-xl'>Refine Search</SheetTitle>
                            <SheetDescription className="sr-only">
                                Use the filters below to browse our collection of premium furniture.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            <FilterProduct />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
                {/* Desktop Sidebar Filter */}
                <div className='hidden lg:block lg:col-span-1 border-r border-gray-100 pr-8 my-10'>
                    <div className='sticky top-24'>
                         <FilterProduct />
                    </div>
                </div>

                {/* Main Product Area */}
                <div className='col-span-1 md:col-span-3 lg:col-span-3 py-5 lg:py-10'>
                    <div className='flex items-center justify-between mb-8'>
                        <h1 className='lg:text-3xl text-2xl font-extrabold text-[#056152]'>All Products</h1>
                        <span className='text-sm text-gray-500 font-medium'>{products.length} Products Found</span>
                    </div>
                    <ProductList products={products} />
                </div>

                {/* Pagination */}
                <div className='col-span-1 md:col-span-3 lg:col-span-4 py-10 border-t border-gray-100'>
                    <PaginationDemo />
                </div>
            </div>
        </div>
    )
}

export default Product