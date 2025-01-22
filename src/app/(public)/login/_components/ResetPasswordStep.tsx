import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const passwordSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

interface ResetPasswordStepProps {
    userId: string;
    onSuccess: () => void;
    setErrorMessage: (message: string) => void;
    errorMessage: string;
}

const ResetPasswordStep: React.FC<ResetPasswordStepProps> = ({ userId, onSuccess, setErrorMessage, errorMessage }) => {
    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: '', confirmPassword: '' },
    });

    const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
        setErrorMessage('');
        try {
            const response = await fetch('/api/password-reset/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password: data.password }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Password reset failed');
            }

            onSuccess();
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

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
                                <Input type="password" {...field} className='bg-white' />
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
                                <Input type="password" {...field} className='bg-white' />
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
};

export default ResetPasswordStep;
