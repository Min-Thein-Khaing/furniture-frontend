import { api, authApi } from "@/api";
import { AxiosError } from "axios";
import { redirect } from "react-router";

export const homeLoader = async () => {
    try {
        const response = await api.get("/user/products");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loginLoader = async () => {
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