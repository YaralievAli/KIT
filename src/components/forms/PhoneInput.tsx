"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { extractRussianSubscriberDigits, formatRussianPhoneInput, RUSSIAN_PHONE_MASK_LENGTH } from "@/lib/phone";

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
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;

        if (!isDeleteKey || selectionStart === null || selectionEnd === null) {
          return;
        }

        const subscriberDigits = extractRussianSubscriberDigits(input.value);

        if (!subscriberDigits) {
          event.preventDefault();
          onChange("");
          return;
        }

        const digitStart = getSubscriberDigitIndex(input.value, selectionStart);
        const digitEnd = getSubscriberDigitIndex(input.value, selectionEnd);

        if (digitStart !== digitEnd) {
          event.preventDefault();
          onChange(formatRussianPhoneInput(subscriberDigits.slice(0, digitStart) + subscriberDigits.slice(digitEnd)));
          return;
        }

        if (event.key === "Backspace") {
          event.preventDefault();
          const nextDigits =
            digitStart <= 0 ? "" : subscriberDigits.slice(0, digitStart - 1) + subscriberDigits.slice(digitStart);
          onChange(formatRussianPhoneInput(nextDigits));
          return;
        }

        if (digitStart < subscriberDigits.length) {
          event.preventDefault();
          onChange(formatRussianPhoneInput(subscriberDigits.slice(0, digitStart) + subscriberDigits.slice(digitStart + 1)));
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

function getSubscriberDigitIndex(value: string, caretPosition: number) {
  const visibleSubscriberPart = value.slice(0, caretPosition).startsWith("+7")
    ? value.slice(4, caretPosition)
    : value.slice(0, caretPosition);

  return visibleSubscriberPart.replace(/\D/g, "").length;
}
