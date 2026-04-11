import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icons } from "@/ui/icon";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link, useActionData, useNavigation } from "react-router";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import FieldError from "@/components/FieldError";
import useLoginHook from "../hooks/useLoginHook";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { handleSubmit, control, errors, reset, onSubmit, watch } =
    useLoginHook();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" placeholder="0977xxxxxx" />
            )}
          />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              to="/reset"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
              )}
            />

            <Button
              type="button"
              disabled={!watch("password")}
              onClick={handleShowPassword}
              variant="ghost"
              size="icon"
              className="absolute disabled:pointer-events-none right-2 top-1/2 -translate-y-1/2 [data-hovered]:bg-transparent"
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeClosed className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        {actionData?.message && (
          <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-2 rounded">
            <span>{actionData.message}</span>
          </div>
        )}
        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2"
          >
            <FcGoogle className="h-4 w-4" />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
