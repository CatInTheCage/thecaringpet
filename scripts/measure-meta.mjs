// Gate 2/3 measurement script — run AFTER `npm run build`.
// Measures rendered <title> / <meta description> lengths in dist/ for the
// CTR-surgery batch pages, verifies exact expected strings (Gate 3), and
// spot-checks that other toxin pages still use the default title template.
// Zero-dependency Node. Same script must be reused at review time so the
// measurement口径 never drifts.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));

// Expected values from the approved plan (修订版 2)
const EXPECTED = [
	{
		name: 'dog-age-calculator',
		file: 'tools/dog-age-calculator/index.html',
		title: 'Dog Age Calculator by Size (2026) | The Caring Pet',
		description:
			'Free dog age calculator — convert dog years to human years by size, with vet-aligned milestones for every life stage. No signup needed.',
	},
	{
		name: 'toxin-vitamin-a',
		file: 'tools/pet-toxin-lookup/vitamin-a/index.html',
		title: 'Retinol Toxic to Cats: Signs & First Aid | The Caring Pet',
		description:
			'Retinol (vitamin A) is toxic to cats — see the symptoms, first aid steps, and exactly when to call the vet or a poison hotline.',
	},
	{
		name: 'cat-years-to-human-years',
		file: 'blog/cat-years-to-human-years/index.html',
		title: 'Cat Years to Human Years Chart & Calculator | The Caring Pet',
		description:
			'Convert cat years to human years with the vet-sourced 16-5-4 chart and free cat age calculator — every age from kitten to senior.',
	},
];

function extract(html, re) {
	const m = html.match(re);
	if (!m) return null;
	// Decode HTML entities so lengths/compares match what SERPs render
	return m[1].replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
}

let failures = 0;
console.log('=== Gate 2: rendered lengths (dist/) ===');
for (const page of EXPECTED) {
	const html = readFileSync(join(DIST, page.file), 'utf8');
	const title = extract(html, /<title>([^<]*)<\/title>/);
	const desc = extract(html, /<meta\s+name="description"\s+content="([^"]*)"/) ??
		extract(html, /<meta\s+content="([^"]*)"\s+name="description"/);
	const okTitle = title === page.title;
	const okDesc = desc === page.description;
	if (!okTitle || !okDesc) failures++;
	console.log(
		`\n[${page.name}] ${page.file}`,
		`\n  title  (${title?.length ?? '?'} chars): ${title}`,
		`\n  desc   (${desc?.length ?? '?'} chars): ${desc}`,
		`\n  title match: ${okTitle ? 'OK' : 'MISMATCH (expected: ' + page.title + ')'}`,
		`\n  desc  match: ${okDesc ? 'OK' : 'MISMATCH (expected: ' + page.description + ')'}`,
	);
}

console.log('\n=== Gate 3: toxin template fallback + JSON-LD consistency ===');
// 1. Collect all toxin slugs from src/data and check dist titles.
const toxinDir = fileURLToPath(new URL('../src/data/toxins', import.meta.url));
const slugs = [];
for (const f of readdirSync(toxinDir)) {
	if (!f.endsWith('.ts')) continue;
	const src = readFileSync(join(toxinDir, f), 'utf8');
	for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) slugs.push({ slug: m[1], file: f });
}
let defaultCount = 0;
let seoCount = 0;
for (const { slug } of slugs) {
	const file = join(DIST, 'tools/pet-toxin-lookup', slug, 'index.html');
	let html;
	try {
		html = readFileSync(file, 'utf8');
	} catch {
		continue; // not built / renamed
	}
	const title = extract(html, /<title>([^<]*)<\/title>/) ?? '';
	if (slug === 'vitamin-a') {
		// JSON-LD <title> consistency: og:title should equal <title>
		const og = extract(html, /<meta\s+property="og:title"\s+content="([^"]*)"/) ??
			extract(html, /<meta\s+content="([^"]*)"\s+property="og:title"/);
		const jsonLdOk = og === title;
		console.log(`  vitamin-a: og:title ${jsonLdOk ? '==' : '!='} <title> (${og})`);
		if (!jsonLdOk) failures++;
		seoCount++;
		continue;
	}
	const isDefault = /^Is .* Toxic to Cats and Dogs\? \| The Caring Pet$/.test(title);
	if (!isDefault) {
		console.log(`  [WARN] ${slug}: unexpected title ${title}`);
		failures++;
	} else defaultCount++;
}
console.log(`  toxin pages using default template: ${defaultCount}; using seoTitle: ${seoCount} (vitamin-a)`);

// 2. RSS check for cat-years title
const rss = readFileSync(join(DIST, 'rss.xml'), 'utf8');
const rssOk = rss.includes('Cat Years to Human Years Chart &amp; Calculator') ||
	rss.includes('Cat Years to Human Years Chart & Calculator');
console.log(`  RSS cat-years title updated: ${rssOk ? 'OK' : 'NOT FOUND'}`);
if (!rssOk) failures++;

console.log(`\n=== ${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' FAILURE(S)'} ===`);
process.exit(failures === 0 ? 0 : 1);
