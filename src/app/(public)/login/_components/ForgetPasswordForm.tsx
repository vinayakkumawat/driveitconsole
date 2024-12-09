"use client"

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const forgotPasswordFormSchema = z.object({
    email: z.string().min(2).max(50),
})

const ForgetPasswordForm = () => {
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    })

    const [isSubmitted, setIsSubmitted] = useState(false)

    function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
        setIsSubmitted(true);
        console.log(values);
    }

    if (isSubmitted) {
        return (
            <div className='flex flex-col gap-6'>
                <div className='text-3xl font-bold'>
                    <h2>שלחנו קישור לאיפוס</h2>
                    <h2>הסיסמה למייל</h2>
                </div>
                <div className="text-lg">
                    <p>בדקות הקרובות תקבל קישור</p>
                    <p>לאיפוס הסיסמה למייל</p>
                </div>
                <div className='mt-20'>
                    <Button className='text-black w-1/2'>חזרה לעמוד הכניסה</Button>
                </div>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2 className="text-3xl font-bold">איפוס סיסמה:</h2>
                <div className="text-xl font-medium">
                    <h3>שכחת את הסיסמה?</h3>
                    <p>לא נורא, תמיד אפשר לשחזר - ובקלות!!</p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg'>מייל<span className="text-destructive mr-1">*</span></FormLabel>
                            <FormControl>
                                <Input className='bg-white' placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>כתובת המייל איתה נרשמת</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex gap-2'>
                    <Button type="submit" className='w-1/2 text-black'>שליחה</Button>
                </div>
            </form>
        </Form>
    )
}

export default ForgetPasswordForm