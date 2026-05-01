"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { formatRussianPhoneInput, RUSSIAN_PHONE_MASK_LENGTH } from "@/lib/phone";

type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "autoComplete" | "inputMode" | "onChange" | "type" | "value"> & {
  value?: string;
  onChange: (value: string) => void;
};

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { value = "", onChange, onKeyDown, onPaste, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      maxLength={RUSSIAN_PHONE_MASK_LENGTH}
      value={value}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;

        const isDeleteKey = event.key === "Backspace" || event.key === "Delete";
        const input = event.currentTarget;
        const selectedEverything = input.selectionStart === 0 && input.selectionEnd === input.value.length;

        if (isDeleteKey && selectedEverything) {
          event.preventDefault();
          onChange("");
        }
      }}
      onChange={(event) => {
        onChange(formatRussianPhoneInput(event.currentTarget.value));
      }}
      onPaste={(event) => {
        onPaste?.(event);
        if (event.defaultPrevented) return;

        event.preventDefault();
        onChange(formatRussianPhoneInput(event.clipboardData.getData("text")));
      }}
    />
  );
});
