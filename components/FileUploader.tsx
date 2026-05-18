"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { type LucideIcon } from "lucide-react";

interface FileUploaderProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  acceptTypes: string[];
  icon: LucideIcon;
  placeholder: string;
  hint: string;
  disabled?: boolean;
}

function FileUploader<T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  icon: Icon,
  placeholder,
  hint,
  disabled,
}: FileUploaderProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-3">
          <label className="form-label">{label}</label>
          <label className="file-upload-shadow block cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-white p-7 text-center transition hover:border-slate-400">
            <Icon className="mx-auto mb-3 h-6 w-6 text-slate-500" />
            <p className="text-sm font-semibold text-slate-900">{placeholder}</p>
            <p className="text-sm text-slate-500 mt-1">{hint}</p>
            <input
              type="file"
              accept={acceptTypes.join(",")}
              disabled={disabled}
              onChange={(event) => field.onChange(event.target.files?.[0])}
              className="sr-only"
            />
          </label>
        </div>
      )}
    />
  );
}

export default FileUploader;
