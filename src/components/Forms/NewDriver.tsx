"use client";

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import FormDataInputSingleElement from '@/components/ui/formDataInputSingleElement';
import { Label } from '../ui/label';
import Image from 'next/image';
import { generateSerialNumber, formatPhoneNumber } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';
import { Input } from '../ui/input';

const newDriverFormSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phone: z.string().min(2).max(50),
    additionalPhone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    emailAddress: z.string().email().optional(),
    serialNumber: z.string().min(2).max(50),
    belongsToTheChannel: z.string().optional(),

    vehicleType: z.string().optional(),
    numberOfPlaces: z.number().optional(),
    category: z.string().optional(),
    vehicleCondition: z.string().optional(),

    fixedCharge: z.number().optional(),
    variableCharge: z.number().optional(),
});

type NewDriverFormValues = z.infer<typeof newDriverFormSchema>;

interface CompanyDetails {
    id: number;
    defaultFixedCharge: string;
    defaultVariableCharge: string;
}

interface UserDetails {
    id: number;
}

interface NewDriverProps {
    onCancel: () => void;
}

const NewDriver = ({ onCancel }: NewDriverProps) => {
    const currentUser = getCurrentUser();

    const [companyDetails] = useState<CompanyDetails>({
        id: 1,
        defaultFixedCharge: "100",
        defaultVariableCharge: "1.5"
    });
    const [userDetails] = useState<UserDetails>({
        id: currentUser.id
    });
    const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
    const handleCheckboxChange = (option: string) => {
        setSelectedCheckbox(prev => (prev === option ? null : option));
    };

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
            serialNumber: generateSerialNumber(companyDetails.id, userDetails.id),
            belongsToTheChannel: '',

            vehicleType: '',
            numberOfPlaces: 0,
            category: '',
            vehicleCondition: '',

            fixedCharge: 0,
            variableCharge: 0,
        },
    });

    async function onSubmit(values: NewDriverFormValues) {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                console.error("❌ טוקן אימות לא נמצא");
                return;
            }

            const formattedData = {
                company_id: companyDetails.id,
                first_name: values.firstName,
                last_name: values.lastName || '',
                address: values.address || '',
                city: values.city || '',
                serial_number: values.serialNumber,
                channel: values.belongsToTheChannel || '',
                vehicle_type: values.vehicleType || '',
                number_of_seats: values.numberOfPlaces || 0,
                category: values.category || '',
                vehicle_status: values.vehicleCondition || '',
                email: values.emailAddress || '',
                phone: formatPhoneNumber(values.phone),
                additional_phone: values.additionalPhone ? formatPhoneNumber(values.additionalPhone) : '',
                fixed_charge: selectedCheckbox === 'default'
                    ? parseFloat(companyDetails.defaultFixedCharge)
                    : parseFloat(values.fixedCharge?.toString() || '0'),
                variable_charge: selectedCheckbox === 'default'
                    ? parseFloat(companyDetails.defaultVariableCharge)
                    : parseFloat(values.variableCharge?.toString() || '0'),
            };

            const response = await fetch(`${API_BASE_URL}/rpc/create_driver_with_charge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formattedData),
            });

            let responseBody;
            try {
                responseBody = await response.json();
            } catch (e) {
                responseBody = await response.text();
            }

            console.log("📥 סטטוס התגובה:", response.status);
            console.log("📥 תוכן התגובה מהשרת:", responseBody);

            if (!response.ok) {
                console.error("❌ שגיאה ביצירת הנהג:", responseBody);
                return;
            }

            console.log("✅ הנהג נוצר בהצלחה");
            onCancel();

        } catch (error) {
            console.error('🛑 שגיאה כללית בשליחת הטופס:', error);
        }
    }

    // שאר הקוד לא השתנה (טופס ו־UI)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <div className='flex flex-col gap-4 max-h-[70vh] overflow-y-scroll'>

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
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="city"
                                label="עיר"
                                inputType='text'
                            />
                            <FormDataInputSingleElement
                                form={form}
                                name="emailAddress"
                                label="כתובת מייל"
                                inputType='text'
                            />
                            <FormField
                                control={form.control}
                                name={"serialNumber"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>מספר סידורי</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" value={field.value} readOnly className="bg-background w-full h-8" />
                                        </FormControl>
                                    </FormItem>
                                )}
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
                            {/* Default Option */}
                            <div className='flex gap-2 items-center'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            checked={selectedCheckbox === 'default'}
                                            onChange={() => handleCheckboxChange('default')}
                                        />
                                        <Label>ברירת מחדל</Label>
                                    </div>
                                    {selectedCheckbox === 'default' && (
                                        <div className='grid grid-cols-2 gap-x-6 gap-y-2 w-full'>
                                            <FormField
                                                control={form.control}
                                                name={"fixedCharge"}
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel>חיוב קבוע</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="" value={companyDetails.defaultFixedCharge} readOnly className="bg-background w-full h-8" />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={"variableCharge"}
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel>חיוב משתנה</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="" value={companyDetails.defaultVariableCharge} readOnly className="bg-background w-full h-8" />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Custom Option */}
                            <div className='flex gap-2 items-center'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            checked={selectedCheckbox === 'custom'}
                                            onChange={() => handleCheckboxChange('custom')}
                                        />
                                        <Label>מותאם אישית</Label>
                                    </div>
                                    {selectedCheckbox === 'custom' && (
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
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex justify-center items-center gap-2 px-8'>
                    <Button type="submit" className='w-full text-black h-8'>שמור</Button>
                    <Button onClick={onCancel} className='w-full text-black bg-secondary h-8'>ביטול</Button>
                </div>
            </form>
        </Form>
    );
};

export default NewDriver;
