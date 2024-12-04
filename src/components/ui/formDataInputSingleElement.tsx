import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from './form';
import { Input } from './input';
import Image from 'next/image';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    inputType: 'text' | 'number' | 'email' | 'select';
    required?: boolean;
}

const FormDataInputSingleElement = <T extends FieldValues>({
    form,
    name,
    label,
    inputType,
    required,
}: Props<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive mr-1">*</span>}
                    </FormLabel>
                    <FormControl>
                        <div className="relative">
                            {inputType === 'select' ? (
                                <Select dir='rtl'>
                                    <SelectTrigger className="w-full h-8">
                                        <SelectValue placeholder="בחר ערוץ" />
                                    </SelectTrigger>
                                    <SelectContent className=''>
                                        <SelectItem value="ערוץ 112548">ערוץ 112548</SelectItem>
                                        <SelectItem value="ערוץ 112544">ערוץ 112548</SelectItem>
                                        <SelectItem value="ערוץ 112542">ערוץ 112548</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <><Input placeholder="" {...field} className="bg-background w-full h-8" /><button
                                    type="button"
                                    className="absolute inset-y-0 left-2 flex items-center"
                                >
                                    <Image
                                        src={'/icons/edit-icon.svg'}
                                        alt={'Edit'}
                                        width={20}
                                        height={20} />
                                </button></>
                            )}

                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default FormDataInputSingleElement;
