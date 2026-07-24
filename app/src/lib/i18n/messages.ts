// UI-chrome translation dictionary for the language switcher (EN default,
// toggle ID). Scope decided with the user: this covers the INTERFACE only
// nav, buttons, headings, section labels, footer, and form chrome. Catalogued
// content that comes from D1 (destination/story/experience/product text) is
// intentionally NOT here; it renders in the language it was written in.
export type Lang = "en" | "id";

export const LANGUAGES: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "id", label: "Bahasa Indonesia", short: "ID", flag: "🇮🇩" },
];

export const DEFAULT_LANG: Lang = "en";

type Dict = Record<string, string>;

const en: Dict = {
  // nav
  "nav.explore": "Explore",
  "nav.stories": "Stories",
  "nav.experiences": "Experiences",
  "nav.marketplace": "Marketplace",
  "nav.ambassador": "Ambassador",
  "nav.cta": "Explore Destinations",
  "nav.language": "Language",

  // categories
  "cat.budaya": "Culture",
  "cat.festival": "Festival",
  "cat.kuliner": "Cuisine",
  "cat.kerajinan": "Crafts",
  "cat.alam-budaya": "Nature & Culture",

  // shared
  "common.by": "by",
  "common.read": "Read",
  "common.view": "View",
  "common.madeBy": "Made by",
  "btn.viewDestination": "View Destination",
  "btn.reserveExperience": "Reserve Experience",
  "btn.viewProduct": "View Product",
  "btn.browseExperiences": "Browse experiences",
  "btn.browseMarketplace": "Browse marketplace",
  "btn.clearFilters": "Clear filters",

  // hero
  "hero.eyebrow": "A field atlas of hidden Indonesia",
  "hero.headline": "Discover Hidden Cultures Across Indonesia",
  "hero.subcopy":
    "A field atlas of hidden villages, living crafts, and forgotten festivals across the archipelago, catalogued with the communities who keep them alive.",
  "hero.cta": "Explore Destinations",
  "hero.photoCredit": "Photo",

  // landing - why
  "why.title": "Why look beyond the usual itinerary",
  "why.c1.title": "Researched, not recycled",
  "why.c1.body":
    "Every destination is documented with a local partner: history, cultural value, and how a visit actually reaches the community.",
  "why.c2.title": "Filtered by what moves you",
  "why.c2.body":
    "Province, culture, festival, cuisine, craft, or nature. Pick an interest, get a place most tourists have never heard of.",
  "why.c3.title": "A Sustainability Score on every entry",
  "why.c3.body":
    "Each destination carries a score explaining how visits are managed so a village isn't loved into the ground.",

  // landing - featured
  "featured.eyebrow": "Featured entries",
  "featured.title": "Hidden destinations worth the detour",

  // landing - system
  "system.eyebrow": "The Atlas System",
  "system.title": "Filter by what you're chasing, not by island name",
  "system.body":
    "Every destination is tagged by province and by what makes it worth the trip. Mix and match on the Explore map.",

  // landing - teasers
  "home.stories.label": "Cultural Stories",
  "home.experience.label": "Local Experience",
  "home.marketplace.label": "Local Marketplace",
  "home.ambassador.label": "Youth Cultural Ambassador",
  "home.ambassador.title": "Tell your village's story before the crowds define it",
  "home.ambassador.plate": "Become an Ambassador",
  "home.ambassador.cta": "Apply as Ambassador",

  // footer
  "footer.tagline": "Discover Indonesia beyond the crowds.",
  "footer.col.explore": "Explore",
  "footer.col.participate": "Participate",
  "footer.col.contact": "Contact",
  "footer.link.destinations": "Destinations",
  "footer.link.stories": "Cultural Stories",
  "footer.link.experience": "Local Experience",
  "footer.link.marketplace": "Local Marketplace",
  "footer.link.ambassador": "Youth Cultural Ambassador",
  "footer.contact.help": "Questions or partnerships? Reach the team directly.",
  "footer.legal": "Culture Atlas. An open atlas of Indonesia's hidden cultural destinations.",

  // explore
  "explore.eyebrow": "Explore Destinations",
  "explore.title": "Pick an interest, find a place you've never heard of",
  "explore.filter.category": "Category",
  "explore.filter.province": "Province",
  "explore.empty": "No destinations match this filter yet. Try clearing a filter.",

  // stories
  "stories.eyebrow": "Cultural Stories",
  "stories.title": "Told from inside the village, by Youth Cultural Ambassadors",
  "stories.type.video": "Video",
  "stories.type.article": "Article",

  // experiences
  "experiences.eyebrow": "Local Experience",
  "experiences.title": "Learn the craft, don't just watch it",

  // marketplace
  "marketplace.eyebrow": "Local Marketplace",
  "marketplace.title": "Bought straight from the maker, not a middleman",
  "marketplace.clearFilter": "Clear filter",

  // destination detail
  "dd.history": "History",
  "dd.culturalValue": "Cultural value",
  "dd.activities": "Activities",
  "dd.location": "Location",
  "dd.howToGetThere": "How to get there",
  "dd.sustainabilityScore": "Sustainability Score",
  "dd.storiesFromHere": "Cultural Stories from here",
  "dd.localExperience": "Local Experience",
  "dd.fromMarketplace": "From the Local Marketplace",

  // ambassador
  "ambassador.eyebrow": "Youth Cultural Ambassador",
  "ambassador.title": "Document your village before someone else tells its story wrong",
  "ambassador.intro":
    "Ambassadors upload cultural content, promote their home village, and collaborate directly with local communities catalogued on Culture Atlas.",
  "ambassador.success.title": "Application received",
  "ambassador.success.body":
    "Thank you. The Culture Atlas team reviews applications regularly and will reach out by email.",
  "ambassador.form.fullName": "Full name",
  "ambassador.form.fullName.ph": "Your full name",
  "ambassador.form.email": "Email",
  "ambassador.form.region": "Region / village",
  "ambassador.form.region.ph": "Example: Manggarai, NTT",
  "ambassador.form.age": "Age (optional)",
  "ambassador.form.motivation": "Why do you want to become an Ambassador",
  "ambassador.form.motivation.ph":
    "Tell us about the culture in your region you want to document...",
  "ambassador.form.portfolio": "Portfolio link (optional)",
  "ambassador.form.submit": "Submit Application",
  "ambassador.form.submitting": "Submitting…",
  "ambassador.form.genericError": "Something went wrong. Please try again shortly.",
};

