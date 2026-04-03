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