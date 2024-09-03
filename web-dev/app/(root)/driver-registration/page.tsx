"use client";
import * as z from "zod";

import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "@/components/core/CustomInput";
import { Button } from "@/components/ui/button";
import ProfileInput from "@/components/core/ProfileInput";
import { SelectInput } from "@/components/core/SelectInput";

const bloodGroupSchema = z.enum(
  ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  {
    errorMap: () => ({ message: "Invalid blood group selected" }),
  }
);

const acceptedFileTypes = ["image/png", "image/jpeg"];

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.coerce.date().refine((date) => {
    return date <= new Date();
  }, "Date of birth cannot be in the future"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  bloodGroup: z.string(),
  address: z.string().min(1, "Address is required"),
  licenseFront: z
    .instanceof(File, {
      message: "Image is required",
    })
    .refine((file) => file !== null && acceptedFileTypes.includes(file.type), {
      message: "Only PNG or JPEG files are allowed",
    }),
  licenseBack: z
    .instanceof(File, {
      message: "Image is required",
    })
    .refine((file) => file !== null && acceptedFileTypes.includes(file.type), {
      message: "Only PNG or JPEG files are allowed",
    }),
  profilePicture: z
    .instanceof(File, {
      message: "Image is required",
    })
    .refine((file) => file !== null && acceptedFileTypes.includes(file.type), {
      message: "Only PNG or JPEG files are allowed",
    }),
  licenseNumber: z.string().min(1, "License Number is required"),
  contactNumber: z.string().min(1, "Contact Number is required"),
  contactName: z.string().min(1, "Contact Name is required"),
  relation: z.string().min(1, "Relation is required"),
});

type FormValues = z.infer<typeof formSchema>;

const page = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="container mx-auto w-full md:w-4xl lg:w-4/5 p-6 ">
      <h1 className="text-2xl font-bold mb-6">Driver Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Basic Vehicle Info</h2>
              <hr className="flex-grow ml-2 mt-1 border-t border-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-rows-2 gap-4">
              <CustomInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                form={form}
                required
              />
              <CustomInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                form={form}
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <ProfileInput
                label="Profile Picture"
                form={form}
                name="profilePicture"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-2 gap-4"></div>
          </div>
          <div className="flex">
            <div className="flex-1 gap-4">
              <CustomInput
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="Enter last name"
                form={form}
                type="date"
                required
              />
            </div>
            <div className="flex-1 ml-4">
              <CustomInput
                name="email"
                label="Email"
                placeholder="Enter email"
                form={form}
                type="email"
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 gap-4">
              <SelectInput
                form={form}
                name="bloodGroup"
                label="Blood Group"
                required
              />
            </div>
            <div className="flex-1 ml-4">
              <CustomInput
                name="address"
                label="Address"
                placeholder="Enter Address"
                form={form}
                required
              />
            </div>
          </div>

          {/* Driver License */}
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mt-4">Driver License</h2>
            <hr className="flex-grow ml-2 mt-5 border-t border-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                name="licenseFront"
                label="Front"
                form={form}
                type="file"
                required
              />
              <CustomInput
                name="licenseBack"
                label="Back"
                form={form}
                type="file"
                required
              />
            </div>
            <div>
              <CustomInput
                name="licenseNumber"
                label="License Number"
                placeholder="Enter License Number"
                form={form}
                required
              />
            </div>
          </div>

          {/* Emergency Contact Info */}
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mt-4">
              Emergency Contact Info
            </h2>
            <hr className="flex-grow ml-2 mt-5 border-t border-gray-400" />
          </div>
          <div className="flex mt-4">
            <div className="flex-1 gap-4">
              <CustomInput
                name="contactNumber"
                label="Contact Number"
                placeholder="Enter Contact Number"
                form={form}
                required
              />
            </div>
            <div className="flex-1 ml-4">
              <CustomInput
                name="contactName"
                label="Contact Name"
                placeholder="Enter Name"
                form={form}
                required
              />
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-1 gap-4">
              <CustomInput
                name="relation"
                label="Relation"
                placeholder="Eg: Father/Mother/Other"
                form={form}
                required
                className="w-[49%]"
              />
            </div>
          </div>
          <Button type="submit" className="w-1/5">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
