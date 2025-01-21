'use client';

import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/auth-context';

const verificationFormSchema = z.object({
    code: z.string().length(6, 'Verification code must be 6 digits')
});

interface VerificationFormProps {
    verificationId: string;
    onBack: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ verificationId, onBack }) => {
    const { verifyLoginCode } = useAuth();
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof verificationFormSchema>>({
        resolver: zodResolver(verificationFormSchema),
        defaultValues: {
            code: "",
        },
    });

    async function onSubmit(values: z.infer<typeof verificationFormSchema>) {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError('');
        
        try {
            const success = await verifyLoginCode(verificationId, values.code.trim());
            if (!success) {
                setError('Invalid verification code');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to verify code');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: string) => void
    ) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        onChange(value);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2 className='text-3xl font-bold' id="verification-title">אימות דו-שלבי</h2>
                <p 
                    className="text-muted-foreground" 
                    id="verification-description"
                >
                    קוד אימות נשלח למספר הטלפון שלך. אנא הזן את הקוד כדי להמשיך.
                </p>
                
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel 
                                htmlFor="verification-code-input" 
                                className='text-lg'
                            >
                                קוד אימות<span className="text-destructive mr-1">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    id="verification-code-input"
                                    className='bg-white text-center text-2xl tracking-widest' 
                                    maxLength={6}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="one-time-code"
                                    aria-describedby="verification-description"
                                    onChange={(e) => handleInputChange(e, onChange)}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <div 
                        role="alert" 
                        className="text-destructive text-sm"
                        aria-live="polite"
                    >
                        {error}
                    </div>
                )}

                <div className='flex gap-2'>
                    <Button 
                        type="submit" 
                        className='w-full text-black'
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? 'מאמת...' : 'אימות'}
                    </Button>
                    <Button 
                        type="button" 
                        variant="secondary" 
                        className='w-full text-black' 
                        onClick={onBack}
                        aria-label="חזרה לעמוד הקודם"
                    >
                        חזרה
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default VerificationForm;