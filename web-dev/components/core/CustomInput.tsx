import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Modal } from './Modal';

interface CustomInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  form: UseFormReturn<any>;
  className?: string;
  required?: boolean;
}

export function CustomInput({
  name,
  label,
  placeholder,
  type = "text",
  form,
  className = "",
  required = false,
}: CustomInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="!text-black">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            {type === "file" && field.value ? (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(field.value)}
                  alt="Uploaded file preview"
                  className="w-full h-auto cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 px-2 bg-slate-400 text-white rounded-full hover:text-red-500"
                  onClick={() => field.onChange(null)}
                >
                  x
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  imageSrc={URL.createObjectURL(field.value)}
                />
              </div>
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                accept="image/*"
                value={type === "file" ? undefined : (field.value as string)}
                onChange={(e) => {
                  if (type === "file") {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  } else {
                    field.onChange(e);
                  }
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
