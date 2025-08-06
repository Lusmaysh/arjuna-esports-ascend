import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ForumReplyFormProps {
  postId: string;
  onReplyAdded: () => void;
}

export const ForumReplyForm = ({ postId, onReplyAdded }: ForumReplyFormProps) => {
  const [reply, setReply] = useState({ content: '', author_name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    if (!reply.content || !reply.author_name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert([{ ...reply, post_id: postId }]);

      if (error) throw error;

      // Update reply count
      await supabase.rpc('increment_reply_count', { post_id: postId });

      toast({
        title: "Success",
        description: "Reply added successfully!"
      });

      setReply({ content: '', author_name: '' });
      onReplyAdded();
    } catch (error) {
      console.error('Error adding reply:', error);
      toast({
        title: "Error",
        description: "Failed to add reply",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-semibold">Add a Reply</h4>
      <Input
        placeholder="Your name"
        value={reply.author_name}
        onChange={(e) => setReply({ ...reply, author_name: e.target.value })}
      />
      <Textarea
        placeholder="Write your reply..."
        value={reply.content}
        onChange={(e) => setReply({ ...reply, content: e.target.value })}
        rows={3}
      />
      <Button onClick={handleSubmit} disabled={isSubmitting} size="sm">
        <Send className="h-4 w-4 mr-2" />
        {isSubmitting ? 'Posting...' : 'Reply'}
      </Button>
    </div>
  );
};