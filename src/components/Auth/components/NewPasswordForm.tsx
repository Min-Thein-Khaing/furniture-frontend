import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSubmit, useNavigation, useActionData } from "react-router"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FieldError from "@/components/FieldError"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function NewPasswordForm() {
  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const actionData = useActionData() as { message?: string }
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submit(data, { method: "post",action:"/reset/new-password-confirm" })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Password</CardTitle>
        <CardDescription>
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      disabled={isSubmitting} 
                    />
                  )}
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-0" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
              </div>
              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>

            {actionData?.message && (
              <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                {actionData.message}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full text-white bg-[#056152] hover:bg-[#044a3e]">
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
