# Configuration Supabase

Le site utilise Supabase pour :

- la médiathèque (`media` bucket + table `media`) ;
- les projets (`projects`) ;
- les services (`services`).

## Variables d’environnement

À renseigner en local et sur l’hébergeur :

```env
NEXT_PUBLIC_SUPABASE_URL=https://neodkuuwknilriumdjek.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

La clé `SUPABASE_SERVICE_ROLE_KEY` est recommandée pour le back-office, car elle permet aux routes serveur admin d’uploader, renommer et supprimer les images sans ouvrir des policies publiques dangereuses.

Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY` côté client.

## Bucket Storage

Bucket attendu :

```txt
media
```

Le bucket doit être public pour que les images s’affichent sur le front-office.

## Migration des anciens fichiers

Une fois `SUPABASE_SERVICE_ROLE_KEY` ajoutée :

```bash
npm run migrate:supabase
```

Le script :

1. lit les anciennes images dans `public/uploads` ;
2. les envoie dans Supabase Storage, bucket `media` ;
3. crée les lignes dans la table `media` ;
4. remplace les anciennes URL locales par les URL Supabase ;
5. insère/met à jour les projets et services.

## Organisation automatique des images par projet

Après une migration ou après avoir ajouté beaucoup d’images identifiables dans Supabase, lance :

```bash
npm run organize:supabase
```

Le script classe automatiquement :

- `Banniere-Projet-E-drive.png` + `E-drive-*` → projet `e-drive` ;
- `Banniere-Projet-le-cliche-.png` + `Le-cliche-by-ffhl-*` → projet `le-cliche-by-ffhl` ;
- `Banniere-projet-Helix.png` + `HELIX-Mental-Health-*` → projet `helix` ;
- `ESTM-*` → projet `estm-rentree-2026`.

Il met aussi la bannière en image principale (`image_id`) et remplit la galerie du projet.

## Tables attendues

```txt
media:
id uuid
name text
file_url text
file_path text
category text
alt_text text
size bigint
mime_type text
created_at timestamptz

projects:
id uuid
title text
slug text
description text
category text
image_id uuid
created_at timestamptz

services:
id uuid
title text
slug text
description text
image_id uuid
created_at timestamptz
```

Les champs avancés nécessaires au design actuel sont stockés en JSON dans `description`.
