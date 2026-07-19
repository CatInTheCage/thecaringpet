// Household hazard toxins for the Pet Toxin Lookup tool.
import type { Toxin } from '../../types/toxin';
import {
	ASPCA_POISON_CONTROL,
	MERCK_TOXICOLOGY,
	PPH_POISONS,
} from './sources';

export const householdToxins: Toxin[] = [
	{
		slug: 'antifreeze',
		name: 'Antifreeze',
		aliases: ['ethylene glycol', 'coolant', 'radiator fluid', 'deicer'],
		category: 'household',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Early "drunken" stage (30 min–12 hrs): stumbling, disorientation, excessive thirst and urination',
					'Vomiting and nausea',
					'Cardiopulmonary stage (12–24 hrs): rapid heart and breathing rate',
					'Kidney failure stage (24–72 hrs): little or no urination, vomiting, seizures, collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms. Every minute counts.',
					'Note the product name, active ingredient, and how much was licked or drunk.',
					'Wipe any residue off the paws or fur.',
					'Do not delay to try home remedies; the antidote (fomepizole) only works if given early.',
				],
				callVetIf: [
					'Any antifreeze was ingested — even a few licks',
					'Staggering, disorientation, or excessive drinking and urination',
					'Vomiting, lethargy, or no urination',
					'Seizures or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Early "drunken" stage: stumbling, drooling, and disorientation',
					'Excessive thirst and urination, then vomiting',
					'Kidney failure within 12–24 hrs (cats are extremely sensitive)',
					'Seizures, collapse, and little or no urination in late stage',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — cats need even smaller amounts to be poisoned.',
					'Note the product and how much was ingested.',
					'Keep the cat calm and get to a clinic fast.',
					'Do not wait for symptoms; the antidote must be given within hours.',
				],
				callVetIf: [
					'Any antifreeze was ingested (cats are poisoned by tiny amounts)',
					'Drooling, stumbling, or disorientation',
					'Vomiting or no urination',
					'Seizures or collapse',
				],
			},
		},
		description: 'Antifreeze (ethylene glycol) is severely toxic to cats and dogs. A drunken stage precedes irreversible kidney failure within hours — call a vet at once.',
		sources: [MERCK_TOXICOLOGY, ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'Why is antifreeze so dangerous to pets?',
				answer: 'Ethylene glycol tastes sweet, so pets will lick spills. It is metabolized into oxalic acid, which forms crystals that destroy the kidneys. The damage becomes irreversible within hours, so treatment (the antidote fomepizole or ethanol) only works if started early.',
			},
			{
				question: 'How little antifreeze can hurt a cat or dog?',
				answer: 'Very little. Cats can be poisoned by about a teaspoon, and a few tablespoons can be lethal to a dog. Even the amount a pet licks off a driveway spill is enough to cause kidney failure. Treat any ingestion as an emergency.',
			},
			{
				question: 'What is the "drunken" stage and does it mean my pet is recovering?',
				answer: 'No. The first stage — stumbling and disorientation, as if drunk — happens within 30 minutes to 12 hours and can look like it passes. But the toxin is quietly damaging the kidneys during the next stage, leading to failure. Never assume recovery; call a vet immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'rodent-bait',
		name: 'Rodent Bait',
		aliases: ['anticoagulant', 'rodenticide', 'bromadiolone', 'brodifacoum', 'diphacinone', 'warfarin', 'mouse poison', 'rat poison'],
		category: 'household',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Lethargy, weakness, and pale gums (signs of internal bleeding)',
					'Bleeding gums, nosebleeds, or bruising under the skin',
					'Blood in stool (dark or red) or urine',
					'Difficulty breathing if bleeding into the lungs or chest',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately, even if no symptoms yet — bleeding is often delayed 2–5 days.',
					'Find the bait package and note the active ingredient (e.g. brodifacoum, bromadiolone, diphacinone).',
					'Estimate how much was eaten and when.',
					'Do not wait for bleeding to appear; early decontamination and vitamin K1 work best.',
				],
				callVetIf: [
					'Any rodent bait was eaten',
					'Pale gums, weakness, or unexplained bruising',
					'Bleeding from the nose, gums, or in stool/urine',
					'Coughing or difficulty breathing',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Lethargy, weakness, and pale gums from blood loss',
					'Bleeding gums, nosebleeds, or bruising',
					'Dark or bloody stool',
					'Difficulty breathing from internal bleeding',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — bleeding may not show for days.',
					'Note the active ingredient from the bait package.',
					'Estimate the amount eaten.',
					'Do not wait for symptoms to develop.',
				],
				callVetIf: [
					'Any rodent bait was eaten',
					'Pale gums, weakness, or bruising',
					'Any bleeding or bloody stool',
					'Rapid or labored breathing',
				],
			},
		},
		description: 'Rodent bait (anticoagulants) is severely toxic to cats and dogs. Bleeding can be delayed for days — call a vet immediately, do not wait for symptoms.',
		sources: [MERCK_TOXICOLOGY, ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'How long after eating rodent bait do symptoms appear?',
				answer: 'Anticoagulant rodenticides block vitamin K, which the body needs to clot blood, but symptoms are usually delayed 2 to 5 days while clotting factors run out. By the time you see bleeding, the poison has been acting for days. Call a vet the day it is eaten, not when symptoms start.',
			},
			{
				question: 'What is the treatment for rodent bait poisoning?',
				answer: 'If caught early, a vet may induce vomiting and give activated charcoal, then start vitamin K1 for several weeks (long-acting baits like brodifacoum and bromadiolone require extended treatment). In severe cases with active bleeding, plasma transfusions and hospital care are needed.',
			},
			{
				question: 'Are "pet-safe" rodent baits actually safe?',
				answer: 'No rodent bait is truly safe for pets. Products may be marketed as safer, but bromethalin (a brain toxin) and cholecalciferol (vitamin D3) baits have no easy antidote and are just as dangerous. Store all baits where pets cannot reach them, and call a vet with the active ingredient if any is eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'snail-bait',
		name: 'Snail Bait',
		aliases: ['metaldehyde', 'slug bait', 'snail pellets', 'molluscicide'],
		category: 'household',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Anxiety, panting, and drooling within 1–3 hours',
					'Muscle tremors and rigidity',
					'Seizures that can become continuous',
					'Dangerously high body temperature (hyperthermia)',
				],
				firstAid: [
					'Call a veterinarian immediately — metaldehyde poisoning escalates fast.',
					'Note the product name and active ingredient.',
					'If the dog is not yet seizing and a professional directs it, decontamination may be needed — but only under guidance.',
					'Begin cooling with water and a fan if the body feels hot, while getting to a clinic.',
				],
				callVetIf: [
					'Any snail bait was eaten',
					'Restlessness, panting, or drooling',
					'Tremors or seizures',
					'A hot body or rapid breathing',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Drooling, restlessness, and disorientation',
					'Muscle tremors and rigidity',
					'Seizures',
					'High body temperature and rapid breathing',
				],
				firstAid: [
					'Call a veterinarian immediately — this is a fast-moving emergency.',
					'Note the product and active ingredient.',
					'Keep the cat calm and cool.',
					'Do not induce vomiting if seizures have started.',
				],
				callVetIf: [
					'Any snail bait was eaten',
					'Drooling, restlessness, or tremors',
					'Seizures',
					'A hot body or rapid breathing',
				],
			},
		},
		description: 'Snail bait (metaldehyde) is severely toxic to cats and dogs, causing tremors and seizures within hours. Call a vet immediately — it moves fast.',
		sources: [MERCK_TOXICOLOGY, ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'How fast does snail bait affect pets?',
				answer: 'Metaldehyde acts quickly — anxiety, drooling, and tremors usually appear within 1 to 3 hours of eating the pellets. Seizures and a dangerous rise in body temperature can follow. Because it moves fast, call a vet immediately rather than waiting to see.',
			},
			{
				question: 'Should I make my pet vomit after eating snail bait?',
				answer: 'Only if a veterinarian or poison control tells you to, and only before seizures start. Once tremors or seizures begin, inducing vomiting risks inhaling vomit into the lungs. Call a professional first — they will decide on decontamination based on timing and symptoms.',
			},
			{
				question: 'Are there pet-safe snail and slug baits?',
				answer: 'Iron phosphate baits are generally much less toxic to pets than metaldehyde. But always check the label — metaldehyde is the dangerous one and is still sold. If you are unsure which was eaten, bring the package to the vet.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'batteries',
		name: 'Batteries',
		aliases: ['alkaline battery', 'button battery', 'lithium battery', 'coin cell', 'disc battery', 'battery acid'],
		category: 'household',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Drooling and pawing at the mouth from burns',
					'Red, raw, or ulcerated mouth and tongue',
					'Vomiting (possibly bloody) and abdominal pain',
					'Not eating, or difficulty swallowing',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the battery type (alkaline, button/coin, lithium) and whether it was chewed or swallowed whole.',
					'Do NOT induce vomiting — the corrosive liquid does more damage coming back up, and a battery can block the throat.',
					'Offer water or milk to rinse the mouth only if the pet can swallow normally.',
				],
				callVetIf: [
					'A battery was chewed, punctured, or swallowed',
					'Drooling, mouth pain, or refusing to eat',
					'Vomiting, especially with blood',
					'Abdominal pain or lethargy',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Drooling and pawing at the mouth',
					'Ulcers or redness in the mouth',
					'Vomiting and reduced appetite',
					'Difficulty swallowing',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the battery type and whether it was chewed or swallowed.',
					'Do NOT induce vomiting — corrosive burns and choking are the risk.',
					'Keep the cat calm while getting help.',
				],
				callVetIf: [
					'A battery was chewed or swallowed',
					'Drooling, mouth pain, or refusing to eat',
					'Vomiting',
					'Lethargy or belly pain',
				],
			},
		},
		description: 'Batteries are severely toxic to cats and dogs if punctured or swallowed. They cause corrosive burns and heavy-metal poisoning. Call a vet at once.',
		sources: [MERCK_TOXICOLOGY, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Why are batteries so dangerous if chewed?',
				answer: 'When punctured, batteries release corrosive acid or alkali that burns the mouth, throat, and stomach. Button and coin batteries can also generate an electrical current against tissue, causing deep burns and holes. Heavy metals (zinc, and historically mercury or lead) add poisoning risk if the battery is digested.',
			},
			{
				question: 'What if my dog swallowed a battery whole without chewing it?',
				answer: 'A whole battery can still be dangerous — it may lodge in the throat or intestines and cause a blockage, and button batteries can cause electrical burns while sitting in the stomach. Call a vet; do not induce vomiting, as the battery could get stuck or leak on the way back up.',
			},
			{
				question: 'Should I rinse my pet\'s mouth after a battery leak?',
				answer: 'Offering water or milk to rinse can help if your pet can swallow normally, but never force it, and do not induce vomiting. The corrosive liquid causes more damage coming back up. Call a vet immediately — mouth burns can be deep even when they look mild on the surface.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'mothballs',
		name: 'Mothballs',
		aliases: ['naphthalene', 'paradichlorobenzene', 'PDB', 'moth crystals', 'moth flakes', 'camphor tablets'],
		category: 'household',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and a mothball odor on the breath',
					'Lethargy, weakness, and pale gums',
					'Brown or bluish gums (methemoglobinemia) in serious cases',
					'Possible liver and kidney damage with larger amounts',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Read the package to identify the active ingredient (naphthalene or paradichlorobenzene) and count how many were eaten.',
					'Do not induce vomiting unless a professional directs it.',
					'Watch for pale or brown gums, weakness, or vomiting.',
				],
				callVetIf: [
					'Any mothballs were eaten',
					'Vomiting or a mothball smell on the breath',
					'Pale, brown, or bluish gums, or weakness',
					'Reduced appetite or lethargy over the next day',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Lethargy, weakness, and pale gums',
					'Destruction of red blood cells (Heinz body anemia) — cats are especially sensitive to naphthalene',
					'Brown gums, dark urine, or labored breathing in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Identify the active ingredient from the package (naphthalene is worst for cats).',
					'Note how many were eaten.',
					'Do not induce vomiting unless directed.',
				],
				callVetIf: [
					'Any mothballs were eaten (cats are highly sensitive to naphthalene)',
					'Vomiting, drooling, or lethargy',
					'Pale, brown, or bluish gums, or dark urine',
					'Weakness or labored breathing',
				],
			},
		},
		description: 'Mothballs (naphthalene or paradichlorobenzene) are moderately toxic to cats and dogs; cats are more sensitive to naphthalene. Call a vet if eaten.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why are cats more sensitive to mothballs?',
				answer: 'Cats are especially vulnerable to naphthalene because their red blood cells are more easily damaged by oxidative chemicals, causing Heinz body anemia — the cells rupture and the cat becomes weak and pale. Even one naphthalene mothball can be dangerous to a cat.',
			},
			{
				question: 'How can I tell which type of mothball my pet ate?',
				answer: 'Read the package label — the active ingredient will be either naphthalene or paradichlorobenzene (sometimes camphor). Naphthalene is the more toxic type, especially for cats. If you cannot find the label, tell the vet and bring any remaining product or packaging.',
			},
			{
				question: 'What are the warning signs of mothball poisoning?',
				answer: 'Watch for vomiting, a mothball odor on the breath, lethargy, and pale or brownish gums. In serious cases you may see dark urine, labored breathing, or weakness from anemia. Symptoms can develop over hours to a couple of days, so call a vet even if your pet seems fine at first.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'bleach',
		name: 'Bleach',
		aliases: ['sodium hypochlorite', 'chlorine bleach', 'household bleach', 'bleach cleaner', 'cleaning bleach'],
		category: 'household',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and pawing at the mouth',
					'Redness or burns in the mouth and throat',
					'Vomiting and coughing',
					'Eye and nose irritation from the fumes',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Offer water or milk to rinse the mouth if the dog can swallow normally.',
					'Note the bleach concentration and how much was ingested.',
					'Do NOT induce vomiting — bleach is corrosive and burns again on the way up.',
				],
				callVetIf: [
					'A significant amount or concentrated bleach was ingested',
					'Drooling, mouth burns, or refusing to eat',
					'Vomiting, especially with blood',
					'Coughing or breathing difficulty',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and pawing at the mouth',
					'Redness or sores in the mouth',
					'Vomiting',
					'Eye and breathing irritation from fumes (cats have sensitive airways)',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Offer water to rinse the mouth if the cat will drink on its own.',
					'Move the cat to fresh air if fumes are present.',
					'Do NOT induce vomiting — the corrosive liquid causes more damage coming back up.',
				],
				callVetIf: [
					'Bleach was ingested or inhaled in concentration',
					'Drooling, mouth burns, or refusing to eat',
					'Vomiting or coughing',
					'Wheezing or breathing difficulty',
				],
			},
		},
		description: 'Bleach (sodium hypochlorite) is moderately toxic to cats and dogs, causing mouth, throat, and lung irritation. Do not induce vomiting — call a vet.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'Why should I never induce vomiting after bleach?',
				answer: 'Bleach is a corrosive. If a pet vomits it back up, the chemical burns the mouth, throat, and esophagus a second time, and there is also a risk of inhaling it into the lungs. Instead, rinse the mouth with water and call a vet for guidance.',
			},
			{
				question: 'Is it dangerous to mix bleach with other cleaners around pets?',
				answer: 'Very. Mixing bleach with ammonia creates toxic chloramine gas, and mixing it with acids (like some toilet or drain cleaners) releases chlorine gas. Both can severely damage a pet\'s (and person\'s) lungs. Never mix cleaning products, and keep pets out of the room until surfaces are dry and aired out.',
			},
			{
				question: 'How serious is household bleach compared to concentrated bleach?',
				answer: 'Regular household bleach (around 3–6% sodium hypochlorite) usually causes mouth and stomach irritation rather than severe burns. Concentrated or "ultra" bleach and pool chemicals are far more corrosive and more dangerous. Call a vet with the concentration and amount swallowed.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'toilet-bowl-cleaner',
		name: 'Toilet Bowl Cleaner',
		aliases: ['toilet cleaner', 'bowl cleaner', 'hydrochloric acid cleaner', 'bleach toilet cleaner', 'descaler'],
		category: 'household',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Drooling and pawing at the mouth from chemical burns',
					'Red, ulcerated mouth and throat',
					'Vomiting, possibly with blood',
					'Abdominal pain and refusing to eat',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Read the label and note the active ingredient (hydrochloric acid, bleach, or other corrosives) and concentration.',
					'Offer water to rinse the mouth if the dog can swallow normally.',
					'Do NOT induce vomiting — the corrosive chemical burns again on the way up.',
				],
				callVetIf: [
					'Any toilet bowl cleaner was ingested',
					'Drooling, mouth burns, or refusing to eat',
					'Vomiting, especially with blood',
					'Difficulty breathing or swallowing',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Drooling and pawing at the mouth',
					'Ulcers or redness in the mouth and throat',
					'Vomiting (possibly bloody)',
					'Not eating and lethargy',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the active ingredient and concentration from the label.',
					'Offer water to rinse the mouth if the cat will drink.',
					'Do NOT induce vomiting — corrosives cause worse burns returning up.',
				],
				callVetIf: [
					'Any toilet bowl cleaner was ingested',
					'Drooling, mouth burns, or refusing to eat',
					'Vomiting',
					'Breathing or swallowing difficulty',
				],
			},
		},
		description: 'Toilet bowl cleaner is severely toxic to cats and dogs — it is corrosive and burns the mouth and gut. Do not induce vomiting. Call a vet immediately.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'What makes toilet bowl cleaner so corrosive?',
				answer: 'Many toilet bowl cleaners contain hydrochloric acid or strong alkalis, and some are bleach-based. These chemicals corrode tissue on contact, causing burns in the mouth, throat, and stomach. The damage can be deep, so even a small amount licked from the bowl warrants a vet call.',
			},
			{
				question: 'Can my pet drink from a freshly cleaned toilet?',
				answer: 'Not safely. Residual cleaner left in the bowl water can irritate or burn the mouth and throat. Keep the lid down and prevent access until the bowl has been flushed several times and no chemical smell remains. Call a vet if your pet drinks freshly treated toilet water.',
			},
			{
				question: 'Why is inducing vomiting the wrong move here?',
				answer: 'Like other corrosives, toilet bowl cleaner burns on the way down and would burn again coming back up — potentially perforating the esophagus. Vomit can also be inhaled into the lungs. The safer step is to rinse the mouth, give water if the pet can swallow, and call a vet immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'essential-oils',
		name: 'Essential Oils',
		aliases: ['tea tree oil', 'melaleuca', 'eucalyptus oil', 'citrus oil', 'clove oil', 'pennyroyal', 'wintergreen', 'peppermint oil', 'diffuser oil'],
		category: 'household',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and vomiting',
					'Wobbliness, depression, or weakness',
					'Tremors or a low body temperature',
					'Liver damage with larger or repeated exposures',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note which oil was involved, the concentration, and whether it was licked, applied to the skin, or inhaled.',
					'If it was on the skin, wash the area with dish soap and rinse well.',
					'Do not induce vomiting unless a professional directs it.',
				],
				callVetIf: [
					'Any essential oil was ingested or applied to a dog',
					'Drooling, vomiting, or wobbliness',
					'Tremors, weakness, or depression',
					'Yellowing of the eyes or gums (liver signs) in following days',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and wobbliness',
					'Tremors, severe depression, or collapse',
					'Low body temperature and low heart rate',
					'Liver failure and breathing difficulty in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — this is an emergency for cats.',
					'Note which oil, the concentration, and the route (mouth, skin, or diffuser).',
					'If the oil is on the skin, wash immediately with dish soap and rinse thoroughly.',
					'Get to a clinic fast; do not wait for symptoms to worsen.',
				],
				callVetIf: [
					'Any essential oil touches a cat\'s skin or mouth, or a cat is exposed to a diffuser',
					'Drooling, vomiting, or wobbliness',
					'Tremors, depression, or collapse',
					'Labored breathing or jaundice',
				],
			},
		},
		description: 'Essential oils (tea tree, citrus, eucalyptus, clove) are severely toxic to cats and risky for dogs. Cats lack the enzyme to clear them — an emergency.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why are essential oils so much more dangerous to cats than dogs?',
				answer: 'Cats lack the liver enzyme glucuronosyltransferase (UGT), which other species use to break down the phenols and terpenes in essential oils. Without it, the compounds build up and damage the liver and nervous system. Even small amounts on the skin, from a diffuser, or licked off fur can be life-threatening to a cat.',
			},
			{
				question: 'Which essential oils are most dangerous to pets?',
				answer: 'Tea tree (melaleuca), pennyroyal, citrus (d-limonene and linalool), eucalyptus, clove, cinnamon, wintergreen, peppermint, pine, and ylang ylang are among the most toxic. Concentrated oils and oil-based products (like some "natural" flea treatments) are the highest risk. Keep all pure oils and diffusers away from cats especially.',
			},
			{
				question: 'Are essential oil diffusers safe around cats?',
				answer: 'Not reliably. Diffusers release micro-droplets that settle on a cat\'s fur and are then licked off during grooming, and the inhaled vapors can also irritate sensitive airways. Avoid using diffusers in rooms cats cannot leave, and never apply essential oils to a cat for fleas or any other reason.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'plug-in-fragrance',
		name: 'Plug-In Air Fresheners',
		aliases: ['wall plug-in', 'plug-in fragrance', 'electric air freshener', 'scented oil warmer', 'air wick', 'febreeze plug', 'glade plug-ins', 'room freshener'],
		category: 'household',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Coughing, sneezing, or watery eyes from the vapors',
					'Drooling or vomiting if scented oil is licked from a spill or the unit',
					'Wobbliness or lethargy after ingesting the concentrated oil',
					'Skin or mouth irritation from direct contact with the oil',
				],
				firstAid: [
					'Call a veterinarian or poison hotline — especially if any oil was licked or swallowed.',
					'Unplug the unit and move the dog to fresh, well-ventilated air.',
					'Note the brand and, if visible on the label, the fragrance ingredients.',
					'If oil is on the fur or skin, wash with dish soap and rinse well; do not let the dog lick it off.',
				],
				callVetIf: [
					'Any scented oil was ingested or got on the skin',
					'Persistent coughing, wheezing, or labored breathing',
					'Vomiting, drooling, or wobbliness',
					'Lethargy or refusal to eat after exposure',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Coughing, wheezing, and labored breathing (cats have highly sensitive airways)',
					'Drooling, vomiting, and wobbliness if oil is ingested',
					'Depression, low body temperature, or collapse with larger exposures',
					'Possible liver effects from fragrance compounds and essential-oil ingredients',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — cats are especially vulnerable to inhaled fragrances and ingested oils.',
					'Unplug the unit and move the cat to fresh air right away.',
					'Note the brand and any listed ingredients; some plug-ins contain essential-oil components cats cannot metabolize.',
					'If oil is on the fur, wash immediately with dish soap and rinse thoroughly — cats will lick it off while grooming.',
					'Get to a clinic without delay if breathing changes or any oil was swallowed.',
				],
				callVetIf: [
					'A cat is exposed to a plug-in fragrance (ingested, skin contact, or heavy inhalation)',
					'Coughing, wheezing, or any change in breathing',
					'Drooling, vomiting, wobbliness, or depression',
					'Collapse, low body temperature, or jaundice',
				],
			},
		},
		description: 'Plug-in air fresheners are risky for cats and dogs — vapors irritate airways, and the scented oil is toxic if licked. Cats are most sensitive. Call a vet.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Are plug-in air fresheners safe for cats?',
				answer: 'Not reliably. Plug-ins heat scented oil to release volatile fragrance compounds into the air, which can irritate a cat\'s sensitive airways and trigger coughing or wheezing. Some products also contain essential-oil ingredients (such as citrus, pine, or eucalyptus compounds) that cats cannot metabolize. The ASPCA and Pet Poison Helpline advise keeping cats away from strong fragrances and never letting them contact the oil.',
			},
			{
				question: 'What happens if my pet licks the scented oil from a plug-in?',
				answer: 'The concentrated oil in a plug-in refill can cause drooling, vomiting, wobbliness, and mouth or stomach irritation. In cats, ingested fragrance compounds and any essential-oil components can also affect the liver and nervous system. Wipe the mouth, wash any oil off the fur so it is not licked off again, and call a vet or poison hotline with the product name.',
			},
			{
				question: 'How are plug-in air fresheners different from essential oil diffusers?',
				answer: 'They overlap but are not identical. Essential oil diffusers release concentrated pure oils, which are directly toxic to cats because cats lack the liver enzyme to clear them. Plug-ins use synthetic fragrances and solvents, and sometimes essential-oil components, heated into the air — the main risks are airway irritation from the vapors and poisoning if the oil is ingested. Both warrant keeping cats away, especially in unventilated rooms.',
			},
			{
				question: 'Which air fresheners are safest to use around pets?',
				answer: 'Avoid plug-ins, aerosols, and scented oils in rooms pets cannot leave. Pet-safe options include ventilation, baking-soda-based odor absorbers, and cleaning the underlying cause of odors. If you use any fragrance, keep the room well-ventilated and let pets leave freely. Never apply essential oils or fragrance products directly to a pet.',
			},
		],
		lastReviewed: '2026-07-18',
	},
	{
		slug: 'potpourri',
		name: 'Potpourri',
		aliases: ['liquid potpourri', 'simmering potpourri', 'potpourri oil', 'scented botanicals', 'simmer pot'],
		category: 'household',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and vomiting',
					'Wobbliness or depression from alcohol and essential oils',
					'Mouth and throat irritation',
					'Possible liver effects with larger amounts',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Note whether it was liquid or dry potpourri and the ingredients if listed.',
					'Rinse the mouth with water if the dog will drink.',
					'Do not induce vomiting unless a professional directs it.',
				],
				callVetIf: [
					'Any potpourri was eaten or liquid potpourri drunk',
					'Drooling, vomiting, or wobbliness',
					'Depression or weakness',
					'Yellowing gums or eyes in following days',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Severe drooling, vomiting, and mouth burns',
					'Wobbliness, depression, and low body temperature',
					'Difficulty breathing',
					'Liver and kidney damage from concentrated essential oils',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — this is an emergency for cats.',
					'Note the type (liquid is worst) and ingredients.',
					'If liquid potpourri is on the fur or skin, wash with dish soap and rinse well — cats will lick it off.',
					'Get to a clinic without delay.',
				],
				callVetIf: [
					'Any potpourri was eaten, or liquid potpourri touched a cat\'s skin',
					'Drooling, vomiting, or wobbliness',
					'Depression, low body temperature, or collapse',
					'Labored breathing or jaundice',
				],
			},
		},
		description: 'Potpourri is severely toxic to cats and moderately so to dogs — it packs concentrated essential oils and alcohol. Call a vet immediately if eaten.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is liquid potpourri so dangerous, especially to cats?',
				answer: 'Liquid and simmering potpourri contain concentrated essential oils and often alcohol, and sometimes cationic surfactants — all of which cats cannot metabolize. Even skin contact is dangerous because cats groom themselves and swallow it. A few licks can cause severe poisoning.',
			},
			{
				question: 'Is dry potpourri safer than liquid?',
				answer: 'Dry potpourri is generally less concentrated than liquid, but it is still coated in essential oils and can cause drooling, vomiting, and stomach upset. If eaten in quantity, the dried botanicals can also cause a blockage. Keep both forms out of reach and call a vet if any is eaten.',
			},
			{
				question: 'What should I do if potpourri gets on my cat\'s fur?',
				answer: 'Wash the area immediately with dish soap and plenty of water, because a cat will lick the oil off and swallow it. Then call a vet — even if the cat seems fine, the oils can be absorbed through the skin or ingested during grooming. Do not wait for symptoms.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'paint',
		name: 'Paint',
		aliases: ['latex paint', 'water-based paint', 'oil-based paint', 'alkyd paint', 'paint thinner', 'mineral spirits', 'turpentine', 'solvent'],
		category: 'household',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and drooling (latex paint mainly causes stomach upset)',
					'Mouth irritation from the taste and chemicals',
					'With oil-based paint or solvents: wobbliness, depression, and breathing trouble',
					'Possible aspiration pneumonia if solvents are inhaled into the lungs',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Note whether it is latex (water-based) or oil-based paint, and whether paint thinner or solvent was involved.',
					'For latex paint on the skin, wash with mild soap and water.',
					'Do NOT induce vomiting for oil-based paint or solvents — they can be inhaled into the lungs and cause pneumonia.',
				],
				callVetIf: [
					'A large amount of paint was ingested',
					'Any oil-based paint, paint thinner, or solvent was ingested',
					'Vomiting, wobbliness, or depression',
					'Coughing or breathing difficulty',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Drooling and vomiting from latex paint',
					'With oil-based paint or solvents: wobbliness and depression',
					'Breathing irritation from fumes (cats have sensitive airways)',
					'Possible aspiration pneumonia from solvents',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Note the paint type and whether solvents were involved.',
					'Move the cat to fresh air if fumes are present.',
					'Do NOT induce vomiting for oil-based paint or solvents.',
				],
				callVetIf: [
					'A significant amount of paint was ingested',
					'Oil-based paint, paint thinner, or solvent was ingested',
					'Wobbliness, depression, or vomiting',
					'Coughing, wheezing, or labored breathing',
				],
			},
		},
		description: 'Paint is mildly toxic to cats and dogs in latex form; oil-based paint and solvents are more serious. Call a vet, especially after oil paint or turpentine.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'Is latex (water-based) paint dangerous if my pet licks it?',
				answer: 'Latex paint is generally low in toxicity and small amounts usually cause only mild drooling, vomiting, or stomach upset. The bigger risks are larger amounts, additives, and the vomiting itself. Still call a vet with the product name and amount, especially if your pet vomits or seems unwell.',
			},
			{
				question: 'Why is oil-based paint and paint thinner more dangerous?',
				answer: 'Oil-based paints and solvents like mineral spirits and turpentine contain petroleum hydrocarbons that affect the nervous system and, most importantly, can be inhaled into the lungs during vomiting and cause severe aspiration pneumonia. That is why you should never induce vomiting after these products.',
			},
			{
				question: 'Can paint fumes hurt my pet?',
				answer: 'Strong solvent fumes in a poorly ventilated room can irritate a pet\'s eyes and airways, and cats are especially sensitive. Keep pets out of rooms being painted until the paint is dry and the area is aired out. If your pet wheezes, coughs, or seems distressed, move them to fresh air and call a vet.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'silica-gel',
		name: 'Silica Gel Packets',
		aliases: ['silica gel', 'desiccant packet', 'moisture absorber', 'silicon dioxide', 'do not eat packet'],
		category: 'household',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild stomach upset if the beads are ingested',
					'Vomiting or diarrhea in some dogs',
					'Choking or intestinal blockage if the whole packet is swallowed',
				],
				firstAid: [
					'Call a veterinarian or poison hotline for guidance.',
					'Note whether the packet was chewed open or swallowed whole.',
					'Offer water and monitor appetite and stool.',
					'Do not induce vomiting unless directed — the packet could cause a blockage.',
				],
				callVetIf: [
					'The whole packet was swallowed (blockage risk)',
					'Repeated vomiting or not eating',
					'Abdominal pain or constipation',
					'Symptoms persist beyond a day',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild drooling or stomach upset',
					'Vomiting or reduced appetite',
					'Choking or blockage risk if the packet is swallowed whole',
				],
				firstAid: [
					'Call a veterinarian or poison hotline for guidance.',
					'Note whether the packet was chewed or swallowed whole.',
					'Offer water and monitor appetite and litter box use.',
					'Do not induce vomiting unless directed.',
				],
				callVetIf: [
					'The whole packet was swallowed',
					'Repeated vomiting or not eating',
					'Constipation or belly pain',
					'Symptoms persist beyond a day',
				],
			},
		},
		description: 'Silica gel packets are only mildly toxic to cats and dogs — mainly stomach upset. They can choke if swallowed whole. Call a vet if worried.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'Are silica gel packets really toxic?',
				answer: 'The silica itself (silicon dioxide) is essentially non-toxic and the "Do Not Eat" warning is mainly about the packet being a choking and blockage hazard. Ingested beads usually cause only mild stomach upset. The rare concern is a moisture indicator that contains cobalt chloride, which is mildly harmful.',
			},
			{
				question: 'What if my pet swallowed the whole packet?',
				answer: 'The bigger risk is physical, not chemical. An intact packet can block the throat or intestines, especially in small dogs and cats. Do not induce vomiting — that could lodge it in the throat. Call a vet, and watch for vomiting, not eating, belly pain, or constipation.',
			},
			{
				question: 'Do I need to do anything if my dog just chewed a packet open?',
				answer: 'Usually not much beyond monitoring. Wipe any beads from the mouth, offer water, and watch appetite and stool for a day. Call a vet or poison hotline to be sure, especially if your dog vomits, seems lethargic, or ate a large amount of beads.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'glow-jewelry',
		name: 'Glow Jewelry & Glow Sticks',
		aliases: ['glow stick', 'glow necklace', 'glow bracelet', 'light stick', 'dibutyl phthalate', 'luminescent'],
		category: 'household',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Sudden heavy drooling from the bitter taste',
					'Gagging, pawing at the mouth, or vomiting',
					'Mild agitation or retching',
					'Irritation of the mouth and throat',
				],
				firstAid: [
					'Call a veterinarian or poison hotline if symptoms are concerning.',
					'Rinse the mouth and face with water (or offer tasty water/broth to flush the taste).',
					'Wash any glowing liquid off the fur and skin with soap and water.',
					'Offer a small meal or treat to settle the stomach and clear the taste.',
				],
				callVetIf: [
					'Drooling or gagging does not settle within 30–60 minutes',
					'Repeated vomiting',
					'Signs of distress, agitation, or not eating',
					'A large amount was ingested',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Sudden, dramatic drooling (the bitter taste is a strong trigger for cats)',
					'Pawing at the mouth and gagging',
					'Vomiting or retching',
					'Agitation or hiding from the distress',
				],
				firstAid: [
					'Call a veterinarian if drooling or distress does not settle.',
					'Rinse the mouth gently with water and offer a small amount of milk or tuna water to flush the taste.',
					'Wash any liquid off the fur with soap and water so the cat does not re-ingest it while grooming.',
					'Keep the cat calm in a quiet, dim room until it settles.',
				],
				callVetIf: [
					'Heavy drooling continues beyond 30–60 minutes',
					'Repeated vomiting or refusing to eat',
					'Severe agitation or breathing difficulty',
					'A large amount was ingested',
				],
			},
		},
		description: 'Glow jewelry (glow sticks) is mildly toxic to cats and dogs — the bitter liquid causes drooling. Wash it off and call a vet if symptoms persist.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'What is inside glow sticks, and is it dangerous?',
				answer: 'The liquid is mostly dibutyl phthalate (a plasticizer), sometimes with phenol, plus a glass ampule that activates the glow. It is not highly toxic, but it tastes extremely bitter, which triggers heavy drooling, gagging, and sometimes vomiting. Most cases are mild and self-limiting.',
			},
			{
				question: 'Why do cats drool so much after biting a glow stick?',
				answer: 'Cats are particularly sensitive to bitter tastes, so even a tiny puncture can cause sudden, dramatic drooling and agitation — which can look alarming but is usually not dangerous. Rinsing the mouth and offering something tasty to drink helps clear the taste within an hour.',
			},
			{
				question: 'What should I do at home after my pet bites a glow stick?',
				answer: 'Rinse the mouth with water, wash any glowing liquid off the fur so it is not licked off again, and offer a small treat or broth to clear the taste. Most pets settle within an hour. Call a vet if drooling or vomiting does not stop, or if a large amount was swallowed.',
			},
		],
		lastReviewed: '2026-07-11',
	},
];
