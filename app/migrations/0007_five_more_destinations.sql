-- Five new destinations added on request, each opening a province not yet
-- represented in the atlas: Sumatera Barat, Kalimantan Barat, Gorontalo,
-- Aceh, and Maluku. Same additive pattern as 0004_new_destinations.sql
-- (destination + story + experience + product, joined by destination_slug).
--
-- Note: the original candidate for the Kalimantan Barat slot was "Rumah
-- Betang Sungai Utik" -- no verifiably-licensed Commons photo of that
-- specific longhouse could be found during photo research, so it was
-- substituted with Rumah Betang Ensaid Panjang (Kabupaten Sintang, same
-- province, same Dayak longhouse + ikat-weaving character, and a real photo
-- exists for it) to keep the project's "no mismatched photos" policy.

INSERT OR IGNORE INTO destinations
  (slug, name, province, category, tagline, history, cultural_value, activities, how_to_get_there, lat, lng, sustainability_score, sustainability_note)
VALUES
  ('nagari-pariangan', 'Nagari Pariangan', 'Sumatera Barat', 'budaya',
   'Nagari tertua Minangkabau di lereng Gunung Marapi, tempat rumah gadang berusia ratusan tahun masih dihuni turun-temurun',
   'Pariangan dipercaya sebagai nagari (desa adat) tertua dalam kosmologi Minangkabau, disebut dalam tambo sebagai titik awal penyebaran suku Minangkabau ke seluruh Sumatera Barat. Terletak di lereng Gunung Marapi, Kabupaten Tanah Datar, nagari ini pernah dinobatkan majalah internasional sebagai salah satu desa terindah di dunia, namun tetap mempertahankan fungsi rumah gadang sebagai tempat tinggal nyata, bukan museum.',
   'Deretan rumah gadang berukir dengan atap gonjong menjulang menghadap Gunung Marapi masih menjadi pusat kehidupan adat: musyawarah suku, upacara pernikahan, dan pengangkatan penghulu adat semuanya berlangsung di dalamnya. Sistem kekerabatan matrilineal Minangkabau, tempat harta pusaka diwariskan lewat garis ibu, masih dijalankan penuh di nagari ini, menjadikannya salah satu tempat terbaik untuk memahami adat Minangkabau secara utuh, bukan sekadar arsitekturnya.',
   'Menyusuri perkampungan rumah gadang berusia ratusan tahun
Melihat pemandian batu dan sumber air panas alami peninggalan leluhur
Menyaksikan aktivitas warga di sawah berundak dengan latar Gunung Marapi
Mengunjungi Masjid Ishlah, salah satu masjid tertua di Minangkabau
Belajar silsilah adat matrilineal dari tetua nagari',
   'Dari Bandara Internasional Minangkabau (Padang), perjalanan darat sekitar 2,5-3 jam menuju Batusangkar, dilanjutkan sekitar 15 menit ke Nagari Pariangan.',
   -0.4306, 100.5236, 80,
   'Pengelolaan kunjungan dan homestay dijalankan oleh warga nagari sendiri melalui kelompok sadar wisata lokal, menjaga rumah gadang tetap berfungsi sebagai tempat tinggal dan pusat adat, bukan berubah jadi properti komersial murni.'),

  ('rumah-betang-ensaid-panjang', 'Rumah Betang Ensaid Panjang', 'Kalimantan Barat', 'alam-budaya',
   'Rumah panjang adat Dayak Desa di tepi Sungai Ensaid, tempat tenun ikat dan kehidupan komunal masih berjalan setiap hari',
   'Ensaid Panjang adalah desa adat Dayak Desa di Kabupaten Sintang yang masih mempertahankan rumah betang, rumah panjang tradisional yang dihuni puluhan keluarga dalam satu atap memanjang. Berbeda dari sejumlah rumah betang yang kini hanya berdiri sebagai situs wisata, rumah betang di Ensaid Panjang masih menjadi tempat tinggal aktif sekaligus pusat kegiatan adat dan menenun bagi warganya.',
   'Perempuan Ensaid Panjang dikenal luas karena tenun ikat khas Dayak yang prosesnya, dari memintal benang hingga mengikat-celup motif, dikerjakan penuh secara manual dan diwariskan lintas generasi. Kehidupan komunal di rumah betang, tempat puluhan keluarga berbagi satu ruang memanjang (sami), mencerminkan nilai gotong royong dan musyawarah adat Dayak yang menjadi dasar pengambilan keputusan bersama hingga kini.',
   'Menginap di rumah betang bersama keluarga Dayak Desa
Menyaksikan dan mencoba proses menenun ikat khas Ensaid Panjang
Menyusuri Sungai Ensaid dengan perahu bersama warga
Mengenal ukiran dan ornamen adat di sepanjang rumah betang
Mengikuti ritual adat bila bertepatan musim panen atau upacara',
   'Dari Bandara Tebelian (Sintang), perjalanan darat sekitar 30-45 menit ke arah Kecamatan Kelam Permai menuju Desa Ensaid Panjang.',
   -0.13, 111.47, 84,
   'Program homestay dan kunjungan tenun dikelola langsung oleh kelompok perempuan penenun desa, memastikan pendapatan dari wisata kembali ke pelestarian tenun ikat dan perawatan rumah betang, bukan ke pihak luar.'),

  ('kampung-bajo-torosiaje', 'Kampung Bajo Torosiaje', 'Gorontalo', 'budaya',
   'Perkampungan suku Bajo yang seluruhnya berdiri di atas air Teluk Tomini, tanpa sejengkal pun menyentuh daratan',
   'Torosiaje adalah permukiman suku Bajo (Sama Bajau), kelompok pengembara laut yang secara turun-temurun membangun rumah panggung di atas perairan dangkal Teluk Tomini, Kabupaten Pohuwato. Seluruh kampung, mulai dari rumah, masjid, sekolah, hingga jalan setapaknya berupa jembatan kayu yang menghubungkan rumah-rumah tanpa daratan di bawahnya, mencerminkan cara hidup suku Bajo yang bergantung sepenuhnya pada laut.',
   'Bagi suku Bajo, laut bukan sekadar sumber penghidupan tapi rumah itu sendiri; anak-anak Torosiaje belajar berenang dan mendayung sebelum lancar berjalan di daratan. Tradisi melaut, meramu obat dari terumbu karang, dan upacara adat laut seperti pengucapan syukur hasil tangkapan masih dijalankan warga, menjadikan Torosiaje salah satu kampung suku Bajo paling utuh menjaga cara hidup di atas air.',
   'Menyusuri kampung dengan perahu kecil di antara rumah panggung
Menyaksikan aktivitas nelayan Bajo menangkap dan mengolah hasil laut
Mengenal arsitektur rumah panggung dan jembatan kayu penghubung kampung
Snorkeling di terumbu karang sekitar Teluk Tomini
Mengikuti aktivitas anak-anak Bajo berenang dan mendayung sejak usia dini',
   'Dari Kota Gorontalo, perjalanan darat sekitar 3-4 jam ke arah Kabupaten Pohuwato, dilanjutkan naik perahu motor sekitar 15-20 menit menuju kampung apung Torosiaje.',
   0.48, 121.95, 81,
   'Kunjungan wisata dikoordinasikan lewat kelompok nelayan dan pemandu warga Bajo setempat, menjaga agar terumbu karang di sekitar kampung tidak rusak oleh lalu lintas wisata dan pendapatan tetap mengalir ke warga kampung, bukan operator luar.'),

  ('dataran-tinggi-gayo', 'Dataran Tinggi Gayo', 'Aceh', 'kuliner',
   'Dataran tinggi tanah Gayo di sekitar Danau Laut Tawar, rumah kopi arabika Gayo yang mendunia',
   'Dataran Tinggi Gayo di Kabupaten Aceh Tengah adalah kawasan pegunungan tempat masyarakat Gayo membudidayakan kopi arabika sejak masa kolonial, menjadikannya salah satu wilayah penghasil kopi arabika terbesar di Indonesia. Di sekitar Danau Laut Tawar dan Kota Takengon, perkebunan kopi rakyat berdampingan langsung dengan permukiman warga Gayo, bukan perkebunan skala industri milik korporasi.',
   'Bertani kopi bagi masyarakat Gayo bukan sekadar mata pencaharian, melainkan bagian dari identitas dan cara hidup turun-temurun, lengkap dengan pantun dan didong (tradisi lisan berirama khas Gayo) yang sering mengiringi masa panen. Kopi Gayo yang diproses secara giling basah (wet-hulled) khas Sumatera dikenal dunia lewat sertifikasi organik dan fair trade yang justru lahir dari praktik petani kecil, bukan perusahaan besar.',
   'Mengunjungi kebun kopi rakyat dan menyaksikan proses petik hingga giling basah
Mencicipi kopi arabika Gayo langsung dari petani penyeduh lokal
Menikmati pemandangan Danau Laut Tawar dari perbukitan sekitar Takengon
Mengenal tradisi lisan didong khas masyarakat Gayo
Berkeliling pasar kopi tradisional di Takengon',
   'Dari Bandar Udara Rembele (Takengon) atau Bandara Sultan Iskandar Muda (Banda Aceh) dengan lanjutan darat sekitar 7-8 jam, menuju kawasan Dataran Tinggi Gayo di Kabupaten Aceh Tengah.',
   4.6285, 96.8172, 83,
   'Sebagian besar kebun dikelola petani kecil dengan sertifikasi organik dan fair trade, menjaga harga jual tetap adil bagi petani sekaligus mendorong praktik tanam berkelanjutan dibanding ekspansi lahan besar-besaran.'),

  ('banda-neira', 'Banda Neira', 'Maluku', 'budaya',
   'Pulau pala bersejarah era VOC, tempat rempah pernah menentukan jalannya perdagangan dunia',
   'Banda Neira adalah pusat Kepulauan Banda, Maluku Tengah, yang selama berabad-abad menjadi satu-satunya sumber pala di dunia sebelum akhirnya direbut paksa VOC pada abad ke-17 lewat perjanjian yang menukar Pulau Run dengan Manhattan. Peninggalan era kolonial itu masih berdiri hingga kini: Benteng Belgica dan Fort Nassau, rumah-rumah kolonial Belanda, hingga sisa perkebunan pala tua yang masih dipanen warga setempat.',
   'Sejarah kolonial berat yang dialami Banda, termasuk pembantaian dan pengasingan penduduk asli Orang Banda oleh VOC, tetap dijaga ingatannya oleh warga lewat cerita lisan dan situs-situs peninggalan, bukan dihapus atau dijadikan sekadar latar foto. Perkebunan pala tua peninggalan masa itu kini dikelola turun-temurun oleh warga sebagai sumber penghidupan, menjadikan Banda salah satu tempat langka yang menyimpan sejarah rempah dunia secara utuh dalam kehidupan sehari-hari.',
   'Menjelajahi Benteng Belgica dan Fort Nassau peninggalan VOC
Mengunjungi perkebunan pala tua bersama petani setempat
Snorkeling atau diving di perairan Banda yang masih alami
Mendaki Gunung Api Banda untuk melihat panorama kepulauan
Mengenal sejarah pengasingan tokoh nasional (Hatta-Sjahrir) di Banda Neira',
   'Dari Kota Ambon, perjalanan bisa ditempuh lewat kapal Pelni/perintis sekitar 6-8 jam atau penerbangan perintis singkat menuju Bandar Udara Bandaneira.',
   -4.5253, 129.8988, 79,
   'Situs benteng dan perkebunan pala dijaga bersama warga dan pemerintah kabupaten sebagai cagar budaya, dengan kunjungan diarahkan lewat pemandu lokal untuk membatasi tekanan wisata terhadap situs bersejarah yang rapuh.');

