import { outlineDictionaries } from "@/dictionaries/outlineDictionaries";
import type { Locale } from "@/i18n-config";

const Outline = ({
	lang,
}: {
	lang: Locale;
}) => {
	const dictionary = outlineDictionaries[lang || "ja"];
	return (
		<div className="">
			<div className="pt-16 pb-4">
				<h1 className="leading-[0] mb-4">
					<span className="text-base font-semibold font-mono">outline</span>
				</h1>
				<h2 className="text-xl md:text-3xl mb-4">
					{dictionary.outline.sectionTitle}
				</h2>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full">
					<tbody className="divide-y divide-foreground/20 [&>tr>th]:px-6 [&>tr>th]:py-4 [&>tr>th]:text-left [&>tr>th]:text-sm [&>tr>th]:font-medium [&>tr>th]:text-foreground/70 [&>tr>th]:uppercase [&>tr>td]:px-6 [&>tr>td]:py-4 [&>tr>td]:text-sm [&>tr>td]:text-foreground/90">
						<tr>
							<th>{dictionary.outline.companyName}</th>
							<td>{dictionary.outline.companyNameValue}</td>
						</tr>
						<tr>
							<th>{dictionary.outline.address}</th>
							<td>{dictionary.outline.addressValue}</td>
						</tr>
						<tr>
							<th>{dictionary.outline.url}</th>
							<td>{dictionary.outline.urlValue}</td>
						</tr>
						<tr>
							<th>{dictionary.outline.capital}</th>
							<td>{dictionary.outline.capitalValue}</td>
						</tr>
						<tr>
							<th>{dictionary.outline.establishment}</th>
							<td>{dictionary.outline.establishmentValue}</td>
						</tr>
						<tr>
							<th>{dictionary.outline.ceo}</th>
							<td>{dictionary.outline.ceoValue}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Outline;
