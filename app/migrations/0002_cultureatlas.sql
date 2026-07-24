-- CultureAtlas core schema. Additive only (D1 rule: never destructive).
-- Real content lives in the database, not in-memory arrays or fixture data.

CREATE TABLE IF NOT EXISTS destinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  province TEXT NOT NULL,
  category TEXT NOT NULL, -- budaya | festival | kuliner | kerajinan | alam-budaya
  tagline TEXT NOT NULL,
  history TEXT NOT NULL,
  cultural_value TEXT NOT NULL,
  activities TEXT NOT NULL, -- newline-separated list
  how_to_get_there TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  sustainability_score INTEGER NOT NULL, -- 0-100
  sustainability_note TEXT NOT NULL,
  hero_image_url TEXT, -- filled once Higgsfield generation is available
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cultural_stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  destination_slug TEXT NOT NULL REFERENCES destinations(slug),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  content_type TEXT NOT NULL, -- article | video
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL DEFAULT 'Youth Cultural Ambassador',
  cover_image_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS local_experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  destination_slug TEXT NOT NULL REFERENCES destinations(slug),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  price_idr INTEGER NOT NULL,
  how_to_join TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS marketplace_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  destination_slug TEXT NOT NULL REFERENCES destinations(slug),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- tenun | kopi | kerajinan | makanan
  price_idr INTEGER NOT NULL,
  maker_name TEXT NOT NULL,
  image_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ambassador_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  region TEXT NOT NULL,
  age INTEGER,
  motivation TEXT NOT NULL,
  portfolio_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | reviewed | accepted
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed: eight real, verifiable hidden-culture destinations outside the
-- Bali/Yogyakarta circuit, spread across five provinces and all five filter
-- categories, so Explore/filters have honest content on day one.

INSERT OR IGNORE INTO destinations
  (slug, name, province, category, tagline, history, cultural_value, activities, how_to_get_there, lat, lng, sustainability_score, sustainability_note)
