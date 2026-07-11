// Type definitions for the Pet Toxin Lookup tool.
// The data lives in src/data/toxins.ts; these types give build-time checking.

export type ToxinLevel = 'severe' | 'moderate' | 'mild' | 'safe';

export type ToxinCategory =
	| 'food'
	| 'plant'
	| 'medication'
	| 'household'
	| 'insecticide';

export interface ToxinSource {
	/** Display name, e.g. "Pet Poison Helpline" or "Merck Veterinary Manual". */
	name: string;
	/** Fully-qualified URL. Must be a real, resolvable authoritative source. */
	url: string;
}

/** Per-species toxicity profile. Every toxin has both a dog and cat entry. */
export interface SpeciesInfo {
	/** Coarse severity bucket used for the traffic-light badge. */
	level: ToxinLevel;
	/** Whether the substance is toxic to this species at typical exposure. */
	toxic: boolean;
	/** Symptoms to watch for. Even "safe" entries include monitoring guidance. */
	symptoms: string[];
	/** Numbered first-aid steps to take at home. */
	firstAid: string[];
	/** Signs that mean stop waiting and call a vet / poison hotline now. */
	callVetIf: string[];
}

export interface ToxinFaq {
	question: string;
	answer: string;
}

export interface ToxinProduct {
	name: string;
	rating: string;
	reviews: string;
	image: string;
	bestFor: string;
	material: string;
	capacity: string;
	price: string;
	pros: string[];
	cons: string[];
	amazonId: string;
}

export interface Toxin {
	/** URL slug, e.g. "soy-sauce". Unique across the dataset. */
	slug: string;
	/** Display name, e.g. "Soy Sauce". */
	name: string;
	/** Alternate names / common misspellings matched by search. */
	aliases: string[];
	category: ToxinCategory;
	species: {
		dog: SpeciesInfo;
		cat: SpeciesInfo;
	};
	/** Short description. Also the visible subtitle AND the meta description,
	 *  so keep it ≤155 chars and state the species split explicitly. */
	description: string;
	/** ≥2 independent authoritative sources (ASPCA / Merck / PPH / etc.). */
	sources: ToxinSource[];
	/** Optional affiliate products. Ships empty for now — ProductCard stays
	 *  wired in the template for later ASIN additions. */
	relatedProducts?: ToxinProduct[];
	/** 3–5 FAQs grounded in the data above. */
	faqs: ToxinFaq[];
	/** ISO date this entry was last reviewed, e.g. "2026-07-11". */
	lastReviewed: string;
}
