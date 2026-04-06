import Couch from "@/data/images/couch.png";
import { Link, useLoaderData, useNavigation } from "react-router";
import Carousal from "@/components/carousal";
import { products } from "@/data/images/products";
import { posts } from "@/data/images/posts";
import BlogCard from "@/components/blogs/BlogCard";
import { ProductCard } from "@/components/products/ProductCard";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { postQuery, productQuery } from "@/api/query";


const Title = ({title,herf,sideText}: {title:string,herf:string,sideText:string}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl text-[#056152] font-bold">{title}</h1>
      <Link to={herf} className="text-sm hover:underline hover:underline-offset-2 text-[#056152]">{sideText}</Link>
    </div>
  )
}
function Home() {
  //1.const {productsData , postsData} = useLoaderData() as {productsData: any, postsData: any} this is using loader

  //2.this is using loader and tanstack query
  const {data:productsData} = useSuspenseQuery(productQuery("limit=8"))
  const {data:postsData} = useSuspenseQuery(postQuery("limit=3"))
  
  //3.this is using tanstack query
  // const {data:productsData , isLoading : productLoading , isError : productIsError ,error : productError ,refetch : productRefetch} = useQuery(productQuery("limit=8"))
  // const {data:postsData ,isLoading : postLoading , isError : postIsError ,error : postError ,refetch : postRefetch} = useQuery(postQuery("limit=3"))

  //loader and tanstack query using no need this 
  // if(productLoading || postLoading){
  //   return <div className="w-full min-h-screen flex items-center justify-center">
  //     <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#056152]"></div>
  //   </div>
  // }
  // if(productIsError || postIsError){
  //   return <div className="w-full min-h-screen flex items-center justify-center">
  //     <div className="text-red-500">Error: {productError?.message || postError?.message}</div>
  //   </div>
  // }
  return (
    <div className="w-full min-h-screen">
      <div className="container px-5 lg:px-0 mx-auto font-medium grid grid-cols-1  items-center  md:grid-cols-3 lg:grid-cols-3 gap-8  ">
        <div className="flex flex-col col-span-1 md:col-span-1 ">
          <div className=" mb-2 md:mb-4 text-center mt-10 md:mt-0 lg:mb-8 tracking-wider">
            <h1 className="lg:text-[58px] 2xl:text-7xl text-[#056152] text-nowrap space-y-2 font-bold md:text-4xl text-4xl ">
              Modern Interior
            </h1>
            <span className="lg:text-[58px] 2xl:text-7xl text-[#056152] text-nowrap font-bold md:text-4xl text-4xl">
              Design Studio
            </span>
          </div>
          <p className="text-[#056152]/70 text-center mx-auto md:mx-0 md:text-start max-w-md md:text-md text-sm tracking-wide  mb-2 md:mb-4 line-clamp-2 lg:mb-6">
            Furniture is an essential component of any living space, proviing
            functionality,comfort,and aesthetic appeal.
          </p>
          <div className="mt-4 flex gap-4 justify-center md:justify-start">
            {/* Link ကိုပဲ ခလုတ်ပုံစံ class တွေ ပေးလိုက်ပါ */}
            <Link
              to="#"
              className="bg-[#db821d] text-white rounded-full px-6 py-3 text-nowrap duration-300 active:scale-95 hover:opacity-90 shadow-md"
            >
              Shop Now
            </Link>

            <Link
              to="#"
              className="border border-gray-400 rounded-full px-6 py-3 text-nowrap duration-300 active:scale-95 hover:bg-gray-100"
            >
              Explore
            </Link>
          </div>
        </div>

        {/* ပုံအပိုင်း - နေရာပိုယူစေချင်ရင် col-span-2 သုံးပါ */}
        <div className="md:col-span-2 col-span-1">
          <img
            src={Couch}
            alt="couch"
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>

        {/* Featured Products moved inside the hero grid for visibility */}
        <div className="col-span-1 md:col-span-3   mt-10">
          <Carousal products={productsData.data} />
        </div>
        <div className="col-span-1 md:col-span-3   mt-16 pb-20">
            <Title title="Features Products" herf="/products" sideText="View All Products" />
            <div className="mt-8">
              <ProductCard products={productsData.data} />
            </div>
        </div>
        <div className="col-span-1 md:col-span-3   mt-16 pb-20">
            <Title title="Recent Blog" herf="/blogs" sideText="View All Blogs" />
            <div className="mt-8">
              <BlogCard posts={postsData.data} />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
