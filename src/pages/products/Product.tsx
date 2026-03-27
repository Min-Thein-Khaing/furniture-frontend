import { products } from '@/data/images/products'
import FilterProduct from './FilterProduct'
import ProductList from './ProductList'
import { PaginationDemo } from '@/components/pagination'

const Product = () => {
    return (
        <div className='mx-auto container min-h-screen '>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
                <div className='hidden lg:block lg:col-span-1 border-gray-200 my-10'>
                    <FilterProduct />
                </div>
                <div className='col-span-1 md:col-span-3 lg:col-span-3 px-2 my-5 lg:my-5'>
                    <h1 className='lg:text-2xl text-xl font-bold text-[#056152] mb-6'>All Products</h1>
                    <ProductList products={products} />
                </div>
                <div className='col-span-1 md:col-span-3 lg:col-span-4 lg:my-5'>
                    <PaginationDemo />
                </div>
            </div>
        </div>
    )
}

export default Product