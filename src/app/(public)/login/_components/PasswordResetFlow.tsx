'use client'

import React, { useState, useEffect } from 'react';
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
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '' },
    });

    const verificationForm = useForm<z.infer<typeof verificationSchema>>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { code: '' }
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (step === 'verify') {
            verificationForm.reset({ code: '' });
        }
    }, [step]);

    const handleEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
        setErrorMessage('');
        try {
            const response = await fetch('/api/password-reset/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to initiate password reset');
            }

            const result = await response.json();
            setUserId(result.userId);
            setVerificationId(result.verificationId);
            setStep('verify');
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleVerificationSubmit = async (data: z.infer<typeof verificationSchema>) => {
        setErrorMessage('');
        try {
            const response = await fetch('/api/password-reset/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verificationId, code: data.code })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Verification failed');
            }

            const result = await response.json();
            if (result.success) {
                setStep('reset');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
        setErrorMessage('');
        try {
            const response = await fetch('/api/password-reset/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password: data.password })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Password reset failed');
            }

            alert('Password reset successful. Redirecting to login...');
            router.push('/login');
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const renderEmailStep = () => (
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
                            <FormLabel htmlFor="email-input" className='text-lg'>
                                מייל<span className="text-destructive mr-1">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    id="email-input"
                                    className='bg-white' 
                                    placeholder="" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormDescription>כתובת המייל איתה נרשמת</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-1/2 text-black'>שליחה</Button>
            </form>
            {errorMessage && <div className="text-destructive">{errorMessage}</div>}
        </Form>
    );

    const renderVerificationStep = () => (
        <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-8">
                <h2 className="text-3xl font-bold">שלחנו קוד למספר הרשום שלך.</h2>
                <div className="text-xl font-medium">
                    <h3>נא להזין את הקוד למטה</h3>
                </div>
                <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel htmlFor="verification-code-input">קוד אימות</FormLabel>
                            <FormControl>
                                <Input
                                    id="verification-code-input"
                                    type="text"
                                    className="bg-white"
                                    maxLength={6}
                                    value={value}
                                    onChange={e => {
                                        const newValue = e.target.value.replace(/[^0-9]/g, '');
                                        onChange(newValue);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-1/2 text-black'>אמת את הקוד</Button>
            </form>
            {errorMessage && <div className="text-destructive">{errorMessage}</div>}
        </Form>
    );

    const renderResetPasswordStep = () => (
        <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-8">
                <h2 className="text-3xl font-bold">כעת הזן סיסמה חדשה עבור חשבונך</h2>
                <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="new-password-input">סיסמה חדשה</FormLabel>
                            <FormControl>
                                <Input 
                                    id="new-password-input"
                                    type="password" 
                                    {...field} 
                                />
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
                            <FormLabel htmlFor="confirm-password-input">אשר את הסיסמה</FormLabel>
                            <FormControl>
                                <Input 
                                    id="confirm-password-input"
                                    type="password" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-1/2 text-black'>אפס סיסמה</Button>
            </form>
            {errorMessage && <div className="text-destructive">{errorMessage}</div>}
        </Form>
    );

    return step === 'email'
        ? renderEmailStep()
        : step === 'verify'
        ? renderVerificationStep()
        : renderResetPasswordStep();
};