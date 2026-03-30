import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginTypeSchema, } from "@/types/login"
import { useSubmit } from "react-router"

export const useLoginHook = () => {
    const {handleSubmit,control,formState:{errors},reset,watch} = useForm<LoginTypeSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    })
    const submit = useSubmit()
    const onSubmit = (data:LoginTypeSchema) => {
        console.log(data)
        submit(data,{method:"post",action:"/login"})
    }
    return {
        handleSubmit,
        control,
        errors,
        watch,
        reset,
        onSubmit
    }
}