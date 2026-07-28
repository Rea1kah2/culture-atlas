-- Two new destinations added on request: Sumatera Utara (ulos weaving
-- village, Lake Toba) and Bali (Tenganan Pegringsingan, a Bali Aga village --
-- deliberately NOT the more mainstream/touristy Bali sites, to stay
-- consistent with the "hidden culture, beyond the crowds" positioning).
-- Additive only, same pattern as 0002_cultureatlas.sql (destination + story
-- + experience + product, joined by destination_slug).

INSERT OR IGNORE INTO destinations
  (slug, name, province, category, tagline, history, cultural_value, activities, how_to_get_there, lat, lng, sustainability_score, sustainability_note)
VALUES
  ('lumban-suhi-suhi', 'Lumban Suhi-suhi Toruan', 'Sumatera Utara', 'kerajinan',
   'Kampung penenun ulos di tepi Danau Toba, tempat kain bermakna kehidupan ditenun turun-temurun',
   'Lumban Suhi-suhi Toruan adalah salah satu kampung di Pulau Samosir yang secara turun-temurun dikenal sebagai sentra tenun ulos Batak Toba. Berbeda dari desa-desa di tepi Danau Toba yang kini lebih dikenal lewat foto pemandangan, kampung ini tetap menjalankan tenun sebagai mata pencaharian dan praktik budaya sehari-hari, bukan pertunjukan untuk wisatawan.',
   'Ulos bukan sekadar kain, melainkan bahasa simbolik dalam adat Batak: diberikan pada kelahiran, pernikahan, hingga kematian, masing-masing dengan jenis dan motif berbeda. Ulos Ragidup, yang paling sakral, hanya ditenun untuk upacara adat tertentu dan dipercaya menyatukan tiga unsur restu dalam adat Batak (Dalihan Na Tolu). Proses menenunnya bisa memakan waktu berminggu-minggu untuk satu lembar kain.',
   'Menyaksikan proses menenun ulos dengan alat tenun tradisional
Belajar dasar menenun dari penenun kampung
Mengenal makna berbagai jenis ulos dalam adat Batak (Dalihan Na Tolu)
Mengunjungi rumah adat Bolon di sekitar kampung
Menyusuri tepi Danau Toba dengan latar Pulau Samosir',
   'Dari Medan, perjalanan darat sekitar 4-5 jam ke Parapat, dilanjutkan penyeberangan kapal feri sekitar 1 jam ke Pulau Samosir, lalu darat sekitar 30-45 menit menuju kampung penenun di kawasan Pangururan.',
   2.6167, 98.75, 82,
   'Penjualan ulos dikelola langsung oleh kelompok penenun kampung tanpa perantara besar, menjaga harga tetap adil bagi penenun sekaligus melestarikan keterampilan menenun manual dibanding produksi tenun mesin.'),

  ('tenganan-pegringsingan', 'Tenganan Pegringsingan', 'Bali', 'budaya',
   'Desa Bali Aga dengan tata ruang leluhur dan satu-satunya tradisi tenun geringsing (double ikat) di Asia Tenggara',
   'Tenganan Pegringsingan adalah salah satu desa Bali Aga, permukiman masyarakat asli Bali yang mempertahankan adat dari sebelum pengaruh Majapahit masuk ke pulau ini. Tata ruang desa yang berupa deretan pekarangan memanjang di antara tiga jalan utama masih dipertahankan persis seperti aturan adat leluhur, menjadikannya salah satu desa Bali Aga dengan struktur tata ruang paling utuh yang tersisa.',
   'Tenganan adalah satu dari sedikit tempat di dunia yang masih menenun geringsing, kain tenun ikat ganda (double ikat) yang mewajibkan benang lungsin dan pakan sama-sama diikat-celup sebelum ditenun, sebuah teknik langka yang bisa memakan waktu bertahun-tahun untuk satu lembar kain. Warga percaya geringsing punya daya pelindung spiritual, karena itu dipakai dalam upacara adat dan ritual, bukan sekadar kain hias.',
   'Menyaksikan proses mengikat-celup dan menenun geringsing
Mengenal tata ruang desa adat Bali Aga yang masih utuh
Mengunjungi perajin ukiran daun lontar khas Tenganan
Berkeliling desa bersama pemandu warga setempat
Menyaksikan tradisi Mekare-kare (Perang Pandan) bila bertepatan musim upacara',
   'Dari Bandara Ngurah Rai, perjalanan darat sekitar 1,5-2 jam ke arah timur menuju Kecamatan Manggis, Karangasem, tidak jauh dari kawasan Candidasa.',
   -8.4808, 115.5844, 78,
   'Kunjungan dan penjualan kain diatur langsung oleh awig-awig (aturan adat desa), menjaga agar arus wisatawan tidak mengubah tata ruang dan ritme hidup adat yang sudah berlangsung ratusan tahun.');

