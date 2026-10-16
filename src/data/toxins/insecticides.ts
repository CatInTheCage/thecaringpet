// Insecticide and pesticide toxins for the Pet Toxin Lookup tool.
import type { Toxin } from '../../types/toxin';
import {
	ASPCA_POISON_CONTROL,
	MERCK_TOXICOLOGY,
	PPH_POISONS,
} from './sources';

export const insecticideToxins: Toxin[] = [
	{
		slug: 'permethrin',
		name: 'Permethrin',
		aliases: ['pyrethrin', 'pyrethroid', 'flea spray', 'dog flea treatment', 'permethrin flea drop', 'advantix'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild skin irritation or itchiness at the application site',
					'Drooling if the product is licked from the fur',
					'Vomiting or mild stomach upset with ingestion',
				],
				firstAid: [
					'Note the exact product name and active ingredient from the label.',
					'Wipe any excess from the fur and prevent licking.',
					'Call a veterinarian if drooling or vomiting appears.',
				],
				callVetIf: [
					'Tremors, twitching, or seizures (rare in dogs at label doses)',
					'Persistent drooling or vomiting',
					'A concentrated product was ingested',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Muscle tremors and twitching, often within hours of application',
					'Seizures that can become continuous',
					'Excessive drooling and depression',
					'Hypersalivation and loss of coordination',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY — this is a life-threatening emergency.',
					'Note the exact product name and active ingredient (permethrin / pyrethroid) from the label.',
					'Bathe the cat with mild liquid dish soap to remove the topical product, following vet guidance.',
					'Keep the cat warm and quiet while getting to a clinic.',
				],
				callVetIf: [
					'ANY dog flea or tick product was applied to a cat (even a small amount)',
					'Tremors, twitching, or seizures appear',
					'Drooling, disorientation, or collapse',
				],
			},
		},
		description: 'Permethrin is severely toxic to cats and only mildly toxic to dogs. Using a DOG flea product on a cat is a life-threatening emergency. Call a vet at once.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is permethrin so dangerous to cats?',
				answer: 'Cats lack the liver enzyme (glucuronosyltransferase) needed to break down permethrin and other pyrethroids, so the chemical accumulates and attacks the nervous system. Dogs metabolize it efficiently, which is why it is safe for dogs at label doses but can kill a cat. NEVER apply a dog flea or tick product to a cat.',
			},
			{
				question: 'What should I do if I accidentally put a dog flea product on my cat?',
				answer: 'This is a life-threatening emergency. Call a veterinarian or poison hotline immediately, note the product name and active ingredient from the label, and bathe the cat with mild dish soap to remove the product if advised. Do not wait for symptoms — tremors and seizures can develop within hours.',
			},
			{
				question: 'Can a cat be poisoned by sleeping near a dog treated with permethrin?',
				answer: 'Yes, although the risk is lower than direct application. Transfer can occur if a cat grooms a treated dog or rubs against wet application sites. Keep cats away from dogs for 24 hours after a permethrin product is applied until it is fully dry, and call a vet if the cat drools or trembles.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'organophosphates',
		name: 'Organophosphates',
		aliases: ['OP', 'malathion', 'diazinon', 'chlorpyrifos', 'parathion', 'flea dip', 'organophosphate insecticide'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Excessive drooling and tearing (salivation and lacrimation)',
					'Frequent urination and diarrhea',
					'Muscle tremors and weakness',
					'Pinpoint (constricted) pupils',
					'In serious cases: seizures, breathing difficulty, collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY — note the product and active ingredient.',
					'If skin exposure, bathe with mild soap and water (wear gloves).',
					'Do NOT induce vomiting unless a veterinarian directs you to.',
					'Keep the pet calm and note the time of exposure.',
				],
				callVetIf: [
					'Any organophosphate was ingested or absorbed',
					'Drooling, diarrhea, or muscle tremors appear',
					'Pinpoint pupils, seizures, or breathing difficulty',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Excessive drooling and tearing',
					'Frequent urination and diarrhea',
					'Muscle tremors and pinpoint pupils',
					'In serious cases: seizures, breathing difficulty, collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY — note the product and active ingredient.',
					'If skin exposure, bathe with mild soap and water (wear gloves).',
					'Do NOT induce vomiting unless directed by a vet.',
					'Keep the cat calm and warm while getting help.',
				],
				callVetIf: [
					'Any organophosphate was ingested or absorbed',
					'Drooling, tremors, or pinpoint pupils',
					'Seizures or breathing difficulty',
				],
			},
		},
		description: 'Organophosphates are severely toxic to both cats and dogs, causing nerve symptoms: drooling, tremors, pinpoint pupils, and seizures. Call a vet now.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'What are the "SLUDGE" signs of organophosphate poisoning?',
				answer: 'SLUDGE stands for Salivation, Lacrimation (tearing), Urination, Defecation, Gastrointestinal upset, and Emesis (vomiting). These happen because organophosphates overstimulate the nervous system by blocking the enzyme that normally switches off nerve signals. Pinpoint pupils and muscle tremors are also classic signs.',
			},
			{
				question: 'Where do pets encounter organophosphates?',
				answer: 'Organophosphates are found in some older flea dips and sprays, agricultural insecticides, and garden pest controls (malathion, diazinon, chlorpyrifos). Many have been restricted for home use but are still used in agriculture. Pets can be exposed by ingesting bait, licking treated surfaces, or absorbing it through the skin.',
			},
			{
				question: 'Why is organophosphate poisoning an emergency?',
				answer: 'Organophosphates act like nerve agents — they cause a runaway buildup of nerve signals that can lead to seizures, respiratory failure, and death. Treatment must start quickly and often involves atropine and other medications only a veterinarian can administer. Call a vet or poison hotline immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'deet',
		name: 'DEET',
		aliases: ['N,N-diethyl-meta-toluamide', 'bug spray', 'insect repellent', 'off', 'deep woods', 'repellent'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Ataxia (staggering or "walking drunk")',
					'Muscle tremors',
					'In high exposures: seizures',
				],
				firstAid: [
					'Note the DEET concentration and amount ingested or absorbed.',
					'If skin exposure, bathe with mild soap and water (wear gloves).',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'Any DEET product was ingested',
					'Staggering, tremors, or disorientation',
					'Seizures',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and vomiting',
					'Ataxia (staggering and disorientation)',
					'Muscle tremors',
					'In high exposures: seizures',
				],
				firstAid: [
					'Note the DEET concentration and amount.',
					'If skin exposure, bathe with mild soap and water (wear gloves).',
					'Call a veterinarian or poison hotline immediately.',
				],
				callVetIf: [
					'Any DEET product was ingested or applied to the cat',
					'Staggering, tremors, or disorientation',
					'Seizures',
				],
			},
		},
		description: 'DEET (bug repellent) is moderately toxic to cats and dogs, causing staggering, vomiting, and seizures at higher exposures. Call a vet if ingested.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'Is it safe to use bug spray (DEET) on my pet?',
				answer: 'No. DEET products are made for humans, not pets, and can cause drooling, staggering, tremors, and seizures in dogs and cats. Use only veterinarian-approved flea and tick preventives on pets. If a pet licks or absorbs DEET, call a vet right away.',
			},
			{
				question: 'How much DEET is dangerous to a pet?',
				answer: 'Higher concentrations (above 30%) and larger amounts are more dangerous, but any ingestion warrants a call to a vet. Pets are smaller and more sensitive than humans, and symptoms can progress from drooling to seizures. Note the concentration and amount for the vet.',
			},
			{
				question: 'What if my pet just licked a small amount of bug spray?',
				answer: 'Even a small amount can cause drooling and stomach upset, and higher exposure can lead to neurological signs. Wipe the fur, note the product and DEET percentage, and call a veterinarian or poison hotline for guidance rather than waiting.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'ant-roach-bait',
		name: 'Ant & Roach Bait',
		aliases: ['ant bait', 'roach bait', 'bait station', 'combat', 'raid bait', 'boric acid bait', 'ant trap'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and mild diarrhea',
					'Drooling or reduced appetite',
					'Stomach upset (usually self-limiting)',
				],
				firstAid: [
					'Note the product name and active ingredient from the bait station label.',
					'Offer fresh water and withhold food briefly if vomiting.',
					'Call a veterinarian or poison hotline if symptoms are persistent.',
				],
				callVetIf: [
					'A large amount or multiple bait stations were chewed and eaten',
					'Persistent vomiting or diarrhea',
					'Lethargy or refusal to eat',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting or mild diarrhea',
					'Drooling or reduced appetite',
				],
				firstAid: [
					'Note the product name and active ingredient.',
					'Offer fresh water and monitor closely.',
					'Call a veterinarian if symptoms persist.',
				],
				callVetIf: [
					'Multiple bait stations were eaten',
					'Persistent vomiting or diarrhea',
					'Lethargy or refusal to eat',
				],
			},
		},
		description: 'Ant and roach bait stations are mildly toxic to cats and dogs — low concentrations usually cause only stomach upset. Call a vet if vomiting persists.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'My dog ate an ant bait station. Is it an emergency?',
				answer: 'Most ant and roach bait stations contain very low concentrations of insecticide (often abamectin, fipronil, or hydramethylnon) in a sweet bait, so a single station usually causes only mild stomach upset. Note the product and active ingredient, offer water, and call a vet or poison hotline — especially if multiple stations were eaten or vomiting is persistent.',
			},
			{
				question: 'What about boric acid or borax in roach bait?',
				answer: 'Boric acid is a common roach bait ingredient. Small amounts from a bait station usually cause only mild vomiting or diarrhea, but larger ingestions can cause more serious symptoms. Call a vet with the amount eaten and the product label.',
			},
			{
				question: 'Are ant traps dangerous to cats?',
				answer: 'Ant and roach bait stations are designed to be low-toxicity, and a cat chewing on one usually gets only mild stomach upset. The bigger risk is the plastic casing causing choking or a blockage. Call a vet if vomiting persists or if multiple stations were eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'flea-tick-meds-misused',
		name: 'Flea & Tick Medication (Misused)',
		aliases: ['flea drops', 'flea treatment', 'tick collar', 'flea preventative', 'spot-on treatment', 'wrong dose', 'flea medicine'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and vomiting from licking the application site',
					'Skin irritation or hair loss at the application point',
					'Muscle tremors if a large overdose is applied or ingested',
					'Lethargy or reduced appetite',
				],
				firstAid: [
					'Note the exact product name, active ingredient, and weight range from the label.',
					'If a topical overdose, bathe with mild dish soap to remove excess product.',
					'Call a veterinarian or poison hotline for guidance.',
					'Do NOT induce vomiting unless a vet directs you to.',
				],
				callVetIf: [
					'A product meant for a larger dog or a different species was applied',
					'Tremors, seizures, or persistent drooling',
					'Vomiting that will not stop',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Tremors and seizures (especially if a permethrin-containing dog product was used)',
					'Excessive drooling and depression',
					'Vomiting and disorientation',
					'Loss of coordination',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY.',
					'Note the exact product name and active ingredient — check for permethrin / pyrethroid.',
					'Bathe the cat with mild dish soap to remove the topical product, following vet guidance.',
					'Keep the cat warm and quiet while getting to a clinic.',
				],
				callVetIf: [
					'ANY dog flea or tick product was applied to a cat',
					'A cat-weight product was overdosed',
					'Tremors, seizures, drooling, or disorientation',
				],
			},
		},
		description: 'Misused flea and tick meds are severely toxic to cats and moderately toxic to dogs — never use a dog product on a cat (permethrin risk). Call a vet.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'What happens if I use the wrong flea product on my pet?',
				answer: 'Using a dog product on a cat — especially one containing permethrin — can cause life-threatening tremors and seizures because cats cannot metabolize pyrethroids. Using a product meant for a larger dog on a smaller one, or a cat-weight overdose, can also cause toxicity. Always check the label for species and weight range, and call a vet immediately if the wrong product is applied.',
			},
			{
				question: 'My cat licked the flea drops I just applied. What do I do?',
				answer: 'Drooling and mild vomiting can occur because these products taste bitter. Wipe any excess from the fur and call a veterinarian for guidance. If the product was a dog formula containing permethrin, treat it as an emergency — bathe the cat with mild dish soap and get to a vet immediately.',
			},
			{
				question: 'Can I split a large-dog flea treatment between two small dogs?',
				answer: 'No. Spot-on treatments are dosed for a specific weight range, and splitting a dose can underdose one pet and overdose another. Similarly, never use a dog product on a cat. Always use a product labeled for your pet\'s exact species and weight, and consult a vet if unsure.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'metaldehyde-slug-bait',
		name: 'Metaldehyde (Slug & Snail Bait)',
		aliases: ['metaldehyde', 'slug bait', 'snail bait', 'slug pellets', 'snail poison', 'slug-o', 'cory\'s slug death'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Anxiety, pacing, and panting within 1–3 hours',
					'Excessive drooling and vomiting',
					'Muscle tremors and rigidity',
					'Seizures that can become continuous',
					'Dangerously high body temperature',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY — note the product and active ingredient.',
					'Do NOT induce vomiting unless a veterinarian directs you to (seizures can make this dangerous).',
					'Keep the pet calm and cool while getting to a clinic.',
					'Note the time and amount eaten if known.',
				],
				callVetIf: [
					'Any slug or snail bait was eaten',
					'Panting, drooling, or muscle tremors appear',
					'Seizures or a hot, panting body',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Restlessness and drooling',
					'Muscle tremors and rigidity',
					'Seizures',
					'High body temperature',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY — note the product and active ingredient.',
					'Do NOT induce vomiting unless directed by a vet.',
					'Keep the cat calm and cool while getting help.',
				],
				callVetIf: [
					'Any slug or snail bait was eaten',
					'Drooling, tremors, or restlessness',
					'Seizures',
				],
			},
		},
		description: 'Metaldehyde slug and snail bait is severely toxic to both cats and dogs, causing anxiety, tremors, and seizures within hours. Call a vet immediately.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is slug bait so dangerous to dogs?',
				answer: 'Metaldehyde — the active ingredient in many slug and snail baits — is highly toxic to dogs and tastes appealing to them. It causes anxiety, panting, drooling, muscle tremors, and seizures that can become continuous, along with a dangerous rise in body temperature. Even a small amount can be fatal without rapid treatment.',
			},
			{
				question: 'Are "pet-safe" slug baits actually safe?',
				answer: 'Some slug baits use iron phosphate instead of metaldehyde and are marketed as safer around pets. Iron phosphate is much less toxic, but it is still best to keep all baits out of reach. Always check the active ingredient — if it says metaldehyde, treat any ingestion as an emergency.',
			},
			{
				question: 'How fast do symptoms appear after eating slug bait?',
				answer: 'Signs usually appear within 1 to 3 hours of ingestion — anxiety, panting, drooling, and muscle tremors are early warnings, progressing to seizures. Because it acts fast, do not wait for symptoms. Call a veterinarian immediately if you suspect any slug bait was eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'rotenone',
		name: 'Rotenone',
		aliases: ['derris', 'cube root', 'fish poison', 'plant-based insecticide', 'rotenone dust', 'rotenone spray'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Breathing difficulty or rapid breathing',
					'Muscle tremors in higher doses',
					'Lethargy and weakness',
				],
				firstAid: [
					'Note the product name and active ingredient from the label.',
					'If skin exposure, bathe with mild soap and water (wear gloves).',
					'Call a veterinarian or poison hotline for guidance.',
					'Keep the pet calm and monitor breathing.',
				],
				callVetIf: [
					'Any rotenone product was ingested',
					'Breathing changes, weakness, or tremors',
					'Persistent vomiting',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Breathing difficulty',
					'Weakness and lethargy',
					'Tremors in higher doses',
				],
				firstAid: [
					'Note the product name and active ingredient.',
					'If skin exposure, bathe with mild soap and water (wear gloves).',
					'Call a veterinarian or poison hotline immediately.',
					'Keep the cat calm and monitor breathing.',
				],
				callVetIf: [
					'Any rotenone product was ingested',
					'Breathing changes, weakness, or tremors',
					'Persistent vomiting',
				],
			},
		},
		description: 'Rotenone is moderately toxic to cats and dogs — this plant-based insecticide can cause vomiting, drooling, and breathing trouble. Call a vet if ingested.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'What is rotenone and where is it found?',
				answer: 'Rotenone is a plant-derived insecticide extracted from the roots of certain tropical plants (Derris, Lonchocarpus). It is used in some organic garden insecticides and historically as a fish poison. Though "natural," it is toxic to mammals and can cause vomiting, breathing difficulty, and tremors in pets.',
			},
			{
				question: 'Is rotenone safer because it is "natural" or plant-based?',
				answer: 'No. Natural does not mean safe. Rotenone is a potent toxin that affects cellular energy production and the nervous system. Pets can be poisoned by ingesting treated plants or bait, or by absorbing it through the skin. Treat any exposure seriously and call a vet.',
			},
			{
				question: 'What are the warning signs of rotenone poisoning?',
				answer: 'Vomiting, drooling, rapid or labored breathing, weakness, and in higher doses, muscle tremors. Rotenone can depress the nervous system and breathing. Call a vet immediately if any of these signs appear after exposure to a garden insecticide.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'neonicotinoids',
		name: 'Neonicotinoids',
		aliases: ['imidacloprid', 'dinotefuran', 'acetamiprid', 'thiamethoxam', 'neonic', 'advantage flea treatment'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild drooling if the product is licked',
					'Vomiting or reduced appetite with ingestion',
					'Lethargy in larger ingestions',
				],
				firstAid: [
					'Note the product name and active ingredient from the label.',
					'Offer fresh water and monitor for vomiting or drooling.',
					'Call a veterinarian if a concentrated product was ingested or symptoms persist.',
				],
				callVetIf: [
					'A concentrated neonicotinoid product was ingested',
					'Persistent vomiting or lethargy',
					'Tremors or disorientation',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild drooling from licking the application site',
					'Vomiting or reduced appetite with ingestion',
					'Lethargy in larger ingestions',
				],
				firstAid: [
					'Note the product name and active ingredient.',
					'Offer fresh water and monitor closely.',
					'Call a veterinarian if a concentrate was ingested or symptoms persist.',
				],
				callVetIf: [
					'A concentrated neonicotinoid product was ingested',
					'Persistent vomiting or lethargy',
					'Tremors or disorientation',
				],
			},
		},
		description: 'Neonicotinoids (e.g. imidacloprid) are mildly toxic to cats and dogs — common in flea products, they mainly cause drooling or vomiting. Call a vet.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Are neonicotinoids safe in flea products for pets?',
				answer: 'At label doses, neonicotinoids like imidacloprid (Advantage) are considered safe for both cats and dogs and are widely used in veterinary flea treatments. They target insect nicotinic receptors, which differ from mammalian ones, so toxicity is low. The risk comes from ingesting concentrated products or applying the wrong species or weight dose.',
			},
			{
				question: 'What happens if my pet licks a neonicotinoid flea treatment?',
				answer: 'These products taste bitter, so drooling is the most common reaction. Mild vomiting can also occur. Usually this is not serious, but call a veterinarian if drooling is heavy, vomiting persists, or a large amount was ingested. Applying a dog product to a cat is always a concern, so check the label.',
			},
			{
				question: 'Is imidacloprid dangerous if my dog eats the garden concentrate?',
				answer: 'Yes. While flea-product doses are low and safe, a concentrated garden or agricultural neonicotinoid is much stronger and can cause vomiting, lethargy, and in serious cases tremors. Note the product and concentration, and call a veterinarian or poison hotline immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'boric-acid',
		name: 'Boric Acid & Borax',
		aliases: ['borax', 'boric powder', 'roach powder', 'ant powder', 'borate', 'boric acid powder', 'twenty mule team borax', 'roach hotel powder'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea after eating powder or bait',
					'Mouth and throat irritation (boric acid is a mild caustic)',
					'Lethargy and increased thirst in larger amounts',
					'Tremors or a wobbly gait only with large ingestions',
				],
				firstAid: [
					'Remove any remaining powder; wipe paws and muzzle.',
					'Rinse the mouth with water and offer fresh water.',
					'Do NOT induce vomiting — boric acid is mildly caustic.',
					'Call a vet if more than a lick of powder or several baits were eaten.',
				],
				callVetIf: [
					'A significant amount of powder or many bait stations were eaten',
					'Persistent vomiting, bloody diarrhea, or lethargy',
					'Tremors, wobbliness, or seizures',
					'Skin or eye contact with redness that does not settle',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Drooling and mouth irritation',
					'Vomiting or mild diarrhea',
					'Lethargy in larger amounts',
					'Tremors only with significant ingestion',
				],
				firstAid: [
					'Remove any remaining powder; wipe paws and fur.',
					'Rinse the mouth and offer fresh water.',
					'Do NOT induce vomiting.',
					'Call a vet if vomiting persists.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or refusal to eat',
					'Tremors or wobbliness',
				],
			},
		},
		description: 'Boric acid and borax are mildly toxic to both cats and dogs — a lick of roach powder causes drooling and stomach upset; large amounts can irritate the gut and nervous system.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Is borax really toxic? I thought it was a natural cleaner.',
				answer: '"Natural" and "non-toxic" are not the same thing. Borax (sodium borate) and boric acid are low-toxicity compared to most insecticides, but they are mildly caustic and can cause vomiting, diarrhea, and mouth irritation — and large ingestions affect the kidneys and nervous system. A dog that licks a trace of powder will be fine; a dog that eats open bait powder by the spoonful needs a vet call.',
			},
			{
				question: 'Are the bait stations (roach hotels) dangerous if chewed open?',
				answer: 'The liquid or gel inside most commercial bait stations is heavily diluted — a single station eaten by a dog usually causes, at most, drooling and mild stomach upset, and the plastic shell is often the bigger (obstruction) concern. Multiple stations, or the raw powder form, are more serious. Count what was chewed and call with the product name; keep stations under appliances where paws cannot flip them.',
			},
			{
				question: 'How should I apply boric acid safely around pets?',
				answer: 'Use it as a thin dusting deep in cracks, under appliances, and inside wall voids — places tongues and paws cannot reach — rather than visible piles along baseboards. Keep pets out of the room while applying, wipe up visible powder, and never mix it into bait blobs on open floors. Stored powder belongs in a sealed container up high; the fine powder is also an inhalation irritant for you.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'fly-bait-methomyl',
		name: 'Fly Bait (Methomyl)',
		aliases: ['methomyl', 'fly bait granules', 'golden malrin', 'blue fly bait', 'fly strips', 'flying insect bait', 'lannate', 'carbamate fly bait'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Excessive drooling, vomiting, and diarrhea within minutes to an hour',
					'Pinpoint pupils, slow heart rate, and trembling',
					'Wobbliness progressing to weakness and collapse',
					'Difficulty breathing and seizures without rapid treatment (carbamate poisoning)',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY — this is a cholinesterase-inhibiting poison.',
					'Bring the product name (methomyl percentage) and estimate the amount eaten.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
					'Keep the pet calm and get to the clinic — time to treatment is everything.',
				],
				callVetIf: [
					'Any fly bait granules were eaten — even a few',
					'Drooling, trembling, or pinpoint pupils',
					'Collapse, seizures, or breathing difficulty — emergency clinic now',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Sudden heavy drooling, vomiting, and diarrhea',
					'Pinpoint pupils, tremors, and slow heart rate',
					'Weakness, wobbliness, and collapse',
					'Difficulty breathing and seizures without rapid treatment',
				],
				firstAid: [
					'Call a veterinarian or poison hotline IMMEDIATELY.',
					'Bring the product name and estimate the amount eaten.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
					'Keep the cat calm while getting to the clinic.',
				],
				callVetIf: [
					'Any fly bait was eaten or licked',
					'Drooling, tremors, or pinpoint pupils',
					'Collapse or breathing difficulty — emergency clinic now',
				],
			},
		},
		description: 'Methomyl fly bait is severely toxic to both cats and dogs — a carbamate poison causing drooling, tremors, and breathing failure within an hour. Any ingestion is a race to the vet.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Why is fly bait so much more dangerous than ant bait?',
				answer: 'Methomyl — the active ingredient in popular blue or golden fly-bait granules — is a carbamate, the same chemical family as the dangerous organophosphate insecticides: it shuts down the enzyme that regulates nerve signals. Commercial fly baits run 1% methomyl and are mixed with sugar to attract flies — which also makes them attractive to dogs. Ant and roach baits typically use far less toxic actives at tiny doses (see our ant & roach bait page).',
			},
			{
				question: 'I have heard of people using fly bait to poison coyotes. Is that why it is so dangerous?',
				answer: 'Unfortunately yes — methomyl fly bait mixed with meat or eggs has been widely misused to kill predators, and it is banned for that use. The same lethality applies to any dog or cat that finds it. If you suspect your pet was deliberately poisoned with fly bait, tell your veterinarian — law enforcement treats malicious poisoning as a crime, and knowing helps the vet choose the right emergency treatment.',
			},
			{
				question: 'What does treatment look like?',
				answer: 'Carbamate poisoning is treated with atropine (an antidote that blocks the poison at nerve receptors) plus decontamination, IV fluids, and seizure control. Recovery with fast treatment is genuinely possible — but the window is short, since breathing muscle failure can develop within an hour. This is a go-now emergency, not a watch-and-wait one.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'pyrethrins',
		name: 'Natural Pyrethrins',
		aliases: ['pyrethrin', 'pyrethrum', 'chrysanthemum extract', 'natural insecticide', 'pyrethrin spray', 'organic flea spray', 'cattle ear tag', 'garden insect spray'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and mild stomach upset after licking spray or concentrate',
					'Skin itching or redness at contact points',
					'Tremors only with concentrated products or heavy application',
					'Low-concentration household sprays rarely cause more than drooling',
				],
				firstAid: [
					'Wipe or bathe off any spray on the fur with mild dish soap.',
					'Rinse the mouth and offer fresh water.',
					'Keep the product label with the concentration.',
					'Call a vet if tremors, vomiting, or wobbliness appear.',
				],
				callVetIf: [
					'A concentrated product was ingested',
					'Tremors, twitching, or a wobbly gait',
					'Repeated vomiting or labored breathing',
					'Skin redness with drooling that will not stop',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Muscle tremors and twitching (ear flicking, skin rippling) within hours',
					'Drooling, vomiting, and paw flicking',
					'Wobbliness, dilated pupils, and hiding',
					'Seizures and death without treatment — cats cannot metabolize pyrethrins',
				],
				firstAid: [
					'Bathe the cat immediately with mild dish soap in lukewarm water to remove all residue.',
					'Call a veterinarian or emergency clinic IMMEDIATELY — even before symptoms appear.',
					'Bring the product label with the concentration.',
					'Keep the cat warm and quiet during transport.',
				],
				callVetIf: [
					'ANY pyrethrin product touched the cat — spray, fogger, or a dog\'s treated fur',
					'Tremors, twitching, or drooling',
					'Seizures or unresponsiveness — emergency clinic now',
				],
			},
		},
		description: 'Natural pyrethrins are mildly toxic to dogs but severely toxic to cats — cats cannot metabolize them, and tremors can progress to seizures. Any cat contact needs immediate bathing and a vet call.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Aren\'t pyrethrins "natural" and therefore safe?',
				answer: 'Natural is not the same as safe. Pyrethrins come from chrysanthemum flowers, but they are still neurotoxins — and cats are uniquely vulnerable because their liver cannot break the compounds down. A "natural" flea spray that is safe for a dog can cause fatal tremors and seizures in a cat. Check the label: "safe for use around cats" means something; "natural" means nothing.',
			},
			{
				question: 'My dog was treated with a pyrethrin spray. Is my cat in danger just from living with the dog?',
				answer: 'Possibly — cats are poisoned by grooming residue off a treated dog\'s fur, sleeping against a freshly treated dog, or sharing bedding. Keep the cat away from the dog until the product is fully dry and absorbed (follow the label; often 24 hours), wash shared bedding, and never apply a dog product to a cat. If your cat starts twitching or drooling, bathe them and call the vet immediately.',
			},
			{
				question: 'How is pyrethrin poisoning in cats treated?',
				answer: 'Treatment is decontamination (the immediate bath), methocarbamol or diazepam to control tremors, IV fluids, and temperature support — tremoring muscles overheat the cat dangerously. Most cats treated promptly recover fully within 24 to 72 hours. The key is the bath and the call happening early, before the tremors escalate to seizures.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'insect-foggers',
		name: 'Insect Foggers & Bug Bombs',
		aliases: ['bug bomb', 'fogger', 'total release fogger', 'raid fogger', 'insect bomb', 'flea bomb', 'household fogger', 'bug fogger'],
		category: 'insecticide',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and coughing if present during or right after fogging',
					'Watery eyes and breathing irritation from the fog',
					'Wobbliness or lethargy with heavy exposure',
					'Tremors in dogs exposed to wet residue or over-used foggers',
				],
				firstAid: [
					'Remove the dog from the house immediately and get to fresh air.',
					'Air the house out thoroughly per the label (usually 2–4 hours minimum) before re-entry.',
					'Wipe down surfaces and wash pet bedding before the pet returns.',
					'Call a vet if coughing, drooling, or wobbliness persists after fresh air.',
				],
				callVetIf: [
					'The pet was inside during fogging or returned before the label interval',
					'Persistent coughing, vomiting, or drooling',
					'Tremors, wobbliness, or labored breathing',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Muscle tremors and twitching from grooming pyrethroid residue off fur',
					'Drooling, vomiting, and coughing',
					'Wobbliness, dilated pupils, and hiding',
					'Seizures in cats exposed to foggers containing permethrin or heavy residues',
				],
				firstAid: [
					'Remove the cat from the house immediately; get to fresh air.',
					'If residue is on the fur, bathe the cat with mild dish soap and lukewarm water.',
					'Call a veterinarian — describe the fogger active ingredients from the label.',
					'Air the house and wipe surfaces thoroughly before the cat returns.',
				],
				callVetIf: [
					'The cat was inside during fogging',
					'Tremors, twitching, or drooling',
					'Seizures or breathing difficulty — emergency clinic now',
				],
			},
		},
		description: 'Bug bombs are moderately toxic to dogs and severely toxic to cats — fogger residue groomed off fur causes tremors and seizures in cats. Pets must be out during and after fogging.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'How long do pets need to stay out after a bug bomb?',
				answer: 'Follow the label, but the usual minimum is 2 to 4 hours with windows open — and for cats, longer is safer. The bigger hazard for cats is not the airborne fog (they were out during that) but the residue that settles on floors, furniture, and bedding: cats walk through it and groom it off, delivering a pyrethroid dose. Wipe hard floors and counters, wash bedding, and vacuum carpets before a cat comes home.',
			},
			{
				question: 'Are foggers with permethrin worse for cats?',
				answer: 'Yes — many flea-focused foggers use permethrin or other pyrethroids, and cats cannot metabolize them (see our permethrin and pyrethrins pages). A cat re-entering a freshly fogged house and grooming the residue can develop the same tremors and seizures as direct permethrin exposure. Choose a product explicitly labeled safe for homes with cats, and keep the cat out longer anyway.',
			},
			{
				question: 'My dog sneezed and drooled after we fogged, but we aired the house out. Is he okay?',
				answer: 'Brief exposure to a fully aired-out house usually causes only transient nose and throat irritation that settles in fresh air. Call a vet if the drooling continues, if he develops coughing, vomiting, wobbliness, or tremors, or if he was actually in the room when the fogger went off — direct fog exposure is a different, more serious situation than post-airing residue.',
			},
		],
		lastReviewed: '2026-10-16',
	},
];
