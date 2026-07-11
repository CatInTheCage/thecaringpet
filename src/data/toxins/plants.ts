// Plant toxins for the Pet Toxin Lookup tool.
import type { Toxin } from '../../types/toxin';
import {
	ASPCA_PLANTS,
	ASPCA_POISON_CONTROL,
	MERCK_TOXICOLOGY,
	PPH_POISONS,
} from './sources';

export const plantToxins: Toxin[] = [
	{
		slug: 'sago-palm',
		name: 'Sago Palm',
		aliases: ['cycad', 'cycas revoluta', 'king sago', 'sago', 'coontie palm'],
		category: 'plant',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting (often with blood), diarrhea, and drooling',
					'Black, tarry stools from internal bleeding',
					'Yellowing of the skin and gums (jaundice) as the liver fails',
					'Lethargy, increased thirst, bruising, and in serious cases seizures, coma, or death',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms.',
					'Note which parts were eaten (seeds/nuts are most toxic) and how much.',
					'Remove any remaining plant material from the mouth.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
				],
				callVetIf: [
					'Any part of a sago palm was eaten (all parts are toxic)',
					'Vomiting, diarrhea, or yellowing of the gums or eyes',
					'Lethargy, bruising, or increased thirst',
					'Seizures, collapse, or unresponsiveness',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting (often with blood) and diarrhea',
					'Jaundice and liver failure',
					'Lethargy, drooling, and reduced appetite',
					'Seizures, coma, and death in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the parts eaten and amount.',
					'Keep the cat calm while getting guidance.',
				],
				callVetIf: [
					'Any part of a sago palm was eaten',
					'Vomiting, jaundice, or lethargy',
					'Seizures or collapse',
				],
			},
		},
		description: 'Sago palm is severely toxic to both cats and dogs — all parts (especially seeds) cause liver failure and death in up to half of cases. Call a vet at once.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Which part of the sago palm is most dangerous?',
				answer: 'All parts of the sago palm — leaves, trunk, roots, and especially the seeds (nuts) — are toxic. The seeds contain the highest concentration of cycasin, which causes liver failure. A single seed can be fatal to a small pet.',
			},
			{
				question: 'How fast do sago palm symptoms appear?',
				answer: 'Vomiting and diarrhea often start within hours, but liver damage can take a day or two to show as jaundice, lethargy, and bruising. Even if symptoms seem mild at first, this is an emergency — call a vet immediately because liver failure can develop silently.',
			},
			{
				question: 'Can a pet survive eating sago palm?',
				answer: 'Survival is possible with rapid, aggressive veterinary treatment, but sago palm has a high mortality rate — roughly half of affected pets do not survive. The sooner treatment begins (ideally before symptoms), the better the odds. Do not wait and watch at home.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'lily',
		name: 'Lily (True Lilies)',
		aliases: ['easter lily', 'tiger lily', 'asiatic lily', 'oriental lily', 'daylily', 'lilium', 'hemerocallis', 'lilly', 'lillies'],
		category: 'plant',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild stomach upset (vomiting, drooling)',
					'Irritation of the mouth and throat from nibbling leaves or bulbs',
					'Serious effects are uncommon in dogs',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water if there is drooling.',
					'Watch for vomiting and call a vet if it persists.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or lethargy',
					'Changes in urination (as a precaution)',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and loss of appetite within hours',
					'Increased or absent urination as kidneys fail within 12–24 hours',
					'Lethargy, dehydration, and a hunched or painful posture',
					'Kidney failure, seizures, and death without rapid treatment',
				],
				firstAid: [
					'Call a veterinarian or emergency clinic IMMEDIATELY — this is a life-threatening emergency.',
					'Bathe the cat to remove pollen from the fur if any is visible.',
					'Note which lily it was and whether leaves, flowers, pollen, or vase water was ingested.',
					'Do not wait for symptoms — even licking pollen or drinking the vase water can cause kidney failure.',
				],
				callVetIf: [
					'Any contact with a true lily — even pollen on the fur or vase water',
					'Vomiting, drooling, or lethargy',
					'Decreased or absent urination',
				],
			},
		},
		description: 'True lilies are severely toxic to cats — all parts, pollen, and vase water cause fatal kidney failure — and mildly toxic to dogs. A cat emergency: call a vet now.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Are all lilies dangerous to cats?',
				answer: 'True lilies (Lilium species — Easter, Tiger, Asiatic, Oriental, and Stargazer) and daylilies (Hemerocallis) are severely toxic to cats and cause kidney failure. Peace lilies, calla lilies, and lily of the valley are different plants with different toxins, but they are also harmful. Treat any "lily" exposure in a cat as an emergency and call a vet.',
			},
			{
				question: 'Can a cat get sick just from lily pollen or vase water?',
				answer: 'Yes. Every part of a true lily is toxic to cats — petals, leaves, stem, pollen, and even the water in the vase. A cat that brushes against pollen and grooms it off, or drinks the vase water, can develop fatal kidney failure. Keep true lilies out of any home with cats.',
			},
			{
				question: 'How quickly must a cat be treated after eating a lily?',
				answer: 'Treatment must begin within hours for the best chance of survival. Kidney damage can start within 12 to 24 hours. If you wait until the cat stops urinating or becomes lethargic, the prognosis is much worse. Call a vet or emergency clinic immediately — do not monitor at home.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'tulip',
		name: 'Tulip',
		aliases: ['tulipa', 'tulip bulb', 'tulip petals', 'tulip flowers'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea from mouth and gut irritation',
					'Increased heart rate and changes in breathing with larger amounts',
					'Tremors or lethargy with significant ingestion',
					'The bulb is far more toxic than the leaves or flowers',
				],
				firstAid: [
					'Remove any remaining plant or bulb material from the mouth.',
					'Rinse the mouth with water to reduce irritation.',
					'Note whether the bulb was eaten (it is most concentrated).',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'A tulip bulb was eaten',
					'Persistent vomiting, drooling, or diarrhea',
					'Changes in breathing or heart rate',
					'Lethargy or tremors',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea',
					'Mouth irritation and reduced appetite',
					'Lethargy or increased heart rate with larger amounts',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'A bulb was eaten',
					'Persistent vomiting or drooling',
					'Lethargy or breathing changes',
				],
			},
		},
		description: 'Tulips are moderately toxic to cats and dogs — the bulb is most dangerous, causing vomiting, drooling, and heart-rate changes. Call a vet if a bulb is eaten.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why is the tulip bulb more dangerous than the flower?',
				answer: 'The highest concentration of the toxic compounds (tulipalin A and B, and other glycosides) is in the bulb. Eating a bulb is much more dangerous than nibbling a leaf or petal, and digging up stored bulbs is a common cause of poisoning in dogs.',
			},
			{
				question: 'What are the signs of tulip poisoning?',
				answer: 'Drooling, vomiting, and diarrhea from irritation are most common. With larger amounts — especially from the bulb — watch for an increased heart rate, breathing changes, tremors, and lethargy. Call a vet if a bulb was eaten or symptoms appear.',
			},
			{
				question: 'Are cut tulips in a vase safe around pets?',
				answer: 'Cut tulip stems and flowers are less toxic than bulbs but can still cause drooling and vomiting if nibbled. The vase water can also become irritating. Keep bouquets out of reach and call a vet if your pet chews on them.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'azalea-rhododendron',
		name: 'Azalea & Rhododendron',
		aliases: ['azalea', 'rhododendron', 'rhodie', 'rose bay'],
		category: 'plant',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting (not eating), diarrhea, and drooling within hours',
					'Weakness, staggering, and a slow heart rate',
					'Dangerously low blood pressure',
					'In serious cases: seizures, coma, heart failure, and death',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Remove any remaining plant material from the mouth.',
					'Note how much was eaten — even a few leaves can be dangerous.',
					'Do not induce vomiting unless a veterinarian tells you to.',
				],
				callVetIf: [
					'Any azalea or rhododendron was eaten',
					'Vomiting, weakness, or staggering',
					'A slow or irregular heartbeat',
					'Seizures, collapse, or unresponsiveness',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and diarrhea',
					'Weakness and staggering',
					'Slow heart rate and low blood pressure',
					'Seizures, coma, and death in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Remove any remaining plant material.',
					'Keep the cat calm while getting guidance.',
				],
				callVetIf: [
					'Any azalea or rhododendron was eaten',
					'Vomiting, weakness, or staggering',
					'Seizures or collapse',
				],
			},
		},
		description: 'Azaleas and rhododendrons are severely toxic to cats and dogs — all parts contain grayanotoxins that cause vomiting, weakness, a slow heart, and can be fatal. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'How much azalea is dangerous?',
				answer: 'Eating even a few leaves of an azalea or rhododendron can cause poisoning because the grayanotoxins are potent. The leaves are also toxic when dried, so fallen leaves in autumn remain a hazard. Call a vet for any ingestion.',
			},
			{
				question: 'What do grayanotoxins do to the body?',
				answer: 'Grayanotoxins interfere with the body\'s sodium channels, which affects the heart and nerves. This causes vomiting, a dangerously slow heart rate, low blood pressure, weakness, and in serious cases seizures, coma, and death from heart failure.',
			},
			{
				question: 'What are the first signs of azalea poisoning?',
				answer: 'Vomiting, drooling, and diarrhea usually appear within hours, followed by weakness, staggering, and a slow heart rate. If you see these signs after a pet has access to azaleas, call a vet immediately — do not wait for symptoms to worsen.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'oleander',
		name: 'Oleander',
		aliases: ['nerium oleander', 'rose bay', 'rose laurel'],
		category: 'plant',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, diarrhea, and drooling',
					'A slow or irregular heart rate and abnormal heart rhythm',
					'Weakness, tremors, and collapse',
					'In serious cases: death from heart failure',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Remove any remaining plant material from the mouth.',
					'Note how much was eaten — all parts are toxic, even dried leaves and water from a vase.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
				],
				callVetIf: [
					'Any part of an oleander was eaten',
					'Vomiting, weakness, or collapse',
					'A slow, fast, or irregular heartbeat',
					'Tremors or seizures',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and diarrhea',
					'Abnormal heart rhythm and a slow heart rate',
					'Weakness, tremors, and collapse',
					'Death from heart failure in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Remove any remaining plant material.',
					'Keep the cat calm while getting guidance.',
				],
				callVetIf: [
					'Any part of an oleander was eaten',
					'Vomiting, weakness, or collapse',
					'An irregular or slow heartbeat',
				],
			},
		},
		description: 'Oleander is severely toxic to cats and dogs — all parts (even dried leaves and vase water) contain cardiac glycosides that cause dangerous heart problems. Call a vet at once.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Is it true that all parts of the oleander are toxic?',
				answer: 'Yes. Every part of the oleander plant — leaves, flowers, stems, seeds, and roots — is highly toxic, and the toxins remain active even when the plant is dried. Even water from a vase containing oleander can be poisonous. Never burn oleander and let pets near the smoke or ashes.',
			},
			{
				question: 'What do oleander toxins do to the heart?',
				answer: 'Oleander contains cardiac glycosides, which act like a powerful heart medication in overdose. They cause a dangerously slow or irregular heartbeat, abnormal rhythms, low blood pressure, and can lead to fatal heart failure. This is why any ingestion is an emergency.',
			},
			{
				question: 'How much oleander is lethal?',
				answer: 'A very small amount can be dangerous — even a few leaves have caused death in large animals, and pets are smaller. Because the cardiac glycosides are so potent, treat any ingestion as a life-threatening emergency and call a vet immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'dieffenbachia',
		name: 'Dieffenbachia (Dumb Cane)',
		aliases: ['dumb cane', 'dumbcane', 'dieffenbachia seguine', 'leopard lily', 'mother in law plant'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Immediate, intense burning and swelling of the mouth, lips, and tongue',
					'Drooling and difficulty swallowing',
					'Vomiting and foaming at the mouth',
					'In rare cases: swelling that blocks the airway',
				],
				firstAid: [
					'Rinse the mouth with water to remove plant material and ease burning.',
					'Wipe any sap off the fur or face.',
					'Offer water or milk to soothe the mouth.',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'Difficulty breathing, gagging, or swelling in the throat',
					'Persistent drooling or inability to swallow',
					'Vomiting that will not stop',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Burning, swelling, and redness of the mouth and tongue',
					'Drooling and pawing at the mouth',
					'Vomiting and reduced appetite',
					'Rarely: airway obstruction from severe swelling',
				],
				firstAid: [
					'Rinse the mouth with water carefully.',
					'Wipe any sap off the fur or paws.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'Difficulty breathing or swelling in the throat',
					'Persistent drooling or vomiting',
					'Reduced appetite lasting more than a day',
				],
			},
		},
		description: 'Dieffenbachia (dumb cane) is moderately toxic to cats and dogs — its sap causes intense mouth burning, swelling, and drooling. Call a vet if swelling or breathing trouble appears.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why is dieffenbachia called "dumb cane"?',
				answer: 'The plant gets its nickname because chewing it causes such intense mouth and throat swelling that a person or animal can temporarily lose the ability to speak ("dumb" meaning mute). The insoluble calcium oxalate crystals in the sap are what cause the burning and swelling.',
			},
			{
				question: 'What should I do if my pet chews on a dieffenbachia?',
				answer: 'Rinse the mouth with water to remove the irritating crystals and sap, wipe any sap off the fur, and offer water or milk to soothe the burning. Then call a vet or poison hotline for guidance, especially if there is swelling, drooling, or any trouble breathing.',
			},
			{
				question: 'Can dieffenbachia cause breathing problems?',
				answer: 'In rare cases, the throat swelling can become severe enough to block the airway. This is more of a risk with large ingestions. If your pet is gagging, struggling to breathe, or has obvious throat swelling, treat it as an emergency and get to a vet immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'pothos',
		name: 'Pothos',
		aliases: ['epipremnum aureum', 'golden pothos', 'devils ivy', "devil's ivy", 'money plant', 'taro vine'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Immediate burning and irritation of the mouth, lips, and tongue',
					'Drooling and foaming at the mouth',
					'Vomiting and difficulty swallowing',
					'In rare cases: swelling that affects breathing',
				],
				firstAid: [
					'Rinse the mouth with water to remove plant material.',
					'Wipe any sap off the fur or face.',
					'Offer water to soothe the mouth.',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'Difficulty breathing or swelling in the throat',
					'Persistent drooling or vomiting',
					'Reduced appetite lasting more than a day',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Burning, redness, and swelling of the mouth and tongue',
					'Drooling and pawing at the mouth',
					'Vomiting and reduced appetite',
					'Rarely: airway obstruction from swelling',
				],
				firstAid: [
					'Rinse the mouth with water carefully.',
					'Wipe any sap off the fur or paws.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'Difficulty breathing or throat swelling',
					'Persistent drooling or vomiting',
					'Refusal to eat lasting more than a day',
				],
			},
		},
		description: 'Pothos (devil\'s ivy) is moderately toxic to cats and dogs — its calcium-oxalate crystals cause mouth burning, drooling, and vomiting. Call a vet if swelling or breathing trouble appears.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'What makes pothos toxic to pets?',
				answer: 'Pothos contains insoluble calcium oxalate crystals. When a pet chews the plant, these needle-like crystals pierce the mouth and throat, causing instant burning, drooling, and swelling. The plant also contains other irritants that add to the stomach upset.',
			},
			{
				question: 'How serious is pothos ingestion?',
				answer: 'Most cases cause painful mouth irritation, drooling, and vomiting but are not life-threatening. The main danger is rare severe throat swelling that can block breathing. Rinse the mouth, and call a vet if there is any difficulty breathing, persistent vomiting, or significant swelling.',
			},
			{
				question: 'Is pothos safe if my cat just brushes against it?',
				answer: 'Brushing against pothos is unlikely to cause harm — the toxin is released when the plant is chewed or the sap contacts the mouth. However, if sap gets on the paws and the cat licks it, mouth irritation can occur. Wipe paws clean and keep the plant out of reach.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'aloe-vera',
		name: 'Aloe Vera',
		aliases: ['aloe', 'aloe barbadensis', 'aloe plant', 'burn plant'],
		category: 'plant',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea from the latex (the yellow sap under the leaf skin)',
					'Lethargy and changes in urine color',
					'Abdominal cramping',
					'The clear gel inside the leaf is less irritating',
				],
				firstAid: [
					'Note whether the dog chewed the leaf (latex) or just the gel.',
					'Watch for vomiting or diarrhea over the next several hours.',
					'Offer fresh water to prevent dehydration.',
					'Call a veterinarian if symptoms appear or a large amount was eaten.',
				],
				callVetIf: [
					'Persistent vomiting or diarrhea',
					'Lethargy or weakness',
					'Changes in urination',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Lethargy and reduced appetite',
					'Abdominal discomfort',
				],
				firstAid: [
					'Note how much was eaten.',
					'Watch for vomiting or diarrhea.',
					'Call a veterinarian if symptoms persist.',
				],
				callVetIf: [
					'Persistent vomiting or diarrhea',
					'Lethargy or refusal to eat',
					'Changes in urination',
				],
			},
		},
		description: 'Aloe vera is mildly toxic to cats and dogs — the latex under the leaf skin causes vomiting and diarrhea. The clear gel inside is less irritating. Call a vet if vomiting persists.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Which part of aloe vera is toxic to pets?',
				answer: 'The latex — the yellow sap found just under the leaf skin — is the toxic part. It contains anthraquinones that irritate the gut and cause vomiting and diarrhea. The clear gel inside the leaf is less irritating, but it is hard to separate the two when a pet chews the plant.',
			},
			{
				question: 'Is aloe vera gel safe for pets?',
				answer: 'The inner clear gel is less irritating than the latex and is sometimes used topically. However, store-bought aloe products and whole leaves can contain latex, which causes vomiting and diarrhea. Do not give aloe internally to pets without veterinary guidance.',
			},
			{
				question: 'What should I do if my dog chewed an aloe leaf?',
				answer: 'Watch for vomiting, diarrhea, and lethargy over the next several hours and offer fresh water. Most cases are mild, but call a veterinarian if symptoms are persistent, a large amount was eaten, or you notice changes in urination.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'daffodil',
		name: 'Daffodil (Narcissus)',
		aliases: ['narcissus', 'daffodil', 'jonquil', 'narcissus bulb', 'daffodil bulb'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and diarrhea from mouth and gut irritation',
					'Abdominal pain and reduced appetite',
					'In larger amounts: tremors, low blood pressure, and an irregular heart rate',
					'The bulb is the most toxic part',
				],
				firstAid: [
					'Remove any remaining plant or bulb material from the mouth.',
					'Rinse the mouth with water to reduce irritation.',
					'Note whether the bulb was eaten (it is most concentrated).',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'A daffodil bulb was eaten',
					'Persistent vomiting, drooling, or diarrhea',
					'Tremors, weakness, or an irregular heartbeat',
					'A large amount was ingested',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea',
					'Mouth irritation and reduced appetite',
					'In larger amounts: tremors or an abnormal heart rate',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'A bulb was eaten',
					'Persistent vomiting or drooling',
					'Tremors or breathing changes',
				],
			},
		},
		description: 'Daffodils (narcissus) are moderately toxic to cats and dogs — the bulb is most dangerous, causing vomiting, drooling, and in larger amounts tremors and heart issues. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Which part of the daffodil is most toxic?',
				answer: 'The bulb contains the highest concentration of the toxic compounds (lycorine and other alkaloids). The leaves, stems, and flowers are also toxic but less so. Dogs that dig up and eat stored bulbs are at the greatest risk.',
			},
			{
				question: 'What are the signs of daffodil poisoning?',
				answer: 'Drooling, vomiting, and diarrhea are the most common signs, caused by the irritating alkaloids. With larger ingestions — especially of the bulb — watch for abdominal pain, tremors, low blood pressure, and an irregular heart rate. Call a vet if a bulb was eaten.',
			},
			{
				question: 'Are daffodils in a vase safe around pets?',
				answer: 'Cut daffodil stems and flowers can still cause drooling and vomiting if chewed, and the vase water can become irritating. The main risk is the bulb, so keep stored bulbs well out of reach and call a vet if your pet chews on a bouquet.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'amaryllis',
		name: 'Amaryllis',
		aliases: ['amaryllis belladonna', 'belladonna lily', 'naked lady', 'amaryllis bulb', 'hippeastrum'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and diarrhea from mouth and gut irritation',
					'Abdominal pain and reduced appetite',
					'In larger amounts: tremors, drooling, and low blood pressure',
					'The bulb is the most toxic part',
				],
				firstAid: [
					'Remove any remaining plant or bulb material from the mouth.',
					'Rinse the mouth with water to reduce irritation.',
					'Note whether the bulb was eaten (it is most concentrated).',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'An amaryllis bulb was eaten',
					'Persistent vomiting or diarrhea',
					'Tremors, weakness, or lethargy',
					'A large amount was ingested',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea',
					'Mouth irritation and reduced appetite',
					'In larger amounts: tremors or lethargy',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'A bulb was eaten',
					'Persistent vomiting or drooling',
					'Lethargy or tremors',
				],
			},
		},
		description: 'Amaryllis is moderately toxic to cats and dogs — the bulb is most dangerous, causing vomiting, drooling, and abdominal pain. Popular at the holidays. Call a vet if a bulb is eaten.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why is amaryllis a common poisoning risk?',
				answer: 'Amaryllis bulbs are popular holiday gifts and indoor plants, and the bulbs are the most toxic part. Dogs that dig up or chew stored bulbs are at the greatest risk. All parts of the plant contain harmful alkaloids, but the bulb is the most concentrated.',
			},
			{
				question: 'What are the signs of amaryllis poisoning?',
				answer: 'Drooling, vomiting, and diarrhea from the irritating alkaloids are the most common signs. With larger ingestions — especially of the bulb — watch for abdominal pain, tremors, drooling, and low blood pressure. Call a vet if a bulb was eaten.',
			},
			{
				question: 'Are amaryllis flowers safer than the bulb?',
				answer: 'The flowers, leaves, and stems contain the same toxic alkaloids as the bulb, but in lower concentrations. They can still cause drooling and vomiting if chewed. The bulb is the most dangerous part, so keep stored bulbs away from pets.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'autumn-crocus',
		name: 'Autumn Crocus',
		aliases: ['colchicum autumnale', 'meadow saffron', 'naked lady', 'colchicum'],
		category: 'plant',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Delayed vomiting, diarrhea, and abdominal pain (can start hours after ingestion)',
					'Multi-organ damage: kidney and liver failure',
					'Bleeding disorders and breathing difficulty',
					'In serious cases: seizures, shock, and death',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms.',
					'Note how much was eaten and when.',
					'Remove any remaining plant material from the mouth.',
					'Do not induce vomiting unless a veterinarian tells you to.',
				],
				callVetIf: [
					'Any part of an autumn crocus was eaten',
					'Vomiting, diarrhea, or abdominal pain',
					'Weakness, bleeding, or bruising',
					'Reduced urination or jaundice',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, diarrhea, and abdominal pain',
					'Kidney and liver damage',
					'Bleeding disorders',
					'Seizures, shock, and death in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note how much was eaten.',
					'Keep the cat calm while getting guidance.',
				],
				callVetIf: [
					'Any part of an autumn crocus was eaten',
					'Vomiting or abdominal pain',
					'Weakness, bruising, or reduced urination',
				],
			},
		},
		description: 'Autumn crocus is severely toxic to cats and dogs — all parts contain colchicine, which causes delayed vomiting, organ failure, and can be fatal. Call a vet immediately.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'How is autumn crocus different from spring crocus?',
				answer: 'Autumn crocus (Colchicum autumnale) is highly toxic because it contains colchicine, which causes severe organ damage. Spring crocus (Crocus species) is far less toxic, usually causing only mild stomach upset. Because they look similar, treat any crocus ingestion seriously and call a vet.',
			},
			{
				question: 'Why is autumn crocus so dangerous?',
				answer: 'It contains colchicine, a potent toxin that damages cells throughout the body. Symptoms are often delayed by hours, which can make owners underestimate the danger. Colchicine causes severe vomiting, diarrhea, and then multi-organ failure affecting the kidneys, liver, and bone marrow.',
			},
			{
				question: 'How quickly do symptoms appear after eating autumn crocus?',
				answer: 'Vomiting and diarrhea often start 2 to 24 hours after ingestion, which is longer than many plant toxins. This delay can lead owners to think the pet is fine. Because of the severe organ damage that follows, call a vet immediately if any part was eaten — do not wait for symptoms.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'cyclamen',
		name: 'Cyclamen',
		aliases: ['cyclamen persicum', 'persian violet', 'sow bread', 'cyclamen tuber'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea from mouth and gut irritation',
					'Abdominal pain and reduced appetite',
					'With larger ingestions: abnormal heart rhythm, seizures, and death',
					'The tuber (root) is the most toxic part',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water to reduce irritation.',
					'Note whether the tuber was dug up and eaten.',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'A large amount or the tuber was eaten',
					'Persistent vomiting or diarrhea',
					'An irregular heartbeat or seizures',
					'Lethargy or weakness',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea',
					'Mouth irritation and reduced appetite',
					'With larger ingestions: abnormal heart rhythm or seizures',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'A large amount or the tuber was eaten',
					'Persistent vomiting or drooling',
					'Seizures or an irregular heartbeat',
				],
			},
		},
		description: 'Cyclamen is moderately toxic to cats and dogs — the tuber (root) is most dangerous, causing vomiting and in large amounts seizures and heart issues. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Which part of cyclamen is most toxic?',
				answer: 'The tuber (the swollen root) contains the highest concentration of the toxic saponins. The leaves and flowers are also toxic but less so. Dogs that dig up and chew the tuber are at the greatest risk of serious poisoning.',
			},
			{
				question: 'What are the signs of cyclamen poisoning?',
				answer: 'Drooling, vomiting, and diarrhea are the most common signs. With larger ingestions — especially of the tuber — watch for an abnormal heart rhythm, seizures, and death. Call a vet if a large amount or the tuber was eaten.',
			},
			{
				question: 'Are cyclamen houseplants safe around pets?',
				answer: 'No. Cyclamen is a common indoor flowering plant, and all parts are toxic. The main risk is if a pet digs up and eats the tuber, but chewing leaves and flowers can also cause vomiting and drooling. Keep cyclamen out of reach and call a vet if it is chewed.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'kalanchoe',
		name: 'Kalanchoe',
		aliases: ['kalanchoe blossfeldiana', 'mother of millions', 'chandelier plant', 'florist kalanchoe'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea from the heart toxins (bufadienolides)',
					'Drooling and reduced appetite',
					'In larger amounts: an abnormal heart rate and rhythm, weakness',
					'In serious cases: collapse and death',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Note how much was eaten.',
					'Call a veterinarian or poison hotline for guidance.',
					'Do not induce vomiting unless a veterinarian tells you to.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Vomiting, weakness, or collapse',
					'An irregular, slow, or fast heartbeat',
					'Lethargy or breathing difficulty',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Drooling and reduced appetite',
					'In larger amounts: an abnormal heart rate and weakness',
				],
				firstAid: [
					'Remove any remaining plant material.',
					'Call a veterinarian for guidance.',
					'Watch for vomiting or weakness.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Vomiting, weakness, or collapse',
					'An irregular heartbeat',
				],
			},
		},
		description: 'Kalanchoe is moderately toxic to cats and dogs — it contains cardiac glycosides that cause vomiting and in large amounts dangerous heart-rhythm problems. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Why is kalanchoe toxic to pets?',
				answer: 'Kalanchoe contains bufadienolides, which are cardiac glycosides — the same class of heart-affecting toxins found in oleander. They cause vomiting and diarrhea, and in larger amounts can disrupt the heart rate and rhythm. The flowers contain the highest concentration.',
			},
			{
				question: 'How much kalanchoe is dangerous?',
				answer: 'A small nibble may cause only mild stomach upset, but larger ingestions can lead to abnormal heart rhythms, weakness, and collapse. Because the cardiac effects are serious, call a vet with the amount eaten and your pet\'s weight rather than monitoring at home.',
			},
			{
				question: 'What signs should I watch for after kalanchoe ingestion?',
				answer: 'Vomiting, diarrhea, and drooling are the early signs. With larger amounts, watch for weakness, an irregular or abnormal heart rate, and collapse. Heart symptoms mean this is an emergency — call a vet immediately.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'jade-plant',
		name: 'Jade Plant',
		aliases: ['crassula ovata', 'money tree', 'money plant', 'lucky plant', 'friendship tree'],
		category: 'plant',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Lethargy and reduced appetite',
					'Incoordination or a "drunk" appearance in some dogs',
					'Slowed heart rate in rare cases',
				],
				firstAid: [
					'Remove any remaining plant material.',
					'Watch for vomiting or lethargy over the next several hours.',
					'Offer fresh water.',
					'Call a veterinarian if symptoms appear or a large amount was eaten.',
				],
				callVetIf: [
					'Persistent vomiting or diarrhea',
					'Lethargy, incoordination, or weakness',
					'A slow or irregular heartbeat',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Lethargy and reduced appetite',
					'Incoordination in some cats',
				],
				firstAid: [
					'Remove any remaining plant material.',
					'Watch for vomiting or lethargy.',
					'Call a veterinarian if symptoms persist.',
				],
				callVetIf: [
					'Persistent vomiting or diarrhea',
					'Lethargy or incoordination',
					'Refusal to eat',
				],
			},
		},
		description: 'Jade plant is mildly toxic to cats and dogs — it causes vomiting, lethargy, and sometimes incoordination. Usually mild, but call a vet if symptoms persist or a lot is eaten.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'What makes the jade plant toxic to pets?',
				answer: 'The exact toxic principle in jade plants is not fully understood, but ingestion causes vomiting, diarrhea, and lethargy, and some pets show incoordination or a "drunk" appearance. The effects are usually mild, but the plant should be kept out of reach.',
			},
			{
				question: 'How serious is jade plant ingestion?',
				answer: 'Most cases are mild, with vomiting, diarrhea, and lethargy that resolve with supportive care. However, some pets show incoordination or a slowed heart rate. Call a vet if symptoms are persistent, a large amount was eaten, or your pet seems weak or uncoordinated.',
			},
			{
				question: 'Is a jade plant safe to keep in a home with pets?',
			 answer: 'Jade plants are only mildly toxic, but they are commonly chewed by pets. Keep them on a high shelf or in a room pets cannot reach. If a small nibble occurs, watch for vomiting and lethargy and call a vet if symptoms persist.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'eucalyptus',
		name: 'Eucalyptus',
		aliases: ['eucalyptus globulus', 'silver dollar plant', 'cider gum', 'eucalyptus oil', 'gum tree'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea from the essential oils',
					'Lethargy and weakness',
					'Depression of the nervous system in larger amounts',
					'The concentrated essential oil is far more dangerous than the plant',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Note whether the plant or concentrated essential oil was ingested.',
					'Call a veterinarian or poison hotline for guidance.',
					'Do not induce vomiting unless a veterinarian tells you to.',
				],
				callVetIf: [
					'A large amount of the plant was eaten',
					'Any eucalyptus essential oil was ingested',
					'Persistent vomiting, lethargy, or weakness',
					'Disorientation or breathing changes',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and diarrhea',
					'Lethargy, weakness, and depression',
					'Cats are especially sensitive to essential oils and can suffer liver and nervous-system damage',
					'Seizures and collapse with concentrated oil exposure',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note whether the plant or essential oil was ingested.',
					'Keep the cat calm while getting guidance.',
				],
				callVetIf: [
					'Any eucalyptus plant or oil was ingested',
					'Vomiting, lethargy, or weakness',
					'Disorientation, seizures, or breathing changes',
				],
			},
		},
		description: 'Eucalyptus is severely toxic to cats and moderately toxic to dogs — the essential oils cause vomiting, lethargy, and in cats liver and nerve damage. The oil is most dangerous. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is eucalyptus more dangerous to cats than dogs?',
				answer: 'Cats lack certain liver enzymes needed to break down essential oils, so eucalyptus oil and its compounds accumulate and cause liver and nervous-system damage. Dogs tolerate it somewhat better but can still suffer vomiting, lethargy, and nervous-system depression.',
			},
			{
				question: 'Is eucalyptus essential oil more dangerous than the plant?',
				answer: 'Yes. The concentrated essential oil is far more toxic than the plant material. Even a small amount of eucalyptus essential oil can cause serious poisoning in cats, including seizures and liver damage. Never use eucalyptus essential oil on or around cats.',
			},
			{
				question: 'Is dried eucalyptus in a vase safe around pets?',
				answer: 'Dried eucalyptus still contains the essential oils and is toxic if chewed. The risk is lower than the concentrated oil or fresh plant, but keep dried arrangements out of reach. Call a vet if your pet chews on eucalyptus, especially a cat.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'philodendron',
		name: 'Philodendron',
		aliases: ['philodendron bipinnatifidum', 'heartleaf philodendron', 'tree philodendron', 'split leaf philodendron'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Immediate burning and irritation of the mouth, lips, and tongue',
					'Drooling and foaming at the mouth',
					'Vomiting and difficulty swallowing',
					'In rare cases: swelling that affects breathing',
				],
				firstAid: [
					'Rinse the mouth with water to remove plant material.',
					'Wipe any sap off the fur or face.',
					'Offer water to soothe the mouth.',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'Difficulty breathing or swelling in the throat',
					'Persistent drooling or vomiting',
					'Reduced appetite lasting more than a day',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Burning, redness, and swelling of the mouth and tongue',
					'Drooling and pawing at the mouth',
					'Vomiting and reduced appetite',
					'Rarely: airway obstruction from swelling',
				],
				firstAid: [
					'Rinse the mouth with water carefully.',
					'Wipe any sap off the fur or paws.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'Difficulty breathing or throat swelling',
					'Persistent drooling or vomiting',
					'Refusal to eat lasting more than a day',
				],
			},
		},
		description: 'Philodendron is moderately toxic to cats and dogs — its calcium-oxalate crystals cause mouth burning, drooling, and vomiting. Call a vet if swelling or breathing trouble appears.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'What makes philodendron toxic to pets?',
				answer: 'Philodendron contains insoluble calcium oxalate crystals. When a pet chews the plant, these needle-like crystals pierce the mouth and throat, causing instant burning, drooling, and swelling. This is the same mechanism as pothos and dieffenbachia.',
			},
			{
				question: 'How serious is philodendron ingestion?',
				answer: 'Most cases cause painful mouth irritation, drooling, and vomiting but are not life-threatening. The main danger is rare severe throat swelling that can block breathing. Rinse the mouth, and call a vet if there is any difficulty breathing, persistent vomiting, or significant swelling.',
			},
			{
				question: 'Are all philodendron varieties equally toxic?',
				answer: 'Yes. Heartleaf philodendron, tree philodendron, and split-leaf philodendron all contain the same calcium oxalate crystals and are similarly toxic. Any variety can cause mouth burning, drooling, and vomiting if chewed. Keep all philodendrons out of reach of pets.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'english-ivy',
		name: 'English Ivy',
		aliases: ['hedera helix', 'common ivy', 'branching ivy', 'glacier ivy', 'needlepoint ivy'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea from the saponins',
					'Abdominal pain and reduced appetite',
					'In larger amounts: breathing difficulty, muscle weakness, or tremors',
					'The leaves are the most toxic part',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water to reduce irritation.',
					'Call a veterinarian or poison hotline for guidance.',
					'Watch for vomiting or breathing changes.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or diarrhea',
					'Breathing difficulty or muscle weakness',
					'Tremors',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Drooling, vomiting, and diarrhea',
					'Mouth irritation and reduced appetite',
					'In larger amounts: breathing difficulty or weakness',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or drooling',
					'Breathing difficulty or weakness',
				],
			},
		},
		description: 'English ivy is moderately toxic to cats and dogs — its leaves contain saponins that cause drooling, vomiting, and in larger amounts breathing trouble. Call a vet if a lot is eaten.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'What makes English ivy toxic to pets?',
				answer: 'English ivy contains saponins, which irritate the mouth and digestive tract and cause drooling, vomiting, and diarrhea. The leaves are the most toxic part. In larger amounts, the saponins can cause breathing difficulty, muscle weakness, and tremors.',
			},
			{
				question: 'How serious is English ivy ingestion?',
				answer: 'Most cases cause drooling, vomiting, and diarrhea that resolve with supportive care. With larger ingestions, watch for breathing difficulty, muscle weakness, and tremors. Call a vet if a large amount was eaten or if breathing changes appear.',
			},
			{
				question: 'Is English ivy growing outdoors a risk?',
				answer: 'Yes. Ivy growing on fences or walls is the same plant and is toxic if chewed. Outdoor cats and dogs that nibble ivy can develop drooling and vomiting. The berries are also toxic. Monitor pets around ivy and call a vet if it is eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'mistletoe',
		name: 'Mistletoe',
		aliases: ['viscum album', 'phoradendron', 'american mistletoe', 'christmas mistletoe'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting, diarrhea, and drooling from the toxins (viscotoxins)',
					'Abdominal pain and reduced appetite',
					'In larger amounts: a slow heart rate, low blood pressure, and breathing difficulty',
					'In serious cases: collapse, seizures, or death',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Note how much was eaten (berries and leaves are both toxic).',
					'Call a veterinarian or poison hotline for guidance.',
					'Do not induce vomiting unless a veterinarian tells you to.',
				],
				callVetIf: [
					'A large amount or the berries were eaten',
					'Persistent vomiting or diarrhea',
					'A slow or irregular heartbeat',
					'Lethargy, collapse, or breathing difficulty',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting, diarrhea, and drooling',
					'Abdominal pain and reduced appetite',
					'In larger amounts: a slow heart rate and breathing difficulty',
				],
				firstAid: [
					'Remove any remaining plant material.',
					'Call a veterinarian for guidance.',
					'Watch for vomiting or lethargy.',
				],
				callVetIf: [
					'A large amount or the berries were eaten',
					'Persistent vomiting or diarrhea',
					'A slow heartbeat or breathing difficulty',
				],
			},
		},
		description: 'Mistletoe is moderately toxic to cats and dogs — all parts (especially berries) cause vomiting, and in large amounts heart and breathing problems. A holiday risk. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Which part of mistletoe is most toxic?',
				answer: 'All parts of mistletoe — leaves, stems, and especially the berries — are toxic. The plant contains viscotoxins that irritate the digestive tract and, in larger amounts, affect the heart and nervous system. The berries are the most common cause of poisoning during the holidays.',
			},
			{
				question: 'What are the signs of mistletoe poisoning?',
				answer: 'Vomiting, diarrhea, and drooling are the most common signs. With larger ingestions, watch for a slow heart rate, low blood pressure, breathing difficulty, and in serious cases collapse or seizures. Call a vet if a large amount or the berries were eaten.',
			},
			{
				question: 'Is mistletoe a common poisoning risk?',
				answer: 'Yes, especially during the winter holidays when mistletoe is brought indoors as a decoration. Pets can easily reach hanging sprigs or fallen berries. Keep mistletoe out of reach and pick up any fallen berries or leaves right away.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'holly',
		name: 'Holly',
		aliases: ['ilex aquifolium', 'english holly', 'american holly', 'christmas holly', 'holly berries'],
		category: 'plant',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea from the saponins and other compounds',
					'Drooling and abdominal pain',
					'Lethargy and reduced appetite',
					'The spiny leaves can cause mechanical injury to the mouth and throat',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water to reduce irritation and check for spines.',
					'Note whether the leaves, berries, or both were eaten.',
					'Call a veterinarian or poison hotline for guidance.',
				],
				callVetIf: [
					'A large amount or the berries were eaten',
					'Persistent vomiting or diarrhea',
					'A spine is stuck in the mouth or throat',
					'Lethargy or dehydration',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Drooling and abdominal pain',
					'Lethargy and reduced appetite',
					'Spine injury to the mouth from the leaves',
				],
				firstAid: [
					'Remove any remaining plant material from the mouth.',
					'Rinse the mouth with water and check for spines.',
					'Call a veterinarian for guidance.',
				],
				callVetIf: [
					'A large amount or the berries were eaten',
					'Persistent vomiting or diarrhea',
					'A spine is stuck in the mouth or throat',
				],
			},
		},
		description: 'Holly is moderately toxic to cats and dogs — the berries and leaves cause vomiting and diarrhea, and the spiny leaves can injure the mouth. A holiday risk. Call a vet.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY],
		faqs: [
			{
				question: 'Which part of holly is most toxic?',
				answer: 'The berries contain the highest concentration of the toxic compounds (saponins and other irritants), but the leaves are also toxic. Additionally, the spiny leaves can cause physical injury to the mouth and throat. Both the chemical and mechanical effects make holly a concern.',
			},
			{
				question: 'What are the signs of holly poisoning?',
				answer: 'Vomiting, diarrhea, drooling, and abdominal pain are the most common signs. The spiny leaves can also cause mouth injury and drooling. Call a vet if a large amount or the berries were eaten, or if a spine appears stuck in the mouth or throat.',
			},
			{
				question: 'Is holly a common poisoning risk?',
				answer: 'Yes, especially during the holidays when holly is brought indoors as a decoration. Pets can reach hanging sprigs or fallen berries and leaves. Keep holly out of reach, pick up any fallen parts immediately, and call a vet if it is chewed or eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'poinsettia',
		name: 'Poinsettia',
		aliases: ['euphorbia pulcherrima', 'christmas flower', 'christmas star', 'poinsettia plant', 'poinsetta'],
		category: 'plant',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild vomiting and drooling from the milky sap (irritating diterpenes)',
					'Occasional diarrhea',
					'Skin or mouth irritation from contact with the sap',
					'Serious poisoning is rare — the reputation is worse than the reality',
				],
				firstAid: [
					'Rinse the mouth with water to remove the irritating sap.',
					'Wipe any sap off the fur or face.',
					'Offer water to soothe the mouth.',
					'Watch for vomiting; call a vet if it persists.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or diarrhea',
					'Signs of dehydration',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild vomiting and drooling from the sap',
					'Occasional diarrhea',
					'Skin or mouth irritation from contact',
				],
				firstAid: [
					'Rinse the mouth with water carefully.',
					'Wipe any sap off the fur or paws.',
					'Call a vet if vomiting persists.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Persistent vomiting or diarrhea',
					'Lethargy or refusal to eat',
				],
			},
		},
		description: 'Poinsettia is mildly toxic to cats and dogs — the milky sap causes vomiting and drooling, but serious poisoning is rare. Less dangerous than its reputation. Call a vet if vomiting persists.',
		sources: [ASPCA_PLANTS, MERCK_TOXICOLOGY, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Is poinsettia really as dangerous as people say?',
				answer: 'No. Poinsettia has an exaggerated reputation for toxicity, but it is actually quite mild. The milky sap irritates the mouth and gut, causing vomiting and drooling, but serious poisoning is rare. Still, keep it out of reach and call a vet if symptoms are persistent.',
			},
			{
				question: 'What makes poinsettia irritating to pets?',
				answer: 'The milky white sap contains diterpenes that irritate the skin, mouth, and digestive tract. Chewing the leaves or stems releases the sap, causing drooling, vomiting, and sometimes diarrhea. The irritation is usually mild and self-limiting.',
			},
			{
				question: 'What should I do if my pet chews on a poinsettia?',
				answer: 'Rinse the mouth with water to remove the sap, wipe any sap off the fur, and offer water. Most cases cause only mild vomiting or drooling that resolves on its own. Call a vet if vomiting is persistent, a large amount was eaten, or your pet seems lethargic.',
			},
		],
		lastReviewed: '2026-07-11',
	},
];
