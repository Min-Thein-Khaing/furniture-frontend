import { ResetPasswordRequestForm } from '@/components/Auth/components/ResetPasswordRequestForm'
import { Icons } from '@/ui/icon'
import React from 'react'
import loginImg from "@/data/images/house.webp"

const ResetPassword = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mx-auto w-full max-w-md">
                    <div className="flex items-center gap-2 mb-6">
                        <Icons.logo className="size-6" />
                        <span className="text-xl font-bold">Furniture</span>
                    </div>
                    <ResetPasswordRequestForm />
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={loginImg}
                    alt="Reset Password"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default ResetPassword
