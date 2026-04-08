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
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { categoryTypeQuery, productInfiniteQuery } from '@/api/query'
import { useSearchParams } from 'react-router'
import { useFilterStore } from '@/store/useFilterStore'

const Product = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const query = window.matchMedia("(min-width: 1024px)")
        const handler = (e: MediaQueryListEvent) => {
            if (e.matches) setIsOpen(false)
        }
        query.addEventListener("change", handler)
        return () => query.removeEventListener("change", handler)
    }, [])

    //1. is simple
    // const [searchParams, setSearchParams] = useSearchParams();
    // const rawCategories = searchParams.get("categories");
    // const rawTypes = searchParams.get("types");

    // const selectedCategory = rawCategories
    //     ? decodeURIComponent(rawCategories)
    //         .split(",")
    //         .map((c) => c.trim())
    //         .filter((c) => c !== "" && !isNaN(Number(c)))
    //     : [];

    // const selectedType = rawTypes
    //     ? decodeURIComponent(rawTypes)
    //         .split(",")
    //         .map((t) => t.trim())
    //         .filter((t) => t !== "" && !isNaN(Number(t)))
    //     : [];

    // const cat = selectedCategory.length > 0 ? selectedCategory.join(",") : null;
    // const typ = selectedType.length > 0 ? selectedType.join(",") : null;

    //2. global store
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories, types } = useFilterStore();

    const cat = categories.length > 0 ? categories.join(",") : null;
    const typ = types.length > 0 ? types.join(",") : null;
    const { data: categoryType } = useSuspenseQuery(categoryTypeQuery())

    const {
        data,
        status,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(productInfiniteQuery(cat, typ))

    // data?.pages[x].data လို့ ပြန်ထားရင် page.data ကို ယူရပါမယ်
    const allProducts = data?.pages.flatMap((page) => page.data) || []
    useEffect(() => {
        let shortUrl = false
        const param = new URLSearchParams(searchParams);
        if (categories.length > 0) {
            param.set("categories", categories.join(","));
            shortUrl = true
        } else {
            param.delete("categories");
        }
        if (types.length > 0) {
            param.set("types", types.join(","));
            shortUrl = true
        } else {
            param.delete("types");
        }
        if (shortUrl) {
            setSearchParams(param, { replace: true });
        }
    }, [categories, types])
    return (
        <> {/* 1. Parent Fragment အုပ်ပေးရပါမယ် */}
            {status === "pending" ? (
                <div className="flex justify-center py-10"><p>Loading....</p></div>
            ) : status === "error" ? (
                <div className="text-red-500 text-center py-10">
                    <p>Error: {(error as any)?.message || "Something went wrong"}</p>
                </div>
            ) : (
                <div className='mx-auto container min-h-screen px-4 lg:px-0'>
                    {/* Mobile Filter Trigger */}
                    <div className='lg:hidden flex justify-end mb-4 mt-5'>
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
                                        Use filters to browse furniture.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="py-4">
                                    <FilterProduct setSearchParams={setSearchParams} categoryType={categoryType} />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {/* Desktop Sidebar Filter */}
                        <div className='hidden lg:block lg:col-span-1 border-r border-gray-100 pr-8 my-10'>
                            <div className='sticky top-24'>
                                <FilterProduct setSearchParams={setSearchParams} categoryType={categoryType} />
                            </div>
                        </div>

                        {/* Main Product Area */}
                        <div className='col-span-1 md:col-span-3 lg:col-span-3 py-5 lg:py-10'>
                            <div className='flex items-center justify-between mb-8'>
                                <h1 className='lg:text-3xl text-2xl font-extrabold text-[#056152]'>All Products</h1>
                                <span className='text-sm text-gray-500 font-medium'>
                                    {allProducts.length} Products Found
                                </span>
                            </div>

                            <ProductList products={allProducts} />

                            {/* Load More Button for Infinite Scroll */}

                            <div className="flex justify-center mt-8">
                                <Button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="bg-[#056152]"
                                >
                                    {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No more products'}
                                </Button>
                            </div>

                        </div>

                        {/* Pagination - Infinite scroll သုံးရင် ဒါက ပုံမှန်အားဖြင့် မလိုတော့ပါဘူး */}
                        {/* <div className='col-span-1 md:col-span-3 lg:col-span-4 py-10 border-t border-gray-100'>
                            <PaginationDemo />
                        </div> */}
                    </div>
                </div>
            )}
        </>
    )
}

export default Product