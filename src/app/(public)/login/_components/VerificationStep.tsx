import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const verificationSchema = z.object({
    code: z.string().length(6),
});

interface VerificationStepProps {
    verificationId: string;
    onSuccess: () => void;
    setErrorMessage: (message: string) => void;
    errorMessage: string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ verificationId, onSuccess, setErrorMessage, errorMessage }) => {
    const verificationForm = useForm<z.infer<typeof verificationSchema>>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { code: '' },
    });

    const handleVerificationSubmit = async (data: z.infer<typeof verificationSchema>) => {
        setErrorMessage('');
        try {
            const response = await fetch('/api/password-reset/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verificationId, code: data.code }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Verification failed');
            }

            const result = await response.json();
            if (result.success) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return (
        <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-8">
                <h2 className="text-3xl font-bold">שלחנו קוד למספר הרשום שלך.</h2>
                <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>קוד אימות</FormLabel>
                            <FormControl>
                                <Input {...field} maxLength={6} className='bg-white' />
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
};

export default VerificationStep;