INSERT OR IGNORE INTO cultural_stories
  (slug, destination_slug, title, excerpt, body, content_type, author_name, author_role)
VALUES
  ('pariangan-nagari-tertua-minangkabau', 'nagari-pariangan', 'Pariangan, Nagari yang Dipercaya Jadi Titik Awal Minangkabau',
   'Dalam tambo Minangkabau, Pariangan disebut sebagai tempat leluhur pertama kali turun dan menetap sebelum menyebar ke seluruh Sumatera Barat.',
   'Bagi warga Pariangan, tinggal di rumah gadang bukan soal nostalgia, melainkan kelanjutan tanggung jawab adat yang diwariskan garis ibu. Seorang bundo kanduang (perempuan pemangku adat) di nagari ini menjelaskan bahwa setiap rumah gadang punya penghulu adat sendiri yang bertanggung jawab menjaga harta pusaka dan menjadi penengah musyawarah keluarga besar. Ia bercerita, banyak keturunan Pariangan yang merantau ke kota besar tetap pulang saat ada musyawarah adat penting, karena keputusan menyangkut rumah gadang dan tanah pusaka tidak bisa diambil sepihak dari jauh. Bagi mereka, nagari tertua ini bukan cuma tempat asal, tapi akar yang terus menentukan identitas meski hidup sudah tersebar ke mana-mana.',
   'article', 'Rahmi Oktaviani', 'Youth Cultural Ambassador'),

  ('rumah-betang-ensaid-panjang-satu-atap', 'rumah-betang-ensaid-panjang', 'Satu Atap untuk Puluhan Keluarga: Kehidupan Komunal di Rumah Betang Ensaid Panjang',
   'Di rumah betang, keputusan besar tidak pernah diambil sendirian -- semua keluarga di bawah satu atap ikut bermusyawarah.',
   'Rumah betang Ensaid Panjang membentang panjang di tepi sungai, dengan puluhan pintu keluarga berjajar di sepanjang selasar sami, ruang bersama yang jadi pusat segala urusan penting warga. Seorang penenun senior di rumah betang ini menuturkan, sejak kecil ia belajar bahwa keputusan soal adat, perselisihan antarwarga, hingga jadwal menenun bersama selalu dibicarakan di sami, bukan diputuskan sendiri-sendiri di dalam bilik masing-masing keluarga. Menenun ikat pun dilakukan berkelompok, saling membantu menyiapkan benang sebelum diikat dan dicelup warna. Ia bilang, cara hidup berdampingan macam ini yang membuat rumah betang bertahan, karena menjaga satu atap sama pentingnya dengan menjaga hubungan dengan tetangga serumah.',
   'article', 'Yohanes Anggi', 'Youth Cultural Ambassador'),

  ('torosiaje-kampung-tanpa-daratan', 'kampung-bajo-torosiaje', 'Torosiaje, Kampung yang Tak Pernah Menyentuh Tanah',
   'Bagi anak-anak Torosiaje, belajar mendayung datang lebih dulu daripada belajar berjalan di atas tanah.',
   'Di Torosiaje, jembatan kayu adalah jalan raya, dan perahu kecil adalah kendaraan sehari-hari. Seorang nelayan Bajo yang lahir dan besar di kampung ini bercerita, ia baru benar-benar menginjak daratan dalam waktu lama saat merantau sekolah ke kota, karena sepanjang masa kecilnya dihabiskan di atas rumah panggung dan air. Ia menjelaskan, laut bagi warga Bajo bukan cuma tempat mencari ikan, tapi ruang hidup yang menyimpan aturan tak tertulis, seperti kapan boleh melaut dan area mana yang harus dijaga agar terumbu karangnya tidak rusak. Menurutnya, semakin banyak wisatawan yang datang, semakin penting menjaga aturan itu tetap dipegang, supaya laut yang jadi rumah mereka tidak ikut rusak oleh keramaian.',
   'article', 'Moh. Ridwan Puhi', 'Youth Cultural Ambassador'),

  ('kopi-gayo-lebih-dari-sekadar-minuman', 'dataran-tinggi-gayo', 'Kopi Gayo: Ketika Secangkir Kopi Menyimpan Identitas Sebuah Suku',
   'Bagi petani Gayo, kopi bukan komoditas semata, ia menyatu dengan pantun, didong, dan cara masyarakat merayakan musim panen.',
   'Di kaki perbukitan sekitar Danau Laut Tawar, petani kopi Gayo memetik ceri kopi arabika satu per satu dengan tangan, memastikan hanya buah yang benar-benar matang yang dipanen. Seorang petani menjelaskan bahwa proses giling basah khas Gayo, yang membuat cita rasa kopinya dikenal dunia, sebenarnya lahir dari kebiasaan rumahan turun-temurun, bukan teknik pabrik. Ia juga bercerita tentang didong, tradisi lisan berirama yang dulu sering dinyanyikan warga sambil bekerja di kebun kopi, mengiringi lelah dengan pantun dan syair. Baginya, menjaga kualitas kopi Gayo sama pentingnya dengan menjaga tradisi itu tetap hidup, karena keduanya sama-sama jadi identitas yang tak ingin ia lihat hilang.',
   'article', 'Muhammad Iqbal', 'Youth Cultural Ambassador'),

  ('banda-neira-pulau-yang-ditukar-manhattan', 'banda-neira', 'Banda Neira, Pulau Kecil yang Pernah Ditukar dengan Manhattan',
   'Sejarah dunia pernah ditentukan oleh pala dari pulau sekecil ini -- termasuk perjanjian yang menukar sebagian Kepulauan Banda dengan Manhattan.',
   'Berjalan di antara reruntuhan Benteng Belgica, sulit membayangkan bahwa pulau sekecil Banda Neira pernah jadi pusat rebutan kekuatan-kekuatan Eropa. Seorang pemandu lokal yang besar di Banda menjelaskan, jauh sebelum VOC datang, pala dari Kepulauan Banda sudah diperdagangkan hingga Eropa lewat jalur pedagang Arab dan Tionghoa, dengan harga setara emas. Ia juga tak menutupi sisi kelam sejarah itu, tentang bagaimana VOC membantai dan mengasingkan sebagian besar Orang Banda asli demi menguasai perkebunan pala. Baginya, penting bagi pengunjung untuk mengenal kedua sisi cerita ini, bukan cuma keindahan benteng tuanya, karena itulah yang membuat Banda Neira lebih dari sekadar pulau eksotis di peta.',
   'article', 'Melki Hukubun', 'Youth Cultural Ambassador');

