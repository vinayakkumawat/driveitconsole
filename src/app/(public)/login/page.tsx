"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LoginForm from './_components/LoginForm'
import ForgetPasswordForm from './_components/ForgetPasswordForm'
import VerificationForm from './_components/VerificationForm'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

const LoginPage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [verificationId, setVerificationId] = useState<string>('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    useEffect(() => {
        if (!isLoading && user) {
            router.replace('/');
        }
    }, [user, isLoading, router]);

    const handleLoginSuccess = (newVerificationId: string) => {
        setVerificationId(newVerificationId);
    };

    const handleBack = () => {
        setVerificationId('');
    };

    return (
        <div>
            <div className="bg-[url('/images/login-bg.svg')] h-screen bg-no-repeat bg-cover bg-right-bottom flex justify-center items-center sm:justify-end sm:items-start">
                <div className='z-10 absolute left-0 sm:-top-10 bg-background blur-[64px] sm:blur-3xl h-[700px] w-[700px] rounded-full'></div>
                <div className='z-20 flex flex-col gap-20 sm:ml-44 sm:mt-20 w-96 p-4'>
                    <div className='flex justify-center items-center'>
                        <Image src='/images/logo.svg' alt='logo' width={200} height={200} />
                    </div>
                    {verificationId ? (
                        <VerificationForm 
                            verificationId={verificationId}
                            onBack={handleBack}
                        />
                    ) : isForgotPassword ? (
                        <ForgetPasswordForm />
                    ) : (
                        <LoginForm 
                            onForgotPasswordClick={() => setIsForgotPassword(true)}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage