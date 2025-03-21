import type {
	CATEGORY_POSTS_QUERYResult,
	CATEGORY_QUERYResult,
	COMPANIES_QUERYResult,
	COMPANIES_SLUGS_QUERYResult,
	COMPANY_QUERYResult,
	NEWS_POSTS_QUERYResult,
	PAGES_SLUGS_QUERYResult,
	PAGE_QUERYResult,
	POSTS_QUERYResult,
	POSTS_SLUGS_QUERYResult,
	POST_QUERYResult,
	SERVICES_QUERYResult,
	SERVICES_SLUGS_QUERYResult,
	SERVICE_QUERYResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGES_SLUGS_QUERY, PAGE_QUERY } from "@/sanity/queries/page";
import {
	CATEGORY_POSTS_QUERY,
	NEWS_POSTS_QUERY,
	POSTS_QUERY,
	POSTS_SLUGS_QUERY,
	POST_QUERY,
} from "@/sanity/queries/post";

import {
	COMPANIES_QUERY,
	COMPANIES_SLUGS_QUERY,
	COMPANY_QUERY,
} from "../queries/company";
import {
	SERVICES_QUERY,
	SERVICES_SLUGS_QUERY,
	SERVICE_QUERY,
} from "../queries/service";
import { CATEGORY_QUERY } from "../queries/category";

export const fetchSanityPageBySlug = async ({
	slug,
	language,
}: {
	slug: string;
	language: string;
}): Promise<PAGE_QUERYResult> => {
	const { data } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug, language },
	});

	return data;
};

export const fetchSanityPagesStaticParams = async ({
	language,
}: {
	language: string;
}): Promise<PAGES_SLUGS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: PAGES_SLUGS_QUERY,
		params: { language },
		perspective: "published",
		stega: false,
	});

	return data;
};

export const fetchSanityPosts = async ({
	language,
}: {
	language: string;
}): Promise<POSTS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: POSTS_QUERY,
		params: { language },
	});

	return data;
};

export const fetchSanityCategoryPosts = async ({
	language,
}: {
	language: string;
}): Promise<CATEGORY_POSTS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: CATEGORY_POSTS_QUERY,
		params: { language },
	});
	return data;
};

export const fetchSanityNewsPosts = async ({
	language,
}: {
	language: string;
}): Promise<NEWS_POSTS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: NEWS_POSTS_QUERY,
		params: { language },
	});
	return data;
};

export const fetchSanityPostsStaticParams = async ({
	language,
}: {
	language: string;
}): Promise<POSTS_SLUGS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: POSTS_SLUGS_QUERY,
		params: { language },
		perspective: "published",
		stega: false,
	});

	return data;
};

export const fetchSanityPostBySlug = async ({
	slug,
	language,
}: {
	slug: string;
	language: string;
}): Promise<POST_QUERYResult> => {
	const { data } = await sanityFetch({
		query: POST_QUERY,
		params: { slug, language },
	});

	return data;
};

// Service
export const fetchSanityServices = async ({
	language,
}: {
	language: string;
}): Promise<SERVICES_QUERYResult> => {
	const { data } = await sanityFetch({
		query: SERVICES_QUERY,
		params: { language },
	});

	return data;
};

export const fetchSanityServicesStaticParams = async ({
	language,
}: {
	language: string;
}): Promise<SERVICES_SLUGS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: SERVICES_SLUGS_QUERY,
		params: { language },
		perspective: "published",
		stega: false,
	});

	return data;
};

export const fetchSanityServiceBySlug = async ({
	slug,
	language,
}: {
	slug: string;
	language: string;
}): Promise<SERVICE_QUERYResult> => {
	const { data } = await sanityFetch({
		query: SERVICE_QUERY,
		params: { slug, language },
	});

	return data;
};

// Company
export const fetchSanityCompanies = async ({
	language,
}: {
	language: string;
}): Promise<COMPANIES_QUERYResult> => {
	const { data } = await sanityFetch({
		query: COMPANIES_QUERY,
		params: { language },
	});

	return data;
};

export const fetchSanityCompaniesStaticParams = async ({
	language,
}: {
	language: string;
}): Promise<COMPANIES_SLUGS_QUERYResult> => {
	const { data } = await sanityFetch({
		query: COMPANIES_SLUGS_QUERY,
		params: { language },
		perspective: "published",
		stega: false,
	});

	return data;
};

export const fetchSanityCompanyBySlug = async ({
	slug,
	language,
}: {
	slug: string;
	language: string;
}): Promise<COMPANY_QUERYResult> => {
	const { data } = await sanityFetch({
		query: COMPANY_QUERY,
		params: { slug, language },
	});

	return data;
};

export const fetchSanityCategories =
	async (): Promise<CATEGORY_QUERYResult> => {
		const { data } = await sanityFetch({
			query: CATEGORY_QUERY,
			perspective: "published",
			stega: false,
		});
		return data;
	};
