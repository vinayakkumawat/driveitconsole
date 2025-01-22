'use client';

import React, { useState } from 'react';
import EmailStep from './EmailStep';
import VerificationStep from './VerificationStep';
import ResetPasswordStep from './ResetPasswordStep';

export const PasswordResetFlow = () => {
    const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email');
    const [userId, setUserId] = useState<string>('');
    const [verificationId, setVerificationId] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailSuccess = (userId: string, verificationId: string) => {
        setUserId(userId);
        setVerificationId(verificationId);
        setStep('verify');
    };

    const handleVerificationSuccess = () => {
        setStep('reset');
    };

    const handlePasswordResetSuccess = () => {
        alert('Password reset successful. Redirecting to login...');
        window.location.href = '/login';
    };

    return (
        <>
            {step === 'email' && (
                <EmailStep
                    onSuccess={handleEmailSuccess}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                />
            )}
            {step === 'verify' && (
                <VerificationStep
                    verificationId={verificationId}
                    onSuccess={handleVerificationSuccess}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                />
            )}
            {step === 'reset' && (
                <ResetPasswordStep
                    userId={userId}
                    onSuccess={handlePasswordResetSuccess}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                />
            )}
        </>
    );
};
