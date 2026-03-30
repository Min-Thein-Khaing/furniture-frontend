import { LoginForm } from "@/components/Auth/components/login-form"
import { Icons } from "@/ui/icon"
import { GalleryVerticalEnd, Sheet } from "lucide-react"
import loginImg from "@/data/images/house.webp"
export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        
                        <div className="flex gap-1 items-center">
                            <Icons.logo className="size-6" />
                            <p className="font-medium">Furniture</p>
                        </div>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={loginImg}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}