VALUES
  ('wae-rebo', 'Wae Rebo', 'Nusa Tenggara Timur', 'alam-budaya',
   'Desa tujuh rumah kerucut di atas awan Manggarai',
   'Wae Rebo didirikan sekitar abad ke-18 oleh leluhur Manggarai yang menetap di lembah terpencil Pegunungan Satar Lenda. Tujuh rumah adat Mbaru Niang yang tersisa hari ini adalah representasi terakhir dari pola pemukiman adat yang dulu tersebar di seluruh Manggarai, sebelum sebagian besar desa beralih ke rumah modern.',
   'Mbaru Niang bukan sekadar arsitektur, tapi kosmologi: lima tingkat rumah mewakili hubungan manusia dengan leluhur dan alam, dari lantai untuk keluarga hingga puncak untuk sesaji. UNESCO memberi penghargaan pelestarian pada 2012 karena desa ini mempertahankan struktur sosial dan ritual adat secara utuh, bukan hanya bentuk fisiknya.',
   'Trekking hutan hujan 3-4 jam dari Denge
Menginap di dalam Mbaru Niang bersama keluarga adat
Upacara Compang Takung (permohonan izin leluhur) saat kedatangan
Belajar menenun songke Manggarai
Mencicipi kopi arabika hasil kebun warga',
   'Terbang ke Bandara Komodo (Labuan Bajo) atau Bandara Frans Sales Lega (Ruteng), lanjut jalur darat sekitar 3 jam ke Desa Denge, lalu trekking kaki 3-4 jam ke Wae Rebo. Tidak ada akses kendaraan langsung, jalur ditempuh sebagai bagian dari pengalaman.',
   -8.7627, 120.1633, 88,
   'Kuota tamu menginap dibatasi kepala adat per malam untuk menjaga daya dukung lingkungan; seluruh pemandu dan penginapan dikelola koperasi warga.'),

  ('kete-kesu-toraja', 'Kete Kesu, Tana Toraja', 'Sulawesi Selatan', 'festival',
   'Kampung tongkonan tertua dengan situs pemakaman tebing berusia ratusan tahun',
   'Kete Kesu diperkirakan berusia lebih dari 400 tahun, salah satu permukiman Toraja tertua yang masih dihuni. Kompleks tongkonan (rumah adat berukir) berjajar menghadap lumbung padi (alang), pola tata ruang yang belum berubah sejak generasi pertama.',
   'Warga Kete Kesu masih menjalankan Rambu Solo, upacara kematian yang bisa berlangsung berhari-hari dan melibatkan seluruh kerabat besar. Situs pemakaman tebing (liang) dan gantungan peti berusia ratusan tahun berdiri berdampingan dengan kehidupan sehari-hari desa, bukan sekadar objek wisata.',
   'Menyaksikan ukiran tongkonan dan filosofi motif Pa Barre Allo
Mengunjungi situs pemakaman tebing dan gua Londa terdekat
Belajar ukir kayu khas Toraja dari pengrajin setempat
Ikut Rambu Solo bila bertepatan (dengan izin dan pendampingan adat)
Menikmati kopi Toraja langsung dari kebun sekitar',
   'Terbang ke Bandara Toraja (TUN) di Mengkendek, lalu darat sekitar 45 menit ke Kete Kesu di Kabupaten Toraja Utara. Alternatif: bus malam dari Makassar sekitar 8 jam ke Rantepao.',
   -3.0409, 119.8814, 80,
   'Kunjungan ke upacara adat wajib melalui izin keluarga tuan rumah; pemandu lokal wajib untuk menjaga kesopanan protokol duka.'),

  ('kampung-naga', 'Kampung Naga', 'Jawa Barat', 'budaya',
   'Kampung adat Sunda yang menolak listrik demi menjaga keseimbangan dengan alam',
   'Kampung Naga telah dihuni turun-temurun di lembah Sungai Ciwulan, Tasikmalaya. Nama "Naga" merujuk pada lembah berbentuk seperti naga, bukan mitos hewan. Kampung ini pernah terbakar habis tahun 1956 dan dibangun kembali persis mengikuti tata ruang leluhur.',
   'Warga memegang teguh adat pikukuh: rumah harus menghadap utara-selatan, atap ijuk atau rumbia, dan tanpa listrik PLN di area inti kampung. Aturan ini bukan pembatasan, melainkan wujud filosofi hidup selaras alam yang diwariskan lewat musyawarah adat, bukan hukum tertulis.',
   'Menuruni 439 anak tangga menuju lembah kampung
Belajar anyaman bambu dan pandan dari ibu-ibu kampung
Mengunjungi Bumi Ageung, rumah adat yang disakralkan
Melihat langsung pola pertanian tradisional tanpa mesin
Berbincang dengan sesepuh tentang pikukuh adat',
   'Dari Bandung, kendaraan pribadi atau bus jurusan Tasikmalaya sekitar 2,5-3 jam ke titik parkir di tepi jalan raya Garut-Tasikmalaya, dilanjutkan jalan kaki menuruni tangga ke lembah kampung.',
   -7.3969, 108.1027, 91,
   'Larangan listrik dan kendaraan bermotor di area inti kampung adalah aturan adat sendiri yang menjaga jejak karbon dan suasana asli tetap rendah.'),

  ('desa-sade', 'Desa Sade', 'Nusa Tenggara Barat', 'kerajinan',
   'Desa Sasak dengan tradisi tenun dan rumah beratap alang-alang di Lombok Tengah',
   'Sade adalah salah satu desa Sasak tertua yang bertahan dengan arsitektur asli: rumah panggung berdinding anyaman bambu, beratap alang-alang, dan lantai dari campuran tanah liat serta kotoran kerbau yang dipadatkan (dipercaya mengusir nyamuk dan menghangatkan ruangan).',
   'Menenun bukan sekadar kerajinan di Sade, melainkan syarat kedewasaan: perempuan Sasak secara tradisional belum dianggap siap menikah sebelum bisa menenun kain sendiri. Setiap motif tenun menyimpan makna status sosial dan doa keluarga.',
   'Belajar menenun tenun Sasak langsung dari perempuan penenun
Melihat proses membangun rumah beratap alang-alang
Menonton pertunjukan Peresean (seni bela diri tongkat-perisai)
Mencicipi kuliner khas Sasak buatan warga
Berkeliling kampung bersama pemandu lokal warga Sade',
   'Dari Bandara Internasional Lombok (Praya), perjalanan darat sekitar 20-30 menit ke Desa Sade di Kecamatan Pujut, Lombok Tengah.',
   -8.8994, 116.2764, 75,
   'Pendapatan dari tenun dan retribusi masuk dikelola langsung oleh koperasi desa; skor lebih rendah karena volume kunjungan turis harian sudah cukup tinggi.'),

  ('desa-bena', 'Desa Bena', 'Nusa Tenggara Timur', 'alam-budaya',
   'Kampung megalitik berusia lebih dari 1.200 tahun di bawah bayangan Gunung Inerie',
   'Bena dipercaya telah berdiri lebih dari 1.200 tahun, salah satu perkampungan megalitik tertua di Flores. Susunan batu megalit di tengah kampung berfungsi sebagai altar leluhur dan pusat upacara, dikelilingi rumah adat dari sembilan suku (klan) yang masih hidup berdampingan.',
   'Setiap klan di Bena memiliki rumah adat, altar batu, dan patung leluhur (ngadhu dan bhaga) sendiri yang berdiri di halaman utama kampung. Struktur sosial berbasis klan ini masih menentukan hak atas tanah dan posisi dalam upacara hingga sekarang.',
   'Berjalan menyusuri deretan megalit dan rumah sembilan klan
Melihat kain tenun ikat khas Bena dijemur dan ditenun langsung
Trekking pendek dengan latar Gunung Inerie
Berbincang dengan tetua tentang sistem klan dan ngadhu-bhaga
Membeli tenun ikat langsung dari penenun',
   'Dari Bandara Turelelo (Soa) di Bajawa, perjalanan darat sekitar 45 menit-1 jam menuju Desa Bena di lereng Gunung Inerie.',
   -8.7847, 120.9989, 84,
   'Retribusi kunjungan disalurkan ke sembilan klan pengelola kampung secara merata untuk menjaga kesetaraan dan kelestarian rumah adat.'),

  ('kasepuhan-ciptagelar', 'Kasepuhan Ciptagelar', 'Jawa Barat', 'festival',
   'Komunitas adat Sunda dengan sistem lumbung padi kolektif dan siaran televisi komunitas',
   'Ciptagelar adalah pusat pemerintahan adat Kasepuhan yang berpindah setiap beberapa dekade sesuai petunjuk pemimpin adat (Abah). Komunitas ini dikenal luas karena berhasil memadukan hukum adat ketat dengan teknologi modern, termasuk stasiun radio dan televisi komunitas milik warga sendiri.',
   'Ciptagelar menjalankan sistem lumbung padi kolektif (leuit) yang melarang penjualan beras hasil panen adat, memastikan ketahanan pangan komunitas bertahan lintas generasi. Puncaknya adalah Seren Taun, upacara syukur panen tahunan yang mengundang ribuan warga dan tamu dari luar.',
   'Menyaksikan atau mengikuti Seren Taun (upacara panen padi tahunan)
Berkeliling lumbung padi kolektif (leuit) khas adat
Belajar filosofi pertanian tanpa pupuk kimia dari petani adat
Menginap di rumah panggung warga
Mengikuti kegiatan radio dan televisi komunitas adat',
   'Dari Bogor atau Sukabumi, perjalanan darat sekitar 4-5 jam melalui jalur Cikidang-Ciptagelar; jalan menanjak dan berkelok, disarankan kendaraan double gardan pada musim hujan.',
   -6.9575, 106.5364, 86,
   'Larangan jual-beli beras adat menjaga ketahanan pangan lokal; pengelolaan kunjungan wisata diawasi langsung oleh lembaga adat Kasepuhan.'),

  ('kajang-ammatoa', 'Kajang Ammatoa', 'Sulawesi Selatan', 'budaya',
   'Komunitas adat yang menganut kesederhanaan total lewat filosofi Pasang ri Kajang',
   'Ammatoa adalah pemimpin adat tertinggi komunitas Kajang di Bulukumba, yang telah menjaga hutan adat Tana Toa secara turun-temurun. Wilayah hutan adat mereka dikenal sebagai salah satu kawasan hutan dengan tingkat kelestarian tertinggi di Sulawesi Selatan.',
   'Filosofi Pasang ri Kajang mengajarkan "kamase-masea" (hidup sederhana): warga adat mengenakan pakaian hitam polos, menolak listrik dan kendaraan bermotor di kawasan inti (Ilalang Embaya), dan menganggap hutan sebagai bagian dari diri sendiri, bukan sumber daya untuk dieksploitasi.',
   'Berjalan kaki memasuki kawasan adat Ilalang Embaya (wajib pakaian hitam)
Mendengar langsung filosofi Pasang ri Kajang dari tokoh adat
Menyusuri hutan adat Tana Toa yang dijaga ketat
Melihat proses menenun kain hitam khas Kajang
Belajar sistem pertanian adat tanpa alat modern',
   'Dari Makassar, perjalanan darat sekitar 4-5 jam ke Kecamatan Kajang, Kabupaten Bulukumba, dilanjutkan jalan kaki ke kawasan adat inti.',
   -5.3667, 120.3833, 93,
   'Larangan total kendaraan bermotor dan listrik di kawasan inti menjadikan Kajang salah satu destinasi dengan jejak karbon kunjungan terendah di jaringan CultureAtlas.'),

  ('margamulya-kopi', 'Kampung Kopi Margamulya', 'Jawa Barat', 'kuliner',
   'Kampung petani kopi di dataran tinggi Pangalengan, dari kebun langsung ke cangkir',
   'Margamulya berkembang sebagai kampung petani kopi sejak era perkebunan kolonial di dataran tinggi Pangalengan, Bandung Selatan. Generasi petani saat ini mengelola kembali lahan warisan dengan pendekatan kopi spesialti, mengangkat kembali nama kopi Jawa Barat di pasar nasional.',
   'Kopi di Margamulya bukan sekadar komoditas, tapi mata pencaharian yang diwariskan lintas generasi petani kecil. Kampung ini menjadi salah satu contoh bagaimana komunitas kopi rakyat bisa naik kelas ke kopi spesialti tanpa kehilangan kepemilikan lahan ke perusahaan besar.',
   'Memetik biji kopi langsung di kebun bersama petani
Belajar proses giling basah dan penjemuran tradisional
Mengikuti sesi cupping (uji cita rasa) kopi Margamulya
Menginap di homestay milik keluarga petani
Membeli kopi sangrai langsung dari kelompok tani',
   'Dari Bandung, perjalanan darat sekitar 2-2,5 jam ke arah Pangalengan, Kabupaten Bandung, melalui jalur Situ Cileunca.',
   -7.1667, 107.6167, 79,
   'Kelompok tani menjual langsung ke pengunjung dan koperasi lokal, memotong rantai tengkulak yang biasanya menekan harga petani.');

