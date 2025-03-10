import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import Image from "next/image";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  inputType: "text" | "number" | "email" | "select" | "date" | "time";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  txtInput?: string;
}

const FormDataInputSingleElement = <T extends FieldValues>({
  form,
  name,
  label,
  inputType,
  placeholder,
  required,
  disabled,
}: Props<T>) => {
    const [date, setDate] = React.useState<Date>();

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
              {inputType === "select" ? (
                <Select dir="rtl">
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="בחר ערוץ" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="ערוץ 112548">ערוץ 112548</SelectItem>
                    <SelectItem value="ערוץ 112544">ערוץ 112548</SelectItem>
                    <SelectItem value="ערוץ 112542">ערוץ 112548</SelectItem>
                  </SelectContent>
                </Select>
              ) : inputType === "date" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-8",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span></span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className="bg-background w-full h-8"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-2 flex items-center"
                    disabled={disabled}
                  >
                    <Image
                      src={"/icons/edit-icon.svg"}
                      alt={"Edit"}
                      width={20}
                      height={20}
                    />
                  </button>
                </>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormDataInputSingleElement;
