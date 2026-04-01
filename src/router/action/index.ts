import { api, authApi } from "@/api";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const authForm = {
        phone: formData.get("phone") as string,
        password: formData.get("password") as string,
    }
    try {
        const res = await authApi.post("/login", authForm);
        if (res.status !== 200) {
            console.log({ error: res.data});
        }
        const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
        toast.success("Login successful", { position: "top-right" });
        return redirect(redirectTo);
    } catch (error) {
        let errorMessage = "";
        if (error instanceof AxiosError) {
            errorMessage= error.response?.data?.message || "Login failed";
            toast.error("Invalid credentials", { position: "top-right" });
        }
        return {
            message : errorMessage,
        }
        
    }

}

export const logoutAction = async () => {
    try {
       await api.post("/logout");
       
       toast.success("Logout successfully", { position: "top-right" });
        return redirect("/login");
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log({ error: error.response?.data });
            toast.error("logout fail", { position: "top-right" });
        }
    }
}


