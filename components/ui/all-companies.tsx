import SectionContainer from "@/components/ui/section-container";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityCompanies } from "@/sanity/lib/fetch";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import CompanyCard from "./company-card";
import Outline from "./company/outline";

type AllCompanies = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "all-companies" }
>;

interface AllCompaniesProps extends AllCompanies {
	lang?: Locale;
}

export default async function AllCompanies({
	lang,
	padding,
	colorVariant,
}: AllCompaniesProps) {
	const color = stegaClean(colorVariant);
	const companies = await fetchSanityCompanies({ language: lang || "ja" });

	return (
		<SectionContainer color={color} padding={padding}>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{companies.map((company) => (
					<Link
						key={company?.slug?.current}
						className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						href={`/${lang}/company/${company?.slug?.current}`}
					>
						<CompanyCard
							title={company?.title ?? ""}
							excerpt={company?.excerpt ?? ""}
							image={company?.image ?? null}
						/>
					</Link>
				))}
			</div>
			<Outline />
		</SectionContainer>
	);
}
