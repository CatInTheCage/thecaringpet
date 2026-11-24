// 痛点采集配置：所有查询词、ASIN、URL 模板、时间预算。
// 采集脚本只产出原始数据，分析（评分/选题/引用筛选）由 Claude 按 ANALYSIS.md 在会话内完成。

export const REDDIT_TASKS = [
  { id: 'cat-appetite', topic: "cat won't eat or refuses food", subreddits: 'cats,CatAdvice,catfood,CATHELP,SeniorCats' },
  { id: 'fast-eating', topic: 'dog eats too fast vomiting or choking', subreddits: 'dogs,DogAdvice,puppy101,DogFood,dogtraining' },
  { id: 'automatic-feeder-jam', topic: 'automatic cat feeder jam or not dispensing', subreddits: 'cats,CatAdvice,catfood,indoorcats' },
  { id: 'water-fountain-cleaning', topic: 'cat water fountain cleaning slime or pump noise', subreddits: 'cats,CatAdvice,catcare,catquestions' },
  { id: 'food-stealing', topic: 'cat steals other cat food or microchip feeder', subreddits: 'cats,CatAdvice,catfood,indoorcats' },
  { id: 'whisker-bowl', topic: 'cat bowl whisker fatigue or pulls food out', subreddits: 'cats,CatAdvice,catcare,CATHELP' },
  { id: 'lick-mat-anxiety', topic: 'lick mat for dog anxiety boredom or destructive chewing', subreddits: 'dogs,DogAdvice,puppy101,dogtraining' },
  { id: 'senior-cat-appetite', topic: 'senior cat not eating or drinking enough', subreddits: 'SeniorCats,cats,CatAdvice,CATHELP,AskVet' },
];

// 已验证 ASIN（来自 src/content/blog 的 ProductCard product.amazonId）。
// 2026-11-24 实测：Amazon 评论页（product-reviews / portal/customer-reviews）对所有过滤、
// 排序、分页参数均只返回固定 8 条 Top reviews（严重好评偏差）；Customers-say insights 不可用。
// 因此 v1 抓 Top reviews 全量保留（含 1-5 星），分析层筛 ≤4 星 + 5 星中的对比抱怨；
// 报告必须标注样本偏差，差评频率不代表真实差评率。
export const AMAZON_ASINS = [
  { asin: 'B00FPKNRG4', category: 'slow feeder bowl', product: 'Outward Hound Fun Feeder Slo Bowl' },
  { asin: 'B0965DBB9Q', category: 'slow feeder bowl', product: 'LE TAUCI Ceramic Slow Feeder' },
  { asin: 'B09TKC6QWS', category: 'slow feeder bowl', product: 'Outward Hound Stainless Steel Slo Bowl' },
  { asin: 'B0787KPCPX', category: 'slow feeder bowl', product: 'Outward Hound Fun Feeder Large' },
  { asin: 'B0B5ZJS7XC', category: 'automatic cat feeder', product: 'PETLIBRO Granary Camera Feeder' },
  { asin: 'B01AUYLVU8', category: 'automatic cat feeder', product: 'Cat Mate C500' },
  { asin: 'B07NR47N2Q', category: 'automatic cat feeder', product: 'PetSafe Smart Feed 2' },
  { asin: 'B0FPFZ7XFJ', category: 'cat water fountain', product: 'Veken Stainless C1 108oz' },
  { asin: 'B08NCDBT7Q', category: 'cat water fountain', product: 'Veken C1 Classic 95oz' },
  { asin: 'B0G6ZMT8T3', category: 'cat water fountain', product: 'PETLIBRO Wireless Pump Fountain' },
  { asin: 'B07RGWRR8T', category: 'lick mat', product: 'LickiMat Tuff Buddy' },
  { asin: 'B0CC6K2RDJ', category: 'lick mat', product: 'KONG Licks Mat' },
  { asin: 'B09HH531SN', category: 'ceramic cat bowl', product: 'PETKIT Raised Ceramic Bowl' },
  { asin: 'B0861N79XY', category: 'ceramic cat bowl', product: 'Y YHY Raised Cat Bowl' },
  { asin: 'B00O0UIPTY', category: 'microchip feeder', product: 'SureFeed Microchip Pet Feeder' },
  { asin: 'B09ZLJCYSR', category: 'microchip feeder', product: 'Closer Pets MiBowl CP500' },
];

export const QUORA_QUERIES = [
  'site:quora.com cat refuses to eat but eats treats',
  'site:quora.com dog eats too fast vomiting slow feeder',
  'site:quora.com automatic cat feeder not dispensing jam',
  'site:quora.com cat water fountain slime cleaning pump',
  'site:quora.com cat stealing other cats food microchip feeder',
  'site:quora.com lick mat dog anxiety boredom',
];

export const SUGGEST_SEEDS = [
  'why does my cat',
  'why does my dog',
  "cat won't",
  "dog won't",
  'dog ate',
  'how to stop dog',
  'how to get cat to',
  "automatic cat feeder won't",
  'how to clean cat water fountain',
  'how to slow down dog eating',
];

export const PAA_QUERIES = [
  'cat refuses to eat but eats treats',
  'dog eats too fast then vomits',
  'automatic cat feeder not dispensing food',
  'cat water fountain slime how to clean',
  'how to stop cat stealing other cat food',
  'do lick mats help dogs with anxiety',
];

export const TRENDS_TERMS = [
  'automatic cat feeder',
  'cat water fountain',
  'slow feeder dog bowl',
  'microchip cat feeder',
  'lick mat for dogs',
  'ceramic cat bowl',
];

export const BUDGETS_MS = {
  reddit: 22 * 60_000,
  amazon: 10 * 60_000,
  'quora-google': 6 * 60_000,
  trends: 8 * 60_000,
};

export const LIMITS = {
  redditItemsPerTask: 12,
  redditTaskTimeoutMs: 6 * 60_000,
  amazonReviewsPerAsin: 8, // Top reviews 固定 8 条（实测）
  quoraPerQuery: 5,
  suggestPerSeed: 10,
  paaPerQuery: 8,
  trendsPerTerm: 25,
};

export const URLS = {
  amazonReviews: (asin) => `https://www.amazon.com/product-reviews/${asin}/`,
  amazonReview: (reviewId) => `https://www.amazon.com/gp/customer-reviews/${reviewId}`,
  googleSerp: (q) => `https://www.google.com/search?hl=en&gl=us&pws=0&num=10&q=${encodeURIComponent(q)}`,
  googleSuggest: (seed) => `https://www.google.com/complete/search?client=firefox&hl=en&gl=us&q=${encodeURIComponent(seed)}`,
  trendsExplore: (term) => `https://trends.google.com/trends/explore?date=today%203-m&geo=US&hl=en&q=${encodeURIComponent(term)}`,
};

// last30days 可执行文件与输出目录（可用 LAST30DAYS_PY 环境变量覆盖）
export const LAST30DAYS = {
  script: process.env.LAST30DAYS_PY || `${process.env.HOME}/.claude/skills/last30days/scripts/last30days.py`,
  envFile: `${process.env.HOME}/.config/last30days/.env`,
};

export const WEBBRIDGE_SESSION = 'tcp-pain-radar';
