-- Create function to increment reply count for forum posts
CREATE OR REPLACE FUNCTION public.increment_reply_count(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE forum_posts 
  SET replies_count = replies_count + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$;

-- Create function to increment like count for forum posts
CREATE OR REPLACE FUNCTION public.increment_like_count(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE forum_posts 
  SET likes_count = likes_count + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$;