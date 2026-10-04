# Nearby places and construction progress

Run `migrations/20261004064906_add_project_sections.sql` against the website database before using the updated project editor. This only adds `public.projects.project_sections`; it does not seed data or change existing access policies.

Then open Admin > Projects > Edit. Enter nearby places by category, name and distance. For construction progress, set the update month, overall percentage, work categories and optional YouTube URL; enable the display checkbox to publish it. Overall progress is editorial data, not an unweighted average of work categories.

Empty categories are hidden. Progress remains hidden unless enabled and an update month is present. No reference-site project data is copied. Existing projects continue to render before the migration, but saving the new editor requires the migration.

Verification after deployment: save a project, reopen its editor, check both sections on its public URL, and disable progress to confirm it disappears. Database round-trip verification has not been performed locally.
