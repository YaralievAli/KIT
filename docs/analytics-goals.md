# Analytics goals safe foundation

## Activation

Analytics may run only when `NEXT_PUBLIC_YANDEX_METRIKA_ID` is set to a valid numeric Yandex Metrica counter ID and the browser has stored explicit accepted analytics consent.

Example value:

```env
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

Because this is a `NEXT_PUBLIC_*` value, set it before the production build/deploy. Changing only a running process environment is not enough to make the client counter available.

Missing, empty, or malformed values render no Metrica script and make the analytics helper no-op.

Analytics also requires explicit browser consent:

- Storage key: `kit:analytics-consent`.
- Values: `accepted` or `rejected`.
- Default/no stored value: no Metrica script and no custom events.
- `accepted`: Metrica may render only when the counter ID is valid; same-page consent changes are applied without a reload.
- `rejected`: no Metrica script and analytics helper remains no-op.

There is no persistent change-choice UI in this phase. Add a small footer/privacy settings control in a separate follow-up if the owner wants users to change the stored choice without clearing browser storage.

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

Do not enable Webvisor, form analytics, ecommerce, userParams, userID, or clientID enrichment unless separately approved.

## CTA consistency

Mobile/sticky CTA and `/thank-you` should stay Telegram-first. WhatsApp CTA must not be reintroduced without a separate owner decision.

The public V2 calculator is also Telegram-first by default. WhatsApp remains accepted/selectable for compatibility unless the owner makes a separate decision.
