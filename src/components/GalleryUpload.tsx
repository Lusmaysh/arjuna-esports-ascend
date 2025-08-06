import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GalleryUploadProps {
  onUploadComplete: () => void;
}

export const GalleryUpload = ({ onUploadComplete }: GalleryUploadProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'photo' as 'photo' | 'video'
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Auto-detect category based on file type
      if (selectedFile.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, category: 'video' }));
      } else {
        setFormData(prev => ({ ...prev, category: 'photo' }));
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please select a file and enter a title",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tournament-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('tournament-images')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('tournament_gallery')
        .insert([{
          title: formData.title,
          description: formData.description,
          image_url: publicUrl,
          category: formData.category
        }]);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image uploaded successfully!"
      });

      // Reset form
      setFormData({ title: '', description: '', category: 'photo' });
      setFile(null);
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload to Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select File</label>
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>
        
        <Input
          placeholder="Title *"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
        
        <Textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value="photo"
              checked={formData.category === 'photo'}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'photo' }))}
            />
            <Image className="h-4 w-4" />
            Photo
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value="video"
              checked={formData.category === 'video'}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'video' }))}
            />
            <Video className="h-4 w-4" />
            Video
          </label>
        </div>
        
        <Button onClick={handleUpload} disabled={isUploading} className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </CardContent>
    </Card>
  );
};