-- Real, CC-licensed photography from Wikimedia Commons for 6 of the 8 seeded
-- destinations (additive migration; the other two keep the illustrated
-- field-plate placeholder since no properly-licensed photo could be found
-- for them). Attribution fields are required by the CC BY / CC BY-SA
-- licenses these photos carry and must stay visible wherever the photo is
-- shown (see components/site/photo-credit.tsx).

ALTER TABLE destinations ADD COLUMN photo_credit_name TEXT;
ALTER TABLE destinations ADD COLUMN photo_credit_license TEXT;
ALTER TABLE destinations ADD COLUMN photo_credit_url TEXT;

UPDATE destinations SET
  hero_image_url = '/assets/destinations/wae-rebo.jpg',
  photo_credit_name = 'Jakub Hałun',
  photo_credit_license = 'CC BY 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Distant_view_of_Wae_Rebo_village,_Flores_Island,_Indonesia,_20250824_0824_3037.jpg'
WHERE slug = 'wae-rebo';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/kete-kesu-toraja.jpg',
  photo_credit_name = 'Arian Zwegers',
  photo_credit_license = 'CC BY 2.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Tana_Toraja,_Kete_Kesu,_tongkonan_(6823113962).jpg'
WHERE slug = 'kete-kesu-toraja';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/kampung-naga.jpg',
  photo_credit_name = 'Abdulrohmatt',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Traditional_House_of_Kampung_Naga,_Tasikmalaya,_West_Java.jpg'
WHERE slug = 'kampung-naga';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/desa-sade.jpg',
  photo_credit_name = 'Aainayyahm',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Desa_Sade,_Lombok.jpg'
WHERE slug = 'desa-sade';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/desa-bena.jpg',
  photo_credit_name = 'Fakhri Anindita',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Kampung_bena.jpg'
WHERE slug = 'desa-bena';

UPDATE destinations SET
  hero_image_url = '/assets/destinations/kasepuhan-ciptagelar.jpg',
  photo_credit_name = 'Erfransdo',
  photo_credit_license = 'CC BY-SA 4.0',
  photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Bentang_alam_Kasepuhan_Ciptagelar.jpg'
WHERE slug = 'kasepuhan-ciptagelar';

-- kajang-ammatoa and margamulya-kopi intentionally left without a photo:
-- no properly free-licensed image of either specific place was found on
-- Wikimedia Commons. They keep the illustrated field-plate placeholder
-- rather than a mismatched stock substitute.
