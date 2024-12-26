import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emailSchema = z.object({
    email: z.string().email()
});

const verificationSchema = z.object({
    code: z.string().length(6)
});

const passwordSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export const PasswordResetFlow = () => {
    const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email');
    const [userId, setUserId] = useState<string>('');
    const [verificationId, setVerificationId] = useState<string>('');
    const router = useRouter();

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema)
    });

    const verificationForm = useForm<z.infer<typeof verificationSchema>>({
        resolver: zodResolver(verificationSchema)
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema)
    });

    const handleEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
        try {
            const response = await fetch('/api/password-reset/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email })
            });

            const result = await response.json();
            if (result.success) {
                setUserId(result.userId);
                setVerificationId(result.verificationId);
                setStep('verify');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerificationSubmit = async (data: z.infer<typeof verificationSchema>) => {
        try {
            const response = await fetch('/api/password-reset/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verificationId, code: data.code })
            });

            const result = await response.json();
            if (result.success) {
                setStep('reset');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
        try {
            const response = await fetch('/api/password-reset/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password: data.password })
            });

            const result = await response.json();
            if (result.success) {
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (step === 'email') {
        return (
            <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-8">
                    <h2 className="text-3xl font-bold">איפוס סיסמה:</h2>
                    <div className="text-xl font-medium">
                        <h3>שכחת את הסיסמה?</h3>
                        <p>לא נורא, תמיד אפשר לשחזר - ובקלות!!</p>
                    </div>
                    <FormField
                        control={emailForm.control}
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
                    <Button type="submit" className='w-1/2 text-black'>שליחה</Button>
                </form>
            </Form>
        );
    }

    if (step === 'verify') {
        return (
            <Form {...verificationForm}>
                <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-8">
                    <h2 className="text-3xl font-bold">שלחנו קוד למספר הרשום שלך.</h2>
                    <div className="text-xl font-medium">
                        <h3>נא להזין את הקוד למטה</h3>
                    </div>
                    <FormField
                        control={verificationForm.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>קוד אימות</FormLabel>
                                <FormControl>
                                    <Input {...field} maxLength={6} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">אמת את הקוד</Button>
                </form>
            </Form>
        );
    }

    return (
        <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-8">
                <h2 className="text-3xl font-bold">כעת הזן סיסמה חדשה עבור חשבונך</h2>
                <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>סיסמה חדשה</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>אשר את הסיסמה</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">אפס סיסמה</Button>
            </form>
        </Form>
    );
};