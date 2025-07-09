
-- Add diamond prize pool column to tournaments table
ALTER TABLE public.tournaments 
ADD COLUMN diamond_prize_pool INTEGER NOT NULL DEFAULT 0;
