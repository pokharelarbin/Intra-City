"use client";
import { UseFormReturn, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  form: UseFormReturn<any>;
  className?: string;
  required?: boolean;
}

export function SelectInput({
  name,
  label,
  placeholder,
  type = "text",
  form,
  className = "",
  required = false,
}: SelectInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className={className}>
            <FormLabel className="!text-black">
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>

            <FormControl>
              <Controller
                name={name}
                control={form.control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[100%] mt-2">
                      <SelectValue placeholder="Select a bloodGroup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
}
