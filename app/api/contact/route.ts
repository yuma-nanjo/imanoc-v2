import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
	// フォームから送信されたデータを受け取る
	const {
		implementationTiming,
		inquiryContent,
		interestedService,
		companyName,
		companyUrl,
		name,
		mail,
		phone,
		department,
		position,
		privacyAgreement,
	} = await request.json();

	try {
		// Resend を利用してお問い合わせ内容を通知するメールを送信
		await resend.emails.send({
			from: "y.nanjo@imanoc.com", // 送信元アドレス（ご自身のドメインなど）
			to: "y.nanjo1110@gmail.com", // お問い合わせ用の受信先メールアドレス
			subject: `【お問い合わせ】${name}様より`,
			html: `
        <p>新しいお問い合わせがありました。</p>
        <p><strong>導入希望時期:</strong> ${implementationTiming}</p>
        <p><strong>お問い合わせ内容:</strong> ${inquiryContent}</p>
        <p><strong>興味のあるサービス:</strong> ${interestedService}</p>
        <p><strong>会社名:</strong> ${companyName}</p>
        <p><strong>会社URL:</strong> ${companyUrl}</p>
        <p><strong>氏名:</strong> ${name}</p>
        <p><strong>メール:</strong> ${mail}</p>
        <p><strong>電話番号:</strong> ${phone}</p>
        <p><strong>部署:</strong> ${department}</p>
        <p><strong>役職:</strong> ${position}</p>
        <p><strong>個人情報の取り扱い同意:</strong> ${privacyAgreement ? "同意済み" : "未同意"}</p>
      `,
		});

		return Response.json({ success: true });
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return Response.json(
			{ error: "お問い合わせ送信中にエラーが発生しました" },
			{ status: 400 },
		);
	}
};
