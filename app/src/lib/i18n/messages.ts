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
  "hero.cta.subtext": "8 hidden destinations, catalogued",
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
  "experience.detail.duration": "Duration",
  "experience.detail.groupSize": "Group size",
  "experience.detail.howToJoin": "How to join",
  "reservation.title": "Request to reserve this experience",
  "reservation.date": "Preferred date",
  "reservation.participants": "Number of participants",
  "reservation.note": "Note (optional)",
  "reservation.submit": "Send reservation request",
  "reservation.submitting": "Sending request…",
  "reservation.success.title": "Reservation request received",
  "reservation.success.body": "The local team will follow up by email to confirm your schedule.",

  // marketplace
  "marketplace.eyebrow": "Local Marketplace",
  "marketplace.title": "Bought straight from the maker, not a middleman",
  "marketplace.clearFilter": "Clear filter",
  "marketplace.order.title": "Order this product",
  "marketplace.order.quantity": "Quantity",
  "marketplace.order.address": "Shipping address",
  "marketplace.order.address.ph": "Full address, city, postal code",
  "marketplace.order.note": "Note (optional)",
  "marketplace.order.submit": "Place order request",
  "marketplace.order.submitting": "Placing order…",
  "marketplace.order.success.title": "Order request received",
  "marketplace.order.success.body": "The maker will follow up by email or phone to confirm payment and shipping.",

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

  // auth (shared)
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.fullName": "Full name",
  "auth.error.generic": "Something went wrong. Please try again shortly.",
  "auth.nav.login": "Login",
  "auth.nav.logout": "Logout",

  // auth: login
  "auth.login.eyebrow": "Account",
  "auth.login.title": "Login to your account",
  "auth.login.subtitle": "Login to order products, apply as an Ambassador, or reserve a Local Experience.",
  "auth.login.submit": "Login",
  "auth.login.submitting": "Logging in…",
  "auth.login.noAccount": "Don't have an account yet?",
  "auth.login.registerLink": "Register",

  // auth: register
  "auth.register.eyebrow": "Account",
  "auth.register.title": "Create an account",
  "auth.register.subtitle": "One account for ordering products, applying as an Ambassador, and reserving Local Experiences.",
  "auth.register.submit": "Create account",
  "auth.register.submitting": "Creating account…",
  "auth.register.haveAccount": "Already have an account?",
  "auth.register.loginLink": "Login",

  // auth: gate (shown in place of a form/action when logged out)
  "auth.gate.title": "Login required for this step",
  "auth.gate.body": "Browsing Culture Atlas is free for everyone. Login or create an account to continue with this action.",
  "auth.gate.cta": "Login to continue",
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
  "hero.cta.subtext": "8 destinasi tersembunyi, siap dijelajahi",
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
  "experience.detail.duration": "Durasi",
  "experience.detail.groupSize": "Jumlah peserta",
  "experience.detail.howToJoin": "Cara ikut",
  "reservation.title": "Ajukan reservasi pengalaman ini",
  "reservation.date": "Tanggal yang diinginkan",
  "reservation.participants": "Jumlah peserta",
  "reservation.note": "Catatan (opsional)",
  "reservation.submit": "Kirim Permintaan Reservasi",
  "reservation.submitting": "Mengirim permintaan…",
  "reservation.success.title": "Permintaan reservasi diterima",
  "reservation.success.body": "Tim lokal akan menghubungi lewat email untuk konfirmasi jadwal.",

  // marketplace
  "marketplace.eyebrow": "Marketplace Lokal",
  "marketplace.title": "Dibeli langsung dari pembuatnya, tanpa perantara",
  "marketplace.clearFilter": "Hapus filter",
  "marketplace.order.title": "Pesan produk ini",
  "marketplace.order.quantity": "Jumlah",
  "marketplace.order.address": "Alamat pengiriman",
  "marketplace.order.address.ph": "Alamat lengkap, kota, kode pos",
  "marketplace.order.note": "Catatan (opsional)",
  "marketplace.order.submit": "Kirim Permintaan Pesanan",
  "marketplace.order.submitting": "Mengirim pesanan…",
  "marketplace.order.success.title": "Permintaan pesanan diterima",
  "marketplace.order.success.body": "Pembuat produk akan menghubungi lewat email atau telepon untuk konfirmasi pembayaran dan pengiriman.",

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

  // auth (shared)
  "auth.email": "Email",
  "auth.password": "Kata sandi",
  "auth.fullName": "Nama lengkap",
  "auth.error.generic": "Terjadi kesalahan. Silakan coba lagi sebentar lagi.",
  "auth.nav.login": "Masuk",
  "auth.nav.logout": "Keluar",

  // auth: login
  "auth.login.eyebrow": "Akun",
  "auth.login.title": "Masuk ke akunmu",
  "auth.login.subtitle": "Masuk untuk memesan produk, mendaftar jadi Ambassador, atau booking Local Experience.",
  "auth.login.submit": "Masuk",
  "auth.login.submitting": "Sedang masuk…",
  "auth.login.noAccount": "Belum punya akun?",
  "auth.login.registerLink": "Daftar",

  // auth: register
  "auth.register.eyebrow": "Akun",
  "auth.register.title": "Buat akun baru",
  "auth.register.subtitle": "Satu akun untuk memesan produk, mendaftar jadi Ambassador, dan booking Local Experience.",
  "auth.register.submit": "Buat akun",
  "auth.register.submitting": "Membuat akun…",
  "auth.register.haveAccount": "Sudah punya akun?",
  "auth.register.loginLink": "Masuk",

  // auth: gate
  "auth.gate.title": "Perlu masuk untuk langkah ini",
  "auth.gate.body": "Menjelajahi Culture Atlas gratis untuk semua orang. Masuk atau buat akun dulu untuk melanjutkan aksi ini.",
  "auth.gate.cta": "Masuk untuk lanjut",
};

export const messages: Record<Lang, Dict> = { en, id };
