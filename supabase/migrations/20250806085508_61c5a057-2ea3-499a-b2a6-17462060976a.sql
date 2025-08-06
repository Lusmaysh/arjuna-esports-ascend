-- Fix search path security warning by setting empty search_path and fully qualifying references
CREATE OR REPLACE FUNCTION public.increment_reply_count(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.forum_posts 
  SET replies_count = replies_count + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_like_count(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.forum_posts 
  SET likes_count = likes_count + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$;