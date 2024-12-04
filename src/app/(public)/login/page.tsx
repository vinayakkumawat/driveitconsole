"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LoginForm from './_components/LoginForm'
import ForgetPasswordForm from './_components/ForgetPasswordForm'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

const LoginPage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.replace('/');
        }
    }, [user, isLoading, router]);

    const [isForgotPassword, setIsForgotPassword] = useState(false)

    return (
        <div>
            <div className="bg-[url('/images/login-bg.svg')] h-screen bg-no-repeat bg-cover bg-right-bottom flex justify-end items-start">
                <div className='z-10 absolute left-0 -top-10 bg-background blur-3xl h-[700px] w-[700px] rounded-full'></div>
                <div className='z-20 flex flex-col gap-20 ml-44 mt-20 w-96'>
                    <div className='flex justify-center items-center'>
                        <Image src='/images/logo.svg' alt='logo' width={200} height={200} />
                    </div>
                    {isForgotPassword ? (
                        <ForgetPasswordForm />
                    ) : (
                        <LoginForm onForgotPasswordClick={() => setIsForgotPassword(true)} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage