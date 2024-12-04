"use client";

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormDataInputSingleElement from '@/components/ui/formDataInputSingleElement';
import { Label } from '../ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import Image from 'next/image';

const newDriverFormSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phone: z.string().min(2).max(50),
    additionalPhone: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    emailAddress: z.string().email(),
    serialNumber: z.string().min(2).max(50),
    belongsToTheChannel: z.string().min(2).max(50),

    vehicleType: z.string().min(2).max(50),
    numberOfPlaces: z.number().min(1).max(50),
    category: z.string().min(2).max(50),
    vehicleCondition: z.string().min(2).max(50),

    fixedCharge: z.string().min(2).max(50),
    variableCharge: z.string().min(2).max(50),
});

type NewDriverFormValues = z.infer<typeof newDriverFormSchema>;

const NewDriver = () => {
    const form = useForm<NewDriverFormValues>({
        resolver: zodResolver(newDriverFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            additionalPhone: '',
            address: '',
            city: '',
            emailAddress: '',
            serialNumber: '',
            belongsToTheChannel: '',

            vehicleType: '',
            numberOfPlaces: 0,
            category: '',
            vehicleCondition: '',

            fixedCharge: '',
            variableCharge: '',
        },
    });

    function onSubmit(values: NewDriverFormValues) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll no-scrollbar'>

                    <div className='w-full flex flex-col gap-2'>
                        <Label className='font-bold'>
                            פרטי הנהג
                        </Label>
                        <div className="bg-white py-4 px-6 flex justify-between rounded-lg w-full">
                            <div className='flex items-center gap-2'>
                                <div className='relative w-12 h-12 bg-muted rounded-full'>
                                    <div className='absolute right-0 top-0 w-4 h-4 bg-primary rounded-full'></div>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-bold'>שם הנהג</span>
                                    <span className='font-medium'>טלפון  |  עיר</span>
                                </div>
                            </div>
                            <div className='flex gap-1'>
                                <div className='flex items-start mt-1'>
                                    <Image src={'/icons/star.svg'} alt={'star'} width={15} height={15} />
                                    <Image src={'/icons/star.svg'} alt={'star'} width={15} height={15} />
                                    <Image src={'/icons/star.svg'} alt={'star'} width={15} height={15} />
                                    <Image src={'/icons/star.svg'} alt={'star'} width={15} height={15} />
                                    <Image src={'/icons/star.svg'} alt={'star'} width={15} height={15} />
                                </div>
                                <span className='font-light'>(0)</span>
                            </div>
                            <div className='bg-muted p-2 rounded-lg'>
                                <Image src={'/icons/messages.svg'} alt={'edit'} width={30} height={30} />
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <Label className='font-bold'>
                            פרטים אישיים<span className="text-destructive mr-1 font-normal">*</span>
                        </Label>
                        <div className="bg-white py-4 px-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg border-b border-b-black w-full">
                            {/* Using Child Component */}
                            <FormDataInputSingleElement
                                form={form}
                                name="firstName"
                                label="שם פרטי"
                                inputType='text'
                                required
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="lastName"
                                label="שם משפחה"
                                inputType='text'
                                required
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="phone"
                                label="טלפון"
                                inputType='text'
                                required
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="additionalPhone"
                                label="טלפון נוסף"
                                inputType='text'
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="address"
                                label="כתובת"
                                inputType='text'
                                required
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="city"
                                label="עיר"
                                inputType='text'
                                required
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="emailAddress"
                                label="כתובת מייל"
                                inputType='text'
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="serialNumber"
                                label="מספר סידורי"
                                inputType='text'
                            />
                            <div className='col-span-2'>
                                <FormDataInputSingleElement
                                    form={form}
                                    name="belongsToTheChannel"
                                    label="שייך לערוץ"
                                    inputType="select"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <Label className='font-bold'>
                            פרטי רכב
                        </Label>
                        <div className="bg-white py-4 px-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg border-b border-b-black w-full">
                            {/* Using Child Component */}
                            <FormDataInputSingleElement
                                form={form}
                                name="vehicleType"
                                label="סוג רכב"
                                inputType='text'
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="numberOfPlaces"
                                label="מספר מקומות"
                                inputType='text'
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="category"
                                label="קטגוריה"
                                inputType='text'
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="vehicleCondition"
                                label="מצב הרכב"
                                inputType='text'
                            />
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <Label className='font-bold'>
                            תשלומים
                        </Label>
                        <div className="bg-white py-4 px-6 grid grid-cols-1 gap-y-4 rounded-lg w-full">
                            <div className='flex gap-2 items-center'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <Checkbox />
                                        <Label>ברירת מחדל</Label>
                                    </div>
                                    <div className='grid grid-cols-2 gap-x-6 gap-y-2 w-full'>
                                        <FormDataInputSingleElement
                                            form={form}
                                            name="fixedCharge"
                                            label="חיוב קבוע"
                                            inputType='text'
                                        />
                                        <FormDataInputSingleElement
                                            form={form}
                                            name="variableCharge"
                                            label="חיוב משתנה"
                                            inputType='text'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <Checkbox />
                                        <Label>מותאם אישית</Label>
                                    </div>
                                    <div className='grid grid-cols-2 gap-x-6 gap-y-2 w-full'>
                                        <FormDataInputSingleElement
                                            form={form}
                                            name="fixedCharge"
                                            label="חיוב קבוע"
                                            inputType='text'
                                        />
                                        <FormDataInputSingleElement
                                            form={form}
                                            name="variableCharge"
                                            label="חיוב משתנה באחוזים"
                                            inputType='text'
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='flex justify-center items-center gap-2 px-8'>
                    <Button type="submit" className='w-full text-black h-8'>שמור</Button>
                    <Button className='w-full text-black bg-secondary h-8'>ביטול</Button>
                </div>
            </form>
        </Form>
    );
};

export default NewDriver;
