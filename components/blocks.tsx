import AllPosts from "@/components/ui/all-posts";

import Carousel1 from "@/components/ui/carousel/carousel-1";
import Carousel2 from "@/components/ui/carousel/carousel-2";
import Cta1 from "@/components/ui/cta/cta-1";
import FAQs from "@/components/ui/faqs";
import FormNewsletter from "@/components/ui/forms/newsletter";
import GridRow from "@/components/ui/grid/grid-row";
import Hero1 from "@/components/ui/hero/hero-1";
import Hero2 from "@/components/ui/hero/hero-2";
import LogoCloud1 from "@/components/ui/logo-cloud/logo-cloud-1";
import SectionHeader from "@/components/ui/section-header";
import SplitRow from "@/components/ui/split/split-row";
import TimelineRow from "@/components/ui/timeline/timeline-row";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import AllCompanies from "./ui/all-companies";
import AllServices from "./ui/all-services";
import ContactForm from "./ui/forms/contactform";
import SomePosts from "./ui/some-posts";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];

const componentMap: {
	[K in Block["_type"]]: React.ComponentType<Extract<Block, { _type: K }>>;
} = {
	"hero-1": Hero1,
	"hero-2": Hero2,
	"section-header": SectionHeader,
	"split-row": SplitRow,
	"grid-row": GridRow,
	"carousel-1": Carousel1,
	"carousel-2": Carousel2,
	"timeline-row": TimelineRow,
	"cta-1": Cta1,
	"logo-cloud-1": LogoCloud1,
	faqs: FAQs,
	"form-newsletter": FormNewsletter,
	"form-contact": ContactForm,
	"all-posts": AllPosts,
	"some-posts": SomePosts,
	"all-services": AllServices,
	"all-companies": AllCompanies,
};

export default function Blocks({
	blocks,
	lang,
}: {
	blocks?: Block[];
	lang: Locale;
}) {
	return (
		<>
			{blocks?.map((block) => {
				const Component = componentMap[block._type];
				if (!Component) {
					// Fallback for development/debugging of new component types
					console.warn(
						`No component implemented for block type: ${block._type}`,
					);
					return <div data-type={block._type} key={block._key} />;
				}
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				return <Component {...(block as any)} key={block._key} lang={lang} />;
			})}
		</>
	);
}
