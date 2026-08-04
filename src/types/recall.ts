// Type definitions for the Pet Recall Checker tool.
// Data lives in src/data/recalls.ts; these types give build-time checking.

export type RecallStatus =
	/** Company-initiated recall currently in effect. */
	| 'active'
	/** FDA advisory / warning letter still in effect (not a company recall). */
	| 'fda-advisory'
	/** Recall completed/closed by the FDA — product no longer expected on shelves. */
	| 'terminated';

export type RecallCategory =
	| 'dog-food'
	| 'cat-food'
	| 'pet-food'
	| 'dog-treat'
	| 'supplement'
	| 'other';

export interface RecallSource {
	name: string;
	/** Fully-qualified URL. FDA notice preferred; must be authoritative. */
	url: string;
}

export interface Recall {
	/** URL slug, e.g. "pedigree-chicken-duck-canned-2026". Unique across the dataset. */
	slug: string;
	/** Brand as owners know it, e.g. "Pedigree". */
	brand: string;
	/** Full product name as printed on the package. */
	product: string;
	/** Alternate brand/product spellings matched by search. */
	aliases: string[];
	category: RecallCategory;
	/** Company that issued the recall, e.g. "Mars Petcare US, Inc." */
	company: string;
	/** Affected lot codes. Empty array means ALL lots of the product. */
	lotCodes: string[];
	/** Package size(s) affected, e.g. "13.2 oz cans". */
	sizes?: string;
	/** Affected best-by dates if the recall is date-coded instead of lot-coded. */
	bestByDates?: string[];
	/** Short hazard label, e.g. "Foreign material (metal/plastic)". */
	hazard: string;
	/** 1–2 sentence hazard explanation for the card/detail page. */
	hazardDetail: string;
	/** ISO date of the FDA notice / company announcement, e.g. "2026-07-02". */
	recallDate: string;
	/** ISO date of the latest expansion/update, if the recall grew. */
	updatedDate?: string;
	status: RecallStatus;
	/** Species the product is intended for. */
	species: ('dog' | 'cat')[];
	/** Numbered steps an owner should take if they have the product. */
	whatToDo: string[];
	/** Primary authoritative notice. FDA recall page preferred. */
	source: RecallSource;
	/** Optional secondary coverage (news / tracker) for corroboration. */
	secondarySources?: RecallSource[];
	/** Slug of a related guide on this site (without slashes), e.g. "pedigree-canned-dog-food-recall-2026". */
	relatedArticle?: string;
	/** ISO date this entry was last checked against the source. */
	lastVerified: string;
}
