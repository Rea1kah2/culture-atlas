-- Real, CC-licensed photography (Wikimedia Commons) for the 5 destinations
-- added in 0007. Same additive UPDATE pattern as 0005_more_photos.sql.

UPDATE destinations SET
  hero_image_url = '/assets/destinations/nagari-pariangan.jpg',
  photo_credit_name = 'Adhmi',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Perkampungan_di_nagari_Pariangan.jpg'
WHERE slug = 'nagari-pariangan';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/rumah-betang-ensaid-panjang.jpg',
  photo_credit_name = 'Zhilal Darma',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Rumah_Betang_Ensaid_Panjang_1.jpg'
WHERE slug = 'rumah-betang-ensaid-panjang';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/kampung-bajo-torosiaje.jpg',
  photo_credit_name = 'Dianmega',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Kahidupan_Suku_Bajo_Torosiaje_Gorontalo.jpg'
WHERE slug = 'kampung-bajo-torosiaje';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/dataran-tinggi-gayo.jpg',
  photo_credit_name = 'USAID Indonesia',
  photo_credit_license = 'Public Domain',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Coffee_Plantation_in_Takengon_Aceh_(5281850478).jpg'
WHERE slug = 'dataran-tinggi-gayo';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/banda-neira.jpg',
  photo_credit_name = 'The13thSchulzter',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Fort_Belgica_Fortifications_2018.jpg'
WHERE slug = 'banda-neira';
