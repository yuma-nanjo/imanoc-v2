import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { Locale } from "@/i18n-config";

const ContactButton = ({ lang }: { lang: Locale }) => {
	return (
		<Link href={`/${lang}/contact`}>
			<Button variant="ghost" size="icon" className="cursor-pointer">
				<Mail className="h-[1.2rem] w-[1.2rem]" />
			</Button>
		</Link>
	);
};

export default ContactButton;
