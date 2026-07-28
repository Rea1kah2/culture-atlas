-- Fills in real, CC-licensed photography (Wikimedia Commons) for the 2
-- previously photo-less destinations (kajang-ammatoa, margamulya-kopi) and
-- the 2 new destinations added in 0004. Same additive UPDATE pattern as
-- 0003_destination_photos.sql -- no new columns needed, they already exist.

UPDATE destinations SET
  hero_image_url = '/assets/destinations/kajang-ammatoa.jpg',
  photo_credit_name = 'Muhammad Firdaus Sofyan',
  photo_credit_license = 'CC0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Ritual_Akkattere_suku_kajang.jpg'
WHERE slug = 'kajang-ammatoa';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/margamulya-kopi.jpg',
  photo_credit_name = 'Abdulrohmatt',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Ripe_Arabica_coffee_berries,_Tasikmalaya_20170518.jpg'
WHERE slug = 'margamulya-kopi';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/lumban-suhi-suhi.jpg',
  photo_credit_name = 'Pratechno',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Tenun_Ulos_Batak_Pulau_Samosir.jpg'
WHERE slug = 'lumban-suhi-suhi';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/tenganan-pegringsingan.jpg',
  photo_credit_name = 'Arthamade',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Desa_Tenganan.jpg'
WHERE slug = 'tenganan-pegringsingan';
