import React from "react";
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

const formSchema = z.object({
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const ConfirmPasswordComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted:", values.confirmPassword);
  };

  return (
    <div className={cn("w-full max-w-sm mx-auto")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          {/* Use Controller to bridge React Hook Form with the Field primitive */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Field >
                <FieldLabel>Confirm Password</FieldLabel>
                
                <Input 
                  {...field} 
                  type="password" 
                  placeholder="Enter password" 
                />

                {/* Show error message if it exists */}
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Button type="submit" className="w-full">
            Confirm
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ConfirmPasswordComponent;