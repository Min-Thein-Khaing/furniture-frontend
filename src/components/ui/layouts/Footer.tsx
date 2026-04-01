import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import {z} from "zod"
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../input';
import { Icons } from '@/ui/icon';

// သင်ပေးထားတဲ့ data structure
const footerData = {
 
  footerNav: [
    {
      title: "Furniture Types",
      items: [
        { title: "Seating", href: "/types/seating", external: true },
        { title: "Lying", href: "/types/lying", external: true },
        { title: "Entertainment", href: "/types/entertainment", external: true },
        { title: "Tables", href: "/types/tables", external: true },
        { title: "Storage", href: "/types/storage", external: true },
      ],
    },
    {
      title: "Help",
      items: [
        { title: "About", href: "/about", external: false },
        { title: "Contact", href: "/contact", external: false },
        { title: "Terms", href: "/terms", external: false },
        { title: "Privacy", href: "/privacy", external: false },
      ],
    },
    {
      title: "Social",
      items: [
        { title: "X", href: "#", external: true }, // links variable မရှိလို့ # ခေတ္တအစားထိုးထားပါတယ်
        { title: "GitHub", href: "#", external: true },
        { title: "Discord", href: "#", external: true },
      ],
    },
    {
      title: "Partner",
      items: [
        { title: "Shoppy", href: "https://shoppy.com", external: true },
        { title: "Poppy", href: "https://poppy.com", external: true },
        { title: "Talkie", href: "https://talkie.com", external: true },
        { title: "coffee", href: "https://coffee.com", external: true },
      ],
    },
  ],
};

function Footer() {
  const formInputProps = z.object({
  email: z.string()
    .min(1, { message: "Email ရိုက်ထည့်ရန် လိုအပ်ပါသည်" }) 
    .email({ message: "Email ပုံစံ မှားယွင်းနေပါသည်" }),   

    
});
type formInputType = z.infer<typeof formInputProps>
    const { 
    control, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<formInputType>({
    resolver: zodResolver(formInputProps), 
    defaultValues: {
      email: "" // default value ကို ဒီလို သီးသန့်ရေးရပါတယ်
    },
  });
  const onSubmit = (data: formInputType) => {
    console.log(data);
    reset();
  }
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className='col-span-1'>
            <Link to="/" className="flex gap-1 items-center">
                    <Icons.logo className="size-6" />
                    <p className="font-medium">Furniture</p>
                  </Link>
          </div>
          {footerData.footerNav.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold tracking-wider uppercase">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="lg:text-sm text-sm font-semibold lg:tracking-wider lg:text-nowrap lg:uppercase ">
              Subscribe to our newsletter
            </h4>
           
            <div className="flex flex-col gap-2 mt-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="furniture@gmail.com"
                    {...field}
                  />
                )}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold dark:text-black  text-white rounded-md bg-primary hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Furniture Project. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
             Made with ✨ in Myanmar
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;