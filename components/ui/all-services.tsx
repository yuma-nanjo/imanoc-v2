import SectionContainer from "@/components/ui/section-container";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityServices } from "@/sanity/lib/fetch";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import ServiceCard from "./service-card";

type AllServices = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "all-services" }
>;

interface AllServicesProps extends AllServices {
	lang?: Locale;
}

export default async function AllServices({
	lang,
	padding,
	colorVariant,
}: AllServicesProps) {
	const color = stegaClean(colorVariant);
	const services = await fetchSanityServices({ language: lang || "en" });

	return (
		<SectionContainer color={color} padding={padding}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{services.map((service) => (
					<Link
						key={service?.slug?.current}
						className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						href={`/${lang}/column/${service?.slug?.current}`}
					>
						<ServiceCard
							title={service?.title ?? ""}
							excerpt={service?.excerpt ?? ""}
							image={service?.image ?? null}
						/>
					</Link>
				))}
			</div>
		</SectionContainer>
	);
}
