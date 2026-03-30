import { authApi } from "@/api";
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
            console.log({ error: res.data });
            throw new Error("Invalid credentials");
        }
        const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
        toast.success("Login successful", { position: "top-right" });
        return redirect(redirectTo);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log({ error: error.response?.data });
            toast.error("Invalid credentials", { position: "top-right" });
            throw new Error("Invalid credentials");
        }
    }

}
