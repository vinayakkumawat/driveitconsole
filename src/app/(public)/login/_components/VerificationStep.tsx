import React, { useState, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [userPhone, setUserPhone] = useState<string>('');

    const verificationForm = useForm<z.infer<typeof verificationSchema>>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { code: '' },
    });

    useEffect(() => {
        // Decode verificationId to get user phone
        try {
            const decodedData = JSON.parse(atob(verificationId));
            if (decodedData.phone) {
                setUserPhone(decodedData.phone);
            }
        } catch (error) {
            console.error('Error decoding verificationId:', error);
        }
    }, [verificationId]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(timer);
    }, [resendDisabled, countdown]);

    const handleVerificationSubmit = async (data: z.infer<typeof verificationSchema>) => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResendDisabled(true);
        setCountdown(60);
        setErrorMessage('');
        
        try {
            const response = await fetch('/api/password-reset/resend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verificationId }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to resend code');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'Failed to resend code');
        }
    };

    return (
        <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-8">
                <h2 className="text-3xl font-bold">שלחנו קוד למספר הרשום שלך.</h2>
                {userPhone && (
                    <p className="text-lg text-muted-foreground">
                        הקוד נשלח למספר: <span className="font-semibold">{userPhone.slice(-2)}***-***</span>
                    </p>
                )}
                <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>קוד אימות</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    maxLength={6} 
                                    className='bg-white text-center text-2xl tracking-widest' 
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="one-time-code"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-4">
                    <Button 
                        type="submit" 
                        className='w-1/2 text-black'
                        disabled={isLoading}
                    >
                        {isLoading ? 'מאמת...' : 'אמת את הקוד'}
                    </Button>
                    <Button 
                        type="button" 
                        variant="outline" 
                        className='w-1/2 text-black'
                        onClick={handleResendCode}
                        disabled={resendDisabled}
                    >
                        {resendDisabled 
                            ? `שלח שוב (${countdown}s)` 
                            : 'שלח קוד חדש'}
                    </Button>
                </div>
            </form>
            {errorMessage && <div className="text-destructive">{errorMessage}</div>}
        </Form>
    );
};

export default VerificationStep;