INSERT OR IGNORE INTO local_experiences
  (slug, destination_slug, title, description, duration, group_size, price_idr, how_to_join)
VALUES
  ('susur-nagari-tertua-pariangan', 'nagari-pariangan', 'Menyusuri Nagari Tertua Minangkabau',
   'Berjalan kaki menyusuri perkampungan rumah gadang bersama warga nagari, mengenal sejarah tambo dan sistem adat matrilineal Minangkabau.',
   '2-3 jam', '2-10 orang', 100000,
   'Daftar lewat halaman Local Experience CultureAtlas, koordinasi jadwal dilakukan bersama kelompok sadar wisata Nagari Pariangan sebelum kedatangan.'),

  ('menenun-rumah-betang-ensaid-panjang', 'rumah-betang-ensaid-panjang', 'Menginap dan Menenun di Rumah Betang Ensaid Panjang',
   'Menginap semalam di rumah betang, mencoba proses mengikat-celup dan menenun ikat bersama penenun perempuan Dayak Desa.',
   '1 hari 1 malam', '2-6 orang', 150000,
   'Daftar lewat halaman Local Experience CultureAtlas, kuota terbatas karena disesuaikan dengan kapasitas keluarga tuan rumah di rumah betang.'),

  ('jelajah-kampung-apung-torosiaje', 'kampung-bajo-torosiaje', 'Menjelajah Kampung Apung Bajo Torosiaje',
   'Naik perahu kecil menyusuri jembatan dan rumah panggung Torosiaje, menyaksikan aktivitas nelayan Bajo dan snorkeling di terumbu karang sekitarnya.',
   '2-3 jam', '2-8 orang', 120000,
   'Daftar lewat halaman Local Experience CultureAtlas, koordinasi perahu dan pemandu dilakukan bersama kelompok nelayan Torosiaje.'),

  ('kebun-kopi-cupping-gayo', 'dataran-tinggi-gayo', 'Wisata Kebun Kopi dan Cupping Kopi Gayo',
   'Mengunjungi kebun kopi rakyat, menyaksikan proses giling basah, lalu mencicipi (cupping) beragam profil rasa kopi arabika Gayo bersama petani.',
   '3 jam', '2-10 orang', 130000,
   'Daftar lewat halaman Local Experience CultureAtlas, sesi tersedia mengikuti musim panen kebun kopi mitra di sekitar Takengon.'),

  ('susur-benteng-kebun-pala-banda', 'banda-neira', 'Susur Sejarah Benteng dan Kebun Pala Banda',
   'Menjelajahi Benteng Belgica dan Fort Nassau bersama pemandu lokal, dilanjutkan mengunjungi perkebunan pala tua dan mendengar sejarah pengasingan di Banda Neira.',
   '3-4 jam', '2-8 orang', 160000,
   'Daftar lewat halaman Local Experience CultureAtlas, pemandu lokal Banda Neira akan mengatur jadwal sesuai jadwal kapal/penerbangan pengunjung.');

