-- Ensure all tables exist and have proper structure
-- This migration will help regenerate the types file

-- Make sure forum_posts table exists with correct structure
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  likes_count INTEGER NOT NULL DEFAULT 0,
  replies_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Make sure forum_replies table exists with correct structure
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Make sure players_leaderboard table exists with correct structure
CREATE TABLE IF NOT EXISTS public.players_leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  player_email TEXT,
  game TEXT NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  tournaments_won INTEGER NOT NULL DEFAULT 0,
  tournaments_played INTEGER NOT NULL DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Make sure tournament_gallery table exists with correct structure
CREATE TABLE IF NOT EXISTS public.tournament_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'photo',
  tournament_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_gallery ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for forum_posts
CREATE POLICY IF NOT EXISTS "Anyone can view forum posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Anyone can create forum posts" ON public.forum_posts FOR INSERT WITH CHECK (true);

-- Create RLS policies for forum_replies
CREATE POLICY IF NOT EXISTS "Anyone can view forum replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Anyone can create forum replies" ON public.forum_replies FOR INSERT WITH CHECK (true);

-- Create RLS policies for players_leaderboard
CREATE POLICY IF NOT EXISTS "Anyone can view players leaderboard" ON public.players_leaderboard FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Anyone can create/update players leaderboard" ON public.players_leaderboard FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Anyone can update players leaderboard" ON public.players_leaderboard FOR UPDATE USING (true);

-- Create RLS policies for tournament_gallery
CREATE POLICY IF NOT EXISTS "Anyone can view tournament gallery" ON public.tournament_gallery FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Anyone can create tournament gallery" ON public.tournament_gallery FOR INSERT WITH CHECK (true);