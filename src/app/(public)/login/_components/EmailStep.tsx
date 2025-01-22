import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emailSchema = z.object({
    email: z.string().email(),
});

interface EmailStepProps {
    onSuccess: (userId: string, verificationId: string) => void;
    setErrorMessage: (message: string) => void;
    errorMessage: string;
}

const EmailStep: React.FC<EmailStepProps> = ({ onSuccess, setErrorMessage, errorMessage }) => {
    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '' },
    });

    const handleEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
        setErrorMessage('');
        try {
            const response = await fetch('/api/password-reset/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to initiate password reset');
            }

            const result = await response.json();
            onSuccess(result.userId, result.verificationId);
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

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
                            <FormLabel htmlFor="email-input" className='text-lg'>מייל<span className="text-destructive mr-1">*</span></FormLabel>
                            <FormControl>
                                <Input className='bg-white' {...field} />
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
};

export default EmailStep;
