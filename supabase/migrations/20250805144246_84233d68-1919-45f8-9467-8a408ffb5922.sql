-- Create RLS policies with correct syntax
CREATE POLICY "Anyone can view forum posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can create forum posts" ON public.forum_posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view forum replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Anyone can create forum replies" ON public.forum_replies FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view players leaderboard" ON public.players_leaderboard FOR SELECT USING (true);
CREATE POLICY "Anyone can create players leaderboard" ON public.players_leaderboard FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update players leaderboard" ON public.players_leaderboard FOR UPDATE USING (true);

CREATE POLICY "Anyone can view tournament gallery" ON public.tournament_gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can create tournament gallery" ON public.tournament_gallery FOR INSERT WITH CHECK (true);