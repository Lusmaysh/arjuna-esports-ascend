import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Heart, Clock, Send, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email: string | null;
  category: string;
  likes_count: number;
  replies_count: number;
  created_at: string;
  updated_at: string;
}

interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author_name: string;
  author_email: string | null;
  created_at: string;
  updated_at: string;
}

const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replies, setReplies] = useState<Record<string, ForumReply[]>>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general', author_name: '' });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Discussion' },
    { value: 'tournaments', label: 'Tournaments' },
    { value: 'strategies', label: 'Game Strategies' },
    { value: 'teams', label: 'Team Recruitment' },
    { value: 'technical', label: 'Technical Support' }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      setPosts(postsData || []);

      // Fetch replies for each post
      if (postsData && postsData.length > 0) {
        const { data: repliesData, error: repliesError } = await supabase
          .from('forum_replies')
          .select('*')
          .in('post_id', postsData.map(post => post.id))
          .order('created_at', { ascending: true });

        if (repliesError) throw repliesError;

        // Group replies by post_id
        const repliesByPost: Record<string, ForumReply[]> = {};
        repliesData?.forEach(reply => {
          if (!repliesByPost[reply.post_id]) {
            repliesByPost[reply.post_id] = [];
          }
          repliesByPost[reply.post_id].push(reply);
        });

        setReplies(repliesByPost);
      }
    } catch (error) {
      console.error('Error fetching forum data:', error);
      toast({
        title: "Error",
        description: "Failed to load forum posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (isSubmitting) return; // Prevent double submission
    
    if (!newPost.title || !newPost.content || !newPost.author_name) {
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
        .from('forum_posts')
        .insert([newPost]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully!"
      });

      setNewPost({ title: '', content: '', category: 'general', author_name: '' });
      setShowNewPostForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
                <span className="gradient-text">Community Forum</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with fellow esports enthusiasts, share strategies, and discuss tournaments
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <Button onClick={() => setShowNewPostForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={newPost.author_name}
                    onChange={(e) => setNewPost({ ...newPost, author_name: e.target.value })}
                  />
                  <Input
                    placeholder="Post title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <Textarea
                    placeholder="Write your post content..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleCreatePost} disabled={isSubmitting}>
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Posting...' : 'Post'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Forum Posts */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading forum posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No posts found. Be the first to start a discussion!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{post.author_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{post.author_name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {post.likes_count} likes
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.replies_count} replies
                        </div>
                      </div>

                      {/* Replies */}
                      {replies[post.id] && replies[post.id].length > 0 && (
                        <div className="mt-6 space-y-4">
                          <h4 className="font-semibold text-sm text-muted-foreground">Replies</h4>
                          {replies[post.id].map((reply) => (
                            <div key={reply.id} className="bg-muted/30 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {reply.author_name.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{reply.author_name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(reply.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Forum;