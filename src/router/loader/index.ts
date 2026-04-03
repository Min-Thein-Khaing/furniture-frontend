import { api, authApi } from "@/api";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { redirect } from "react-router";

export const homeLoader = async () => {
    try {
        const products = await api.get("/user/products?limit=8");
        const posts = await api.get("/user/posts/infinite?limit=3")

        //cocidencely want using this 
        // const [products, posts] = await Promise.all([
        //     api.get("/user/products?limit=8"),
        //     api.get("/posts/infinite?limit=3")
        // ])

        return {productsData: products.data, postsData: posts.data};
    } catch (error) {
        console.log(error);
        throw error;
    }
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
export const confirmLoader = async() => {
    const authState = useAuthStore.getState();
    if(authState.status !== "confirm"){
        return redirect("/register")
    }
    return null;
}