import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { i18n, type Locale } from "@/i18n-config";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

// 動的に metadata を生成するため generateMetadata を使用
export async function generateMetadata({
	params,
}: {
	params: { lang: Locale };
}): Promise<Metadata> {
	const { lang } = params;

	// 言語ごとのタイトルと Open Graph の locale を設定
	let titleTemplate: string;
	let titleDefault: string;
	let ogLocale: string;

	switch (lang) {
		case "ja":
			titleTemplate = "%s | imanocはコンテンツ作りのパートナー";
			titleDefault = "imanoc株式会社｜imanocはコンテンツ作りのパートナー";
			ogLocale = "ja_JP";
			break;
		case "en":
			titleTemplate = "%s | imanoc Content Partner";
			titleDefault = "imanoc Inc. | Your Content Partner";
			ogLocale = "en_US";
			break;
		case "zh":
			titleTemplate = "%s | imanoc内容合作伙伴";
			titleDefault = "imanoc股份有限公司｜imanoc内容合作伙伴";
			ogLocale = "zh_CN";
			break;
		case "zht":
			titleTemplate = "%s | imanoc內容合作夥伴";
			titleDefault = "imanoc股份有限公司｜imanoc內容合作夥伴";
			ogLocale = "zh_TW";
			break;
		default:
			titleTemplate = "%s | imanoc Content Partner";
			titleDefault = "imanoc Inc. | Your Content Partner";
			ogLocale = "en_US";
	}

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
		title: {
			template: titleTemplate,
			default: titleDefault,
		},
		openGraph: {
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
					width: 1200,
					height: 630,
				},
			],
			locale: ogLocale,
			type: "website",
		},
		robots: !isProduction ? "noindex, nofollow" : "index, follow",
	};
}

const fontSans = FontSans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-sans",
});

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	return (
		<html lang={lang} suppressHydrationWarning>
			<link rel="icon" href="/favicon.ico" />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased overscroll-none flex flex-col",
					fontSans.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