INSERT OR IGNORE INTO marketplace_products
  (slug, destination_slug, name, description, category, price_idr, maker_name)
VALUES
  ('miniatur-rumah-gadang-pariangan', 'nagari-pariangan', 'Miniatur Rumah Gadang Berukir', 'Kerajinan ukiran miniatur rumah gadang dari kayu, menampilkan detail atap gonjong dan ukiran khas Minangkabau, dibuat oleh perajin di Nagari Pariangan.', 'kerajinan', 275000, 'Perajin Kayu Nagari Pariangan'),
  ('tenun-ikat-ensaid-panjang', 'rumah-betang-ensaid-panjang', 'Kain Tenun Ikat Ensaid Panjang', 'Kain tenun ikat khas Dayak Desa, ditenun manual lewat proses mengikat-celup benang oleh penenun perempuan rumah betang Ensaid Panjang.', 'tenun', 950000, 'Kelompok Penenun Ensaid Panjang'),
  ('ikan-asap-bajo-torosiaje', 'kampung-bajo-torosiaje', 'Ikan Asap Khas Bajo Torosiaje', 'Ikan laut segar hasil tangkapan nelayan Bajo, diolah dengan cara pengasapan tradisional khas kampung apung Torosiaje.', 'makanan', 65000, 'Kelompok Nelayan Torosiaje'),
  ('kopi-arabika-gayo', 'dataran-tinggi-gayo', 'Kopi Arabika Gayo', 'Biji kopi arabika Gayo hasil giling basah (wet-hulled) dari kebun rakyat sekitar Danau Laut Tawar, Aceh Tengah.', 'kopi', 120000, 'Kelompok Tani Kopi Gayo'),
  ('manisan-pala-banda', 'banda-neira', 'Manisan Pala Banda', 'Manisan buah pala khas Banda, diolah dari hasil perkebunan pala tua peninggalan sejarah Kepulauan Banda.', 'makanan', 45000, 'Kelompok Petani Pala Banda Neira');
