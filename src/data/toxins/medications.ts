// Human medication toxins for the Pet Toxin Lookup tool.
import type { Toxin } from '../../types/toxin';
import {
	ASPCA_POISON_CONTROL,
	MERCK_TOXICOLOGY,
	PPH_POISONS,
	AAPCC_REPORTS,
} from './sources';

export const medicationToxins: Toxin[] = [
	{
		slug: 'ibuprofen',
		name: 'Ibuprofen',
		aliases: ['advil', 'motrin', 'nuprin', 'nsaid', 'midol ib'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, sometimes with blood or "coffee-ground" material',
					'Diarrhea and loss of appetite',
					'Stomach ulcers and abdominal pain',
					'Kidney injury: increased thirst, then reduced urination',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms.',
					'Note the strength (mg per pill) and how many were eaten, plus the time.',
					'Do not induce vomiting unless a vet tells you to — ibuprofen is absorbed quickly.',
				],
				callVetIf: [
					'Any ibuprofen was eaten',
					'Vomiting, especially with blood or "coffee-ground" material',
					'Reduced or absent urination',
					'Lethargy, belly pain, or loss of appetite',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Stomach ulcers and abdominal pain',
					'Kidney failure (cats are especially sensitive)',
					'Lethargy and reduced appetite',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — cats are highly sensitive.',
					'Note the mg strength and number of pills ingested.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any ibuprofen was eaten',
					'Vomiting or drooling',
					'Changes in urination or drinking',
					'Lethargy or belly pain',
				],
			},
		},
		description: 'Ibuprofen is severely toxic to both cats and dogs, causing stomach ulcers and kidney failure. Cats are more sensitive. Call a vet immediately.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, AAPCC_REPORTS],
		faqs: [
			{
				question: 'How much ibuprofen is dangerous to a dog or cat?',
				answer: 'Pets are far more sensitive to ibuprofen than people. Even one or two human pills can cause stomach ulcers and kidney damage in a small dog or cat. The toxic dose depends on weight, so call a vet or poison hotline right away with the milligram strength and number of pills eaten.',
			},
			{
				question: 'What are the signs of ibuprofen poisoning?',
				answer: 'Vomiting (sometimes with blood), diarrhea, loss of appetite, and belly pain are early signs from stomach ulcers. Kidney injury can follow, shown by changes in thirst and urination. Severe cases cause lethargy and weakness. Do not wait for symptoms to worsen before calling.',
			},
			{
				question: 'Should I make my pet throw up after eating ibuprofen?',
				answer: 'Not on your own. Ibuprofen is absorbed quickly, and inducing vomiting can sometimes do more harm. Call a veterinarian or poison hotline first — they will tell you whether vomiting should be induced and what to do next.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'acetaminophen',
		name: 'Acetaminophen',
		aliases: ['tylenol', 'paracetamol', 'apap', 'panadol', 'mapap'],
		category: 'medication',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Brown or muddy gums (methemoglobinemia)',
					'Lethargy and weakness',
					'Liver damage (jaundice) at higher doses',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the mg strength and number of pills, and the time.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'Any acetaminophen was eaten',
					'Brown, blue, or pale gums',
					'Lethargy or difficulty breathing',
					'Yellowing of the eyes or gums (jaundice)',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Brown or muddy gums (methemoglobinemia) — develops quickly',
					'Swelling of the face and paws (edema)',
					'Difficulty breathing and blue-tinged gums',
					'Liver damage; can be fatal from a single pill',
				],
				firstAid: [
					'Call a veterinarian IMMEDIATELY — cats are extremely sensitive to acetaminophen.',
					'Note the mg strength and number of pills; even one 500 mg pill can be fatal.',
					'Do not give any home remedy; get to a clinic right away.',
				],
				callVetIf: [
					'Any acetaminophen was eaten (a true emergency for cats)',
					'Brown, blue, or pale gums',
					'Facial or paw swelling',
					'Labored breathing or collapse',
				],
			},
		},
		description: 'Acetaminophen is extremely toxic to cats (one pill can kill) and dangerous to dogs, damaging blood cells and the liver. Call a vet at once.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, AAPCC_REPORTS],
		faqs: [
			{
				question: 'Why is acetaminophen so dangerous to cats?',
				answer: 'Cats lack the liver enzyme (glucuronosyltransferase) needed to break down acetaminophen, so it builds up rapidly. It converts hemoglobin to methemoglobin, which cannot carry oxygen, turning gums brown and causing swelling of the face and paws. A single regular-strength pill can be fatal to a cat.',
			},
			{
				question: 'Can I give my dog Tylenol for pain?',
				answer: 'No. Acetaminophen is not safe to give without explicit veterinary instruction, and overdoses cause methemoglobinemia (brown gums, oxygen starvation) and liver damage in dogs. Use only medications your veterinarian has prescribed at the dose they set.',
			},
			{
				question: 'What should I do if my pet ate acetaminophen?',
				answer: 'Call a veterinarian or poison hotline immediately — for cats this is a life-threatening emergency. Note the pill strength (mg) and number eaten and the time. Do not induce vomiting or give home remedies unless a vet tells you to; get to a clinic right away.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'naproxen',
		name: 'Naproxen',
		aliases: ['aleve', 'naprosyn', 'midol', 'nsaid', 'anaprox'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, sometimes with blood',
					'Stomach ulcers and abdominal pain',
					'Kidney injury with changes in thirst and urination',
					'Lethargy and weakness',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — naproxen lingers in the body for days.',
					'Note the mg strength and number of pills eaten.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'Any naproxen was eaten',
					'Vomiting, especially with blood',
					'Reduced or absent urination',
					'Lethargy, belly pain, or weakness',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Stomach ulcers and pain',
					'Kidney failure (cats are highly sensitive)',
					'Lethargy and loss of appetite',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the mg strength and number of pills.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any naproxen was eaten',
					'Vomiting or drooling',
					'Changes in urination or drinking',
					'Lethargy or weakness',
				],
			},
		},
		description: 'Naproxen is severely toxic to cats and dogs — it lingers in the body for days, causing stomach ulcers and kidney failure. Call a vet immediately.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is naproxen especially dangerous?',
				answer: 'Naproxen stays in a dog\'s body far longer than in a human (half-life up to 74 hours in dogs), so toxicity can be prolonged. It causes stomach ulcers and kidney injury even at relatively small doses. Call a vet right away with the strength and number of pills.',
			},
			{
				question: 'What are the signs of naproxen poisoning?',
				answer: 'Vomiting (sometimes with blood), diarrhea, belly pain, and loss of appetite from stomach ulcers, followed by kidney injury shown by changes in thirst and urination. Because the drug lingers, symptoms can persist for days without treatment.',
			},
			{
				question: 'Should I induce vomiting after naproxen ingestion?',
				answer: 'Only if a veterinarian or poison control professional tells you to. Naproxen is absorbed and can irritate the stomach, so inducing vomiting without guidance can cause more harm. Call first and follow their instructions.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'aspirin',
		name: 'Aspirin',
		aliases: ['acetylsalicylic acid', 'bayer', 'excedrin', 'salicylate', 'bufferin', 'asa'],
		category: 'medication',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting, sometimes with blood',
					'Stomach ulcers and abdominal pain',
					'Rapid breathing and fever',
					'Kidney injury with larger doses',
				],
				firstAid: [
					'Note the mg strength and number of pills eaten, and whether it was plain or buffered.',
					'Call a veterinarian or poison hotline for guidance.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'A large amount or several doses were eaten',
					'Vomiting, especially with blood',
					'Rapid breathing, panting, or fever',
					'Changes in urination or lethargy',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Stomach ulcers and abdominal pain',
					'Lack of coordination and "walking drunk"',
					'Liver and kidney damage (cats clear aspirin very slowly)',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — cats metabolize aspirin extremely slowly.',
					'Note the mg strength and number of pills.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any aspirin was eaten by a cat',
					'Vomiting or drooling',
					'Stumbling, lethargy, or rapid breathing',
					'Changes in urination',
				],
			},
		},
		description: 'Aspirin is severely toxic to cats (they clear it very slowly) and moderately toxic to dogs. Overdoses cause ulcers and organ damage. Call a vet.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Why is aspirin more dangerous to cats than dogs?',
				answer: 'Cats lack the liver enzyme (glucuronosyltransferase) that breaks down aspirin, so it stays in their body for around 40 hours versus about 8 hours in dogs. Even small repeated doses build up and cause poisoning. Never give a cat aspirin without veterinary direction.',
			},
			{
				question: 'My vet told me to give my dog aspirin — is it safe?',
				answer: 'Only at the specific dose and schedule your veterinarian prescribed. Aspirin can be used short-term in some dogs, but overdoses cause stomach ulcers and kidney injury, and it interacts with many other medications. Never exceed the prescribed dose, and call your vet if vomiting or belly pain occurs.',
			},
			{
				question: 'What are the signs of aspirin poisoning?',
				answer: 'Vomiting (sometimes with blood), diarrhea, belly pain, panting, and fever, with lack of coordination and lethargy in serious cases. Cats may stumble or seem "drunk" because the drug accumulates. Call a vet if you see these signs.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'antidepressants',
		name: 'Antidepressants (SSRIs/SNRIs)',
		aliases: ['ssri', 'snri', 'fluoxetine', 'prozac', 'venlafaxine', 'effexor', 'sertraline', 'zoloft', 'citalopram'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Agitation, restlessness, and panting',
					'Tremors and muscle rigidity',
					'Rapid heart rate and dilated pupils',
					'Serotonin syndrome: tremors, seizures, high body temperature',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the medication name, mg strength, and number of pills, plus the time.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'Any antidepressant was eaten',
					'Agitation, tremors, or a racing heart',
					'Dilated pupils or rigidity',
					'Seizures or a high body temperature',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Agitation and restlessness',
					'Tremors and dilated pupils',
					'Rapid heart rate and vocalization',
					'Serotonin syndrome with seizures and hyperthermia',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the medication name, mg strength, and number of pills.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any antidepressant was eaten',
					'Agitation, tremors, or a racing heart',
					'Dilated pupils or vocalization',
					'Seizures or hyperthermia',
				],
			},
		},
		description: 'Antidepressants (SSRIs/SNRIs) are severely toxic to cats and dogs — they can cause serotonin syndrome with tremors, seizures, and fever. Call a vet.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, AAPCC_REPORTS],
		faqs: [
			{
				question: 'Which antidepressants are most dangerous to pets?',
				answer: 'All SSRI and SNRI antidepressants (fluoxetine/Prozac, venlafaxine/Effexor, sertraline/Zoloft, citalopram, and others) can cause toxicity in pets. Venlafaxine (Effexor) is reported to be especially toxic to dogs. Even a dose or two can trigger serotonin syndrome — call a vet with the medication name and strength.',
			},
			{
				question: 'What is serotonin syndrome in pets?',
				answer: 'Serotonin syndrome happens when too much serotonin builds up in the nervous system. Signs include agitation, tremors, muscle rigidity, dilated pupils, a rapid heart rate, high body temperature, and seizures. It can be life-threatening and needs immediate veterinary care.',
			},
			{
				question: 'What should I do if my pet ate my antidepressant?',
				answer: 'Call a veterinarian or poison hotline immediately with the medication name, milligram strength, and number of pills eaten. Do not wait for symptoms — serotonin syndrome can develop quickly. Do not induce vomiting unless a vet tells you to.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'adhd-meds',
		name: 'ADHD Medications',
		aliases: ['adderall', 'amphetamine', 'vyvanse', 'lisdexamfetamine', 'methylphenidate', 'ritalin', 'concerta', 'stimulant'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Severe agitation, restlessness, and pacing',
					'Rapid or irregular heart rate and high blood pressure',
					'Tremors and muscle rigidity',
					'Seizures, hyperthermia, and collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — this can escalate fast.',
					'Note the medication name, mg strength, and number of pills; even one pill can be serious for a small dog.',
					'Do not induce vomiting unless a vet directs it (risk of rapid seizures).',
				],
				callVetIf: [
					'Any ADHD stimulant was eaten',
					'Agitation, panting, or a racing heart',
					'Tremors or muscle rigidity',
					'Seizures or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Agitation and restlessness',
					'Rapid heart rate and dilated pupils',
					'Tremors and hyperthermia',
					'Seizures and collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the medication name, mg strength, and number of pills.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any ADHD stimulant was eaten',
					'Agitation or a racing heart',
					'Tremors or dilated pupils',
					'Seizures or collapse',
				],
			},
		},
		description: 'ADHD stimulants like Adderall are severely toxic to cats and dogs — even one pill can cause seizures and a dangerous fever. Call a vet at once.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'How dangerous is Adderall to a dog?',
				answer: 'Amphetamines in ADHD medications are potent stimulants, and even one pill can be serious for a small dog. They cause agitation, a racing heart, high blood pressure, tremors, seizures, and a dangerous rise in body temperature. Call a vet immediately — do not wait for symptoms.',
			},
			{
				question: 'What are methylphenidate (Ritalin/Concerta) risks for pets?',
				answer: 'Methylphenidate is also a stimulant and causes the same toxicity as amphetamines: restlessness, rapid heart rate, tremors, seizures, and hyperthermia. Treat any ingestion as an emergency and call a vet with the strength and number of pills.',
			},
			{
				question: 'Should I make my pet vomit after eating an ADHD pill?',
				answer: 'Only if a veterinarian or poison control professional tells you to. Because seizures can develop quickly, inducing vomiting without guidance can be dangerous if the pet is already getting agitated. Call first and follow their instructions.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'sleep-aids',
		name: 'Sleep Aids',
		aliases: ['ambien', 'zolpidem', 'benzodiazepine', 'xanax', 'alprazolam', 'valium', 'diazepam', 'lunesta', 'eszopiclone', 'sleeping pill'],
		category: 'medication',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Sedation, drowsiness, and stumbling (ataxia)',
					'Paradoxical excitement or agitation (especially with zolpidem/Ambien)',
					'Vomiting and drooling',
					'Slow heart rate or breathing in larger amounts',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Note the medication name, mg strength, and number of pills, plus the time.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'A large amount or multiple pills were eaten',
					'Severe drowsiness, stumbling, or inability to wake',
					'Agitation or unusual behavior (paradoxical reaction)',
					'Slow breathing or collapse',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Sedation and lethargy',
					'Stumbling and disorientation',
					'Drooling or vomiting',
					'Paradoxical excitement in some cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline.',
					'Note the medication name, mg strength, and number of pills.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'A large amount was eaten',
					'Severe sedation or disorientation',
					'Agitation or unusual behavior',
					'Slow breathing or collapse',
				],
			},
		},
		description: 'Sleep aids (Ambien, benzodiazepines) are moderately toxic to cats and dogs — they cause sedation or paradoxical excitement and stumbling. Call a vet.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Can sleep aids make my pet hyper instead of sleepy?',
				answer: 'Yes. Paradoxically, some pets — especially dogs given zolpidem (Ambien) — become agitated, restless, or pace rather than sedated. This "paradoxical excitement" is a known reaction. Call a vet if you see agitation, stumbling, or any unusual behavior after ingestion.',
			},
			{
				question: 'Are benzodiazepines like Xanax or Valium dangerous to pets?',
				answer: 'Human benzodiazepines can cause significant sedation, stumbling, and in larger amounts slow breathing and heart rate. They are sometimes used in veterinary medicine, but the human dose or a different drug can be too much. Call a vet with the name, strength, and number of pills.',
			},
			{
				question: 'What should I do if my pet ate a sleeping pill?',
				answer: 'Call a veterinarian or poison hotline with the medication name, milligram strength, and number of pills. Keep the pet calm and watch for severe drowsiness, stumbling, agitation, or slow breathing. Do not induce vomiting unless a vet tells you to.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'birth-control',
		name: 'Birth Control Pills',
		aliases: ['estrogen', 'oral contraceptive', 'birth control', 'hormone replacement', 'estradiol', 'hrt', 'plan b', 'progestin'],
		category: 'medication',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Mild stomach upset and vomiting',
					'Diarrhea and reduced appetite',
					'Rarely, bone marrow suppression with large or repeated amounts',
					'Estrogen toxicity (lethargy, bleeding tendency) only with larger doses',
				],
				firstAid: [
					'Note the hormone type, mg strength, and number of pills eaten.',
					'Call a veterinarian or poison hotline for guidance.',
					'Watch for vomiting or lethargy.',
				],
				callVetIf: [
					'A large number of pills, a transdermal patch, or hormone replacement was eaten',
					'Persistent vomiting or diarrhea',
					'Lethargy, pale gums, or bruising/bleeding',
					'Signs of estrogen toxicity (repeated doses)',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea',
					'Reduced appetite and lethargy',
					'Bone marrow suppression with larger amounts',
					'Pale gums or bruising in serious cases',
				],
				firstAid: [
					'Note the hormone type, mg strength, and number of pills.',
					'Call a veterinarian or poison hotline for guidance.',
					'Watch for vomiting or lethargy.',
				],
				callVetIf: [
					'A large number of pills or a patch was eaten',
					'Persistent vomiting or lethargy',
					'Pale gums or bruising',
					'Changes in energy or appetite',
				],
			},
		},
		description: 'Birth control pills are mildly toxic to dogs and moderately so to cats. Large amounts of estrogen can suppress bone marrow. Call a vet for guidance.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'My dog ate one birth control pill — is it an emergency?',
				answer: 'A single birth control pill is usually low risk and may cause only mild stomach upset. The concern rises with many pills, transdermal patches (which are concentrated), or estrogen-containing hormone replacement, which can suppress bone marrow. Call a vet with the hormone type and number of pills.',
			},
			{
				question: 'What is the danger of estrogen in pets?',
				answer: 'Large or repeated doses of estrogen can suppress the bone marrow, reducing red and white blood cells and platelets. This can cause anemia (pale gums, weakness), infections, and bleeding or bruising. It is more a concern with concentrated hormone products than a single pill.',
			},
			{
				question: 'Are hormone replacement therapy (HRT) and patches more dangerous?',
				answer: 'They can be. Transdermal estrogen patches and high-dose HRT contain more hormone than a single pill, and a pet that chews on a patch can get a large dose. Treat ingestion of patches or HRT more seriously and call a vet right away.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'vitamin-d',
		name: 'Vitamin D',
		aliases: ['cholecalciferol', 'vitamin d3', 'ergocalciferol', 'vitamin d2', 'calcitriol', 'rodenticide', 'vitamin d supplement'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Increased thirst and urination (early hypercalcemia)',
					'Vomiting, diarrhea, and loss of appetite',
					'Weakness and lethargy',
					'Kidney failure and mineralization of organs',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the form (supplement or rodenticide) and the amount in IU or mg, plus the number of pills or bait blocks.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'Any cholecalciferol supplement or rodenticide was eaten',
					'Increased thirst and urination',
					'Vomiting, weakness, or lethargy',
					'Reduced urination (kidney failure)',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Increased thirst and urination',
					'Vomiting and reduced appetite',
					'Weakness and lethargy',
					'Kidney failure',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the form and amount (IU or mg) ingested.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any cholecalciferol supplement or rodenticide was eaten',
					'Increased thirst and urination',
					'Vomiting or lethargy',
					'Changes in urination',
				],
			},
		},
		description: 'Vitamin D (cholecalciferol) is severely toxic to cats and dogs — it raises calcium and damages the kidneys. It is also used in rodenticides. Call a vet.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Why is vitamin D dangerous to pets?',
				answer: 'In excess, vitamin D causes blood calcium to rise sharply. The extra calcium deposits in and damages organs, especially the kidneys, leading to kidney failure. Both supplement overdoses and cholecalciferol (vitamin D3) rodenticides cause this — the rodenticide form is concentrated and especially dangerous.',
			},
			{
				question: 'Are vitamin D gummies a risk if my dog eats them?',
				answer: 'Yes. Vitamin D gummies and soft chews are palatable and a pet may eat many at once. Note the IU or microgram strength and how many were eaten, then call a vet — toxicity depends on the total dose and the pet\'s weight. Even a moderate overdose can harm the kidneys.',
			},
			{
				question: 'Is the rodenticide form of vitamin D more dangerous?',
				answer: 'It can be. Cholecalciferol rodenticide baits are formulated to deliver a toxic dose, so a pet eating the bait can develop severe hypercalcemia and kidney failure. Call a vet immediately if any cholecalciferol bait was eaten, even if no symptoms appear yet.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'vitamin-a',
		name: 'Vitamin A',
		aliases: ['retinol', 'retinyl', 'vitamin a supplement', 'cod liver oil', 'isotretinoin', 'accutane', 'tretinoin'],
		category: 'medication',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and reduced appetite (acute large dose)',
					'Lethargy and constipation',
					'Joint stiffness and bone changes with chronic excess',
					'Neck pain or reluctance to move',
				],
				firstAid: [
					'Note the form (retinol, cod liver oil, isotretinoin) and the amount in IU or mg, plus the number of pills.',
					'Call a veterinarian or poison hotline, especially for a large dose.',
					'Watch for vomiting or stiffness over the following days.',
				],
				callVetIf: [
					'A large dose or chronic excess was ingested',
					'Persistent vomiting or lethargy',
					'Stiffness, neck pain, or reluctance to move',
					'Reduced appetite that persists',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and reduced appetite',
					'Lethargy',
					'Stiffness and reluctance to move (cats are prone to bone and joint changes)',
					'Neck pain and deformed spine with chronic excess',
				],
				firstAid: [
					'Note the form (retinol, cod liver oil, isotretinoin) and the amount in IU or mg.',
					'Call a veterinarian, especially if chronic excess is suspected.',
					'Watch for stiffness or reduced appetite.',
				],
				callVetIf: [
					'A large dose or chronic excess was ingested',
					'Stiffness, neck pain, or reluctance to move',
					'Persistent vomiting or lethargy',
					'Reduced appetite that persists',
				],
			},
		},
		description: 'Vitamin A (retinol) is moderately toxic to cats and dogs — chronic excess harms bones and joints, and cats are especially prone. Call a vet for guidance.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS],
		faqs: [
			{
				question: 'Can too much vitamin A hurt my pet?',
				answer: 'Yes. Acute large doses cause vomiting, lethargy, and neck pain, while chronic excess — often from liver-heavy diets, cod liver oil, or retinoid supplements — causes bone and joint changes. Cats are especially prone to chronic vitamin A toxicity, which can stiffen and deform the spine. Call a vet if excess intake is suspected.',
			},
			{
				question: 'Is cod liver oil a risk for cats?',
				answer: 'It can be. Cod liver oil is very high in both vitamins A and D, and cats fed it regularly can develop vitamin A toxicity with bone and joint changes (exostoses), plus vitamin D-driven kidney issues. Use supplements only under veterinary guidance and keep bottles out of reach.',
			},
			{
				question: 'Are acne medications like isotretinoin dangerous to pets?',
				answer: 'Yes. Isotretinoin (Accutane) and other retinoids are vitamin A derivatives that are toxic in overdose, causing vomiting, lethargy, and bone and liver effects. Keep all retinoid capsules and tubes away from pets, and call a vet with the strength and number of pills if any are eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'cold-meds',
		name: 'Cold & Allergy Medications',
		aliases: ['pseudoephedrine', 'sudafed', 'phenylephrine', 'nyquil', 'dayquil', 'decongestant', 'cold medicine', 'sinus medicine'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Agitation, restlessness, and panting',
					'Rapid or irregular heart rate and high blood pressure',
					'Dilated pupils and tremors',
					'Seizures, hyperthermia, and collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the active ingredients (pseudoephedrine, phenylephrine, and whether acetaminophen is also present), mg strength, and number of pills, plus the time.',
					'Do not induce vomiting unless a vet directs it.',
				],
				callVetIf: [
					'Any cold or decongestant medicine was eaten',
					'Agitation, panting, or a racing heart',
					'Tremors or dilated pupils',
					'Seizures or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Agitation and restlessness',
					'Rapid heart rate and dilated pupils',
					'Tremors and hyperthermia',
					'Seizures and collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the active ingredients, mg strength, and number of pills.',
					'Do not induce vomiting unless directed by a vet.',
				],
				callVetIf: [
					'Any cold or decongestant medicine was eaten',
					'Agitation or a racing heart',
					'Tremors or dilated pupils',
					'Seizures or collapse',
				],
			},
		},
		description: 'Cold and allergy meds with pseudoephedrine are severely toxic to cats and dogs — they act as stimulants and can cause seizures. Call a vet.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'What makes cold and sinus medicines dangerous to pets?',
				answer: 'Decongestants like pseudoephedrine and phenylephrine are stimulants that act like amphetamines in pets, causing agitation, a racing heart, high blood pressure, tremors, seizures, and a dangerous rise in body temperature. They are among the more dangerous human meds — call a vet immediately.',
			},
			{
				question: 'Do cold medicines contain other toxins too?',
				answer: 'Often, yes. Many cold and flu products combine a decongestant with acetaminophen or antihistamines, each of which is separately toxic. When you call a vet, read the full ingredients and strength from the label so they can assess every active ingredient.',
			},
			{
				question: 'How much Sudafed is dangerous to a dog?',
				answer: 'Even one or two regular-strength pseudoephedrine pills can cause serious toxicity in a small to medium dog. The risk depends on the dose per pound of body weight, so call a vet or poison hotline right away with the milligram strength and number of pills eaten.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'topical-creams',
		name: 'Topical Creams',
		aliases: ['5-fluorouracil', '5-fu', 'efudex', 'fluoroplex', 'calcipotriene', 'dovobet', 'zinc oxide', 'diaper rash cream', 'imiquimod', 'retinoid cream'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'5-fluorouracil: severe vomiting, tremors, seizures, and collapse — often fatal even from a small lick',
					'Calcipotriene: increased thirst and urination, vomiting, weakness (severe hypercalcemia and kidney failure)',
					'Zinc oxide: vomiting, diarrhea, and pale gums (hemolytic anemia)',
					'Lethargy and loss of appetite',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — for 5-fluorouracil, every minute counts and it is often fatal.',
					'Note the cream\'s active ingredient and strength, and how much was licked or chewed.',
					'Rinse the mouth and fur with water to remove residue; bring the tube to the clinic.',
				],
				callVetIf: [
					'Any topical medication was licked or chewed (especially 5-fluorouracil)',
					'Vomiting, tremors, or seizures',
					'Increased thirst and urination (calcipotriene)',
					'Pale gums, weakness, or collapse',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting and drooling',
					'Tremors and seizures (5-fluorouracil)',
					'Increased thirst and urination (calcipotriene)',
					'Weakness and collapse',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Note the active ingredient and strength, and how much was ingested.',
					'Rinse the mouth and fur with water; bring the tube to the clinic.',
				],
				callVetIf: [
					'Any topical medication was licked or chewed',
					'Vomiting, tremors, or seizures',
					'Increased thirst and urination',
					'Weakness or collapse',
				],
			},
		},
		description: 'Topical creams are severely toxic to cats and dogs — 5-fluorouracil is often fatal to dogs even from a small lick. Call a vet immediately.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Why is 5-fluorouracil cream so deadly to dogs?',
				answer: '5-fluorouracil (in Efudex, Fluoroplex, and other skin-cancer and wart creams) is extremely toxic to dogs, and licking even a small amount from your skin or the tube can cause severe vomiting, tremors, seizures, and death — sometimes within hours. Keep these creams where pets cannot reach them, and call a vet immediately if any contact occurs.',
			},
			{
				question: 'Is calcipotriene (psoriasis) cream dangerous?',
				answer: 'Yes. Calcipotriene and calcipotriol (in Dovobet and other psoriasis creams) cause a dangerous rise in blood calcium, leading to increased thirst and urination, vomiting, weakness, and kidney failure. Even a small amount can be serious — call a vet right away with the strength and amount licked.',
			},
			{
				question: 'What about diaper rash creams with zinc oxide?',
				answer: 'Zinc oxide in diaper rash creams can cause vomiting and diarrhea, and in larger amounts hemolytic anemia (destruction of red blood cells, causing pale gums and weakness). While often less deadly than 5-fluorouracil, ingestion still warrants a vet call. Bring the product label so the vet can confirm the strength.',
			},
		],
		lastReviewed: '2026-07-11',
	},
	{
		slug: 'fluorouracil-cream',
		name: '5-Fluorouracil Cream (5-FU)',
		aliases: ['fluorouracil', '5-fu', 'efudex', 'efudix', 'carac', 'tolak', 'fluoroplex', 'skin cancer cream', 'chemo cream'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting (often with blood), drooling, and severe diarrhea within 30 minutes to a few hours',
					'Wobbliness, tremors, and seizures',
					'Breathing difficulty and irregular heartbeat',
					'Collapse and death — even a lick or two of cream has been fatal',
				],
				firstAid: [
					'Go to an emergency veterinarian or call a poison hotline IMMEDIATELY — minutes matter.',
					'Prevent further licking; wipe any cream off the mouth and paws.',
					'Bring the cream tube or a photo of the label with the concentration.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
				],
				callVetIf: [
					'ANY exposure — a single lick of the tube or treated skin is an emergency',
					'Vomiting, drooling, or wobbliness',
					'Seizures, collapse, or irregular heartbeat',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and diarrhea within hours',
					'Weakness, tremors, and seizures',
					'Breathing difficulty and irregular heartbeat',
					'Rapid collapse and death — extremely small amounts are lethal',
				],
				firstAid: [
					'Go to an emergency veterinarian or call a poison hotline IMMEDIATELY.',
					'Prevent further licking; wipe cream off the mouth and fur.',
					'Bring the product label with the concentration.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
				],
				callVetIf: [
					'ANY exposure — even grooming cream off a treated human skin area',
					'Vomiting, drooling, or weakness',
					'Seizures, collapse, or irregular heartbeat',
				],
			},
		},
		description: '5-fluorouracil cream is severely toxic to both cats and dogs — a single lick has killed dogs within hours. There is no antidote. Any exposure is a go-now emergency.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'How much 5-FU cream is dangerous?',
				answer: 'Extremely small amounts. Fatalities have been reported in dogs from licking a few treated skin spots or chewing an open tube — a fraction of a milligram per kilogram in some cases. There is no antidote, and death can occur within 6 to 12 hours from seizures and cardiac arrest. This is the most lethal common topical medication in homes: treat any exposure as a race to the emergency vet.',
			},
			{
				question: 'My pet licked skin where I applied 5-FU hours ago and seems fine. Is that a risk?',
				answer: 'Yes — even that counts as an exposure, and the cream remains on skin for hours. Do not wait for symptoms: call a veterinarian or poison hotline now. Symptoms can be delayed a few hours, and by the time vomiting and seizures appear, treatment options are limited. If your pet was treated with 5-FU at home, keep them away from the treated area until it is fully absorbed and washed.',
			},
			{
				question: 'How can I use 5-FU safely in a home with pets?',
				answer: 'Apply it in a closed room away from pets, wear gloves, store the tube in a sealed container high up or in a locked drawer, and never leave the tube on a nightstand — chewed tubes are the most common exposure. Consider asking your doctor about pet-safer alternatives such as imiquimod or topical diclofenac if you live with curious pets, and dispose of used applicators where pets cannot reach them.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'glp1-meds',
		name: 'GLP-1 Weight-Loss & Diabetes Medications',
		aliases: ['semaglutide', 'ozempic', 'wegovy', 'rybelsus', 'tirzepatide', 'mounjaro', 'zepbound', 'liraglutide', 'victoza', 'saxenda', 'glp-1', 'weight loss injection'],
		category: 'medication',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting and diarrhea within hours to a day',
					'Lethargy and reduced appetite',
					'Drooling or nausea',
					'Serious effects are uncommon, but prolonged vomiting risks dehydration',
				],
				firstAid: [
					'Remove any remaining tablets, pens, or needles from reach.',
					'Offer water and withhold food for a few hours if the stomach is upset.',
					'Watch for repeated vomiting over the next 24 hours.',
					'Call a vet if vomiting persists, your pet seems weak, or a pen was chewed.',
				],
				callVetIf: [
					'A whole bottle of tablets or an injection pen was eaten',
					'Repeated vomiting or diarrhea lasting more than a day',
					'Extreme lethargy, wobbliness, or collapse',
				],
			},
			cat: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting, drooling, and reduced appetite',
					'Lethargy',
					'Diarrhea in some cases',
					'Serious effects are uncommon with small exposures',
				],
				firstAid: [
					'Remove any remaining medication from reach.',
					'Offer fresh water and monitor closely.',
					'Watch for vomiting over the next 24 hours.',
					'Call a vet if vomiting persists or the cat stops eating.',
				],
				callVetIf: [
					'A large amount was ingested or a pen was chewed',
					'Repeated vomiting or refusal to eat',
					'Lethargy, wobbliness, or collapse',
				],
			},
		},
		description: 'GLP-1 medications (Ozempic, Wegovy, Mounjaro) are mildly toxic to both cats and dogs — mainly vomiting, diarrhea, and lethargy. Chewed injection pens add a foreign-body risk.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'How dangerous is it if my dog eats my Ozempic pen?',
				answer: 'The medication itself is usually low risk — expect nausea, vomiting, and diarrhea. The bigger problems are physical: the plastic pen casing can cause mouth injuries or an intestinal obstruction if swallowed in pieces, and the tiny needle can puncture the gut. If a pen was chewed or swallowed whole, call a vet for imaging and monitoring advice.',
			},
			{
				question: 'Can GLP-1 medications cause low blood sugar in pets?',
				answer: 'On their own, rarely — GLP-1 drugs lower blood sugar mainly when combined with insulin or sulfonylureas, which they work alongside in some households. If your pet also got into diabetes tablets (such as glipizide) or a diabetic pet in the house is on insulin, watch harder for wobbliness, trembling, and weakness, and call a vet — that combination is genuinely dangerous.',
			},
			{
				question: 'These medications are everywhere now. How do I store them safely?',
				answer: 'Keep pens and tablets in a closed drawer or a high cabinet — never in a purse, gym bag, or on the nightstand, all common chew targets. Refrigerated pens are fine for storage, but the smell of the carrying case and the novelty of dropped pens draw pets in. Sharps and used pens belong in a sealed disposal container out of reach.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'thyroid-meds',
		name: 'Thyroid Medications',
		aliases: ['levothyroxine', 'synthroid', 'thyroxine', 'euthyrox', 'methimazole', 'tapazole', 'thyroid tablets', 'armour thyroid', 'hypothyroid meds', 'hyperthyroid meds'],
		category: 'medication',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Restlessness, hyperactivity, and panting within hours to a day',
					'Rapid heartbeat and rapid breathing',
					'Vomiting, diarrhea, and increased thirst',
					'Tremors and fever in large overdoses',
				],
				firstAid: [
					'Remove any remaining tablets from reach and count how many are missing.',
					'Note the dose (mcg) and your dog\'s weight — dose math matters here.',
					'Offer water and keep the dog calm.',
					'Call a vet or poison hotline for guidance, even if no symptoms have started.',
				],
				callVetIf: [
					'More than a few extra tablets were eaten (the threshold depends on the dose)',
					'Hyperactivity, panting, or a racing heart',
					'Tremors, vomiting, or fever',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and reduced appetite (more typical of methimazole overdose)',
					'Lethargy and drooling',
					'Increased thirst or changes in breathing',
					'Bruising or bleeding with large methimazole overdoses',
				],
				firstAid: [
					'Remove any remaining tablets and count how many are missing.',
					'Note the medication name and dose — levothyroxine and methimazole act differently.',
					'Offer water and monitor closely.',
					'Call a vet or poison hotline for guidance.',
				],
				callVetIf: [
					'More than a single extra tablet was eaten',
					'Vomiting, drooling, or refusal to eat',
					'Bruising, bleeding, or breathing changes',
				],
			},
		},
		description: 'Thyroid medications are moderately toxic to both cats and dogs — levothyroxine overdose speeds up the heart and metabolism; methimazole overdose causes stomach and blood effects.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'My dog just ate my levothyroxine. Dogs take that drug too — is it actually dangerous?',
				answer: 'Dogs are indeed prescribed levothyroxine, so an extra tablet or two is usually minor — but the human doses vary widely, and a small dog eating a large number of high-strength tablets can develop a real thyroid storm: racing heart, hyperactivity, panting, tremors, and fever. Call a vet or poison hotline with the tablet strength (mcg), the count eaten, and your dog\'s weight for dose-specific advice.',
			},
			{
				question: 'What is the difference between levothyroxine and methimazole exposures?',
				answer: 'They treat opposite problems. Levothyroxine replaces thyroid hormone — an overdose speeds the metabolism up (racing heart, hyperactivity). Methimazole suppresses hormone production — an overdose slows things down, causing vomiting, drooling, and in large overdoses blood-cell suppression with bruising or bleeding. Both warrant a vet call; note which one was eaten because the treatment differs.',
			},
			{
				question: 'Which pets are most at risk from thyroid pill bottles?',
				answer: 'Dogs that raid pill organizers and handbags are the classic case — levothyroxine is one of the most commonly prescribed medications and often sits in a weekly pill minder that smells faintly of the owner. Cats rarely steal tablets, but a cat being treated for hyperthyroidism can get a double dose if the household loses track of who was medicated. Keep pill organizers closed and stored up high.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'muscle-relaxants',
		name: 'Muscle Relaxants',
		aliases: ['baclofen', 'cyclobenzaprine', 'amrix', 'flexeril', 'methocarbamol', 'robaxin', 'tizanidine', 'zanaflex', 'carisoprodol', 'soma', 'muscle relaxer'],
		category: 'medication',
		species: {
			dog: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Extreme drowsiness, stumbling, and collapse within 30 minutes to a few hours',
					'Slow breathing and low body temperature',
					'Vocalization, agitation, and tremors (especially baclofen)',
					'Seizures, coma, and death in serious cases',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately — do not wait for symptoms.',
					'Bring the medication name, strength (mg), and how many tablets are missing.',
					'Keep the pet warm and quiet while getting guidance.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
				],
				callVetIf: [
					'Any muscle relaxant tablet was eaten — even one',
					'Severe drowsiness, stumbling, or collapse',
					'Slow breathing, seizures, or unresponsiveness — emergency clinic immediately',
				],
			},
			cat: {
				level: 'severe',
				toxic: true,
				symptoms: [
					'Profound drowsiness, weakness, and wobbliness',
					'Slow breathing and low body temperature',
					'Vomiting and drooling',
					'Seizures, coma, and death — cats are extremely sensitive to baclofen',
				],
				firstAid: [
					'Call a veterinarian or poison hotline immediately.',
					'Bring the medication name, strength, and amount missing.',
					'Keep the cat warm and quiet while getting guidance.',
					'Do not induce vomiting unless a veterinarian instructs you to.',
				],
				callVetIf: [
					'Any tablet was eaten — even a fragment',
					'Extreme drowsiness, weakness, or vomiting',
					'Slow breathing, seizures, or unresponsiveness — emergency clinic immediately',
				],
			},
		},
		description: 'Muscle relaxants are severely toxic to both cats and dogs — baclofen in particular causes profound sedation, seizures, and death from a single tablet. Any ingestion is an emergency.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Is one baclofen tablet really an emergency?',
				answer: 'Yes. Baclofen is one of the most dangerous human medications a pet can eat — doses as low as 1 mg/kg have caused severe poisoning in dogs, and cats are even more sensitive. It causes profound sedation within an hour, then vocalization, tremors, seizures, dangerously slow breathing, and potentially death. There is no antidote; treatment is intensive supportive care, often on a ventilator in severe cases. Go to the vet immediately.',
			},
			{
				question: 'Are all muscle relaxants equally dangerous?',
				answer: 'No, but treat them all as emergencies. Baclofen is by far the most toxic. Cyclobenzaprine is sedating and also affects the heart rhythm; methocarbamol is the mildest and is actually used in veterinary medicine (often for IV disk disease), though an oral overdose still causes severe sedation. Carisoprodol and tizanidine fall in between. Whatever the drug, a single tablet in a small pet warrants an immediate call.',
			},
			{
				question: 'My pet seems fine but ate the tablet an hour ago. Should I still go in?',
				answer: 'Yes. Symptoms can come on suddenly, and by the time deep sedation and slow breathing appear, the pet is much harder to stabilize. Early decontamination (induced vomiting at the clinic, activated charcoal) dramatically changes the outcome. An hour of "seems fine" is exactly when you want to go — not three hours later when they cannot walk.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'iron-supplements',
		name: 'Iron Supplements & Prenatal Vitamins',
		aliases: ['iron pills', 'ferrous sulfate', 'ferrous gluconate', 'prenatal vitamins', 'prenatals', 'iron tablets', 'vitamins with iron', 'multivitamin overdose', 'ferritin supplements'],
		category: 'medication',
		species: {
			dog: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting (sometimes with blood) and diarrhea within hours',
					'Abdominal pain and lethargy as iron damages the gut lining',
					'Dehydration and weakness over the following day',
					'Liver failure and shock in large overdoses (a day or more later)',
				],
				firstAid: [
					'Remove the bottle and count how many tablets are missing.',
					'Note the elemental iron amount per tablet (mg) — not just "iron".',
					'Offer water; do not induce vomiting without guidance.',
					'Call a vet or poison hotline with the tablet strength and count.',
				],
				callVetIf: [
					'A large number of tablets was eaten, especially by a small dog',
					'Vomiting with blood, bloody diarrhea, or abdominal pain',
					'Lethargy, collapse, or yellowing of the gums a day later',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling within hours',
					'Diarrhea, sometimes with blood',
					'Lethargy and reduced appetite',
					'Liver effects in large overdoses (delayed)',
				],
				firstAid: [
					'Remove the bottle and estimate how many tablets were eaten.',
					'Note the elemental iron amount per tablet.',
					'Offer water and monitor closely.',
					'Call a vet or poison hotline for guidance.',
				],
				callVetIf: [
					'More than a tablet or two was eaten',
					'Persistent vomiting or bloody diarrhea',
					'Lethargy, collapse, or jaundice',
				],
			},
		},
		description: 'Iron supplements and prenatal vitamins are moderately toxic to both cats and dogs — overdoses burn the gut and can damage the liver. Gummy vitamins may also contain xylitol.',
		sources: [MERCK_TOXICOLOGY, PPH_POISONS, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Why are prenatal vitamins a double risk?',
				answer: 'They pack high doses of iron, and some formulas also contain xylitol or vitamin D — a third hazard on its own (see our vitamin D and xylitol pages). Check the label for xylitol, birch sugar, and vitamin D content, and call a vet with the full ingredient list, not just "prenatal vitamins". The iron dose determines the gut and liver risk.',
			},
			{
				question: 'What does "elemental iron" mean and why does the vet ask for it?',
				answer: 'Labels list the total compound (for example ferrous sulfate 325 mg) but the toxic part is only the iron inside it — ferrous sulfate 325 mg contains about 65 mg of elemental iron. Toxicity is calculated against elemental iron, so having the exact product name or a photo of the label lets the vet give a real risk assessment instead of a guess.',
			},
			{
				question: 'Are gummy vitamins as dangerous as pills?',
				answer: 'The iron dose per gummy is usually lower, so a few gummies are rarely serious — but gummies are far easier to eat by the handful, and many contain xylitol, which is severely toxic to dogs. Check the label first: if xylitol is in the ingredient list, treat it as an xylitol emergency; if not, the main issue is iron and sugar, and a call for dose guidance is still the right move.',
			},
		],
		lastReviewed: '2026-10-16',
	},
	{
		slug: 'apoquel',
		name: 'Apoquel (Oclacitinib)',
		aliases: ['oclacitinib', 'apoquel tablets', 'apoquel 16mg', 'apoquel 5.4mg', 'zenrelia', 'itch medicine for dogs', 'allergy pills for dogs'],
		category: 'medication',
		species: {
			dog: {
				level: 'mild',
				toxic: true,
				symptoms: [
					'Vomiting, diarrhea, and soft stools after eating multiple tablets',
					'Lethargy and reduced appetite',
					'Large overdoses can suppress the immune system, raising infection risk',
					'Pre-existing skin or ear infections may worsen temporarily',
				],
				firstAid: [
					'Remove the bottle and count how many tablets are missing.',
					'Note the tablet strength (5.4 mg, 16 mg) and your dog\'s weight.',
					'Offer water and watch for vomiting over 24 hours.',
					'Call a vet or poison hotline with the strength and count for dose guidance.',
				],
				callVetIf: [
					'Many tablets were eaten, especially by a small dog',
					'Repeated vomiting, diarrhea, or lethargy',
					'Fever, wounds that will not heal, or signs of infection in the following weeks',
				],
			},
			cat: {
				level: 'moderate',
				toxic: true,
				symptoms: [
					'Vomiting and drooling within hours',
					'Lethargy and reduced appetite',
					'Wobbliness or unusual behavior',
					'Cats are not routinely dosed with oclacitinib, so an accidental dose warrants a vet call',
				],
				firstAid: [
					'Remove the bottle and estimate how many tablets were eaten.',
					'Note the tablet strength.',
					'Offer water and monitor closely.',
					'Call a vet or poison hotline for guidance — do not wait for symptoms.',
				],
				callVetIf: [
					'Any amount was eaten by a cat',
					'Vomiting, drooling, or refusal to eat',
					'Wobbliness, tremors, or collapse',
				],
			},
		},
		description: 'Apoquel (oclacitinib) is an immunosuppressant for dog allergies — mildly toxic to dogs, moderately concerning for cats. Poison hotline reports of pet exposures are rising.',
		sources: [PPH_POISONS, MERCK_TOXICOLOGY, ASPCA_POISON_CONTROL],
		faqs: [
			{
				question: 'Why are Apoquel poisoning calls increasing?',
				answer: 'Pet Poison Helpline reported a rise in toxin calls involving Apoquel (September 2026) as the allergy medication becomes more widely prescribed. It sits in purses, on counters, and in weekly pill organizers, and it smells like food to a dog. Because one bottle holds a month of tablets, a determined chewer can eat far more than a therapeutic dose.',
			},
			{
				question: 'Is Apoquel dangerous for cats?',
				answer: 'Oclacitinib is labeled for dogs only. Cats are not routinely given it, and they appear more sensitive — an accidental dose (the classic case is a cat that knocks over the dog\'s bottle and eats the tablets) warrants a vet call even before symptoms. Watch for vomiting, drooling, lethargy, or wobbliness.',
			},
			{
				question: 'What happens if a dog eats a whole bottle of Apoquel?',
				answer: 'Doses above the therapeutic range mainly cause vomiting and diarrhea, but large overdoses suppress the immune system, which can lead to infections days or weeks later. Call a vet or poison hotline with the tablet strength and count eaten — they may recommend decontamination and monitoring. Watch for fever, sores, or worsening skin infections after the initial exposure.',
			},
		],
		lastReviewed: '2026-10-16',
	},
];
