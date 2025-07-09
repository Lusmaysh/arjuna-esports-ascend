
-- Add image_url column to tournaments table
ALTER TABLE public.tournaments 
ADD COLUMN image_url TEXT;

-- Set default image for existing tournaments
UPDATE public.tournaments 
SET image_url = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'
WHERE image_url IS NULL;
