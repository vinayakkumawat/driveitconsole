"use client";

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

const DriverSelectionFormSchema = z.object({
    driverSelection: z.string().min(2).max(50),
    driversPhone: z.string().min(2).max(50),
    serviceType: z.string().min(2).max(50),
    channelNumber: z.string().min(2).max(50),
    yearsOfExperience: z.string().min(2).max(50),

    dateRange: z.string().min(2).max(50),
    hourRange: z.string().min(2).max(50),
    status: z.string().min(2).max(50),
    outboundTravel: z.string().min(2).max(50),
    inboundTravel: z.string().min(2).max(50),
    driversWithDebts: z.string().min(2).max(50),
    driversWithALicense: z.string().min(2).max(50),
});

type DriverSelectionFormValues = z.infer<typeof DriverSelectionFormSchema>;

const DriverSelection = () => {
    const form = useForm<DriverSelectionFormValues>({
        resolver: zodResolver(DriverSelectionFormSchema),
        defaultValues: {
            driverSelection: '',
            driversPhone: '',
            serviceType: '',
            channelNumber: '',
            yearsOfExperience: '',

            dateRange: '',
            hourRange: '',
            status: '',
            outboundTravel: '',
            inboundTravel: '',
            driversWithDebts: '',
            driversWithALicense: '',
        },
    });

    function onSubmit(values: DriverSelectionFormValues) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form dir='rtl' onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                <div className='bg-white p-4 rounded-lg flex flex-col gap-8'>
                    <div className='grid grid-cols-2 gap-2'>
                        <FormField
                            control={form.control}
                            name="driverSelection"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>בחירת נהג:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"driversPhone"}
                            render={({ }) => (
                                <FormItem>
                                    <FormLabel>טלפון הנהג:</FormLabel>
                                    <FormControl>
                                        <Select dir='rtl'>
                                            <SelectTrigger className="w-full border-none">
                                                <SelectValue placeholder="בחר ערוץ" />
                                            </SelectTrigger>
                                            <SelectContent className=''>
                                                <SelectItem value="ערוץ 112548">ערוץ 112548</SelectItem>
                                                <SelectItem value="ערוץ 112544">ערוץ 112548</SelectItem>
                                                <SelectItem value="ערוץ 112542">ערוץ 112548</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>טווח תאריכים:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="channelNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>טווח שעות:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="yearsOfExperience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>שנות וותק:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg flex flex-col gap-8'>
                    <div className='grid grid-cols-3 gap-2'>
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>טווח תאריכים:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"hourRange"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>טווח תאריכים:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>סטטוס:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <span className='flex justify-center items-center gap-2'><Checkbox />נסיעות יוצאות</span>
                        <span className='flex justify-center items-center gap-2'><Checkbox />נסיעות נכנסות</span>
                        <span className='flex justify-center items-center gap-2'><Checkbox />נהגים עם חובות</span>
                        <span className='flex justify-center items-center gap-2'><Checkbox />נהגים עם זכות</span>
                    </div>
                    <div dir='rtl' className='flex justify-end items-center'>
                        <Button type="submit" className='text-black'>סינון וחיפוש דוח</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default DriverSelection