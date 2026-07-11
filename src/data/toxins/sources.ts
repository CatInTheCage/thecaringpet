// Shared authoritative source URLs for the Pet Toxin Lookup database.
//
// These backbone URLs were verified on 2026-07-11 by direct site visit (see
// hot_demand_radar/output/pet/toxin-data-sources-research.md) so they are known
// to resolve. Every toxin entry cites ≥2 sources; per-toxin deep links are added
// only when confirmable, otherwise these backbone pages are used. No URL is
// ever fabricated.
import type { ToxinSource } from '../../types/toxin';

export const ASPCA_POISON_CONTROL: ToxinSource = {
	name: 'ASPCA Animal Poison Control',
	url: 'https://www.aspca.org/pet-care/aspca-poison-control',
};

export const ASPCA_PEOPLE_FOODS: ToxinSource = {
	name: 'ASPCA — People Foods to Avoid Feeding Your Pets',
	url: 'https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets',
};

export const ASPCA_PLANTS: ToxinSource = {
	name: 'ASPCA Toxic and Non-Toxic Plants Database',
	url: 'https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants',
};

export const MERCK_TOXICOLOGY: ToxinSource = {
	name: 'Merck Veterinary Manual — Toxicology',
	url: 'https://www.merckvetmanual.com/toxicology',
};

export const PPH_POISONS: ToxinSource = {
	name: 'Pet Poison Helpline — Poisons',
	url: 'https://www.petpoisonhelpline.com/poisons/',
};

export const AAPCC_REPORTS: ToxinSource = {
	name: "America's Poison Centers — Annual Reports (NPDS)",
	url: 'https://poisoncenters.org/annual-reports',
};
