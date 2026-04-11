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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const ResetOtpForm = () => {
  const submit = useSubmit()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData() as { message?: string };

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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submit(data, { method: "post" ,action:"/reset/verify-otp"})
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verify Reset Code</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your phone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Controller 
              control={control}
              name="otp"
              render={({ field }) => (
                <InputOTP 
                  maxLength={6} 
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value} 
                  onChange={field.onChange}
                  disabled={isSubmitting}
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
              <p className="text-sm font-medium text-red-600">
                {actionData.message}
              </p>
            )}
            {errors.otp && (
              <p className="text-sm font-medium text-destructive">
                {errors.otp.message}
              </p>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#056152] hover:bg-[#044a3e]">
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetOtpForm;
