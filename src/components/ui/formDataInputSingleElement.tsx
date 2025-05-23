import React, { useState, useEffect } from "react";
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
import { fetchApi } from "@/lib/api";
import { getCurrentCompanyId } from "@/lib/auth";

interface Driver {
  id: number;
  company_id: number;
  full_name: string;
  phone: string;
}

interface Channel {
  channel_id: number;
  channel_number: string;
  channel_nickname: string;
  default_channel: boolean;
}

interface Customer {
  customerid: number;
  firstname: string;
  lastname: string | null;
  phone: string | null;
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  inputType: "text" | "number" | "email" | "select" | "date" | "time" | "city" | "street" | "driver" | "channel" | "customer" | "textarea";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  txtInput?: string;
  selectOptions?: { value: string; label: string }[];
}

const FormDataInputSingleElement = <T extends FieldValues>({
  form,
  name,
  label,
  inputType,
  placeholder,
  required,
  disabled,
  selectOptions,
}: Props<T>) => {
  const [date, setDate] = React.useState<Date>();
  const [cities, setCities] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showCities, setShowCities] = useState(false);
  const [showStreets, setShowStreets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const companyId = getCurrentCompanyId();
        if (!companyId) {
          console.error("No company ID found");
          return;
        }

        const data = await fetchApi("/drivers_view", {
          params: {
            select: "id,company_id,full_name,phone",
            company_id: `eq.${companyId}`,
            order: "full_name.asc"
          }
        });
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    if (inputType === "driver") {
      fetchDrivers();
    }
  }, [inputType]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await fetchApi("/customer", {
          params: {
            select: "customerid,firstname,lastname,phone"
          }
        });
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    if (inputType === "customer") {
      fetchCustomers();
    }
  }, [inputType]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const companyId = getCurrentCompanyId();
        if (!companyId) {
          console.error("No company ID found");
          return;
        }

        const data = await fetchApi("/channels", {
          params: {
            select: "channel_id,channel_number,channel_nickname,default_channel",
            company_id: `eq.${companyId}`,
            order: "default_channel.desc,channel_number.asc"
          }
        });
        setChannels(data);
        
        // Set default channel if one exists and no value is currently selected
        if (inputType === "channel" && (!form.getValues(name) || form.getValues(name) === "")) {
          const defaultChannel = data.find((channel: Channel) => channel.default_channel);
          if (defaultChannel) {
            form.setValue(name, defaultChannel.channel_id.toString());
          }
        }
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    if (inputType === "channel") {
      fetchChannels();
    }
  }, [inputType, form, name]);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchQuery.length >= 2) {
        try {
          const data = await fetchApi("/city_summary", {
            params: {
              grouping_value: `like.${searchQuery}%`
            }
          });
          setCities(data.map((item: { grouping_value: string }) => item.grouping_value.trim()));
          setShowCities(true);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]);
        setShowCities(false);
      }
    };

    const fetchStreets = async () => {
      if (searchQuery.length >= 2) {
        try {
          const data = await fetchApi("/street_summary", {
            params: {
              grouping_value: `like.${searchQuery}%`
            }
          });
          setStreets(data.map((item: { grouping_value: string }) => item.grouping_value.trim()));
          setShowStreets(true);
        } catch (error) {
          console.error("Error fetching streets:", error);
        }
      } else {
        setStreets([]);
        setShowStreets(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (inputType === "city") {
        fetchCities();
      } else if (inputType === "street") {
        fetchStreets();
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, inputType]);

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
                <Select dir="rtl" onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="">
                    {selectOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : inputType === "customer" ? (
                <Select dir="rtl" onValueChange={field.onChange} value={field.value?.toString() || ""}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue>
                      {field.value ? 
                        customers.find(c => c.customerid.toString() === field.value)?.firstname || "בחר לקוח" 
                        : "בחר לקוח"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="">
                    {customers.map((customer) => (
                      <SelectItem 
                        key={customer.customerid} 
                        value={customer.customerid.toString()}
                      >
                        {`${customer.firstname} ${customer.lastname ? customer.lastname : ''} ${customer.phone ? ` | ${customer.phone}` : ''}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : inputType === "driver" ? (
                <Select dir="rtl" onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString() || "0"}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue>
                      {field.value === 0 || !field.value ? "משרד-מוקדן" : drivers.find(d => d.id === field.value)?.full_name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="">
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id.toString()}>
                        {`${driver.full_name} | ${driver.phone}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : inputType === "date" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-right font-normal h-8",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="ml-2" />
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
              ) : inputType === "city" ? (
                <div className="relative">
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className="bg-background w-full h-8"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setSearchQuery(e.target.value);
                    }}
                    onFocus={() => setShowCities(true)}
                    onBlur={() => setTimeout(() => setShowCities(false), 200)}
                  />
                  {showCities && cities.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {cities.map((city, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            field.onChange(city);
                            setSearchQuery(city);
                            setShowCities(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : inputType === "street" ? (
                <div className="relative">
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className="bg-background w-full h-8"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setSearchQuery(e.target.value);
                    }}
                    onFocus={() => setShowStreets(true)}
                    onBlur={() => setTimeout(() => setShowStreets(false), 200)}
                  />
                  {showStreets && streets.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {streets.map((street, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            field.onChange(street);
                            setSearchQuery(street);
                            setShowStreets(false);
                          }}
                        >
                          {street}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : inputType === "channel" ? (
                <Select dir="rtl" onValueChange={field.onChange} value={field.value?.toString() || "0"}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue>
                      {field.value === "0" || 
                        channels.find(c => c.channel_id.toString() === field.value)?.channel_number + " | " + 
                        channels.find(c => c.channel_id.toString() === field.value)?.channel_nickname}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="">
                    {channels.map((channel) => (
                      <SelectItem 
                        key={channel.channel_id} 
                        value={channel.channel_id.toString()}
                      >
                        {`${channel.channel_number} | ${channel.channel_nickname}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : inputType === "textarea" ? (
                <textarea
                  placeholder={placeholder}
                  {...field}
                  className="bg-background w-full h-24 rounded-md border px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  disabled={disabled}
                />
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
