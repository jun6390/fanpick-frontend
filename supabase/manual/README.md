# Manual Supabase SQL

This folder contains SQL files that are applied manually from the Supabase SQL
Editor when setting up or repairing an environment. They are not part of the
automatic migration chain.

- `prediction-results-schema.sql`: grants required for prediction result sync
- `predictions-delete-policy.sql`: authenticated user delete policy for predictions
- `setup-push-cron.sql`: Supabase cron setup for match notification delivery
- `team-records-schema.sql`: team/player records tables and read policies
- `team-standings-schema.sql`: team standings table and read policy
