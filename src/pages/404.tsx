import React from "react";
import { Link, useNavigate } from "react-router-dom"; // သို့မဟုတ် 'next/link'
import { Home, ArrowLeft, LucideFlaskRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/ui/layouts/Header";

function NotFound() {
  const next = useNavigate();
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md border-2 p-3 border-dashed shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-muted">
                <LucideFlaskRound className="w-12 h-12 text-muted-foreground animate-bounce" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight">
              404
            </CardTitle>
            <CardDescription className="text-lg font-medium">
              ရှာမတွေ့ပါ (Page Not Found)
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center text-muted-foreground">
            <p>
              သင်ရှာနေတဲ့ စာမျက်နှာဟာ ဖျက်လိုက်တာ (သို့မဟုတ်) နာမည်ပြောင်းသွားတာ
              ဖြစ်နိုင်ပါတယ်။ URL ကို ပြန်စစ်ကြည့်ပေးပါဦး။
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row justify-center mt-2">
            <Button
              variant="outline"
              onClick={() => next(-1)}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> နောက်သို့
            </Button>

            <Button asChild className="w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Home သို့သွားမယ်
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default NotFound;
