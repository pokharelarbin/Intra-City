"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomInput } from "@/components/core/CustomInput";
import { CustomRadioGroup } from "@/components/core/CustomRadioGroup";

const formSchema = z.object({
  vehicleType: z.enum(["Petrol", "Diesel", "Hybrid", "Electric"]),
  productionYear: z
    .string()
    .regex(/^\d{4}$/, "Invalid year format. Please enter a 4-digit year."),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  color: z.string().min(1, "Color is required"),
  frontView: z.instanceof(File).optional(),
  backView: z.instanceof(File).optional(),
  leftSideView: z.instanceof(File).optional(),
  rightSideView: z.instanceof(File).optional(),
  numberPlate: z.string().min(1, "Number plate is required"),
  engineNumber: z.string().min(1, "Engine number is required"),
  seatCapacity: z.string().min(1, "Seat capacity is required"),
  billbook2nd3rdPage: z.instanceof(File),
  billbook9thPage: z.instanceof(File),
  ownerName: z.string().min(1, "Owner's name is required"),
  ownerAddress: z.string().min(1, "Owner's address is required"),
  ownerPhoneNumber: z.string().min(1, "Owner's phone number is required"),
  ownerCitizenshipFront: z.instanceof(File).optional(),
  ownerCitizenshipBack: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function page() {
  const vehicleInfo = [
    {
      name: "productionYear",
      label: "Production Year",
      placeholder: "YYYY",
    },
    { name: "brand", label: "Brand", placeholder: "e.g. Honda,TATA" },
    { name: "model", label: "Model", placeholder: "e.g. Tata Bolero f3" },
    { name: "color", label: "Color", placeholder: "e.g. White,Red" },
  ];
  const vehiclePhoto = [
    { name: "frontView", label: "Front View" },
    { name: "backView", label: "Back View" },
    { name: "leftSideView", label: "Left side View" },
    { name: "rightSideView", label: "Right side View" },
  ];
  const billbookPhoto = [
    { name: "billbook2nd3rdPage", label: "Billbook 2nd and 3rd page photo" },
    { name: "billbook9thPage", label: "Billbook 9th page photo" },
  ];
  const citizenship = [
    { name: "ownerCitizenshipFront", label: "Owner's Citizenship Front" },
    { name: "ownerCitizenshipBack", label: "Owner's Citizenship Back" },
  ];
  const owner = [
    { name: "ownerName", label: "Owner's Name" },
    { name: "ownerAddress", label: "Owner's Address" },
  ];
  const vehicles = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleType: "Petrol",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="container mx-auto w-full md:w-4xl lg:w-4/5 p-6 ">
      <h1 className="text-2xl font-bold mb-6">Vehicle Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomRadioGroup
            name="vehicleType"
            label="Vehicle Type"
            options={vehicles}
            form={form}
            required={true}
          />
          <div className="space-y-1">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Basic Vehicle Info</h2>
              <hr className="flex-grow ml-2 mt-1 border-t border-gray-400" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {vehicleInfo.map((field) => (
                <CustomInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  form={form}
                  required
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Vehicle photo</h2>
            <div className="grid grid-cols-4 gap-4">
              {vehiclePhoto.map((field) => (
                <CustomInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  form={form}
                  type="file"
                  required
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              name="numberPlate"
              label="Number Plate"
              form={form}
              required
            />
            <CustomInput
              name="engineNumber"
              label="Engine Number"
              form={form}
              required
            />
          </div>
          <CustomInput
            name="seatCapacity"
            label="Seat Capacity"
            form={form}
            required
            className="w-2/5"
          />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Billbook photo</h2>
            <div className="grid grid-cols-2 gap-4">
              {billbookPhoto.map((field) => (
                <CustomInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  form={form}
                  type="file"
                  required
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Owner's info</h2>
              <hr className="flex-grow ml-2 mt-1 border-t border-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {owner.map((field) => (
                <CustomInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  form={form}
                  required
                />
              ))}
            </div>
            <CustomInput
              name="ownerPhoneNumber"
              label="Owner's Phone Number"
              form={form}
              required
              className="w-2/5"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Owner's Citizenship</h2>
            <div className="grid grid-cols-2 gap-4">
              {citizenship.map((field) => (
                <CustomInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  form={form}
                  type="file"
                  required
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-1/5">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
