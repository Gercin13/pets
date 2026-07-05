// Central i18n dictionary + navigation model for PetExpert.
// Add a locale by extending `languages` and `ui`; components pick it up automatically.

export const languages = {
  en: 'EN',
  de: 'DE',
  uk: 'UK',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'nav.choosing': 'Choosing a Pet',
    'nav.training': 'Training',
    'nav.health': 'Health',
    'nav.nutrition': 'Nutrition',
    'nav.petLife': 'Pet Life',
    'nav.blog': 'Blog',
    'nav.picks': 'Best Picks',
    'footer.tagline': 'Expert Care in a Cozy Home.',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved.',
    'footer.disclosure':
      'Affiliate Disclosure: We may earn a commission when you buy through links on our site.',
    'a11y.search': 'Search',
    'a11y.account': 'Account',
    'a11y.menu': 'Main navigation',
    'a11y.footerNav': 'Footer navigation',
    'a11y.langSwitcher': 'Change language',
    'article.related': 'Related articles',
    'article.verified': 'Verified expert',
    'article.readingUnit': 'min read',
    'crumb.home': 'Home',
    'comments.title': 'Comments',
    'comments.leave': 'Leave a comment',
    'comments.placeholder': 'Share your thoughts…',
    'comments.submit': 'Post Comment',
    'comments.vet': 'Veterinarian',
    'comments.reply': 'Reply',
    'home.hero.title': 'Your Guide to a World of Happy Pets',
    'home.hero.subtitle':
      'Vet-reviewed advice on health, nutrition, training and everyday life with the animals you love.',
    'home.hero.search': 'Search articles, breeds, tips…',
    'home.hero.imageAlt': 'A young woman relaxing on a sofa with a golden retriever and a cat',
    'home.latest.title': 'Latest Articles',
    'home.latest.viewAll': 'View all',
    'home.featured.category': 'Nutrition',
    'home.featured.title': 'The Complete Guide to Natural Feeding',
    'home.featured.excerpt':
      'Everything you need to plan a balanced, species-appropriate raw or home-cooked diet — safely.',
    'home.featured.readingTime': '12 min read',
    'home.card1.category': 'Kittens',
    'home.card1.title': 'Bringing a New Kitten Home: The First 30 Days',
    'home.card1.readingTime': '6 min read',
    'home.card2.category': 'Senior Care',
    'home.card2.title': 'Caring for Senior Dogs: Comfort in the Golden Years',
    'home.card2.readingTime': '8 min read',
    'home.news.title': 'Get expert tips straight to your inbox',
    'home.news.text':
      'Join 25,000 pet parents getting our weekly, vet-reviewed newsletter — practical advice, no spam.',
    'home.news.placeholder': 'Your email address',
    'home.news.cta': 'Subscribe',
    'cat.intro': 'Expert, vet-reviewed articles — practical guidance you can trust.',
    'cat.choosing.intro':
      'Thinking about adding a pet to your family? Breed guides, adoption advice, and honest comparisons to help you choose with confidence.',
    'cat.training.intro':
      'Positive, vet-approved training methods — from the first days home to solving stubborn behavior problems.',
    'cat.nutrition.intro':
      'Science-backed feeding advice — how to read labels, choose the right diet, and avoid common mistakes.',
    'cat.petLife.intro':
      'Everyday life with your pet — home safety, travel, routines, and the small things that make a big difference.',
    'cat.explore': 'Fresh articles are on the way. In the meantime, explore:',
    'err.title': 'Page not found',
    'err.text': 'The page you’re looking for doesn’t exist or has moved.',
    'err.home': 'Back to home',
    'blog.title': 'Blog',
    'blog.intro': 'Guides, tips and vet-reviewed articles for every stage of life with your pet.',
    'blog.all': 'All',
    'blog.filter': 'Filter by category',
    'blog.empty': 'No articles here yet — check back soon.',
  },
  de: {
    'nav.choosing': 'Haustierwahl',
    'nav.training': 'Training',
    'nav.health': 'Gesundheit',
    'nav.nutrition': 'Ernährung',
    'nav.petLife': 'Haustierleben',
    'nav.blog': 'Blog',
    'nav.picks': 'Bestenlisten',
    'footer.tagline': 'Expertenpflege in einem gemütlichen Zuhause.',
    'footer.about': 'Über uns',
    'footer.contact': 'Kontakt',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.disclosure':
      'Affiliate-Hinweis: Wir erhalten möglicherweise eine Provision, wenn Sie über Links auf unserer Seite einkaufen.',
    'a11y.search': 'Suche',
    'a11y.account': 'Konto',
    'a11y.menu': 'Hauptnavigation',
    'a11y.footerNav': 'Fußzeilen-Navigation',
    'a11y.langSwitcher': 'Sprache ändern',
    'article.related': 'Ähnliche Artikel',
    'article.verified': 'Geprüfter Experte',
    'article.readingUnit': 'Min. Lesezeit',
    'crumb.home': 'Startseite',
    'comments.title': 'Kommentare',
    'comments.leave': 'Kommentar hinterlassen',
    'comments.placeholder': 'Teilen Sie Ihre Gedanken…',
    'comments.submit': 'Kommentar senden',
    'comments.vet': 'Tierarzt',
    'comments.reply': 'Antworten',
    'home.hero.title': 'Ihr Wegweiser in die Welt glücklicher Haustiere',
    'home.hero.subtitle':
      'Von Tierärzten geprüfte Ratschläge zu Gesundheit, Ernährung, Training und dem Alltag mit den Tieren, die Sie lieben.',
    'home.hero.search': 'Artikel, Rassen, Tipps suchen…',
    'home.hero.imageAlt':
      'Eine junge Frau entspannt auf dem Sofa mit einem Golden Retriever und einer Katze',
    'home.latest.title': 'Neueste Beiträge',
    'home.latest.viewAll': 'Alle ansehen',
    'home.featured.category': 'Ernährung',
    'home.featured.title': 'Der komplette Leitfaden zur natürlichen Fütterung',
    'home.featured.excerpt':
      'Alles, was Sie für eine ausgewogene, artgerechte Roh- oder selbstgekochte Ernährung brauchen — sicher.',
    'home.featured.readingTime': '12 Min. Lesezeit',
    'home.card1.category': 'Kätzchen',
    'home.card1.title': 'Ein neues Kätzchen zu Hause: Die ersten 30 Tage',
    'home.card1.readingTime': '6 Min. Lesezeit',
    'home.card2.category': 'Seniorenpflege',
    'home.card2.title': 'Pflege älterer Hunde: Komfort in den goldenen Jahren',
    'home.card2.readingTime': '8 Min. Lesezeit',
    'home.news.title': 'Expertentipps direkt in Ihr Postfach',
    'home.news.text':
      'Schließen Sie sich 25.000 Tierhaltern an, die unseren wöchentlichen, tierärztlich geprüften Newsletter erhalten — praktische Tipps, kein Spam.',
    'home.news.placeholder': 'Ihre E-Mail-Adresse',
    'home.news.cta': 'Abonnieren',
    'cat.intro': 'Von Tierärzten geprüfte Artikel — praxisnah und verlässlich.',
    'cat.choosing.intro':
      'Sie überlegen, ein Haustier aufzunehmen? Rasseporträts, Adoptionstipps und ehrliche Vergleiche für eine sichere Entscheidung.',
    'cat.training.intro':
      'Positive, tierärztlich empfohlene Trainingsmethoden — von den ersten Tagen zu Hause bis zu hartnäckigen Verhaltensproblemen.',
    'cat.nutrition.intro':
      'Wissenschaftlich fundierte Fütterungstipps — Etiketten richtig lesen, die passende Ernährung wählen und häufige Fehler vermeiden.',
    'cat.petLife.intro':
      'Der Alltag mit Ihrem Haustier — Sicherheit zu Hause, Reisen, Routinen und die kleinen Dinge, die einen großen Unterschied machen.',
    'cat.explore': 'Neue Artikel folgen in Kürze. Entdecken Sie in der Zwischenzeit:',
    'err.title': 'Seite nicht gefunden',
    'err.text': 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    'err.home': 'Zur Startseite',
    'blog.title': 'Blog',
    'blog.intro': 'Ratgeber, Tipps und tierärztlich geprüfte Artikel für jede Phase des Lebens mit Ihrem Tier.',
    'blog.all': 'Alle',
    'blog.filter': 'Nach Kategorie filtern',
    'blog.empty': 'Hier gibt es noch keine Artikel — schauen Sie bald wieder vorbei.',
  },
  uk: {
    'nav.choosing': 'Вибір улюбленця',
    'nav.training': 'Дресирування',
    'nav.health': 'Здоровʼя',
    'nav.nutrition': 'Харчування',
    'nav.petLife': 'Життя улюбленців',
    'nav.blog': 'Блог',
    'nav.picks': 'Наш вибір',
    'footer.tagline': 'Експертний догляд у затишному домі.',
    'footer.about': 'Про нас',
    'footer.contact': 'Контакти',
    'footer.privacy': 'Політика конфіденційності',
    'footer.terms': 'Умови використання',
    'footer.rights': 'Усі права захищено.',
    'footer.disclosure':
      'Партнерське розкриття: ми можемо отримувати комісію за покупки, здійснені за посиланнями на нашому сайті.',
    'a11y.search': 'Пошук',
    'a11y.account': 'Обліковий запис',
    'a11y.menu': 'Головна навігація',
    'a11y.footerNav': 'Навігація у футері',
    'a11y.langSwitcher': 'Змінити мову',
    'article.related': 'Схожі статті',
    'article.verified': 'Перевірений експерт',
    'article.readingUnit': 'хв читання',
    'crumb.home': 'Головна',
    'comments.title': 'Коментарі',
    'comments.leave': 'Залишити коментар',
    'comments.placeholder': 'Поділіться думками…',
    'comments.submit': 'Надіслати',
    'comments.vet': 'Ветеринар',
    'comments.reply': 'Відповісти',
    'home.hero.title': 'Ваш путівник у світ щасливих улюбленців',
    'home.hero.subtitle':
      'Перевірені ветеринарами поради щодо здоровʼя, харчування, дресирування та щоденного життя з тваринами, яких ви любите.',
    'home.hero.search': 'Шукати статті, породи, поради…',
    'home.hero.imageAlt': 'Молода жінка відпочиває на дивані із золотистим ретривером і котом',
    'home.latest.title': 'Свіжі матеріали',
    'home.latest.viewAll': 'Дивитися всі',
    'home.featured.category': 'Харчування',
    'home.featured.title': 'Повний посібник із натурального харчування',
    'home.featured.excerpt':
      'Усе, що потрібно для збалансованого, видоспецифічного натурального раціону — безпечно.',
    'home.featured.readingTime': '12 хв читання',
    'home.card1.category': 'Кошенята',
    'home.card1.title': 'Кошеня вдома: перші 30 днів',
    'home.card1.readingTime': '6 хв читання',
    'home.card2.category': 'Літні тварини',
    'home.card2.title': 'Догляд за літніми собаками: комфорт у поважному віці',
    'home.card2.readingTime': '8 хв читання',
    'home.news.title': 'Отримуйте поради експертів прямо на пошту',
    'home.news.text':
      'Приєднуйтесь до 25 000 власників тварин, які отримують нашу щотижневу ветеринарну розсилку — практичні поради, без спаму.',
    'home.news.placeholder': 'Ваша електронна адреса',
    'home.news.cta': 'Підписатися',
    'cat.intro': 'Статті, перевірені ветеринарами — практичні поради, яким можна довіряти.',
    'cat.choosing.intro':
      'Плануєте завести улюбленця? Огляди порід, поради з усиновлення та чесні порівняння, які допоможуть обрати впевнено.',
    'cat.training.intro':
      'Позитивні методи дресирування, схвалені ветеринарами, — від перших днів удома до подолання складної поведінки.',
    'cat.nutrition.intro':
      'Науково обґрунтовані поради з харчування — як читати етикетки, обрати правильний раціон і уникнути типових помилок.',
    'cat.petLife.intro':
      'Щоденне життя з улюбленцем — безпека вдома, подорожі, режим дня і дрібниці, які змінюють усе.',
    'cat.explore': 'Нові статті вже готуються. А поки що перегляньте:',
    'err.title': 'Сторінку не знайдено',
    'err.text': 'Сторінки, яку ви шукаєте, не існує або її переміщено.',
    'err.home': 'На головну',
    'blog.title': 'Блог',
    'blog.intro': 'Поради, гайди та перевірені ветеринарами статті для кожного етапу життя з улюбленцем.',
    'blog.all': 'Усі',
    'blog.filter': 'Фільтрувати за категорією',
    'blog.empty': 'Тут поки що немає статей — завітайте згодом.',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export interface NavItem {
  key: UIKey;
  href: string; // locale-agnostic path; the active locale is prefixed at render time
}

// One canonical slug per section, prefixed with the active locale (/de/health, /uk/health …).
// NOTE: /blog, /health and /best-picks have dedicated pages — [category].astro excludes them.
export const navItems: NavItem[] = [
  { key: 'nav.choosing', href: '/choosing-a-pet' },
  { key: 'nav.training', href: '/training' },
  { key: 'nav.health', href: '/health' },
  { key: 'nav.nutrition', href: '/nutrition' },
  { key: 'nav.petLife', href: '/pet-life' },
  { key: 'nav.blog', href: '/blog' },
  { key: 'nav.picks', href: '/best-picks' },
];

export const footerLinks: NavItem[] = [
  { key: 'footer.about', href: '/about' },
  { key: 'footer.contact', href: '/contact' },
  { key: 'footer.privacy', href: '/privacy' },
  { key: 'footer.terms', href: '/terms' },
];
