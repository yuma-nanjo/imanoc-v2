"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	// クライアントサイドでのマウント完了チェック（初回レンダリングでのテーマ不一致を防ぐため）
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;

	const toggleTheme = () => {
		// 現在のテーマがlightならdarkへ、そうでなければlightへ切り替え
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button onClick={toggleTheme} variant="ghost" size="icon">
			{theme === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem]" />
			) : (
				<Moon className="h-[1.2rem] w-[1.2rem]" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