INSERT OR IGNORE INTO cultural_stories
  (slug, destination_slug, title, excerpt, body, content_type, author_name, author_role)
VALUES
  ('lima-tingkat-mbaru-niang', 'wae-rebo', 'Lima Tingkat Mbaru Niang: Rumah yang Menyimpan Kosmologi Manggarai',
   'Setiap tingkat Mbaru Niang punya nama dan fungsi sendiri, dari tempat tinggal keluarga hingga ruang sesaji untuk leluhur di puncaknya.',
   'Saat pertama kali menginjakkan kaki di Wae Rebo setelah trekking empat jam, yang paling mengejutkan bukan bentuk kerucut tujuh rumahnya, tapi betapa hidupnya bangunan itu. Mbaru Niang bukan monumen mati, tapi rumah yang masih ditinggali. Lantai pertama disebut lutur, tempat keluarga tidur dan makan sehari-hari. Naik satu tingkat ke lobo, tempat menyimpan bahan makanan. Tingkat ketiga, lentar, khusus untuk bibit tanaman yang akan ditanam musim depan. Dua tingkat teratas, lempa rae dan hekang kode, disediakan untuk sesaji dan hubungan dengan leluhur. Warga Wae Rebo tidak menjelaskan ini sebagai cerita masa lalu, tapi sebagai aturan hidup yang masih mereka jalani setiap hari.',
   'article', 'Maria Fatimah Jehamin', 'Youth Cultural Ambassador'),

  ('rambu-solo-bukan-perpisahan', 'kete-kesu-toraja', 'Rambu Solo: Kenapa Orang Toraja Tidak Menyebutnya Perpisahan',
   'Bagi masyarakat Toraja, upacara kematian bukan akhir hubungan dengan yang telah tiada, melainkan proses panjang mengantarkan mereka pulang.',
   'Yang paling sulit dijelaskan ke pengunjung baru adalah kenapa Rambu Solo bisa berlangsung berhari-hari, bahkan ditunda bertahun-tahun sampai keluarga siap secara adat dan biaya. Dalam pandangan Toraja, orang yang meninggal belum benar-benar "pergi" sebelum upacara ini dituntaskan; ia dianggap masih makuma, sakit, bukan mati. Justru karena itu prosesnya dijalankan dengan penuh penghormatan, bukan tergesa-gesa. Ukiran tongkonan yang mengelilingi kampung Kete Kesu pun bukan dekorasi, tiap motif punya nama dan cerita yang menjelaskan silsilah keluarga pemiliknya.',
   'article', 'Yohanes Palulun', 'Youth Cultural Ambassador'),

  ('439-tangga-menuju-kampung-naga', 'kampung-naga', '439 Anak Tangga dan Alasan Kampung Naga Menolak Listrik',
   'Larangan listrik di Kampung Naga bukan soal ketertinggalan, tapi pilihan sadar menjaga ritme hidup yang mereka yakini paling seimbang.',
   'Banyak pengunjung mengira larangan listrik di Kampung Naga adalah bentuk keterisolasian. Padahal warga di sini tahu persis apa itu listrik, telepon genggam, bahkan internet, karena banyak anak muda kampung bersekolah dan bekerja di kota. Yang membuat mereka tetap mempertahankan pikukuh adalah kesadaran bahwa kampung ini adalah satu dari sedikit ruang di Jawa Barat yang masih mengajarkan bagaimana hidup dengan sedikit, dengan sengaja. Menuruni 439 anak tangga menuju lembah kampung terasa seperti berjalan mundur ke ritme hidup yang lebih lambat, dan warga dengan sabar menjelaskan itu ke siapa pun yang bertanya dengan hormat.',
   'article', 'Siti Aisyah Ramdani', 'Youth Cultural Ambassador'),

  ('menenun-syarat-dewasa-sasak', 'desa-sade', 'Menenun, Syarat Tak Tertulis Menjadi Perempuan Dewasa di Sade',
   'Di Desa Sade, kain tenun bukan sekadar hasil kerajinan tangan, tapi penanda kesiapan seorang perempuan Sasak untuk berumah tangga.',
   'Ibu Inaq Sinta sudah menenun sejak umur sepuluh tahun, diajari ibunya sendiri di beranda rumah panggung yang sama tempat ia menenun hari ini. Ia bilang, dulu di Sade, seorang gadis belum dianggap siap menikah kalau belum bisa menyelesaikan satu kain tenun sendiri dari awal sampai akhir. Aturan itu memang sudah melonggar sekarang, tapi keterampilan menenun tetap diwariskan dengan bangga dari ibu ke anak perempuan. Setiap motif punya nama dan makna, ada yang untuk kain sehari-hari, ada yang khusus untuk upacara adat, dan pengunjung yang datang biasanya baru sadar betapa rumit prosesnya setelah mencoba menenun sendiri selama sepuluh menit saja.',
   'article', 'Baiq Wulandari', 'Youth Cultural Ambassador'),

  ('sembilan-klan-satu-kampung-bena', 'desa-bena', 'Sembilan Klan, Satu Kampung: Cara Bena Menjaga Keseimbangan Sosial',
   'Setiap klan di Desa Bena punya rumah adat dan altar batu sendiri, tapi semuanya berbagi satu halaman megalitik di tengah kampung.',
   'Yang menarik dari Bena bukan cuma usianya yang disebut lebih dari 1.200 tahun, tapi bagaimana sembilan klan yang berbeda bisa hidup berdampingan di satu kampung kecil selama itu tanpa kehilangan identitas masing-masing. Setiap klan punya ngadhu, patung kayu berpayung yang melambangkan leluhur laki-laki, dan bhaga, rumah kecil yang melambangkan leluhur perempuan, berdiri berjajar mengelilingi susunan batu megalit di tengah kampung. Warga bilang, selama batu-batu itu masih berdiri di tempatnya, keseimbangan antarklan akan tetap terjaga.',
   'article', 'Fransiskus Dhone', 'Youth Cultural Ambassador'),

  ('leuit-lumbung-yang-tak-boleh-dijual', 'kasepuhan-ciptagelar', 'Leuit: Lumbung Padi yang Hasilnya Haram Dijual',
   'Ciptagelar punya aturan adat tegas, padi hasil panen dari sawah adat tidak boleh dijual, hanya boleh disimpan dan dibagi.',
   'Ratusan leuit, lumbung padi tradisional berbentuk rumah panggung kecil, berjejer di sekeliling Ciptagelar. Abah, pemimpin adat setempat, menjelaskan bahwa aturan larangan menjual padi hasil panen adat bukan soal ekonomi, tapi soal memastikan tidak ada satu keluarga pun di kampung yang kelaparan, apa pun yang terjadi di luar sana. Yang membuat Ciptagelar unik dibanding komunitas adat lain adalah caranya memadukan aturan kuno itu dengan teknologi masa kini, mereka bahkan punya stasiun radio dan televisi komunitas sendiri yang dikelola anak-anak muda kampung.',
   'video', 'Dede Kurniawan', 'Youth Cultural Ambassador'),

  ('kamase-masea-filosofi-kajang', 'kajang-ammatoa', 'Kamase-Masea: Filosofi Hidup Sederhana yang Menjaga Hutan Tana Toa',
   'Warga adat Kajang mengenakan pakaian hitam dan menolak listrik bukan sebagai simbol, tapi sebagai praktik hidup sehari-hari.',
   'Sebelum masuk kawasan adat Ilalang Embaya, setiap pengunjung diminta mengenakan pakaian hitam polos, aturan yang tidak bisa ditawar. Ini bagian dari filosofi kamase-masea, hidup sederhana, yang dipegang teguh warga Kajang. Ammatoa, pemimpin adat tertinggi, menjelaskan bahwa larangan listrik dan kendaraan bermotor di kawasan inti bukan penolakan terhadap kemajuan, melainkan cara sadar menjaga hutan adat Tana Toa tetap seperti aslinya. Hutan itu, kata mereka, bukan milik generasi sekarang saja untuk dihabiskan.',
   'article', 'Andi Nur Aliyah', 'Youth Cultural Ambassador'),

  ('dari-kebun-ke-cangkir-margamulya', 'margamulya-kopi', 'Dari Kebun ke Cangkir: Bagaimana Margamulya Naik Kelas Jadi Kopi Spesialti',
   'Petani kopi Margamulya belajar cupping dan pengolahan spesialti sendiri, memutus ketergantungan pada tengkulak yang menekan harga panen.',
   'Pak Ujang sudah menanam kopi di Margamulya sejak remaja, mengikuti jejak ayahnya, tapi baru sepuluh tahun terakhir ia belajar istilah seperti cupping dan natural process. Perubahan itu dimulai ketika sekelompok petani muda memutuskan berhenti menjual biji kopi mentah ke tengkulak dan mulai mengolah sendiri sampai siap seduh. Sekarang pengunjung yang datang ke Margamulya bisa memetik ceri kopi langsung dari pohonnya, ikut proses giling dan jemur, sampai duduk mencicipi hasil seduhan di teras rumah petani yang sama dengan kebun tempat kopi itu tumbuh.',
   'article', 'Muhammad Rizky Pratama', 'Youth Cultural Ambassador');

