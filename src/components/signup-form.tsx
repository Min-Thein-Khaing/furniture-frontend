import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigation, useSubmit } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError, // Added for validation messages
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icons } from "@/ui/icon";
import { AppleIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

// 1. Define Validation Schema
const signupSchema = z.object({
  phone: z
    .string()
    .min(8, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" })
    // Basic regex for digits, allowing a leading +
    .regex(/^\+?[0-9]+$/, { message: "Invalid phone number format" }),
});

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // 2. Initialize React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phone: "",
    },
  });

  // 3. Handle Submit (Triggers Router Action after validation)
  const onValidSubmit = (data: SignupValues) => {
    // This sends the data to your React Router 'action' function
    submit(data, { method: "post" ,action:"."  });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <Icons.logo className="size-6" />
            </a>
            <h1 className="text-xl font-bold">Furniture</h1>
            <FieldDescription>
              Already have an account? <a href="/login" className="underline underline-offset-4 hover:text-primary">Log in</a>
            </FieldDescription>
          </div>

          {/* 4. Use Controller for the Phone field */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Field >
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <FieldError className="text-destructive text-xs">
                    {errors.phone.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" disabled={isSubmitting}>
              <AppleIcon className="mr-2 h-4 w-4" />
              Apple
            </Button>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our <a href="#" className="underline underline-offset-4">Terms of Service</a> and <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}