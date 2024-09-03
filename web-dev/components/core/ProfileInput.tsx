import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, Controller } from "react-hook-form";
import { Input } from "../ui/input";

interface ProfileInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  form: UseFormReturn<any>;
  className?: string;
  required?: boolean;
}

const ProfileInput = ({
  name,
  label,
  placeholder,
  type = "file",
  form,
  className = "",
  required = false,
}: ProfileInputProps) => {
  const [profilePicture, setProfilePicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  ); // Default profile image path

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      onChange(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profilePicture}
                alt="User Avatar"
                className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
              />

              {/* Profile picture input */}

              <FormLabel
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </FormLabel>
              <FormControl>
                <Controller
                  name={name}
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      id="profile-picture"
                      type={type}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleProfilePictureChange(e, field.onChange)
                      }
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default ProfileInput;
