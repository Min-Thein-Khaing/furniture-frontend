import { api, authApi } from "@/api";
import queryClient, { categoryTypeQuery, onePostQuery, postInfiniteQuery, postQuery, productInfiniteQuery, productQuery, proudctOneDetailQuery } from "@/api/query";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { redirect, type LoaderFunctionArgs } from "react-router";

//this is using tanstack query
// export const homeLoader = async () => {
//     try {
//         const products = await api.get("/user/products?limit=8");
//         const posts = await api.get("/user/posts/infinite?limit=3")

//         //cocidencely want using this 
//         // const [products, posts] = await Promise.all([
//         //     api.get("/user/products?limit=8"),
//         //     api.get("/posts/infinite?limit=3")
//         // ])

//         return {productsData: products.data, postsData: posts.data};
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

//this is using tanstack query and loader
//queryClient.ensureQueryData is old data watch and then that is not chg showing data 
//queryClient.fetchQuery is new data watch and then that is chg showing data 
export const homeLoader = async() => {
    await queryClient.ensureQueryData(productQuery("limit=8"))
    await queryClient.ensureQueryData(postQuery("limit=3"))
    return null
}
export const loginLoader = async () => {
    // Clear any stale registration/OTP state when visiting login/register pages
    

    try {
        const response = await authApi.get("/auth-check")
        if(response.status === 200){
            return redirect("/");
        }
        return null;
    } catch (error) {
        if(error instanceof AxiosError){
            if(error.response?.status === 401){
                return null;
            }
        }
        return null;
    }
}

export const otpLoader = async () => {
    const authState = useAuthStore.getState();
    
    if(authState.status !== "otp"){
        return redirect("/register")
    }

    return null;
};
export const verifyOtpLoader = async() => {
    const authState = useAuthStore.getState();
    if(authState.status !== "verify"){
        return redirect("/register")
    }
    return null;
}
export const resetOtpLoader = async() => {
    const authState = useAuthStore.getState();
    if(authState.status !== "verify"){
        return redirect("/reset")
    }
    return null;
}
export const confirmLoader = async() => {
    const authState = useAuthStore.getState();
    if(authState.status !== "confirm"){
        return redirect("/register")
    }
    return null;
}
export const resetConfirmLoader = async() => {
    const authState = useAuthStore.getState();
    if(authState.status !== "reset"){
        return redirect("/reset")
    }
    return null;
}

export const postInfiniteLoader = async() => {
    await queryClient.ensureInfiniteQueryData(postInfiniteQuery())
    return null;
}


export const onePostLoader = async({params}: LoaderFunctionArgs) => {
    await queryClient.ensureQueryData(postQuery("limit=6"))
    await queryClient.ensureQueryData(onePostQuery(Number(params.id)))
    return {id:Number(params.id)};
}
export const productInfiniteLoader = async() => {
    await queryClient.ensureQueryData(categoryTypeQuery())
    await queryClient.prefetchInfiniteQuery(productInfiniteQuery())
    return null;
}

export const productOneDetailLoader = async({params}: LoaderFunctionArgs) => {
    await queryClient.ensureQueryData(productQuery("limit=100"))
    await queryClient.ensureQueryData(proudctOneDetailQuery(Number(params.id)))
    return {id:Number(params.id)};
}