
-- Create a table for tournaments
CREATE TABLE public.tournaments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  game TEXT NOT NULL,
  number_of_teams INTEGER NOT NULL DEFAULT 8,
  prize_pool INTEGER NOT NULL DEFAULT 0,
  registration_fee INTEGER NOT NULL DEFAULT 0,
  date_held DATE NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'registration', 'ongoing', 'completed')),
  description TEXT,
  registration_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view tournaments (public data)
CREATE POLICY "Anyone can view tournaments" 
  ON public.tournaments 
  FOR SELECT 
  USING (true);

-- Create policy to allow anyone to insert tournaments (for now, can be restricted later)
CREATE POLICY "Anyone can create tournaments" 
  ON public.tournaments 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to update tournaments (for now, can be restricted later)
CREATE POLICY "Anyone can update tournaments" 
  ON public.tournaments 
  FOR UPDATE 
  USING (true);

-- Create policy to allow anyone to delete tournaments (for now, can be restricted later)
CREATE POLICY "Anyone can delete tournaments" 
  ON public.tournaments 
  FOR DELETE 
  USING (true);
