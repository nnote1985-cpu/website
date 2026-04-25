alter table public.projects
  add column if not exists concept_article text default '',
  add column if not exists concept_image text default '',
  add column if not exists facilities jsonb default '[]'::jsonb;
