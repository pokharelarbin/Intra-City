import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

interface CustomRadioGroupProps {
  name: string;
  label: string;
  options: string[];
  form: UseFormReturn<any>;
  className?: string;
  required?: boolean;
}

export function CustomRadioGroup({
  name,
  label,
  options,
  form,
  className = "",
  required = false,
}: CustomRadioGroupProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`mb-5 ${className}`}>
          <FormLabel className="text-lg font-semibold !text-black flex items-center">
            {label} {required && <span className="text-red-500">*</span>}
            <hr className="flex-grow ml-2 mt-1 border-t border-gray-400" />
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              {options.map((option) => (
                <FormItem
                  key={option}
                  className="flex items-center space-x-2"
                >
                  <FormControl>
                    <RadioGroupItem value={option} />
                  </FormControl>
                  <FormLabel className="font-normal !text-black">
                    {option}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}