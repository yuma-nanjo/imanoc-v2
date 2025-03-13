import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const ContactButton = () => {
	return (
		<Button variant="ghost" size="icon">
			<Link href="/contact">
				<Mail className="h-[1.2rem] w-[1.2rem]" />
			</Link>
		</Button>
	);
};

export default ContactButton;
