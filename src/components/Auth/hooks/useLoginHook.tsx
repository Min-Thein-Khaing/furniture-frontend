import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginTypeSchema, } from "@/types/login"
import { useSubmit } from "react-router"

 const useLoginHook = () => {
    const {handleSubmit,control,formState:{errors,isSubmitting},reset,watch,} = useForm<LoginTypeSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    })
    const submit = useSubmit()
    const onSubmit = (data:LoginTypeSchema) => {
        submit(data,{method:"post",action:"/login"})
    }
    return {
        handleSubmit,
        isSubmitting,
        control,
        errors,
        watch,
        reset,
        onSubmit
    }
}
export default useLoginHook