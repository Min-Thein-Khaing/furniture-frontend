import { SignupForm } from '@/components/Auth/components/signup-form';
import NotFound from "@/pages/404";
import RouteLayout from "@/pages/RouteLayout";
import { confirmLoader, homeLoader, loginLoader, onePostLoader, otpLoader, postInfiniteLoader, productInfiniteLoader, productOneDetailLoader, resetConfirmLoader, resetOtpLoader } from "@/router/loader";
import { createBrowserRouter } from "react-router";
import { redirect } from "react-router-dom"
import { changePasswordAction, confirmAction, favoriteAction, loginAction, logoutAction, otpAction, productQuantityUpdateAction, registerAction, resetOtpAction, resetPasswordConfirmAction, resetRequestAction } from "@/router/action";
import AuthLayout from "@/pages/Auth/AuthLayout";
import { postInfiniteQuery } from '@/api/query';

export const router = createBrowserRouter([
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    lazy: async () => {
      const { default: Login } = await import("@/pages/Auth/Login");
      return { Component: Login };
    },
  },
  {
    path: "/register",
    Component: AuthLayout,
    children: [
      {
        index: true,
        loader: loginLoader,
        action: registerAction,
        lazy: async () => {
          const { default: Signup } = await import("@/pages/Auth/SignUp");
          return { Component: Signup };
        },
      },
      {
        path: "otp",
        loader: otpLoader,
        action: otpAction,
        lazy: async () => {
          const { default: OtpInput } = await import("@/pages/Auth/OtpInput");
          return { Component: OtpInput };
        },
      }, {
        path: "confirm-password",
        loader: confirmLoader,
        action: confirmAction,
        lazy: async () => {
          const { default: ConfirmPassword } = await import("@/pages/Auth/ConfirmPassword");
          return { Component: ConfirmPassword };
        },
      }
    ],
  },
  {
    path: "/reset",
    Component: AuthLayout,
    children: [
      {
        index: true,
        action: resetRequestAction,
        lazy: async () => {
          const { default: ResetPassword } = await import("@/pages/Auth/ResetPassword");
          return { Component: ResetPassword };
        },
      },
      {
        path: "verify-otp",
        loader: resetOtpLoader,
        action: resetOtpAction,
        lazy: async () => {
          const { default: ResetOtp } = await import("@/pages/Auth/ResetOtp");
          return { Component: ResetOtp };
        },
      },
      {
        path: "new-password-confirm",
        loader: resetConfirmLoader,
        action: resetPasswordConfirmAction,
        lazy: async () => {
          const { default: NewPassword } = await import("@/pages/Auth/NewPassword");
          return { Component: NewPassword };
        },
      }
    ],
  },
  {
    path: "/",
    Component: RouteLayout,
    ErrorBoundary: NotFound,
    children: [
      {
        index: true,
        loader: homeLoader,

        lazy: async () => {
          const { default: Home } = await import("@/pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const { default: Contact } = await import("@/pages/Contact");
          return { Component: Contact };
        },
      },
      {
        path: "products",
        lazy: async () => {
          const { default: ProductLayout } =
            await import("@/pages/products/ProductLayout");
          return { Component: ProductLayout };
        },
        children: [
          {
            index: true,
            loader: productInfiniteLoader,
            lazy: async () => {
              const { default: Product } =
                await import("@/pages/products/Product");
              return { Component: Product };
            },
          },
          {
            path: ":id",
            loader: productOneDetailLoader,
            // action:favoriteAction,
            lazy: async () => {
              const { default: ProductDetail } =
                await import("@/pages/products/ProductDetail");
              return { Component: ProductDetail };
            },
          },
        ],
      },
      {
        path: "change-password",
        action: changePasswordAction,
        lazy: async () => {
          const { default: ChangePassword } = await import("@/pages/Auth/ChangePassword");
          return { Component: ChangePassword };
        },
      },
      {
        path: "blogs",

        // BlogLayout ကို အပေါ်ကနေ အုပ်ထားမယ်
        lazy: async () => {
          const { default: BlogLayout } =
            await import("@/pages/blogs/BlogLayout");
          return { Component: BlogLayout };
        },
        children: [
          {
            index: true, // /blogs လို့ ခေါ်ရင် ဒီကောင် ပေါ်မယ်
            loader: postInfiniteLoader,
            lazy: async () => {
              const { default: Blog } = await import("@/pages/blogs/Blog");
              return { Component: Blog };
            },
          },
          {
            path: ":id", // /blogs/123 လို့ ခေါ်ရင် ဒီကောင် ပေါ်မယ်
            loader: onePostLoader,
            lazy: async () => {
              const { default: BlogDetail } =
                await import("@/pages/blogs/BlogDetail");
              return { Component: BlogDetail };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
]);
