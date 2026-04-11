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
  oldPassword: z.string().min(1, "Old password is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function ChangePasswordForm() {
  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const actionData = useActionData() as { message?: string, error?: string }
  
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
        oldPassword: "",
        password: "",
        confirmPassword: ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submit(data, { method: "post" })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
              <div className="relative">
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      id="oldPassword" 
                      type={showOldPassword ? "text" : "password"} 
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
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
              </div>
              {errors.oldPassword && <FieldError>{errors.oldPassword.message}</FieldError>}
            </Field>

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

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
              <div className="relative">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
              </div>
              {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
            </Field>

            {actionData?.message && (
              <div className={`text-sm p-2 rounded ${actionData.error ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"}`}>
                {actionData.message}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#056152] hover:bg-[#044a3e]">
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
