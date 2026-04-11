import { api, authApi } from "@/api";
import queryClient from "@/api/query";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { type ActionFunctionArgs } from "react-router";
import { redirect } from "react-router-dom";
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
        }
        const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
        toast.success("Login successful", { position: "top-right" });
        return redirect(redirectTo);
    } catch (error) {
        let errorMessage = "";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || "Login failed";
            toast.error("Invalid credentials", { position: "top-right" });
        }
        return {
            message: errorMessage,
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



export const registerAction = async ({ request }: ActionFunctionArgs) => {
    const authStore = useAuthStore.getState();
    const formData = await request.formData();
    const credentials = { phone: formData.get("phone") };

    try {
        const res = await authApi.post("/register", credentials);

        if (res.data && (res.status === 200 || res.status === 201)) {
            // Log the ENTIRE response to see exactly what the backend sends

            // Adjust these depending on what you see in the console (e.g., res.data.verifyToken)
            const phone = res.data?.data?.phone || res.data?.phone || credentials.phone;
            // ✨ Extract rememberToken based on your console log!
            const token = res.data?.data?.rememberToken

            console.log("Extracted Phone:", phone, "Extracted Token:", token);

            authStore.setAuth(phone as string, token as string, "otp");

            toast.success('Success! Redirecting to OTP...');
            return redirect("/register/otp");
        }

        return { error: "Registration failed: Unexpected response" };

    } catch (error: any) {
        let errorMessage = "Something went wrong";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
            toast.error(errorMessage);
        }
        return { error: errorMessage };
    }
};

export const otpAction = async ({ request }: ActionFunctionArgs) => {
    const authStore = useAuthStore.getState();
    const formData = await request.formData();

    // We send verifyToken as you requested, using the token from our store
    const credentials = {
        phone: authStore.phone,
        otp: formData.get("otp"),
        rememberToken: authStore.token
    };
    console.log("OTP Submit Credentials:", credentials);

    try {
        const res = await authApi.post("/verify-otp", credentials)

        if (res.status === 200 || res.status === 201) {
            toast.success("Otp successful", { position: "top-right" });

            const phone = res.data?.data?.phone || res.data?.phone || authStore.phone;
            const token =
                res.data?.data?.rememberToken ||

                authStore.token;

            authStore.setAuth(phone as string, token as string, "confirm");

            // 🚨 We MUST use 'return redirect()' here otherwise the page will NOT change!
            return redirect("/register/confirm-password");
        }

        toast.error("Otp failed", { position: "top-right" });
        return { message: "Otp failed" };

    } catch (error) {
        let errorMessage = "otp failed";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
            toast.error(errorMessage, { position: "top-right" });
        }
        return {
            message: errorMessage,
        }
    }
}

export const confirmAction = async ({ request }: ActionFunctionArgs) => {
    const authStore = useAuthStore.getState();
    const formData = await request.formData();
    const credentials = {
        firstName: "Mg Mg", // ဒါမျိုး ထည့်ပေးဖို့ လိုပါတယ်
        lastName: "Kyaw",
        phone: authStore.phone, // 09 ပြန်ပေါင်းပေးဖို့ လိုမလို စစ်ပါ
        password: formData.get("password"),
        rememberToken: authStore.token
    };
    console.log("Confirm Password Credentials:", credentials);

    try {

        const data = await authApi.post("/confirm-password", credentials)
        console.log(data)
        toast.success("Password confirmed successfully", { position: "top-right" });
        authStore.clearAuth();
        return redirect("/login");
    } catch (error) {
        let errorMessage = "Password confirmation failed";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
            toast.error(errorMessage, { position: "top-right" });
        }
        return {
            message: errorMessage,
        }
    }
}
export const favoriteAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();

    // params.id မရှိရင် error တက်နိုင်လို့ check လုပ်ထားသင့်ပါတယ်
    if (!params.id) return { success: false, message: "Product ID missing" };

    const data = {
        productId: Number(params.id),
        // Frontend name နဲ့ ကိုက်အောင် ပြင်ထားပါတယ်
        isFavorite: formData.get("favorite") === "true",
    };

    try {
        const res = await api.patch("/user/products/toggle", data);
        if (res.status === 200) {
            await queryClient.invalidateQueries({ queryKey: ["products", "detail", Number(params.id)] });
            toast.success("Favorite updated successfully", { position: "top-right" });
            return { success: true };
        }
        return { success: false, message: "Update failed" };
    } catch (error) {
        let errorMessage = "Favorite update failed";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
            toast.error(errorMessage, { position: "top-right" });
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const productQuantityUpdateAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();

    // params.id မရှိရင် error တက်နိုင်လို့ check လုပ်ထားသင့်ပါတယ်
    if (!params.id) return { success: false, message: "Product ID missing" };

    const data = {
        quantity: formData.get("quantity"),
    };

    try {
        const res = await api.patch(`/user/product/${params.id}`, data);
        if (res.status === 200) {
            await queryClient.invalidateQueries({ queryKey: ["products", "detail", Number(params.id)] });
            toast.success("Favorite updated successfully", { position: "top-right" });
            return { success: true };
        }
        return { success: false, message: "Update failed" };
    } catch (error) {
        let errorMessage = "Favorite update failed";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
            toast.error(errorMessage, { position: "top-right" });
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
}