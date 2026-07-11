// Pet Toxin Lookup database — aggregator.
//
// Toxins are organized into per-category modules under src/data/toxins/. This
// file combines them and enforces a build-time duplicate-slug guard so detail
// routes never collide. See src/data/toxins/sources.ts for the source policy
// (every entry cites ≥2 authoritative sources; no fabricated URLs).
import type { Toxin } from '../types/toxin';
import { foodToxins } from './toxins/food';
import { plantToxins } from './toxins/plants';
import { medicationToxins } from './toxins/medications';
import { householdToxins } from './toxins/household';
import { insecticideToxins } from './toxins/insecticides';

export const toxins: Toxin[] = [
	...foodToxins,
	...plantToxins,
	...medicationToxins,
	...householdToxins,
	...insecticideToxins,
];

// Build-time guard: every slug must be unique so detail-page routes don't collide.
const slugs = toxins.map((t) => t.slug);
const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (duplicates.length > 0) {
	throw new Error(
		`Duplicate toxin slugs across data modules: ${[...new Set(duplicates)].join(', ')}`,
	);
}
