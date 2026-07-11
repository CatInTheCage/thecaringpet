// Food toxins for the Pet Toxin Lookup tool.
import type { Toxin } from '../../types/toxin';
import {
	ASPCA_PEOPLE_FOODS,
	ASPCA_POISON_CONTROL,
	ASPCA_PLANTS,
	MERCK_TOXICOLOGY,
	PPH_POISONS,
} from './sources';

export const foodToxins: Toxin[] = [
	{
		slug: 'soy-sauce',
		name: 'Soy Sauce',
		aliases: ['soy', 'tamari', 'shoyu'],
		category: 'food',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Excessive thirst and urination',
					'Mild sodium ion imbalance with small amounts',
					'Vomiting or diarrhea with larger amounts',
				],
				firstAid: [
					'Offer plenty of fresh water right away.',
					'Wipe any sauce off the fur or face.',
					'Note roughly how much was eaten and when.',
				],
				callVetIf: [
					'Vomiting that will not stop',
					'Lethargy or weakness',
					'Tremors, stumbling, or seizures',
					'A large amount was ingested (more than a lick)',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Salt (sodium ion) poisoning',
					'Vomiting and diarrhea',
					'Lethargy and "walking drunk"',
					'In severe cases: tremors or seizures',
				],
				firstAid: [
					'Wipe any residue from fur or paws.',
					'Offer fresh water but do not force drinking.',
					'Keep the cat calm and monitor closely.',
				],
				callVetIf: [
					'Any vomiting',
					'Lethargy or disorientation',
					'Any neurological signs (tremors, seizures)',
					'More than a tiny lick was ingested',
				],
			},
		},
		description: 'Soy sauce is moderately toxic to cats and mildly toxic to dogs due to its very high sodium content. See symptoms and what to do.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Can a small amount of soy sauce hurt my cat?',
				answer: 'A tiny lick is unlikely to cause serious harm, but soy sauce is extremely salty, and cats are small. Larger amounts can cause sodium ion poisoning with vomiting, lethargy, and in severe cases tremors or seizures. Offer water, watch closely, and call a vet or poison hotline if you see any symptoms.',
			},
			{
				question: 'Why is soy sauce worse for cats than dogs?',
				answer: 'Cats are generally smaller and more sensitive to sodium imbalances than dogs, so the same spill reaches a toxic dose more easily. The high salt can quickly upset their electrolyte balance.',
			},
			{
				question: 'What about low-sodium soy sauce or tamari?',
				answer: 'Low-sodium and tamari versions still contain far more salt than is safe, and tamari is wheat-free soy sauce, not salt-free. Treat any of them the same way: small taste = monitor, larger amount = call a vet.',
			},
			{
				question: 'Should I make my pet throw up after eating soy sauce?',
				answer: 'No. Do not induce vomiting unless a veterinarian or poison control professional specifically tells you to. Giving water and calling a hotline for guidance is the safer first step.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'chocolate',
		name: 'Chocolate',
		aliases: ['theobromine', 'cocoa', 'cacao', 'candy bar', 'baking chocolate'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Restlessness, panting, and hyperactivity',
					'Rapid heart rate and tremors',
					'In serious cases: seizures, heart arrhythmias, collapse',
				],
				firstAid: [
					'Note the type of chocolate (dark/baking is worst) and amount eaten.',
					'Remove any remaining chocolate from reach.',
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms.',
				],
				callVetIf: [
					'Any amount of dark, bakers, or cocoa was eaten',
					'Restlessness, panting, or tremors appear',
					'Vomiting, rapid breathing, or a racing heart',
					'Seizures or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Agitation and elevated heart rate',
					'Tremors and muscle rigidity',
					'In serious cases: seizures and collapse',
				],
				firstAid: [
					'Note the type and amount of chocolate eaten.',
					'Call a veterinarian or poison hotline immediately.',
					'Keep the cat quiet while you get guidance.',
				],
				callVetIf: [
					'Any chocolate was eaten (cats are very sensitive)',
					'Vomiting, agitation, or a fast heart rate',
					'Tremors or seizures',
				],
			},
		},
		description: 'Chocolate is severely toxic to both cats and dogs because of theobromine. Dark and baking chocolate are most dangerous. Call a vet at once.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is chocolate toxic to pets?',
				answer: 'Chocolate contains theobromine (and caffeine), which dogs and cats metabolize far more slowly than humans. It builds up and overstimulates the heart, muscles, and nervous system, causing vomiting, tremors, a racing heart, and in serious cases seizures.',
			},
			{
				question: 'Which chocolate is most dangerous?',
				answer: 'The darker and more concentrated, the worse. Baking chocolate and high-percentage dark chocolate contain the most theobromine, followed by dark, then milk, then white (which has very little). Even small amounts of dark or baking chocolate can be an emergency for a small pet.',
			},
			{
				question: 'How much chocolate is an emergency?',
				answer: 'It depends on the chocolate type, the amount, and your pet\'s weight. Dark or baking chocolate, or any amount that causes symptoms, is an emergency. Call a veterinarian or poison hotline right away with the type and amount eaten.',
			},
			{
				question: 'What are the first signs of chocolate poisoning?',
				answer: 'Vomiting, diarrhea, restlessness, panting, and a fast heart rate often show up within a few hours, followed by tremors or seizures in serious cases. Do not wait for symptoms to worsen before calling.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'grapes-raisins',
		name: 'Grapes & Raisins',
		aliases: ['grape', 'raisin', 'sultana', 'currant', 'zante currant'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting (often within hours of eating)',
					'Lethargy and loss of appetite',
					'Decreased or absent urination as kidneys fail',
					'Increased thirst, then kidney failure',
				],
				firstAid: [
					'Remove any remaining grapes or raisins from reach.',
					'Call a veterinarian or poison hotline immediately, even if no symptoms yet.',
					'Note how many were eaten and when.',
				],
				callVetIf: [
					'Any grapes or raisins were eaten',
					'Vomiting or lethargy appears',
					'Drinking less, urinating less, or not urinating',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Lethargy and reduced appetite',
					'Possible kidney effects (cats are less studied but at risk)',
				],
				firstAid: [
					'Remove any remaining grapes or raisins.',
					'Call a veterinarian or poison hotline for guidance.',
					'Watch urination and energy closely.',
				],
				callVetIf: [
					'Any grapes or raisins were eaten',
					'Vomiting or lethargy appears',
					'Changes in urination or drinking',
				],
			},
		},
		description: 'Grapes and raisins are severely toxic to dogs and can cause kidney failure. Cats are also at risk. Call a vet immediately — do not wait for symptoms.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'How many grapes or raisins are dangerous?',
				answer: 'There is no confirmed safe amount. Toxicity varies widely between individual dogs, and kidney failure has occurred from a small number of grapes or raisins. Treat any ingestion as potentially serious and call a vet right away.',
			},
			{
				question: 'What makes grapes and raisins toxic?',
				answer: 'The exact toxic principle is still being studied. Grape ingestion is linked to acute kidney failure in dogs, so even though the mechanism is not fully pinned down, the risk is well documented and the response is the same: call a vet immediately.',
			},
			{
				question: 'Are raisins more dangerous than grapes?',
				answer: 'Raisins are dried grapes, so a given weight of raisins contains the toxic material of many more grapes. Gram for gram they are more concentrated, but both are dangerous and should be treated the same way.',
			},
			{
				question: 'What are the warning signs of grape poisoning?',
				answer: 'Vomiting, often within a few hours, is the earliest sign. Watch for lethargy, loss of appetite, increased thirst, and then a drop in urination as the kidneys are affected. Kidney damage can develop within a day or two.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'xylitol',
		name: 'Xylitol',
		aliases: ['birch sugar', 'sugar alcohol', 'sugar-free gum', 'sugar-free candy', 'peanut butter sweetener'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'A dangerous drop in blood sugar (hypoglycemia) within 30–60 minutes',
					'Vomiting, weakness, and staggering',
					'Seizures from low blood sugar',
					'Possible liver failure within hours to days',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms.',
					'Note the product and how much was eaten.',
					'Unless directed by a professional, do not induce vomiting (blood sugar can crash fast).',
					'Have honey or corn syrup on hand only if a vet tells you to use it for low blood sugar.',
				],
				callVetIf: [
					'Any xylitol-containing product was eaten',
					'Vomiting, weakness, or staggering',
					'Seizures or collapse',
					'Jaundice (yellow gums or eyes) or reduced appetite in the following days',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Possible low blood sugar with drooling and weakness',
					'Vomiting',
					'Liver effects are less documented in cats but cannot be ruled out',
				],
				firstAid: [
					'Call a veterinarian or poison hotline for guidance.',
					'Note the product and amount eaten.',
					'Watch for weakness, drooling, or vomiting.',
				],
				callVetIf: [
					'Any xylitol-containing product was eaten',
					'Weakness, drooling, or vomiting',
					'Any signs of low blood sugar (staggering, seizures)',
				],
			},
		},
		description: 'Xylitol is severely toxic to dogs and can cause a sudden blood-sugar crash and liver failure. It is also risky for cats. Call a vet immediately.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'What products contain xylitol?',
				answer: 'Sugar-free gum, mints, and candy are the most common, but xylitol also appears in some peanut butters, baked goods, toothpaste, mouthwash, chewable vitamins, and supplements. Check labels for "xylitol" or "birch sugar".',
			},
			{
				question: 'How fast does xylitol affect dogs?',
				answer: 'Blood sugar can drop within 30 to 60 minutes, causing vomiting, weakness, and seizures. Liver damage can follow over hours to days. Because it acts fast, do not wait for symptoms — call a vet immediately.',
			},
			{
				question: 'Should I make my dog vomit after eating xylitol?',
				answer: 'Not on your own. Because xylitol can crash blood sugar very quickly, inducing vomiting without professional guidance can be dangerous. Call a veterinarian or poison hotline first and follow their instructions.',
			},
			{
				question: 'Is xylitol dangerous to cats?',
				answer: 'Cats appear less sensitive than dogs, but xylitol is still considered risky for cats and can cause low blood sugar and vomiting. Call a vet if a cat eats a xylitol product rather than waiting to see what happens.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'onion',
		name: 'Onion',
		aliases: ['onions', 'allium', 'scallion', 'green onion', 'shallot'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Destruction of red blood cells (hemolytic anemia)',
					'Lethargy, weakness, and pale gums',
					'Reduced appetite and vomiting',
					'Dark or red-tinged urine',
				],
				firstAid: [
					'Remove any remaining onion from reach.',
					'Note the amount and form (raw, cooked, powder are all toxic).',
					'Call a veterinarian or poison hotline, especially for a large amount.',
				],
				callVetIf: [
					'A large amount or onion powder was eaten',
					'Weakness, pale gums, or lethargy',
					'Dark or red urine',
					'Rapid breathing or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Red blood cell destruction (cats are especially sensitive)',
					'Weakness and pale gums',
					'Reduced appetite, vomiting, drooling',
					'Dark or red-tinged urine',
				],
				firstAid: [
					'Remove any remaining onion.',
					'Call a veterinarian or poison hotline immediately.',
					'Note the amount eaten.',
				],
				callVetIf: [
					'Any onion was eaten (cats are highly sensitive)',
					'Weakness, pale gums, or breathing changes',
					'Dark or red urine',
				],
			},
		},
		description: 'Onions are severely toxic to both cats and dogs — they destroy red blood cells and cause anemia. Cats are especially sensitive. Call a vet.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Are cooked onions safer than raw?',
				answer: 'No. Cooking does not destroy the toxic compounds (N-propyl disulfide and related thiosulfates). Raw, cooked, dehydrated, and powdered onions are all toxic, and onion powder is especially concentrated.',
			},
			{
				question: 'How much onion is dangerous?',
				answer: 'Cats are far more sensitive than dogs, and toxicity can build up over several small meals, not just one big one. Even a small amount can affect a cat, while dogs usually need a larger dose. Call a vet with the amount and your pet\'s weight.',
			},
			{
				question: 'What are the signs of onion poisoning?',
				answer: 'Onions destroy red blood cells, causing anemia. Watch for weakness, lethargy, pale gums, reduced appetite, and dark or red-tinged urine. Symptoms may appear a few days after ingestion.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'garlic',
		name: 'Garlic',
		aliases: ['garlic clove', 'garlic powder', 'allium sativum'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Red blood cell destruction leading to anemia',
					'Vomiting, diarrhea, and drooling',
					'Weakness and pale gums',
					'Dark or red-tinged urine',
				],
				firstAid: [
					'Remove any remaining garlic.',
					'Note the amount and form (powder is most concentrated).',
					'Call a veterinarian or poison hotline.',
				],
				callVetIf: [
					'Any significant amount or garlic powder was eaten',
					'Weakness, pale gums, or lethargy',
					'Dark or red urine',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Red blood cell destruction (cats are highly sensitive)',
					'Vomiting, drooling, and reduced appetite',
					'Weakness and pale gums',
					'Dark or red-tinged urine',
				],
				firstAid: [
					'Remove any remaining garlic.',
					'Call a veterinarian or poison hotline immediately.',
					'Note the amount eaten.',
				],
				callVetIf: [
					'Any garlic was eaten (cats are very sensitive)',
					'Weakness, pale gums, or breathing changes',
					'Dark or red urine',
				],
			},
		},
		description: 'Garlic is severely toxic to cats and dogs — more concentrated than onion, it destroys red blood cells. Cats are especially sensitive. Call a vet.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Is garlic more toxic than onion?',
				answer: 'Yes, gram for gram garlic is more concentrated in the toxic compounds (thiosulfates) than onion, so a smaller amount can cause harm. Both destroy red blood cells and cause anemia.',
			},
			{
				question: 'Is garlic powder dangerous?',
				answer: 'Very. Garlic powder is highly concentrated, so even a small amount from seasoning can be a problem, especially for cats and small dogs. Treat it as seriously as raw garlic.',
			},
			{
				question: 'Is garlic good for fleas in pets?',
				answer: 'No. The idea that garlic repels fleas is a myth, and garlic is toxic to dogs and cats. Giving garlic for flea control risks anemia with no proven benefit. Use veterinarian-recommended flea preventives instead.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'caffeine',
		name: 'Caffeine',
		aliases: ['coffee', 'coffee grounds', 'energy drink', 'tea', 'espresso', 'caffeinated'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Restlessness, panting, and hyperactivity',
					'Rapid or irregular heart rate',
					'Vomiting and elevated blood pressure',
					'Tremors, seizures, and collapse in serious cases',
				],
				firstAid: [
					'Note the source (coffee, energy drink, pills) and amount.',
					'Call a veterinarian or poison hotline immediately.',
					'Remove any remaining product from reach.',
				],
				callVetIf: [
					'Any significant caffeine was eaten or drunk',
					'Restlessness, panting, or a racing heart',
					'Vomiting or tremors',
					'Seizures or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Restlessness and agitation',
					'Rapid heart rate and elevated blood pressure',
					'Vomiting and muscle tremors',
					'Seizures and collapse in serious cases',
				],
				firstAid: [
					'Note the source and amount.',
					'Call a veterinarian or poison hotline immediately.',
					'Keep the cat calm and quiet.',
				],
				callVetIf: [
					'Any caffeine was ingested',
					'Agitation or a fast heart rate',
					'Vomiting or tremors',
					'Seizures or collapse',
				],
			},
		},
		description: 'Caffeine is severely toxic to cats and dogs — it overstimulates the heart and nervous system. Coffee grounds and energy drinks are common sources. Call a vet.',
		sources: [ASPCA_POISON_CONTROL, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'How much caffeine is dangerous?',
				answer: 'Pets are far more sensitive to caffeine than humans. Coffee grounds, espresso, energy drinks, caffeine pills, and diet supplements are the most dangerous because they are concentrated. Call a vet with the source and amount.',
			},
			{
				question: 'Are coffee grounds dangerous to pets?',
				answer: 'Yes. Used coffee grounds are concentrated caffeine and smell tempting to some dogs. Keep compost and used grounds out of reach, and call a vet if any are eaten.',
			},
			{
				question: 'What are the signs of caffeine poisoning?',
				answer: 'Restlessness, panting, a racing or irregular heart, vomiting, and tremors, progressing to seizures in serious cases. Symptoms can appear within 1 to 2 hours. Do not wait — call a vet.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'alcohol',
		name: 'Alcohol',
		aliases: ['ethanol', 'beer', 'wine', 'liquor', 'rum', 'vodka', 'yeast dough'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Depression, staggering, and disorientation',
					'Vomiting and drooling',
					'Dangerously low blood sugar and body temperature',
					'In serious cases: breathing difficulty, coma',
				],
				firstAid: [
					'Note the type and amount of alcohol.',
					'Call a veterinarian or poison hotline immediately.',
					'Keep the pet warm and quiet.',
				],
				callVetIf: [
					'Any alcohol was ingested',
					'Staggering, disorientation, or slow breathing',
					'Vomiting or weakness',
					'Unresponsiveness',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Disorientation and staggering',
					'Vomiting and drooling',
					'Low blood sugar and low body temperature',
					'In serious cases: coma',
				],
				firstAid: [
					'Note the type and amount.',
					'Call a veterinarian or poison hotline immediately.',
					'Keep the cat warm.',
				],
				callVetIf: [
					'Any alcohol was ingested',
					'Disorientation or slow breathing',
					'Vomiting or weakness',
				],
			},
		},
		description: 'Alcohol is severely toxic to cats and dogs — even small amounts cause dangerous drops in blood sugar and body temperature. Call a vet immediately.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Can pets drink a little alcohol?',
				answer: 'No. Pets are far more sensitive to ethanol than humans, and even small amounts can cause dangerous low blood sugar, low body temperature, and depression of the nervous system. Any ingestion warrants a call to a vet.',
			},
			{
				question: 'Is raw bread dough the same risk as alcohol?',
				answer: 'Similar. Raw yeast dough ferments in the stomach and produces alcohol, which is then absorbed. It also expands, risking a bloated stomach. Raw dough is an emergency — call a vet right away.',
			},
			{
				question: 'What are the signs of alcohol poisoning in pets?',
				answer: 'Staggering, disorientation, drooling, vomiting, and weakness, with a drop in body temperature and blood sugar. Severe cases progress to slow breathing and coma. Symptoms can appear within an hour.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'macadamia-nuts',
		name: 'Macadamia Nuts',
		aliases: ['macadamia', 'macadamia nut', 'hawaii nut'],
		category: 'food',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Weakness, especially in the hind legs',
					'Depression and lethargy',
					'Vomiting and tremors',
					'Fever in some dogs',
				],
				firstAid: [
					'Note how many nuts were eaten and when.',
					'Call a veterinarian or poison hotline for guidance.',
					'Watch for weakness or tremors over the next 12 hours.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Hind-leg weakness or inability to stand',
					'Vomiting, tremors, or fever',
					'Symptoms worsen over several hours',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Possible stomach upset (cats are less studied)',
					'Vomiting or lethargy',
				],
				firstAid: [
					'Remove any remaining nuts.',
					'Watch for vomiting or lethargy.',
					'Call a vet if symptoms appear.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or lethargy',
				],
			},
		},
		description: 'Macadamia nuts are moderately toxic to dogs, causing weakness and tremors; they are mildly toxic to cats. Call a vet, especially with weakness.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why do macadamia nuts affect dogs specifically?',
				answer: 'The exact toxin is not fully identified, but dogs are uniquely sensitive to macadamia nuts. The hallmark sign is weakness in the hind legs, often with tremors and fever. Most dogs recover with supportive care, but a vet should guide treatment.',
			},
			{
				question: 'Are macadamia nuts dangerous to cats?',
				answer: 'Cats are less studied and appear less sensitive than dogs, but macadamia nuts can still cause stomach upset. Keep them away from all pets and call a vet if a cat eats a large amount.',
			},
			{
				question: 'How long after eating macadamia nuts do symptoms appear?',
				answer: 'Signs usually appear within 12 hours and can last a day or two. Watch for hind-leg weakness, lethargy, vomiting, and tremors, and call a vet for guidance.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'avocado',
		name: 'Avocado',
		aliases: ['persin', 'guacamole', 'avocado pit', 'avocado peel'],
		category: 'food',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea (mainly from the pit and peel)',
					'Stomach upset from the high fat content',
					'Choking or blockage risk from the large pit',
				],
				firstAid: [
					'Note which parts were eaten (flesh, peel, pit).',
					'Watch for vomiting or reduced appetite.',
					'Call a vet if the pit may have been swallowed.',
				],
				callVetIf: [
					'The pit was swallowed (blockage risk)',
					'Persistent vomiting or abdominal pain',
					'Lethargy or refusal to eat',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild stomach upset',
					'Vomiting or diarrhea',
				],
				firstAid: [
					'Remove any remaining avocado.',
					'Watch for vomiting.',
					'Call a vet if symptoms persist.',
				],
				callVetIf: [
					'Persistent vomiting or diarrhea',
					'Reduced appetite or lethargy',
				],
			},
		},
		description: 'Avocado is mildly toxic to cats and dogs, mostly causing stomach upset; the pit is a choking and blockage risk. Birds and horses are far more sensitive.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Is avocado flesh toxic to dogs and cats?',
				answer: 'The flesh is only mildly irritating to dogs and cats, mostly causing stomach upset. The bigger concerns are the pit (a choking and blockage hazard) and the high fat, which can trigger pancreatitis in sensitive dogs.',
			},
			{
				question: 'What about guacamole?',
				answer: 'Guacamole is riskier than plain avocado because it usually contains onion and garlic, which are toxic. Treat guacamole ingestion more seriously and call a vet.',
			},
			{
				question: 'Why is avocado listed as toxic if dogs and cats only get mild symptoms?',
				answer: 'Avocado contains persin, which is highly toxic to birds, rabbits, and horses but only mildly affects dogs and cats. It is listed so owners know the stomach-upset and pit-blockage risks, and so bird owners do not assume it is safe.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'raw-bread-dough',
		name: 'Raw Bread Dough',
		aliases: ['yeast dough', 'pizza dough', 'raw dough', 'bread yeast'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Dough expanding in the stomach, causing painful bloating',
					'Alcohol production and absorption (ethanol toxicity)',
					'Vomiting, disorientation, and weakness',
					'Dangerously low blood sugar and body temperature',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note how much dough was eaten.',
					'Do not wait — the dough keeps rising in the stomach.',
				],
				callVetIf: [
					'Any raw yeast dough was eaten',
					'A swollen belly, retching, or restlessness',
					'Disorientation or weakness',
					'Vomiting that will not stop',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Stomach expansion and discomfort',
					'Alcohol absorption causing disorientation',
					'Vomiting and weakness',
					'Low blood sugar and low body temperature',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note how much was eaten.',
					'Keep the cat warm and quiet.',
				],
				callVetIf: [
					'Any raw yeast dough was eaten',
					'A swollen belly or vomiting',
					'Disorientation or weakness',
				],
			},
		},
		description: 'Raw bread dough is severely toxic to cats and dogs — it rises in the stomach and produces alcohol. Call a vet immediately; do not wait for symptoms.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why is raw bread dough an emergency?',
				answer: 'The warm, moist stomach makes the yeast keep rising, so the dough expands and can block or rupture the stomach. The yeast also produces alcohol, which is absorbed and causes ethanol toxicity. Both effects make this an emergency.',
			},
			{
				question: 'How fast does raw dough cause problems?',
				answer: 'Expansion and alcohol production can begin within a couple of hours. Signs include a swollen belly, unproductive retching, disorientation, and weakness. Call a vet immediately rather than monitoring at home.',
			},
			{
				question: 'Is baked bread dangerous too?',
				answer: 'Baked bread is not toxic in the same way, though large amounts can cause stomach upset or blockage. The danger is specifically raw yeast dough that can still rise.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'fatty-foods',
		name: 'Fatty Foods',
		aliases: ['fat trimmings', 'bacon grease', 'pancetta', 'fried food', 'table scraps', 'turkey skin'],
		category: 'food',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Abdominal pain and reduced appetite',
					'Pancreatitis (inflamed pancreas), which can be severe',
					'Lethargy and fever',
				],
				firstAid: [
					'Note what was eaten and how much.',
					'Withhold further fatty food.',
					'Call a veterinarian if vomiting or belly pain appears.',
				],
				callVetIf: [
					'Repeated vomiting or a painful belly',
					'Lethargy, fever, or refusal to eat',
					'A large amount of fat or grease was eaten',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Reduced appetite and abdominal pain',
					'Pancreatitis (less common but possible)',
				],
				firstAid: [
					'Remove access to fatty foods.',
					'Call a vet if vomiting or lethargy appears.',
				],
				callVetIf: [
					'Repeated vomiting or belly pain',
					'Lethargy or refusal to eat',
				],
			},
		},
		description: 'Fatty foods are moderately toxic to cats and dogs and can trigger painful pancreatitis. Fat trimmings, grease, and fried foods are common culprits.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Can I give my dog fat trimmings or turkey skin?',
				answer: 'No. High-fat table scraps like fat trimmings, bacon grease, and turkey skin are a leading trigger of pancreatitis in dogs, which causes severe vomiting and belly pain and can be life-threatening. Keep them out of reach, especially around holidays.',
			},
			{
				question: 'What is pancreatitis and why is fatty food a risk?',
				answer: 'Pancreatitis is inflammation of the pancreas, often triggered by a sudden high-fat meal. It causes vomiting, abdominal pain, lethargy, and fever, and can become severe. Small dogs and some breeds are more prone to it.',
			},
			{
				question: 'How soon after fatty food do symptoms appear?',
				answer: 'Vomiting and belly pain can start within hours to a day. If your pet ate a large amount of fat and shows repeated vomiting or seems painful, call a vet promptly.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'cooked-bones',
		name: 'Cooked Bones',
		aliases: ['cooked chicken bones', 'splintered bones', 'bone fragments', 'rib bones'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Choking or gagging',
					'Splinters puncturing the throat, stomach, or intestines',
					'Vomiting, drooling, or abdominal pain',
					'Constipation or bloody stool from blockage or tears',
				],
				firstAid: [
					'Call a veterinarian immediately — do not try to pull out a stuck bone.',
					'Note what kind of bone and how much was eaten.',
					'Watch for choking, vomiting, or bloody stool.',
				],
				callVetIf: [
					'Choking, gagging, or trouble breathing',
					'Vomiting, drooling, or refusing to eat',
					'Bloody stool or signs of pain',
					'Any cooked bone was swallowed',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Choking or gagging on splinters',
					'Vomiting or drooling',
					'Constipation or bloody stool',
				],
				firstAid: [
					'Call a veterinarian immediately.',
					'Watch for choking or vomiting.',
				],
				callVetIf: [
					'Choking or gagging',
					'Vomiting or refusing to eat',
					'Bloody stool',
				],
			},
		},
		description: 'Cooked bones are severely toxic (dangerous) to dogs and moderately so to cats — they splinter and can puncture or block the gut. Call a vet if any are swallowed.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why are cooked bones dangerous when raw bones are sometimes given?',
				answer: 'Cooking makes bones brittle, so they splinter into sharp shards that can puncture the throat, stomach, or intestines, or cause blockages. Even raw bones carry risks and should only be given under veterinary guidance.',
			},
			{
				question: 'Which bones are most dangerous?',
				answer: 'Cooked poultry bones (chicken, turkey) are the worst because they splinter easily. Cooked rib and chop bones can also splinter or cause blockages. Never give cooked bones of any kind.',
			},
			{
				question: 'What should I do if my dog ate a cooked bone?',
				answer: 'Call a veterinarian immediately. Do not induce vomiting, as splinters can do more damage coming back up, and do not pull at a bone stuck in the mouth or throat. Watch for choking, vomiting, drooling, and bloody stool.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'milk-dairy',
		name: 'Milk & Dairy',
		aliases: ['milk', 'cheese', 'cream', 'lactose', 'ice cream', 'yogurt'],
		category: 'food',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Diarrhea and gas from lactose intolerance',
					'Stomach cramps and bloating',
					'Pancreatitis risk from high-fat dairy in large amounts',
				],
				firstAid: [
					'Withhold further dairy.',
					'Ensure access to fresh water.',
					'Watch for diarrhea over the next day.',
				],
				callVetIf: [
					'Severe or bloody diarrhea',
					'Vomiting or belly pain',
					'A large amount of high-fat dairy was eaten',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Diarrhea and stomach upset (most cats are lactose intolerant)',
					'Gas and reduced appetite',
				],
				firstAid: [
					'Withhold further dairy.',
					'Offer fresh water.',
					'Watch for diarrhea.',
				],
				callVetIf: [
					'Severe or bloody diarrhea',
					'Vomiting or lethargy',
				],
			},
		},
		description: 'Milk and dairy are mildly toxic (upsetting) to cats and dogs — most are lactose intolerant and develop diarrhea. Large fatty amounts can trigger pancreatitis.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Can cats drink milk?',
				answer: 'Most adult cats are lactose intolerant, so cow\'s milk commonly causes diarrhea and stomach upset. The "saucer of milk" image is a myth — water is the better choice. Small amounts of plain yogurt or lactose-free milk are less likely to cause issues.',
			},
			{
				question: 'Is cheese bad for dogs?',
				answer: 'Small amounts of low-lactose cheese are usually tolerated, but many dogs are lactose intolerant and get diarrhea from dairy. High-fat cheeses in large amounts can also trigger pancreatitis. Keep dairy as an occasional tiny treat at most.',
			},
			{
				question: 'Why is dairy listed as a toxin if it is only mild?',
				answer: 'Dairy is not acutely poisonous, but it reliably causes gastrointestinal upset in lactose-intolerant pets and can trigger pancreatitis in large fatty amounts. It is listed so owners understand the diarrhea and pancreatitis risks.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'salt',
		name: 'Salt',
		aliases: ['sodium', 'table salt', 'rock salt', 'sea salt', 'deicing salt', 'playdough'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Extreme thirst and excessive urination',
					'Vomiting and diarrhea',
					'Lethargy, "walking drunk," and muscle tremors',
					'In serious cases: seizures, kidney damage, death',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately for guidance.',
					'Offer water only as directed — too much too fast can be dangerous.',
					'Note the source (salt, playdough, deicer) and amount.',
				],
				callVetIf: [
					'A large amount of salt or salty playdough was eaten',
					'Vomiting, tremors, or disorientation',
					'Excessive thirst or changes in urination',
					'Seizures',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Sodium ion poisoning',
					'Vomiting, lethargy, and "walking drunk"',
					'Muscle tremors',
					'In serious cases: seizures',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the source and amount.',
					'Follow professional guidance on offering water.',
				],
				callVetIf: [
					'A significant amount of salt was ingested',
					'Vomiting, tremors, or disorientation',
					'Seizures',
				],
			},
		},
		description: 'Salt is severely toxic to cats and dogs in excess — it causes sodium ion poisoning with tremors and seizures. Playdough, deicing salt, and rock salt are common sources.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'How much salt is dangerous?',
				answer: 'Large amounts of salt — from rock salt or deicers licked off paws, salty playdough, or a lot of table salt — can cause sodium ion poisoning. Pets are small, so the toxic dose is reached more easily than in people. Call a vet with the source and amount.',
			},
			{
				question: 'Is sidewalk deicing salt dangerous to pets?',
				answer: 'Yes. Deicing salt on sidewalks can irritate paws and, if licked off or ingested, cause sodium ion poisoning. Wipe your pet\'s paws after walks, and call a vet if they ingest deicer or show excessive thirst, vomiting, or tremors.',
			},
			{
				question: 'Should I give my pet lots of water after salt ingestion?',
				answer: 'Not without veterinary guidance. Rehydrating too quickly after high salt can cause dangerous fluid shifts in the brain. Call a vet or poison hotline first and follow their instructions on water and treatment.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'nutmeg',
		name: 'Nutmeg',
		aliases: ['myristicin', 'ground nutmeg', 'baking spice'],
		category: 'food',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and stomach pain',
					'Disorientation and a rapid heart rate',
					'Tremors or seizures in larger amounts',
					'Dry mouth and abdominal pain',
				],
				firstAid: [
					'Note how much nutmeg was eaten.',
					'Call a veterinarian or poison hotline, especially for a large amount.',
					'Watch for tremors or disorientation.',
				],
				callVetIf: [
					'A large amount (e.g. a spoonful or more) was eaten',
					'Disorientation, tremors, or a racing heart',
					'Vomiting or abdominal pain',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and stomach upset',
					'Disorientation and rapid heart rate',
					'Tremors in larger amounts',
				],
				firstAid: [
					'Note the amount eaten.',
					'Call a veterinarian for guidance.',
					'Watch for tremors or disorientation.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Disorientation or tremors',
					'Persistent vomiting',
				],
			},
		},
		description: 'Nutmeg is moderately toxic to cats and dogs — large amounts cause disorientation, tremors, and a rapid heart rate. Call a vet, especially after baking amounts.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'How much nutmeg is dangerous?',
				answer: 'The small pinch used in most recipes is unlikely to harm a pet, but a larger amount — a teaspoon or more — can cause toxicity from the compound myristicin. The risk rises with the dose, so call a vet if a significant amount was eaten.',
			},
			{
				question: 'What are the signs of nutmeg poisoning?',
				answer: 'Vomiting, stomach pain, disorientation, a rapid heart rate, and dry mouth, with tremors or seizures in larger amounts. Symptoms can last a day or more.',
			},
			{
				question: 'Is nutmeg in baked goods a risk?',
				answer: 'Most baked goods contain only a small amount of nutmeg, so a bite is low risk. The danger is direct ingestion of ground nutmeg from the spice cabinet. Keep spices out of reach.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'hops',
		name: 'Hops',
		aliases: ['brewing hops', 'beer hops', 'humulus lupulus', 'spent hops'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Dangerously high body temperature (malignant hyperthermia)',
					'Panting and rapid heart rate',
					'Restlessness and muscle tremors',
					'Seizures and death in serious cases',
				],
				firstAid: [
					'Call a veterinarian immediately — this can escalate fast.',
					'Note whether raw, pelletized, or spent hops were eaten.',
					'Begin cooling the dog with water and a fan while getting help.',
				],
				callVetIf: [
					'Any hops were eaten (especially by a large breed)',
					'Panting, restlessness, or a hot body',
					'Tremors or seizures',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Possible elevated body temperature',
					'Panting and restlessness',
					'Tremors in larger amounts',
				],
				firstAid: [
					'Call a veterinarian immediately.',
					'Note the amount eaten.',
					'Keep the cat cool.',
				],
				callVetIf: [
					'Any hops were eaten',
					'Panting, restlessness, or a hot body',
					'Tremors',
				],
			},
		},
		description: 'Hops are severely toxic to dogs — they trigger dangerous, rapid overheating (malignant hyperthermia). Brewing and spent hops are the risk. Call a vet immediately.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why are hops so dangerous to dogs?',
				answer: 'Hops can trigger malignant hyperthermia in dogs — a rapid, uncontrolled rise in body temperature that damages organs and can be fatal within hours. Some breeds (like Greyhounds) appear more sensitive, but any dog can be affected.',
			},
			{
				question: 'Are spent hops from homebrewing dangerous?',
				answer: 'Yes. Spent hops left in the trash or compost after homebrewing are a common cause of poisoning because dogs find them appealing. Dispose of hops where pets cannot reach them, and call a vet immediately if any are eaten.',
			},
			{
				question: 'What do I do while waiting for the vet?',
				answer: 'Call the vet first, then start cooling your dog with cool (not ice-cold) water and a fan to bring the body temperature down safely. Get to a clinic immediately — this is a fast-moving emergency.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'raw-eggs',
		name: 'Raw Eggs',
		aliases: ['raw egg', 'egg white', 'avidin', 'salmonella', 'uncooked egg'],
		category: 'food',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Diarrhea from Salmonella or E. coli risk',
					'Biotin deficiency with frequent raw-egg-white feeding',
					'Vomiting or reduced appetite',
				],
				firstAid: [
					'Withhold further raw eggs.',
					'Watch for diarrhea over the next day.',
					'Call a vet if vomiting or severe diarrhea appears.',
				],
				callVetIf: [
					'Severe or bloody diarrhea',
					'Vomiting or lethargy',
					'Signs of dehydration',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Diarrhea and possible bacterial infection',
					'Vomiting or reduced appetite',
				],
				firstAid: [
					'Withhold further raw eggs.',
					'Watch for diarrhea.',
					'Call a vet if symptoms persist.',
				],
				callVetIf: [
					'Severe or bloody diarrhea',
					'Vomiting or lethargy',
				],
			},
		},
		description: 'Raw eggs are mildly toxic (risky) to cats and dogs — mainly a Salmonella and biotin-deficiency risk with regular feeding. A one-off egg is low risk.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Is an occasional raw egg safe?',
				answer: 'A single raw egg is unlikely to cause serious harm, but regular raw-egg feeding carries a Salmonella risk and, with raw egg whites, can lead to biotin deficiency over time. Cooked eggs in moderation are the safer choice.',
			},
			{
				question: 'What is the biotin concern with raw eggs?',
				answer: 'Raw egg white contains avidin, which binds biotin (a B vitamin) and can cause a deficiency if raw eggs are fed often. Cooking destroys avidin, which is why cooked eggs do not carry this risk.',
			},
			{
				question: 'Can raw eggs make my pet sick from bacteria?',
				answer: 'Yes. Raw eggs can carry Salmonella and other bacteria that cause diarrhea and vomiting, and pets can shed the bacteria in the home. This is a particular concern for young, old, or immunocompromised pets and people.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'rhubarb',
		name: 'Rhubarb',
		aliases: ['rhubarb leaves', 'oxalates', 'rheum', 'pie plant'],
		category: 'food',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and decreased appetite',
					'Abdominal pain and diarrhea',
					'Possible kidney effects from soluble oxalates in large amounts',
					'Weakness and tremors',
				],
				firstAid: [
					'Remove any remaining rhubarb.',
					'Note whether leaves or stalks were eaten (leaves are most toxic).',
					'Call a veterinarian or poison hotline.',
				],
				callVetIf: [
					'A large amount, especially the leaves, was eaten',
					'Vomiting or abdominal pain',
					'Changes in urination or weakness',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling and vomiting',
					'Abdominal pain and reduced appetite',
					'Possible kidney effects in larger amounts',
				],
				firstAid: [
					'Remove any remaining rhubarb.',
					'Call a veterinarian.',
					'Watch for vomiting or changes in urination.',
				],
				callVetIf: [
					'A significant amount was eaten',
					'Vomiting or belly pain',
					'Changes in urination',
				],
			},
		},
		description: 'Rhubarb is moderately toxic to cats and dogs — the leaves contain soluble oxalates that can cause vomiting and kidney effects. Call a vet if leaves are eaten.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Which part of rhubarb is toxic?',
				answer: 'The leaves are the dangerous part — they contain high levels of soluble oxalates. The stalks, which people eat, are much lower in oxalates but can still cause stomach upset in pets.',
			},
			{
				question: 'What do soluble oxalates do?',
				answer: 'Soluble oxalates can bind calcium and form crystals that damage the kidneys in large amounts, while also irritating the mouth and gut to cause drooling, vomiting, and diarrhea.',
			},
			{
				question: 'How much rhubarb is dangerous?',
				answer: 'A small nibble of stalk is usually low risk, but the leaves are far more concentrated. Call a vet if leaves were eaten or if a larger amount was ingested, especially if vomiting or changes in urination appear.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'chives-leeks',
		name: 'Chives & Leeks',
		aliases: ['chive', 'leek', 'allium', 'scallion', 'spring onion'],
		category: 'food',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Red blood cell destruction (anemia)',
					'Vomiting, diarrhea, and drooling',
					'Weakness and pale gums',
					'Dark or red-tinged urine',
				],
				firstAid: [
					'Remove any remaining chives or leeks.',
					'Note the amount eaten.',
					'Call a veterinarian or poison hotline.',
				],
				callVetIf: [
					'A larger amount was eaten',
					'Weakness, pale gums, or lethargy',
					'Dark or red urine',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Red blood cell destruction (cats are highly sensitive to alliums)',
					'Vomiting, drooling, and reduced appetite',
					'Weakness and pale gums',
					'Dark or red-tinged urine',
				],
				firstAid: [
					'Remove any remaining chives or leeks.',
					'Call a veterinarian immediately.',
					'Note the amount eaten.',
				],
				callVetIf: [
					'Any chives or leeks were eaten (cats are very sensitive)',
					'Weakness, pale gums, or breathing changes',
					'Dark or red urine',
				],
			},
		},
		description: 'Chives and leeks are severely toxic to cats and moderately toxic to dogs — like onion and garlic, they destroy red blood cells. Cats are especially sensitive.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Are chives as dangerous as onion and garlic?',
				answer: 'Chives, leeks, scallions, and spring onions are all part of the Allium family and contain the same red-blood-cell-damaging compounds as onion and garlic. Cats are especially sensitive, so even small amounts warrant a vet call.',
			},
			{
				question: 'Can the damage build up over time?',
				answer: 'Yes. Allium toxicity can accumulate from repeated small exposures, not just one large meal. If your cat regularly nibbles chives from the garden, the anemia can develop gradually. Remove access and consult a vet.',
			},
			{
				question: 'What signs should I watch for?',
				answer: 'Weakness, lethargy, pale gums, reduced appetite, and dark or red-tinged urine — all signs of anemia from red blood cell destruction. These may appear a few days after ingestion. Call a vet if you see them.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'walnuts',
		name: 'Walnuts',
		aliases: ['black walnut', 'english walnut', 'moldy walnuts', 'walnut shell'],
		category: 'food',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Tremors or seizures from moldy walnuts (tremorgenic mycotoxins)',
					'Abdominal pain and reduced appetite',
					'Blockage risk from shells',
				],
				firstAid: [
					'Remove any remaining walnuts.',
					'Note whether they were moldy (fallen/black walnuts are riskiest).',
					'Call a veterinarian or poison hotline.',
				],
				callVetIf: [
					'Moldy or fallen black walnuts were eaten',
					'Tremors, seizures, or vomiting',
					'A shell was swallowed',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Reduced appetite',
				],
				firstAid: [
					'Remove any remaining walnuts.',
					'Watch for vomiting.',
					'Call a vet if symptoms persist.',
				],
				callVetIf: [
					'Moldy walnuts were eaten',
					'Persistent vomiting or tremors',
				],
			},
		},
		description: 'Walnuts are moderately toxic to dogs, mainly when moldy — fallen black walnuts can cause tremors and seizures. Cats are mildly affected. Call a vet if moldy nuts are eaten.',
		sources: [ASPCA_PEOPLE_FOODS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why are fallen or moldy walnuts dangerous?',
				answer: 'Walnuts that fall and sit on the ground can grow mold that produces tremorgenic mycotoxins, which cause tremors and seizures in dogs. Black walnuts are especially associated with this risk. Store-bought fresh walnuts are lower risk but can still cause stomach upset.',
			},
			{
				question: 'Can walnut shells cause problems?',
				answer: 'Yes. Walnut shells are hard and indigestible, so swallowing them can cause choking or intestinal blockage. Keep shells and whole nuts out of reach.',
			},
			{
				question: 'What are the signs of moldy walnut poisoning?',
				answer: 'Vomiting, muscle tremors, and seizures can develop within hours of eating moldy walnuts. This can progress quickly, so call a vet immediately if tremors appear.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'energy-drinks',
		name: 'Energy Drinks',
		aliases: ['red bull', 'monster', 'rockstar', 'caffeinated drink', 'taurine drink', 'guarana'],
		category: 'food',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Restlessness, panting, and hyperactivity',
					'Rapid or irregular heart rate and elevated blood pressure',
					'Vomiting and tremors',
					'Seizures and collapse in serious cases',
				],
				firstAid: [
					'Note the brand, size, and amount drunk.',
					'Call a veterinarian or poison hotline immediately.',
					'Remove any remaining drink and clean spills.',
				],
				callVetIf: [
					'Any energy drink was ingested',
					'Restlessness, panting, or a racing heart',
					'Vomiting or tremors',
					'Seizures or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Agitation and rapid heart rate',
					'Vomiting and muscle tremors',
					'Elevated blood pressure',
					'Seizures and collapse in serious cases',
				],
				firstAid: [
					'Note the brand and amount.',
					'Call a veterinarian or poison hotline immediately.',
					'Keep the cat calm.',
				],
				callVetIf: [
					'Any energy drink was ingested',
					'Agitation or a fast heart rate',
					'Vomiting or tremors',
					'Seizures',
				],
			},
		},
		description: 'Energy drinks are severely toxic to cats and dogs — they pack caffeine, guarana, and sometimes xylitol. Even a small can is dangerous. Call a vet immediately.',
		sources: [ASPCA_POISON_CONTROL, PPH_POISONS],
		faqs: [
			{
				question: 'Why are energy drinks worse than coffee?',
				answer: 'Energy drinks are highly concentrated in caffeine and often add guarana (extra caffeine) and other stimulants, so a small can delivers a large dose. Some are also sweetened with xylitol, which is separately toxic to dogs. Treat any ingestion as an emergency.',
			},
			{
				question: 'How much energy drink is dangerous?',
				answer: 'Because the caffeine and stimulants are concentrated, even a few ounces can affect a small pet. Call a vet with the brand, can size, and how much was drunk. Do not wait for symptoms.',
			},
			{
				question: 'What signs should I watch for?',
				answer: 'Restlessness, panting, a racing or irregular heart, vomiting, and tremors, progressing to seizures in serious cases. Symptoms can appear within 1 to 2 hours.',
			},
		],
		lastReviewed: '2026-07-11',
	},
];
