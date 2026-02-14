
-- Add parent_id to ford_models for sub-model hierarchy
ALTER TABLE public.ford_models ADD COLUMN parent_id uuid REFERENCES public.ford_models(id) ON DELETE CASCADE;
