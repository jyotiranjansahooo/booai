"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldErrors,
  type UseFormStateReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";

const FormFieldContext = React.createContext<string | undefined>(undefined);

function getError<T extends FieldValues>(errors: FieldErrors<T>, path: string): unknown {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce<unknown>(
      (obj, key) =>
        obj && typeof obj === "object" && key in obj
          ? (obj as Record<string, unknown>)[key]
          : undefined,
      errors,
    );
}

export function Form<T extends FieldValues>({
  children,
  ...form
}: UseFormReturn<T> & { children: React.ReactNode }) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

export function FormField<T extends FieldValues, TName extends FieldPath<T>>({
  control,
  name,
  render,
}: {
  control: Control<T>;
  name: TName;
  render: (props: {
    field: ControllerRenderProps<T, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactElement;
}) {
  return (
    <FormFieldContext.Provider value={name as string}>
      <Controller control={control} name={name} render={render} />
    </FormFieldContext.Provider>
  );
}

export function FormItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

export function FormLabel({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("form-label", className)} {...props}>
      {children}
    </label>
  );
}

export function FormControl({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function FormMessage({ className }: { className?: string }) {
  const fieldName = React.useContext(FormFieldContext);
  const {
    formState: { errors },
  } = useFormContext();

  if (!fieldName) return null;

  const error = getError(errors, fieldName);
  const message =
    error && typeof error === "object" && "message" in error
      ? error.message
      : undefined;
  if (!message) return null;

  return <p className={cn("text-sm text-destructive", className)}>{String(message)}</p>;
}
