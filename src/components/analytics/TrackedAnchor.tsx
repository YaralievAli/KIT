"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackAnalyticsEvent, type AnalyticsEventName, type AnalyticsEventParams } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: AnalyticsEventName;
  eventParams?: AnalyticsEventParams;
};

export function TrackedAnchor({ eventName, eventParams, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackAnalyticsEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}
