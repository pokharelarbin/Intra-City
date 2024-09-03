"use client";

import HeaderBox from "@/components/HeaderBox";
import React from "react";
import dynamic from "next/dynamic";
import { Stations } from "@/components/mapComponent/Stations";
import { StationsProvider } from "@/context/StationsContext";
import Loading from "@/components/mapComponent/Loader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "@/components/core/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const MapComponent = dynamic(() => import("@/components/mapComponent/Map"), {
  loading: () => <Loading />,
  ssr: false,
});

const formSchema = z.object({
  assignNumber: z.string().min(2, "min 2 characters required"),
  assignName: z.string().min(3, "min 3 characters required"),
});

type FormValues = z.infer<typeof formSchema>;

const PageContent = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <section>
      <HeaderBox title="Route Path Registration" />
      <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4 mb-4"
          >
            <CustomInput
              name="assignNumber"
              label="Assign Number"
              placeholder="Enter assign number"
              className="w-[300px]"
              form={form}
              required
            />
            <CustomInput
              name="assignName"
              label="Assign Name"
              placeholder="Enter assign name"
              className="w-[300px]"
              form={form}
              required
            />            
          </form>
        </Form>
      <div className="flex flex-col md:flex-row gap-4 bg-white rounded-md p-4">        
        <div className="md:w-4/6 w-full" style={{ height: "600px" }}>
          <MapComponent />
        </div>
        <div className="md:w-2/6 w-full min-h-[60px] gap-y-4">
          <h1 className="text-2xl font-semibold">Bus Stations</h1>
          <Stations />
        </div>
      </div>
      <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4 mb-4"
          >            
            <Button type="submit" className="">
              Submit Route
            </Button>
          </form>
        </Form>
    </section>
  );
};

const Page = () => (
  <StationsProvider>
    <PageContent />
  </StationsProvider>
);
export default Page;
