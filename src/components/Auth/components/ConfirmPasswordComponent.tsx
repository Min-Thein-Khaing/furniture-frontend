import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ConfirmPasswordComponent = () => {
  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const actionData = useActionData()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password:"",
      confirmPassword: "",
     
    },
  });
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(values, {method: "post", action: "/register/confirm-password"})
  };

  return (
    <div className={cn("w-full max-w-sm mx-auto")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          {/* Use Controller to bridge React Hook Form with the Field primitive */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Field >
                <FieldLabel>Password</FieldLabel>
                
                <div className="relative ">
                  <Input 
                    {...field} 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter password" 
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-0" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff  />}
                  </Button>
                </div>

                {/* Show error message if it exists */}
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Field >
                <FieldLabel>Confirm Password</FieldLabel>
                
                <div className="relative">
                  <Input 
                    {...field} 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Enter password" 
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-0" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff  />}
                  </Button>
                </div>

                {/* Show error message if it exists */}
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
            )}
          />
          {actionData?.message && (
            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-2 rounded">
              <span>{actionData.message}</span>
            </div>
          )}

          <Button type="submit" className="w-full">
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ConfirmPasswordComponent;