export const i18n = {
	defaultLocale: "ja",
	locales: ["ja", "en", "zh", "zht"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
