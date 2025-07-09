
-- Create a storage bucket for tournament images
INSERT INTO storage.buckets (id, name, public)
VALUES ('tournament-images', 'tournament-images', true);

-- Create policy to allow anyone to upload images
CREATE POLICY "Anyone can upload tournament images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tournament-images');

-- Create policy to allow anyone to view tournament images
CREATE POLICY "Anyone can view tournament images"
ON storage.objects FOR SELECT
USING (bucket_id = 'tournament-images');

-- Create policy to allow anyone to update tournament images
CREATE POLICY "Anyone can update tournament images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tournament-images');

-- Create policy to allow anyone to delete tournament images
CREATE POLICY "Anyone can delete tournament images"
ON storage.objects FOR DELETE
USING (bucket_id = 'tournament-images');
