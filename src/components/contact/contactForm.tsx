"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  contactSchema,
  ContactFormValues,
} from "@/lib/contact/contactSchema";


export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });


  async function onSubmit(values: ContactFormValues) {
    const response = await fetch("/api/contact", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(values),
    });


    if (!response.ok) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    toast.success("Message sent successfully!");
    form.reset();
  }


  return (
    <Card className="mx-auto mt-30 w-full max-w-xl">
      <CardHeader>
        <CardTitle className="md:text-2xl text-xl text-primary">
          Contact Me
        </CardTitle>

        <CardDescription className="md:text-md">
          Want to get in touch? Fill out the form below and I will respond as soon as possible.
          Send me a message and I will get back to you.
        </CardDescription>
      </CardHeader>


      <CardContent>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Name
            </label>

            <Input
              placeholder="John Doe"
              {...form.register("name")}
            />

            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.name.message
                }
              </p>
            )}
          </div>



          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.email.message
                }
              </p>
            )}
          </div>



          <div className="space-y-2">
            <label className="text-sm font-medium">
              Message
            </label>

            <Textarea
              placeholder="To contact me, please input your message..."
              rows={6}
              {...form.register("message")}
            />

            {form.formState.errors.message && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.message.message
                }
              </p>
            )}
          </div>


          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={
              form.formState.isSubmitting
            }
          >

            {
              form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )
            }

            {
              form.formState.isSubmitting
                ? "Sending..."
                : "Send Message"
            }

          </Button>

        </form>

      </CardContent>
    </Card>
  );
}
