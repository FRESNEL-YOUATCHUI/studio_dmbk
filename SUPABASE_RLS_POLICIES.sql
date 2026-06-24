-- =========================================================
-- ID Craft / Next.js + Supabase
-- RLS DEV permissif + version production recommandée
-- À copier dans le SQL Editor Supabase.
-- =========================================================

-- Extensions utiles
create extension if not exists pgcrypto;

-- =========================================================
-- 0) SCHÉMA MINIMUM ATTENDU PAR LE SITE
-- =========================================================
-- Ce bloc corrige aussi la cause classique du 404 :
-- les routes /portfolio/[slug] et /services/[slug] ont besoin de projects.slug et services.slug.

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  name text,
  file_url text,
  file_path text,
  category text,
  alt_text text,
  size bigint,
  mime_type text,
  created_at timestamptz default now()
);

alter table public.media add column if not exists name text;
alter table public.media add column if not exists file_url text;
alter table public.media add column if not exists file_path text;
alter table public.media add column if not exists category text;
alter table public.media add column if not exists alt_text text;
alter table public.media add column if not exists size bigint;
alter table public.media add column if not exists mime_type text;
alter table public.media add column if not exists created_at timestamptz default now();

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text,
  description text,
  category text,
  image_id uuid references public.media(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.projects add column if not exists title text;
alter table public.projects add column if not exists slug text;
alter table public.projects add column if not exists description text;
alter table public.projects add column if not exists category text;
alter table public.projects add column if not exists image_id uuid references public.media(id) on delete set null;
alter table public.projects add column if not exists created_at timestamptz default now();

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text,
  description text,
  image_id uuid references public.media(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.services add column if not exists title text;
alter table public.services add column if not exists slug text;
alter table public.services add column if not exists description text;
alter table public.services add column if not exists image_id uuid references public.media(id) on delete set null;
alter table public.services add column if not exists created_at timestamptz default now();

create unique index if not exists projects_slug_unique on public.projects(slug);
create unique index if not exists services_slug_unique on public.services(slug);
create index if not exists media_category_idx on public.media(category);
create index if not exists media_created_at_idx on public.media(created_at desc);

-- Bucket public media
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- =========================================================
-- 1) ACTIVER RLS
-- =========================================================

alter table public.media enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;

-- storage.objects a déjà RLS activé par Supabase.
-- Cette requête permet de le vérifier :
select
  schemaname,
  tablename,
  rowsecurity
from pg_tables
where schemaname in ('public', 'storage')
  and tablename in ('media', 'projects', 'services', 'objects');

-- =========================================================
-- 2) POLICIES DEV PERMISSIVES — À UTILISER TEMPORAIREMENT
-- =========================================================
-- Objectif : faire fonctionner immédiatement le back-office avec NEXT_PUBLIC_SUPABASE_ANON_KEY.
-- Ces policies autorisent anon + authenticated à tout faire.
-- À NE PAS GARDER EN PRODUCTION.

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'media' and policyname = 'dev_media_select_all'
  ) then
    create policy "dev_media_select_all"
    on public.media
    for select
    to anon, authenticated
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'media' and policyname = 'dev_media_insert_all'
  ) then
    create policy "dev_media_insert_all"
    on public.media
    for insert
    to anon, authenticated
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'media' and policyname = 'dev_media_update_all'
  ) then
    create policy "dev_media_update_all"
    on public.media
    for update
    to anon, authenticated
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'media' and policyname = 'dev_media_delete_all'
  ) then
    create policy "dev_media_delete_all"
    on public.media
    for delete
    to anon, authenticated
    using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'dev_projects_all'
  ) then
    create policy "dev_projects_all"
    on public.projects
    for all
    to anon, authenticated
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'services' and policyname = 'dev_services_all'
  ) then
    create policy "dev_services_all"
    on public.services
    for all
    to anon, authenticated
    using (true)
    with check (true);
  end if;
end $$;

-- Policies Storage sur storage.objects pour le bucket media
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'dev_storage_media_select_all'
  ) then
    create policy "dev_storage_media_select_all"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'media');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'dev_storage_media_insert_all'
  ) then
    create policy "dev_storage_media_insert_all"
    on storage.objects
    for insert
    to anon, authenticated
    with check (bucket_id = 'media');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'dev_storage_media_update_all'
  ) then
    create policy "dev_storage_media_update_all"
    on storage.objects
    for update
    to anon, authenticated
    using (bucket_id = 'media')
    with check (bucket_id = 'media');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'dev_storage_media_delete_all'
  ) then
    create policy "dev_storage_media_delete_all"
    on storage.objects
    for delete
    to anon, authenticated
    using (bucket_id = 'media');
  end if;
end $$;

-- =========================================================
-- 3) COMMANDES POUR SUPPRIMER LES POLICIES DEV
-- =========================================================

-- drop policy if exists "dev_media_select_all" on public.media;
-- drop policy if exists "dev_media_insert_all" on public.media;
-- drop policy if exists "dev_media_update_all" on public.media;
-- drop policy if exists "dev_media_delete_all" on public.media;
-- drop policy if exists "dev_projects_all" on public.projects;
-- drop policy if exists "dev_services_all" on public.services;
-- drop policy if exists "dev_storage_media_select_all" on storage.objects;
-- drop policy if exists "dev_storage_media_insert_all" on storage.objects;
-- drop policy if exists "dev_storage_media_update_all" on storage.objects;
-- drop policy if exists "dev_storage_media_delete_all" on storage.objects;

-- =========================================================
-- 4) VERSION PRODUCTION RECOMMANDÉE
-- =========================================================
-- Recommandation :
-- - front public : SELECT uniquement ;
-- - back-office Next.js : utiliser SUPABASE_SERVICE_ROLE_KEY côté serveur ;
-- - ne pas autoriser anon à insert/update/delete.
--
-- À exécuter en production APRÈS suppression des policies DEV ci-dessus.

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'media' and policyname = 'prod_media_public_read'
  ) then
    create policy "prod_media_public_read"
    on public.media
    for select
    to anon, authenticated
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'prod_projects_public_read'
  ) then
    create policy "prod_projects_public_read"
    on public.projects
    for select
    to anon, authenticated
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'services' and policyname = 'prod_services_public_read'
  ) then
    create policy "prod_services_public_read"
    on public.services
    for select
    to anon, authenticated
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'prod_storage_media_public_read'
  ) then
    create policy "prod_storage_media_public_read"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'media');
  end if;
end $$;
