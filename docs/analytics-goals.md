# Analytics goals safe foundation

## Activation

Analytics is inactive unless `NEXT_PUBLIC_YANDEX_METRIKA_ID` is set to a valid numeric Yandex Metrica counter ID.

Set it only after the owner makes the legal/cookie decision:

```env
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

Because this is a `NEXT_PUBLIC_*` value, set it before the production build/deploy. Changing only a running process environment is not enough to activate the client counter.

Missing, empty, or malformed values render no Metrica script and make the analytics helper no-op.

## Events

Custom events are sent through a strict allowlist:

- `hero_calculate_click`
- `hero_catalog_click`
- `header_callback_click`
- `mobile_sticky_cta_click`
- `phone_click`
- `social_click`
- `review_source_click`
- `calculator_start`
- `calculator_step_next`
- `calculator_contact_open`
- `lead_submit_attempt`
- `lead_submit_success`
- `lead_submit_error`

## Allowed custom params

Only these params may be sent with custom events:

- `sourcePage` / `sourceForm`: safe source enum, for example `homepage-calculator` or `homepage-final-cta`.
- `communicationMethod`: `phone`, `whatsapp`, `telegram`, `vk`, or `max`.
- `calculatorStep`: step number only.
- `socialChannel`: `vk`, `telegram`, `max`, or `whatsapp`.
- `reviewSource`: `yandex`, `2gis`, or `vk`.
- `errorCode`: safe internal error code only.

## Forbidden data

Never send these values to analytics custom events:

- name;
- phone;
- Telegram/VK/MAX username;
- comment;
- raw contact value;
- full form payload;
- leadId;
- API response body;
- raw validation text or raw error message;
- full URL.

## Yandex Metrica caveat

Custom events do not send full URLs or personal data. However, if the Yandex Metrica counter is enabled, Metrica itself may collect technical visit data such as page URL, referrer, device/browser data, cookies, and IP-related technical data.

Production activation remains blocked until the owner approves the legal/cookie approach.

## Deferred cleanup

Mobile sticky WhatsApp remains intentionally unchanged in this phase. Any consistency change belongs in a separate `Phase 7C-4 WhatsApp CTA Consistency Cleanup`.