INSERT OR IGNORE INTO cultural_stories
  (slug, destination_slug, title, excerpt, body, content_type, author_name, author_role)
VALUES
  ('ulos-ragidup-bahasa-restu-batak', 'lumban-suhi-suhi', 'Ulos Ragidup: Ketika Sehelai Kain Menyimpan Restu Tiga Arah',
   'Bagi masyarakat Batak, ulos bukan pelengkap busana, tapi bahasa restu yang mengikat hubungan keluarga besar lewat filosofi Dalihan Na Tolu.',
   'Di teras rumahnya di Lumban Suhi-suhi Toruan, Oppung Boru masih menenun dengan cara yang sama seperti yang diajarkan neneknya puluhan tahun lalu. Ia menjelaskan, ulos yang paling dihormati, Ragidup, hanya boleh ditenun untuk upacara adat besar seperti pernikahan atau kelahiran cucu pertama, bukan untuk dijual bebas. Setiap pemberian ulos punya arah dan makna sendiri sesuai posisi pemberi dalam struktur Dalihan Na Tolu, hubungan kekerabatan yang menjadi dasar seluruh adat Batak. Ia bilang, banyak generasi muda kampung sekarang justru datang belajar menenun bukan untuk usaha, tapi supaya paham makna kain yang akan mereka berikan kelak di pesta adat keluarga sendiri.',
   'article', 'Ronald Simatupang', 'Youth Cultural Ambassador'),

  ('geringsing-kain-yang-butuh-bertahun-tahun', 'tenganan-pegringsingan', 'Geringsing: Kain yang Butuh Bertahun-tahun untuk Selesai Ditenun',
   'Satu lembar geringsing bisa menghabiskan waktu bertahun-tahun untuk selesai, karena benangnya harus diikat-celup dua arah sebelum sehelai pun ditenun.',
   'Yang paling sulit dipahami pengunjung baru di Tenganan adalah kenapa harga selembar geringsing bisa begitu tinggi. Jawabannya ada di prosesnya sendiri: berbeda dari tenun ikat biasa yang hanya mengikat benang lungsin atau pakan saja, geringsing mengharuskan kedua arah benang diikat dan dicelup warna sebelum ditenun jadi satu, teknik yang di dunia hanya bertahan di segelintir tempat. Warga Tenganan percaya geringsing punya kekuatan menolak hal buruk, karena itu dipakai dalam upacara potong gigi hingga ritual kematian. Bagi keluarga yang masih menenun, geringsing bukan produk kerajinan biasa, tapi warisan yang selesainya diukur dalam tahun, bukan hari.',
   'article', 'Ni Made Ariastuti', 'Youth Cultural Ambassador');

INSERT OR IGNORE INTO local_experiences
  (slug, destination_slug, title, description, duration, group_size, price_idr, how_to_join)
VALUES
  ('belajar-tenun-ulos-samosir', 'lumban-suhi-suhi', 'Belajar Menenun Ulos di Tepi Danau Toba',
   'Duduk bersama penenun kampung dan mencoba dasar menenun ulos dengan alat tenun tradisional, sambil mendengar makna tiap jenis ulos dalam adat Batak.',
   '2-3 jam', '2-6 orang', 140000,
   'Daftar lewat halaman Local Experience CultureAtlas, koordinasi jadwal dilakukan bersama kelompok penenun Lumban Suhi-suhi sebelum kedatangan.'),
  ('menenun-geringsing-tenganan', 'tenganan-pegringsingan', 'Mengenal Proses Tenun Geringsing Tenganan',
   'Menyaksikan tahap mengikat-celup benang dan menenun geringsing bersama perajin desa, serta mendengar makna spiritualnya dalam upacara adat Bali Aga.',
   '2 jam', '2-8 orang', 175000,
   'Daftar lewat halaman Local Experience CultureAtlas, sesi tersedia setiap hari kecuali saat berlangsung upacara adat desa.');

INSERT OR IGNORE INTO marketplace_products
  (slug, destination_slug, name, description, category, price_idr, maker_name)
VALUES
  ('ulos-ragihotang-samosir', 'lumban-suhi-suhi', 'Kain Ulos Ragihotang', 'Kain ulos tenun tangan motif ragihotang, ditenun langsung oleh penenun Lumban Suhi-suhi Toruan di Pulau Samosir.', 'tenun', 750000, 'Kelompok Penenun Lumban Suhi-suhi'),
  ('geringsing-tenganan', 'tenganan-pegringsingan', 'Kain Geringsing Tenganan', 'Kain tenun ikat ganda (double ikat) geringsing asli, ditenun dengan proses pewarnaan dan pengikatan benang yang memakan waktu bertahun-tahun.', 'tenun', 3500000, 'Perajin Geringsing Tenganan');
