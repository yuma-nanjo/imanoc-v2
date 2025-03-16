import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { i18n, type Locale } from "@/i18n-config";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
	title: {
		template: "%s | imanoc Content Partner",
		default: "imanoc Inc. | Your Content Partner",
	},
	openGraph: {
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
				width: 1200,
				height: 630,
			},
		],
		locale: "ja_JP",
		type: "website",
	},
	robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

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
			<GoogleTagManager gtmId="GTM-NMJP22G2" />
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
			<GoogleAnalytics gaId="G-TBE0CGZTJ8" />
		</html>
	);
}
