"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { stegaClean } from "next-sanity";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Shadcn UI コンポーネント
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionContainer from "@/components/ui/section-container";
import { Textarea } from "@/components/ui/textarea";

import PortableTextRenderer from "@/components/portable-text-renderer";
import type { PAGE_QUERYResult } from "@/sanity.types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select";

// Sanity からフォームブロックを抽出する型
type FormContactProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "form-contact" }
>;

const contactFormSchema = z.object({
	// 導入希望時期
	implementationTiming: z.enum([
		"すぐにでも",
		"1ヶ月以内",
		"3ヶ月以内",
		"半年以内",
		"情報収集段階",
	]),
	// 興味を持っているサービス
	interestedService: z.enum([
		"コンテンツサイト開発",
		"コンテンツマーケティング",
		"コンテンツ運用支援",
		"その他",
	]),
	// お問い合わせ内容
	inquiryContent: z
		.string()
		.min(1, { message: "お問い合わせ内容を入力してください" }),
	// 会社名
	companyName: z.string(),
	// 会社URL（URL形式）
	companyUrl: z.string(),
	// 氏名
	name: z.string().min(1, { message: "氏名を入力してください" }),
	// メールアドレス
	mail: z
		.string()
		.min(1, { message: "メールアドレスを入力してください" })
		.email({ message: "有効なメールアドレスを入力してください" }),
	// 電話番号
	phone: z.string(),
	// 部署
	department: z.string(),
	// 役職
	position: z.string(),
	// 個人情報の取り扱い（チェック必須）
	privacyAgreement: z.boolean().refine((val) => val === true, {
		message: "個人情報の取り扱いに同意してください",
	}),
});

export default function ContactForm({
	padding,
	colorVariant,
	consentText,
	buttonText,
	successMessage,
}: FormContactProps) {
	const form = useForm<z.infer<typeof contactFormSchema>>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			implementationTiming: "すぐにでも",
			inquiryContent: "",
			interestedService: "コンテンツサイト開発",
			companyName: "",
			companyUrl: "",
			name: "",
			mail: "",
			phone: "",
			department: "",
			position: "",
			privacyAgreement: false,
		},
	});

	const { isSubmitting } = form.formState;

	const handleSend = useCallback(
		async (values: z.infer<typeof contactFormSchema>) => {
			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(values),
				});
				const result = await response.json();
				if (response.ok) {
					toast(successMessage);
					form.reset();
				} else {
					toast.error(result.error);
				}
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		[form, successMessage],
	);

	async function onSubmit(values: z.infer<typeof contactFormSchema>) {
		await handleSend(values);
	}

	const color = stegaClean(colorVariant);

	return (
		<SectionContainer color={color} padding={padding}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="pt-8 space-y-6">
					{/* 導入希望時期 */}
					<FormField
						control={form.control}
						name="implementationTiming"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="implementationTiming"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									導入希望時期<span className="text-red-500">*</span>
								</Label>
								<FormControl className="flex-1">
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger id="implementationTiming">
											<SelectValue placeholder="選択してください" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="すぐにでも">すぐにでも</SelectItem>
											<SelectItem value="1ヶ月以内">1ヶ月以内</SelectItem>
											<SelectItem value="3ヶ月以内">3ヶ月以内</SelectItem>
											<SelectItem value="半年以内">半年以内</SelectItem>
											<SelectItem value="情報収集段階">情報収集段階</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 興味を持っているサービス */}
					<FormField
						control={form.control}
						name="interestedService"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="interestedService"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									興味を持っているサービス
									<span className="text-red-500">*</span>
								</Label>
								<FormControl className="flex-1">
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger id="interestedService">
											<SelectValue placeholder="選択してください" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="コンテンツサイト開発">
												コンテンツサイト開発
											</SelectItem>
											<SelectItem value="コンテンツマーケティング">
												コンテンツマーケティング
											</SelectItem>
											<SelectItem value="コンテンツ運用支援">
												コンテンツ運用支援
											</SelectItem>
											<SelectItem value="その他">その他</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* お問い合わせ内容 */}
					<FormField
						control={form.control}
						name="inquiryContent"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="inquiryContent"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									お問い合わせ内容<span className="text-red-500">*</span>
								</Label>
								<FormControl className="flex-1">
									<Textarea
										{...field}
										id="inquiryContent"
										placeholder="お問い合わせ内容を入力"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 会社名 */}
					<FormField
						control={form.control}
						name="companyName"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="companyName"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									会社名
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="companyName"
										placeholder="会社名"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 会社URL */}
					<FormField
						control={form.control}
						name="companyUrl"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="companyUrl"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									会社URL
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="companyUrl"
										placeholder="https://example.com"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 氏名 */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="name"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									氏名<span className="text-red-500">*</span>
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="name"
										placeholder="氏名"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* メールアドレス */}
					<FormField
						control={form.control}
						name="mail"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="mail"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									メールアドレス<span className="text-red-500">*</span>
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="mail"
										type="email"
										placeholder="メールアドレス"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 電話番号 */}
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="phone"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									電話番号
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="phone"
										placeholder="電話番号"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 部署 */}
					<FormField
						control={form.control}
						name="department"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="department"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									部署
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="department"
										placeholder="部署"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 役職 */}
					<FormField
						control={form.control}
						name="position"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row md:items-center md:space-x-4">
								<Label
									htmlFor="position"
									className="w-44 md:text-right text-sm text-foreground/80"
								>
									役職
								</Label>
								<FormControl className="flex-1">
									<Input
										{...field}
										id="position"
										placeholder="役職"
										className="text-xs"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 個人情報の取り扱い（チェックボックス＋モーダル） */}
					<FormField
						control={form.control}
						name="privacyAgreement"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center justify-center">
								<div className="flex flex-col md:flex-row md:space-x-2">
									<div className="flex items-center space-x-2 justify-center">
										<FormControl>
											<input
												type="checkbox"
												checked={field.value}
												onChange={field.onChange}
												onBlur={field.onBlur}
												name={field.name}
												ref={field.ref}
												className="h-4 w-4"
											/>
										</FormControl>
										<Label
											htmlFor="privacyAgreement"
											className="text-sm text-foreground/80"
										>
											個人情報の取り扱いについてに同意する
										</Label>
									</div>
									{/* モーダルで詳細表示 */}
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="link" className="text-sm px-1">
												個人情報の取り扱いについて
											</Button>
										</DialogTrigger>
										<DialogContent className="min-w-[80%] max-h-[90%] overflow-y-scroll">
											<DialogHeader className="text-left prose prose-sm prose-h1:text-xl prose-h1:my-2! prose-h2:my-1! prose-h2:text-lg prose-p:my-0.5! prose-ul:pl-0! prose-ul:text-sm dark:prose-invert">
												<DialogTitle className="sr-only">
													個人情報の取り扱いについて
												</DialogTitle>
												<DialogDescription asChild>
													{consentText && (
														<PortableTextRenderer value={consentText} />
													)}
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{buttonText}
					</Button>
				</form>
			</Form>
		</SectionContainer>
	);
}
