"use client";

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from "@/components/ui/switch"
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const StationSelectionFormSchema = z.object({
    stationSelection: z.string().min(2).max(50),
    serviceType: z.string().min(2).max(50),
    dateRange: z.string().min(2).max(50),
    hoursRange: z.string().min(2).max(50),
    yearsOfSeniority: z.string().min(2).max(50),
    outboundTravel: z.string().min(2).max(50),
    inboundTravel: z.string().email(),
});

type StationSelectionFormValues = z.infer<typeof StationSelectionFormSchema>;

const StationSelection = () => {
    const form = useForm<StationSelectionFormValues>({
        resolver: zodResolver(StationSelectionFormSchema),
        defaultValues: {
            stationSelection: '',
            serviceType: '',
            dateRange: '',
            hoursRange: '',
            yearsOfSeniority: '',
            outboundTravel: '',
            inboundTravel: '',
        },
    });

    function onSubmit(values: StationSelectionFormValues) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form dir='rtl' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className='bg-white p-4 rounded-lg flex flex-col gap-8'>
                    <div className='grid grid-cols-5 gap-4'>
                        <FormField
                            control={form.control}
                            name="stationSelection"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>בחירת תחנה:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"serviceType"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>סוג שירות:</FormLabel>
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
                            name="hoursRange"
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
                            name="yearsOfSeniority"
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
                    <div dir='rtl' className='flex justify-between items-center'>
                        <div dir='ltr' className='flex gap-4'>
                            <div className='flex justify-center items-center gap-2'>
                                <Switch />
                                <span>נסיעות יוצאות</span>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <Switch />
                                <span>נסיעות נכנסות</span>
                            </div>
                        </div>
                        <Button type="submit" className='text-black'>סינון וחיפוש דוח</Button>
                    </div>
                </div>
            </form>
        </Form>

    );
};

export default StationSelection;
