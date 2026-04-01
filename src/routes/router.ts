import { SignupForm } from '@/components/Auth/components/signup-form';
import NotFound from "@/pages/404";
import RouteLayout from "@/pages/RouteLayout";
import { homeLoader, loginLoader } from "@/router/loader";
import { createBrowserRouter, redirect } from "react-router";
import { loginAction, logoutAction } from "@/router/action";
import AuthLayout from "@/pages/Auth/AuthLayout";

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
        lazy: async () => {
          const { default: Signup } = await import("@/pages/Auth/SignUp");
          return { Component: Signup };
        },
      },
      {
        path: "otp",
        lazy: async () => {
          const { default: OtpInput} = await import("@/pages/Auth/OtpInput");
          return { Component: OtpInput };
        },
      },{
        path: "confirm-password",
        lazy: async () => {
          const { default: ConfirmPassword } = await import("@/pages/Auth/ConfirmPassword");
          return { Component: ConfirmPassword };
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
            lazy: async () => {
              const { default: Product } =
                await import("@/pages/products/Product");
              return { Component: Product };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: ProductDetail } =
                await import("@/pages/products/ProductDetail");
              return { Component: ProductDetail };
            },
          },
        ],
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
            lazy: async () => {
              const { default: Blog } = await import("@/pages/blogs/Blog");
              return { Component: Blog };
            },
          },
          {
            path: ":id", // /blogs/123 လို့ ခေါ်ရင် ဒီကောင် ပေါ်မယ်
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
