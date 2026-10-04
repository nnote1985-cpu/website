-- Optional per-project neighborhood and construction updates.
-- Additive only: no content is seeded and existing projects remain unchanged.
alter table public.projects
  add column if not exists project_sections jsonb not null default '{}'::jsonb;

comment on column public.projects.project_sections is
  'Admin-managed nearby places and construction progress. Empty objects hide both sections.';
