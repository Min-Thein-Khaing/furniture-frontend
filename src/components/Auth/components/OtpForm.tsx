import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useActionData, useNavigation, useSubmit } from "react-router";

// 1. Define the validation schema
const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
const OtpForm = () => {
  const submit = useSubmit()
  const navigation = useNavigation();
   const isSubmitting = navigation.state === "submitting";
   const actionData = useActionData();
  // 2. Initialize the form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 3. Define the submit handler
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submit(data,{method:"post",action:"/register/otp"})
    // Add your verification logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        {/* 4. Use Controller to wrap the custom OTP input */}
        <Controller 
          control={control}
          name="otp"
          render={({ field }) => (
            <InputOTP 
              maxLength={6} 
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value} 
              onChange={field.onChange}
            >
              <InputOTPGroup >
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {actionData?.message && (
          <p className={`text-sm font-medium ${actionData.success ? "text-green-600" : "text-red-600"}`}>
            {actionData.message}
          </p>
        )}
        {/* Error message handling */}
        {errors.otp && (
          <p className="text-sm font-medium text-destructive">
            {errors.otp.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-4">
        Verify
      </Button>
    </form>
  );
};

export default OtpForm;