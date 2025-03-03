export const metadata = {
	title: "管理画面 | imanoc",
	description: "管理画面 | imanoc",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
