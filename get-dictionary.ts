import "server-only";
import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	ja: () => import("./dictionaries/ja.json").then((module) => module.default),
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	zh: () => import("./dictionaries/zh.json").then((module) => module.default),
	zht: () => import("./dictionaries/zht.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries.ja();
