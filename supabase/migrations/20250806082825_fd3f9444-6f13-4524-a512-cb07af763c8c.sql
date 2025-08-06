-- Simple migration to trigger types regeneration
-- Add a comment to refresh the schema
COMMENT ON TABLE public.forum_posts IS 'Forum posts for community discussions';
COMMENT ON TABLE public.forum_replies IS 'Replies to forum posts';
COMMENT ON TABLE public.players_leaderboard IS 'Player rankings and statistics';
COMMENT ON TABLE public.tournament_gallery IS 'Tournament images and media';