const id: Dict = {
  // nav
  "nav.explore": "Jelajah",
  "nav.stories": "Cerita",
  "nav.experiences": "Pengalaman",
  "nav.marketplace": "Marketplace",
  "nav.ambassador": "Ambassador",
  "nav.cta": "Jelajahi Destinasi",
  "nav.language": "Bahasa",

  // categories
  "cat.budaya": "Budaya",
  "cat.festival": "Festival",
  "cat.kuliner": "Kuliner",
  "cat.kerajinan": "Kerajinan",
  "cat.alam-budaya": "Alam & Budaya",

  // shared
  "common.by": "oleh",
  "common.read": "Baca",
  "common.view": "Lihat",
  "common.madeBy": "Dibuat oleh",
  "btn.viewDestination": "Lihat Destinasi",
  "btn.reserveExperience": "Pesan Pengalaman",
  "btn.viewProduct": "Lihat Produk",
  "btn.browseExperiences": "Lihat semua pengalaman",
  "btn.browseMarketplace": "Lihat marketplace",
  "btn.clearFilters": "Hapus filter",

  // hero
  "hero.eyebrow": "Atlas lapangan Indonesia yang tersembunyi",
  "hero.headline": "Temukan Budaya Tersembunyi di Seluruh Indonesia",
  "hero.subcopy":
    "Atlas lapangan berisi desa tersembunyi, kerajinan yang masih hidup, dan festival yang nyaris terlupakan di seluruh nusantara, didokumentasikan bersama komunitas yang menjaganya.",
  "hero.cta": "Jelajahi Destinasi",
  "hero.photoCredit": "Foto",

  // landing - why
  "why.title": "Kenapa melihat di luar rute biasa",
  "why.c1.title": "Diteliti, bukan sekadar diulang",
  "why.c1.body":
    "Setiap destinasi didokumentasikan bersama mitra lokal: sejarah, nilai budaya, dan bagaimana kunjungan benar-benar sampai ke masyarakat.",
  "why.c2.title": "Difilter sesuai minatmu",
  "why.c2.body":
    "Provinsi, budaya, festival, kuliner, kerajinan, atau alam. Pilih minat, dapatkan tempat yang belum pernah didengar wisatawan.",
  "why.c3.title": "Skor Keberlanjutan di setiap entri",
  "why.c3.body":
    "Setiap destinasi punya skor yang menjelaskan bagaimana kunjungan dikelola agar sebuah desa tidak rusak karena terlalu ramai.",

  // landing - featured
  "featured.eyebrow": "Entri pilihan",
  "featured.title": "Destinasi tersembunyi yang layak disinggahi",

  // landing - system
  "system.eyebrow": "Sistem Atlas",
  "system.title": "Filter berdasarkan yang kamu cari, bukan nama pulau",
  "system.body":
    "Setiap destinasi ditandai berdasarkan provinsi dan hal yang membuatnya layak dikunjungi. Padukan sesukamu di peta Jelajah.",

  // landing - teasers
  "home.stories.label": "Cerita Budaya",
  "home.experience.label": "Pengalaman Lokal",
  "home.marketplace.label": "Marketplace Lokal",
  "home.ambassador.label": "Youth Cultural Ambassador",
  "home.ambassador.title": "Ceritakan desamu sebelum keramaian yang mendefinisikannya",
  "home.ambassador.plate": "Jadi Ambassador",
  "home.ambassador.cta": "Daftar jadi Ambassador",

  // footer
  "footer.tagline": "Temukan Indonesia di luar keramaian.",
  "footer.col.explore": "Jelajah",
  "footer.col.participate": "Berpartisipasi",
  "footer.col.contact": "Kontak",
  "footer.link.destinations": "Destinasi",
  "footer.link.stories": "Cerita Budaya",
  "footer.link.experience": "Pengalaman Lokal",
  "footer.link.marketplace": "Marketplace Lokal",
  "footer.link.ambassador": "Youth Cultural Ambassador",
  "footer.contact.help": "Ada pertanyaan atau ingin bekerja sama? Hubungi tim langsung.",
  "footer.legal": "Culture Atlas. Atlas terbuka destinasi budaya tersembunyi Indonesia.",

  // explore
  "explore.eyebrow": "Jelajahi Destinasi",
  "explore.title": "Pilih minat, temukan tempat yang belum pernah kamu dengar",
  "explore.filter.category": "Kategori",
  "explore.filter.province": "Provinsi",
  "explore.empty": "Belum ada destinasi yang cocok dengan filter ini. Coba hapus satu filter.",

  // stories
  "stories.eyebrow": "Cerita Budaya",
  "stories.title": "Diceritakan dari dalam desa, oleh Youth Cultural Ambassador",
  "stories.type.video": "Video",
  "stories.type.article": "Artikel",

  // experiences
  "experiences.eyebrow": "Pengalaman Lokal",
  "experiences.title": "Pelajari kerajinannya, bukan sekadar menonton",

  // marketplace
  "marketplace.eyebrow": "Marketplace Lokal",
  "marketplace.title": "Dibeli langsung dari pembuatnya, tanpa perantara",
  "marketplace.clearFilter": "Hapus filter",

  // destination detail
  "dd.history": "Sejarah",
  "dd.culturalValue": "Nilai budaya",
  "dd.activities": "Aktivitas",
  "dd.location": "Lokasi",
  "dd.howToGetThere": "Cara menuju",
  "dd.sustainabilityScore": "Skor Keberlanjutan",
  "dd.storiesFromHere": "Cerita Budaya dari sini",
  "dd.localExperience": "Pengalaman Lokal",
  "dd.fromMarketplace": "Dari Marketplace Lokal",

  // ambassador
  "ambassador.eyebrow": "Youth Cultural Ambassador",
  "ambassador.title": "Dokumentasikan desamu sebelum orang lain salah menceritakannya",
  "ambassador.intro":
    "Ambassador mengunggah konten budaya, mempromosikan desa asalnya, dan berkolaborasi langsung dengan komunitas lokal yang terdaftar di Culture Atlas.",
  "ambassador.success.title": "Pendaftaran diterima",
  "ambassador.success.body":
    "Terima kasih. Tim Culture Atlas meninjau pendaftaran secara berkala dan akan menghubungi lewat email.",
  "ambassador.form.fullName": "Nama lengkap",
  "ambassador.form.fullName.ph": "Nama lengkapmu",
  "ambassador.form.email": "Email",
  "ambassador.form.region": "Daerah / desa",
  "ambassador.form.region.ph": "Contoh: Manggarai, NTT",
  "ambassador.form.age": "Usia (opsional)",
  "ambassador.form.motivation": "Kenapa kamu ingin jadi Ambassador",
  "ambassador.form.motivation.ph": "Ceritakan budaya di daerahmu yang ingin kamu dokumentasikan...",
  "ambassador.form.portfolio": "Tautan portofolio (opsional)",
  "ambassador.form.submit": "Kirim Pendaftaran",
  "ambassador.form.submitting": "Mengirim…",
  "ambassador.form.genericError": "Terjadi kesalahan. Silakan coba lagi sebentar lagi.",
};

export const messages: Record<Lang, Dict> = { en, id };
