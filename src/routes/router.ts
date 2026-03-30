import NotFound from "@/pages/404";
import RouteLayout from "@/pages/RouteLayout";
import { homeLoader } from "@/router/loader";
import { createBrowserRouter } from "react-router";
import { loginAction } from "@/router/action";

export const router = createBrowserRouter([
  {
    path: "/login",
    action:loginAction,
    lazy: async () => {
      const { default: Login } = await import("@/pages/Auth/Login");
      return { Component: Login };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { default: Register } = await import("@/pages/Auth/Register");
      return { Component: Register };
    },
  },
  {
    path: "/",
    Component: RouteLayout,
    ErrorBoundary: NotFound,
    children: [
      {
        index: true,
       loader:homeLoader,
        lazy: async () => {
          const { default: Home} = await import("@/pages/Home");
          return { Component: Home   };
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
        path:"products",
        lazy: async () => {
          const { default: ProductLayout } = await import("@/pages/products/ProductLayout");
          return { Component: ProductLayout };
        },
        children:[
          {
            index:true,
            lazy: async () => {
              const { default: Product } = await import("@/pages/products/Product");
              return { Component: Product };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: ProductDetail } = await import("@/pages/products/ProductDetail");
              return { Component: ProductDetail };
            },
          },
        ]
      },
      {
        path: "blogs",
        // BlogLayout ကို အပေါ်ကနေ အုပ်ထားမယ်
        lazy: async () => {
          const { default: BlogLayout } = await import("@/pages/blogs/BlogLayout");
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
              const { default: BlogDetail } = await import("@/pages/blogs/BlogDetail");
              return { Component: BlogDetail };
            },
          },
        ],
      },
    ],
  },
]);