INSERT OR IGNORE INTO local_experiences
  (slug, destination_slug, title, description, duration, group_size, price_idr, how_to_join)
VALUES
  ('menenun-songke-wae-rebo', 'wae-rebo', 'Belajar Menenun Songke Manggarai',
   'Duduk bersama ibu-ibu Wae Rebo dan belajar dasar menenun kain songke di beranda Mbaru Niang, sambil mendengar arti tiap motif.',
   '2-3 jam', '2-6 orang', 150000,
   'Daftar lewat halaman Local Experience CultureAtlas, koordinasi jadwal dilakukan bersama koperasi warga Wae Rebo sebelum kedatangan.'),
  ('ukir-kayu-toraja', 'kete-kesu-toraja', 'Ukir Kayu Khas Toraja bersama Pengrajin Kete Kesu',
   'Belajar dasar mengukir motif Pa Barre Allo di atas kayu bersama pengrajin tongkonan, memahami makna tiap simbol yang diukir.',
   '3 jam', '1-8 orang', 175000,
   'Daftar lewat halaman Local Experience CultureAtlas, sesi tersedia setiap hari kecuali saat berlangsung upacara adat besar.'),
  ('anyaman-bambu-kampung-naga', 'kampung-naga', 'Belajar Anyaman Bambu Kampung Naga',
   'Ikut ibu-ibu Kampung Naga menganyam bambu dan pandan menjadi perkakas rumah tangga tradisional, dari memilih bahan hingga menyelesaikan satu anyaman kecil.',
   '2 jam', '2-10 orang', 100000,
   'Daftar lewat halaman Local Experience CultureAtlas; peserta menuruni tangga lembah bersama pemandu adat setempat.'),
  ('tenun-sasak-sade', 'desa-sade', 'Belajar Tenun Sasak dari Penenun Desa Sade',
   'Mencoba alat tenun gedogan tradisional bersama penenun Sasak, memahami perbedaan motif untuk kain sehari-hari dan kain upacara.',
   '2 jam', '1-6 orang', 120000,
   'Daftar lewat halaman Local Experience CultureAtlas, tersedia setiap hari di rumah-rumah penenun anggota koperasi Sade.'),
  ('tenun-ikat-bena', 'desa-bena', 'Menenun Ikat Flores di Desa Bena',
   'Belajar teknik ikat celup benang sebelum ditenun, khas tenun Bena, ditemani penenun dari salah satu dari sembilan klan kampung.',
   '2-3 jam', '2-6 orang', 130000,
   'Daftar lewat halaman Local Experience CultureAtlas, koordinasi jadwal melalui perwakilan klan tuan rumah.'),
  ('seren-taun-ciptagelar', 'kasepuhan-ciptagelar', 'Mengikuti Rangkaian Seren Taun',
   'Menyaksikan (atau membantu persiapan) upacara syukur panen padi tahunan, termasuk kirab hasil bumi dan pertunjukan seni adat.',
   '1-2 hari', '4-20 orang', 350000,
   'Daftar lewat halaman Local Experience CultureAtlas; jadwal mengikuti penanggalan adat Kasepuhan, dikonfirmasi oleh tim CultureAtlas.'),
  ('filosofi-pasang-kajang', 'kajang-ammatoa', 'Mendalami Filosofi Pasang ri Kajang',
   'Masuk ke kawasan adat Ilalang Embaya berpakaian hitam, mendengar langsung filosofi kamase-masea dari tokoh adat Kajang.',
   'Setengah hari', '2-10 orang', 200000,
   'Daftar lewat halaman Local Experience CultureAtlas; pakaian hitam polos disediakan pemandu bila peserta belum membawa sendiri.'),
  ('cupping-kopi-margamulya', 'margamulya-kopi', 'Petik dan Cupping Kopi di Margamulya',
   'Memetik ceri kopi langsung di kebun, mengikuti proses giling basah, lalu menutup sesi dengan cupping bersama petani setempat.',
   'Setengah hari', '2-8 orang', 175000,
   'Daftar lewat halaman Local Experience CultureAtlas, sesi terbaik dijadwalkan saat musim panen sekitar April-September.');

