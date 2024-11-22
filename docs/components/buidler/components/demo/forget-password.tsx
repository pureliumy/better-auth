"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useComponents, useUrl } from "@/lib/store/component";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgetPaswordDemo() {
  const { updateUrl } = useUrl();
  const { enabledComp, updateEnabledComponent } = useComponents();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="rounded-none w-[350px]">
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                If you don't see the email, check your spam folder.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                updateUrl({ url: "http://localhost:3000/reset-password" });
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to reset password
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      {/* Radial gradient for the container to give a faded look */}
      <Card className="w-[350px] rounded-none">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              className="w-full mt-4"
              onClick={
                () => setIsSubmitted(true)
                // updateUrl({ url: "http://localhost:3000/reset-password" })
              }
              type="submit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              // updateEnabledComponent({
              //   toogledComp: {
              //     additionals: {
              //       ...enabledComp["additionals"],
              //       forgetPassword: false,
              //     },
              //   },
              // });
              updateUrl({ url: "http://localhost:3000" });
            }}
            variant="link"
            className="px-0"
          >
            Back to sign in
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}