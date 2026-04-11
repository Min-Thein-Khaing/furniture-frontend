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
import { useSubmit, useNavigation, useActionData, Link } from "react-router"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FieldError from "@/components/FieldError"

const formSchema = z.object({
  phone: z.string().min(10, "Phone number is too short"),
})

export function ResetPasswordRequestForm() {
  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const actionData = useActionData() as { error?: string }

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submit(data, { method: "post" ,action:"."})
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your phone number to receive a verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="phone" type="text" placeholder="0977xxxxxx" disabled={isSubmitting} />
                )}
              />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </Field>

            {actionData?.error && (
              <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                {actionData.error}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Reset Code"}
            </Button>

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link to="/login" className="underline underline-offset-4">
                log in
              </Link>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