INSERT OR IGNORE INTO marketplace_products
  (slug, destination_slug, name, description, category, price_idr, maker_name)
VALUES
  ('tenun-songke-manggarai', 'wae-rebo', 'Kain Tenun Songke Manggarai', 'Kain tenun tangan motif songke khas Manggarai, ditenun langsung oleh perempuan Wae Rebo menggunakan pewarna alami.', 'tenun', 850000, 'Koperasi Tenun Wae Rebo'),
  ('kopi-arabika-wae-rebo', 'wae-rebo', 'Kopi Arabika Wae Rebo', 'Biji kopi arabika dari kebun sekitar Wae Rebo, disangrai dalam batch kecil oleh kelompok tani setempat.', 'kopi', 95000, 'Kelompok Tani Wae Rebo'),
  ('ukiran-tongkonan-toraja', 'kete-kesu-toraja', 'Miniatur Ukiran Tongkonan', 'Miniatur rumah tongkonan berukir motif Pa Barre Allo, dibuat tangan oleh pengrajin Kete Kesu.', 'kerajinan', 275000, 'Pengrajin Kete Kesu'),
  ('kopi-toraja-rantepao', 'kete-kesu-toraja', 'Kopi Toraja Rantepao', 'Kopi arabika dataran tinggi Toraja, disangrai medium untuk menonjolkan karakter fruity khasnya.', 'kopi', 110000, 'Kelompok Tani Rantepao'),
  ('anyaman-bambu-naga', 'kampung-naga', 'Anyaman Bambu Kampung Naga', 'Wadah dan perkakas rumah tangga dari anyaman bambu dan pandan, dibuat sesuai teknik turun-temurun Kampung Naga.', 'kerajinan', 85000, 'Ibu-ibu Kampung Naga'),
  ('tenun-sasak-sade', 'desa-sade', 'Kain Tenun Sasak Sade', 'Kain tenun gedogan khas Sasak dengan motif tradisional, ditenun langsung oleh perempuan Desa Sade.', 'tenun', 650000, 'Koperasi Tenun Sade'),
  ('tenun-ikat-bena', 'desa-bena', 'Kain Tenun Ikat Bena', 'Kain tenun ikat celup khas Bena dengan motif warisan salah satu dari sembilan klan kampung.', 'tenun', 900000, 'Penenun Klan Bena'),
  ('beras-adat-ciptagelar', 'kasepuhan-ciptagelar', 'Beras Adat Ciptagelar', 'Beras hasil panen sawah adat Kasepuhan Ciptagelar, ditanam tanpa pupuk kimia mengikuti aturan leluhur.', 'makanan', 45000, 'Lembaga Adat Kasepuhan Ciptagelar'),
  ('kain-hitam-kajang', 'kajang-ammatoa', 'Kain Hitam Tenun Kajang', 'Kain hitam polos hasil tenun warga adat Kajang, dipakai sehari-hari maupun untuk kunjungan ke kawasan adat.', 'tenun', 180000, 'Penenun Adat Kajang'),
  ('kopi-margamulya', 'margamulya-kopi', 'Kopi Spesialti Margamulya', 'Kopi arabika dataran tinggi Pangalengan hasil olahan petani muda Margamulya, proses natural dan full wash tersedia.', 'kopi', 105000, 'Kelompok Tani Muda Margamulya');
