import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { api } from ".";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
           staleTime: 5 * 60 * 1000,
        //    retry:2
        },
    },
});

export default queryClient;


 const fetchProduct = async(q?:string) => {
    const res = await api.get(`/user/products${q ? `?${q}` : ""}`)
    return res.data
}
export const productQuery =(q?:string) => ({
    queryKey:["products",q],
    queryFn: () => fetchProduct(q),
})
 const fetchPost = async(q?:string) => {
    const res = await api.get(`/user/posts/infinite${q ? `?${q}` : ""}`)
    return res.data
}

export const postQuery =(q?:string) => ({
    queryKey:["posts",q],
    queryFn: () => fetchPost(q),
})

const fetchPostInfinite = async({pageParam = null}: {pageParam: string | null}) => {
    const res = await api.get(`/user/posts/infinite${pageParam ? `?cursor=${pageParam}&limit=6` : "?limit=6"}`)
    return res.data
}

export const postInfiniteQuery =() => ({
    queryKey:["posts","infinite"],
    queryFn: fetchPostInfinite,
    initialPageParam:null,
    getNextPageParam:(lastPage:any) => lastPage.nextCursor ?? undefined,
    // getPreviousPageParam:(firstPage:any,pages) => firstPage.prevCursor ?? undefined,
    //maxPages:5,dr ka 5 page pya mr
})

const fetchOnePost = async(id:number) => {
    const res = await api.get(`/user/post/${id}`)
    if(!res.data){
        throw new Error("Post not found")
    }
    return res.data
}
export const onePostQuery =(id:number) => ({
    queryKey:["posts","detail",id],
    queryFn: () => fetchOnePost(id),
})

const categoryType = async()=> {
    const res = await api.get(`/user/products/category-type-filter`)
    return res.data
}
export const categoryTypeQuery =() => ({
    queryKey:["category","type"],
    queryFn: categoryType,
})

//main // testing under
// const fetchInfiniteProduct = async({pageParam = null,categories = null,type = null}: {pageParam: string | null,categories: string | null,type: string | null}) => {
//     const res = await api.get(`/user/products/infinite${pageParam ? `?cursor=${pageParam}&limit=9` : "?limit=9"}`)

//     if(categories){
//         const res = await api.get(`/user/products/infinite${pageParam ? `?cursor=${pageParam}&limit=9&categories=${categories}` : "?limit=9&categories=${categories}"}`)
//     }
//     if(type){
//         const res = await api.get(`/user/products/infinite${pageParam ? `?cursor=${pageParam}&limit=9&type=${type}` : "?limit=9&type=${type}"}`)
//     }
//     if(categories && type){
//         const res = await api.get(`/user/products/infinite${pageParam ? `?cursor=${pageParam}&limit=9&categories=${categories}&type=${type}` : "?limit=9&categories=${categories}&type=${type}"}`)
//     }
//     return res.data
// }

const fetchInfiniteProduct = async({pageParam = null,categories = null,type = null}: {pageParam: string | null,categories: string | null,type: string | null}) => {
    const query = new URLSearchParams()
    if(categories){
        query.append("categories",categories)
    }
    if(type){
        query.append("type",type)
    }
    if(pageParam){
        query.append("cursor",pageParam)
    }
    query.append("limit","9")
    const res = await api.get(`/user/products?${query.toString()}`)
    return res.data
}
export const productInfiniteQuery =(categories:string | null = null,type:string | null = null) => ({
    queryKey:["products","infinite",categories ?? undefined,type ?? undefined],
    queryFn: ({pageParam = null}: {pageParam: string | null}) => fetchInfiniteProduct({pageParam,categories,type}),placeholderData:keepPreviousData,
    initialPageParam:null,
    getNextPageParam:(lastPage:any) => lastPage.nextCursor ?? undefined,
    // getPreviousPageParam:(firstPage:any,pages) => firstPage.prevCursor ?? undefined,
    //maxPages:5,dr ka 5 page pya mr
})

 const proudctOneDetail = async(id:number) => {
    const res = await api.get(`/user/product/${id}`)
    if(!res.data){
        throw new Error("Product not found")
    }
    return res.data
}
export const proudctOneDetailQuery =(id:number) => ({
    queryKey:["products","detail",id],
    queryFn: () => proudctOneDetail(id),
})