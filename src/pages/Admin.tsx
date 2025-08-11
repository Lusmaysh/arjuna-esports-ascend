import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, RefreshCw, Upload, X, Calendar, Image, MessageSquare, Newspaper, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Interfaces
interface Tournament {
  id: string;
  name: string;
  game: string;
  number_of_teams: number;
  prize_pool: number;
  diamond_prize_pool: number;
  registration_fee: number;
  date_held: string;
  location: string;
  status: string;
  description: string | null;
  registration_link: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  tournament_id: string | null;
  created_at: string;
  updated_at: string;
}

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

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('tournaments');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dialogType, setDialogType] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Forms
  const tournamentForm = useForm({
    defaultValues: {
      name: '', game: '', number_of_teams: 8, prize_pool: 0, diamond_prize_pool: 0,
      registration_fee: 0, date_held: '', location: '', description: '', registration_link: '', image_url: ''
    }
  });

  const galleryForm = useForm({
    defaultValues: {
      title: '', description: '', image_url: '', category: 'photo', tournament_id: ''
    }
  });

  const forumForm = useForm({
    defaultValues: {
      title: '', content: '', author_name: '', author_email: '', category: 'general'
    }
  });

  const newsForm = useForm({
    defaultValues: {
      title: '', excerpt: '', content: '', author: '', category: 'general', featured: false, published: true
    }
  });

  // Queries
  const { data: tournaments, isLoading: tournamentsLoading } = useQuery({
    queryKey: ['admin-tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as Tournament[];
    },
  });

  const { data: gallery, isLoading: galleryLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tournament_gallery').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const { data: forumPosts, isLoading: forumLoading } = useQuery({
    queryKey: ['admin-forum'],
    queryFn: async () => {
      const { data, error } = await supabase.from('forum_posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as ForumPost[];
    },
  });

  const { data: newsArticles, isLoading: newsLoading } = useQuery({
    queryKey: ['admin-news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news_articles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as NewsArticle[];
    },
  });

  // Image upload function
  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('tournament-images').upload(fileName, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('tournament-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Generic mutations
  const createMutation = useMutation({
    mutationFn: async ({ table, data }: { table: string; data: any }) => {
      let finalData = { ...data };
      
      if (imageFile && (table === 'tournaments' || table === 'tournament_gallery')) {
        setUploadingImage(true);
        try {
          const imageUrl = await uploadImageToSupabase(imageFile);
          finalData.image_url = imageUrl;
        } finally {
          setUploadingImage(false);
        }
      }

      // Type-safe table operations
      if (table === 'tournaments') {
        const { error } = await supabase.from('tournaments').insert([finalData]);
        if (error) throw error;
      } else if (table === 'tournament_gallery') {
        const { error } = await supabase.from('tournament_gallery').insert([finalData]);
        if (error) throw error;
      } else if (table === 'forum_posts') {
        const { error } = await supabase.from('forum_posts').insert([finalData]);
        if (error) throw error;
      } else if (table === 'news_articles') {
        const { error } = await supabase.from('news_articles').insert([finalData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
      if (activeTab === 'tournaments') queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({ title: "Success", description: "Item created successfully." });
      handleCloseDialog();
    },
    onError: () => {
      setUploadingImage(false);
      toast({ title: "Error", description: "Failed to create item.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ table, id, data }: { table: string; id: string; data: any }) => {
      let finalData = { ...data };
      
      if (imageFile && (table === 'tournaments' || table === 'tournament_gallery')) {
        setUploadingImage(true);
        try {
          const imageUrl = await uploadImageToSupabase(imageFile);
          finalData.image_url = imageUrl;
        } finally {
          setUploadingImage(false);
        }
      }

      // Type-safe table operations
      if (table === 'tournaments') {
        const { error } = await supabase.from('tournaments').update(finalData).eq('id', id);
        if (error) throw error;
      } else if (table === 'tournament_gallery') {
        const { error } = await supabase.from('tournament_gallery').update(finalData).eq('id', id);
        if (error) throw error;
      } else if (table === 'forum_posts') {
        const { error } = await supabase.from('forum_posts').update(finalData).eq('id', id);
        if (error) throw error;
      } else if (table === 'news_articles') {
        const { error } = await supabase.from('news_articles').update(finalData).eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
      if (activeTab === 'tournaments') queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({ title: "Success", description: "Item updated successfully." });
      handleCloseDialog();
    },
    onError: () => {
      setUploadingImage(false);
      toast({ title: "Error", description: "Failed to update item.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ table, id }: { table: string; id: string }) => {
      // Type-safe table operations
      if (table === 'tournaments') {
        const { error } = await supabase.from('tournaments').delete().eq('id', id);
        if (error) throw error;
      } else if (table === 'tournament_gallery') {
        const { error } = await supabase.from('tournament_gallery').delete().eq('id', id);
        if (error) throw error;
      } else if (table === 'forum_posts') {
        const { error } = await supabase.from('forum_posts').delete().eq('id', id);
        if (error) throw error;
      } else if (table === 'news_articles') {
        const { error } = await supabase.from('news_articles').delete().eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
      if (activeTab === 'tournaments') queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({ title: "Success", description: "Item deleted successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete item.", variant: "destructive" });
    },
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('refresh_all_tournament_statuses');
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({ title: "Success", description: "Tournament statuses refreshed successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to refresh tournament statuses.", variant: "destructive" });
    },
  });

  // Handlers
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setDialogType('');
    setImageFile(null);
    setImagePreview(null);
    tournamentForm.reset();
    galleryForm.reset();
    forumForm.reset();
    newsForm.reset();
  };

  const handleOpenDialog = (type: string, item?: any) => {
    setDialogType(type);
    setEditingItem(item);
    
    if (item) {
      switch (type) {
        case 'tournament':
          tournamentForm.reset({ ...item, description: item.description || '', registration_link: item.registration_link || '', image_url: item.image_url || '' });
          break;
        case 'gallery':
          galleryForm.reset({ ...item, description: item.description || '', tournament_id: item.tournament_id || '' });
          break;
        case 'forum':
          forumForm.reset({ ...item, author_email: item.author_email || '' });
          break;
        case 'news':
          newsForm.reset(item);
          break;
      }
    } else {
      // Reset forms for new items
      switch (type) {
        case 'tournament':
          tournamentForm.reset({ name: '', game: '', number_of_teams: 8, prize_pool: 0, diamond_prize_pool: 0, registration_fee: 0, date_held: '', location: '', description: '', registration_link: '', image_url: '' });
          break;
        case 'gallery':
          galleryForm.reset({ title: '', description: '', image_url: '', category: 'photo', tournament_id: '' });
          break;
        case 'forum':
          forumForm.reset({ title: '', content: '', author_name: '', author_email: '', category: 'general' });
          break;
        case 'news':
          newsForm.reset({ title: '', excerpt: '', content: '', author: '', category: 'general', featured: false, published: true });
          break;
      }
    }
    
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: any) => {
    const tableMap: Record<string, string> = {
      tournament: 'tournaments',
      gallery: 'tournament_gallery',
      forum: 'forum_posts',
      news: 'news_articles'
    };
    
    const table = tableMap[dialogType];
    
    if (editingItem) {
      updateMutation.mutate({ table, id: editingItem.id, data });
    } else {
      createMutation.mutate({ table, data });
    }
  };

  const handleDelete = (table: string, id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate({ table, id });
    }
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: 'Coming Soon', variant: 'secondary' as const },
      registration: { label: 'Registration Open', variant: 'default' as const },
      ongoing: { label: 'Live Now', variant: 'destructive' as const },
      completed: { label: 'Completed', variant: 'outline' as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDiamonds = (amount: number) => `${amount.toLocaleString()} 💎`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-orbitron mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage all aspects of your esports platform</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex overflow-x-auto sm:grid sm:grid-cols-4 justify-start">
                <TabsTrigger value="tournaments" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Tournaments
                </TabsTrigger>
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="forum" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Forum
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  News
                </TabsTrigger>
              </TabsList>

              {/* Tournaments Tab */}
              <TabsContent value="tournaments">
                <Card>
                  <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                      <CardTitle className="text-3xl font-bold font-orbitron mb-2 justify-between">Tournament Management</CardTitle>
                      <CardDescription className="text-muted-foreground">Create and manage tournaments</CardDescription>
                    </div>
                    <div className="flex gap-2 flex flex-col md:flex-row">
                      <Button onClick={() => refreshMutation.mutate()} disabled={refreshMutation.isPending} variant="outline">
                        <RefreshCw className={`h-4 w-4 mr-2 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
                        Refresh Status
                      </Button>
                      <Button onClick={() => handleOpenDialog('tournament')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tournament
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {tournamentsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Game</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Teams</TableHead>
                              <TableHead>Prize Pool</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tournaments?.map((tournament) => {
                              const statusBadge = getStatusBadge(tournament.status);
                              return (
                                <TableRow key={tournament.id}>
                                  <TableCell className="font-medium">{tournament.name}</TableCell>
                                  <TableCell>{tournament.game}</TableCell>
                                  <TableCell>{format(new Date(tournament.date_held), 'dd MMM yyyy', { locale: id })}</TableCell>
                                  <TableCell>{tournament.number_of_teams}</TableCell>
                                  <TableCell>{formatCurrency(tournament.prize_pool)}</TableCell>
                                  <TableCell>
                                    <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" onClick={() => handleOpenDialog('tournament', tournament)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => handleDelete('tournaments', tournament.id)}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <Card>
                  <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                      <CardTitle className="text-3xl font-bold font-orbitron mb-2 justify-between">Gallery Management</CardTitle>
                      <CardDescription >Manage tournament gallery images</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenDialog('gallery')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {galleryLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gallery?.map((item) => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                              <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleOpenDialog('gallery', item)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete('tournament_gallery', item.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Forum Tab */}
              <TabsContent value="forum">
                <Card>
                  <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                      <CardTitle className="text-3xl font-bold font-orbitron mb-2 justify-between">Forum Management</CardTitle>
                      <CardDescription>Manage forum posts</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenDialog('forum')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Post
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {forumLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Author</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Likes</TableHead>
                              <TableHead>Replies</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {forumPosts?.map((post) => (
                              <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>{post.author_name}</TableCell>
                                <TableCell><Badge variant="secondary">{post.category}</Badge></TableCell>
                                <TableCell>{post.likes_count}</TableCell>
                                <TableCell>{post.replies_count}</TableCell>
                                <TableCell>{format(new Date(post.created_at), 'dd MMM yyyy')}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleOpenDialog('forum', post)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDelete('forum_posts', post.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* News Tab */}
              <TabsContent value="news">
                <Card>
                  <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                      <CardTitle className="text-3xl font-bold font-orbitron mb-2 justify-between">News Management</CardTitle>
                      <CardDescription>Manage news articles and updates</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenDialog('news')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Article
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {newsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Author</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Featured</TableHead>
                              <TableHead>Published</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {newsArticles?.map((article) => (
                              <TableRow key={article.id}>
                                <TableCell className="font-medium">{article.title}</TableCell>
                                <TableCell>{article.author}</TableCell>
                                <TableCell><Badge variant="secondary">{article.category}</Badge></TableCell>
                                <TableCell>{article.featured ? <Badge>Featured</Badge> : ''}</TableCell>
                                <TableCell>{article.published ? <Badge variant="default">Published</Badge> : <Badge variant="outline">Draft</Badge>}</TableCell>
                                <TableCell>{format(new Date(article.created_at), 'dd MMM yyyy')}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleOpenDialog('news', article)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDelete('news_articles', article.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Generic Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? `Edit ${dialogType}` : `Create New ${dialogType}`}
                  </DialogTitle>
                  <DialogDescription>
                    {editingItem ? `Update ${dialogType} details` : `Add a new ${dialogType} to the system`}
                  </DialogDescription>
                </DialogHeader>

                {/* Tournament Form */}
                {dialogType === 'tournament' && (
                  <Form {...tournamentForm}>
                    <form onSubmit={tournamentForm.handleSubmit(handleSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={tournamentForm.control} name="name" rules={{ required: 'Name is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Tournament Name</FormLabel><FormControl><Input placeholder="Enter tournament name" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        <FormField control={tournamentForm.control} name="game" rules={{ required: 'Game is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Game</FormLabel><FormControl><Input placeholder="e.g. Mobile Legends" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                      </div>

                      {(imagePreview || tournamentForm.watch('image_url')) && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                          <img src={imagePreview || tournamentForm.watch('image_url')} alt="Preview" className="w-full h-full object-cover" />
                          {imagePreview && (
                            <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => { setImageFile(null); setImagePreview(null); }}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <Input type="file" accept="image/*" onChange={handleImageFileChange} className="flex-1" disabled={uploadingImage} />
                        <span className="text-sm text-muted-foreground">OR</span>
                      </div>

                      <FormField control={tournamentForm.control} name="image_url"
                        render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Enter image URL" {...field} disabled={!!imageFile || uploadingImage} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={tournamentForm.control} name="number_of_teams"
                          render={({ field }) => (
                            <FormItem><FormLabel>Number of Teams</FormLabel><FormControl><Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                          )} />
                        <FormField control={tournamentForm.control} name="date_held" rules={{ required: 'Date is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={tournamentForm.control} name="prize_pool"
                          render={({ field }) => (
                            <FormItem><FormLabel>Prize Pool (IDR)</FormLabel><FormControl><Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                          )} />
                        <FormField control={tournamentForm.control} name="diamond_prize_pool"
                          render={({ field }) => (
                            <FormItem><FormLabel>Diamond Prize Pool</FormLabel><FormControl><Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                          )} />
                      </div>

                      <FormField control={tournamentForm.control} name="registration_fee"
                        render={({ field }) => (
                          <FormItem><FormLabel>Registration Fee (IDR)</FormLabel><FormControl><Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <FormField control={tournamentForm.control} name="location" rules={{ required: 'Location is required' }}
                        render={({ field }) => (
                          <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="Tournament location" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <FormField control={tournamentForm.control} name="registration_link"
                        render={({ field }) => (
                          <FormItem><FormLabel>Registration Link</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <FormField control={tournamentForm.control} name="description"
                        render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Tournament description..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadingImage}>
                          {uploadingImage ? 'Uploading...' : editingItem ? 'Update' : 'Create'} Tournament
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {/* Gallery Form */}
                {dialogType === 'gallery' && (
                  <Form {...galleryForm}>
                    <form onSubmit={galleryForm.handleSubmit(handleSubmit)} className="space-y-4">
                      <FormField control={galleryForm.control} name="title" rules={{ required: 'Title is required' }}
                        render={({ field }) => (
                          <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Enter image title" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      {(imagePreview || galleryForm.watch('image_url')) && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                          <img src={imagePreview || galleryForm.watch('image_url')} alt="Preview" className="w-full h-full object-cover" />
                          {imagePreview && (
                            <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => { setImageFile(null); setImagePreview(null); }}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <Input type="file" accept="image/*" onChange={handleImageFileChange} className="flex-1" disabled={uploadingImage} />
                        <span className="text-sm text-muted-foreground">OR</span>
                      </div>

                      <FormField control={galleryForm.control} name="image_url" rules={{ required: 'Image is required' }}
                        render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Enter image URL" {...field} disabled={!!imageFile || uploadingImage} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={galleryForm.control} name="category"
                          render={({ field }) => (
                            <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="photo">Photo</SelectItem>
                                <SelectItem value="highlight">Highlight</SelectItem>
                                <SelectItem value="winner">Winner</SelectItem>
                              </SelectContent>
                            </Select><FormMessage /></FormItem>
                          )} />

                        <FormField control={galleryForm.control} name="tournament_id"
                          render={({ field }) => (
                            <FormItem><FormLabel>Tournament (Optional)</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select tournament" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="">No Tournament</SelectItem>
                                {tournaments?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                              </SelectContent>
                            </Select><FormMessage /></FormItem>
                          )} />
                      </div>

                      <FormField control={galleryForm.control} name="description"
                        render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Image description..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadingImage}>
                          {uploadingImage ? 'Uploading...' : editingItem ? 'Update' : 'Create'} Image
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {/* Forum Form */}
                {dialogType === 'forum' && (
                  <Form {...forumForm}>
                    <form onSubmit={forumForm.handleSubmit(handleSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={forumForm.control} name="author_name" rules={{ required: 'Author name is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Author Name</FormLabel><FormControl><Input placeholder="Enter author name" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        <FormField control={forumForm.control} name="author_email"
                          render={({ field }) => (
                            <FormItem><FormLabel>Author Email (Optional)</FormLabel><FormControl><Input type="email" placeholder="author@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={forumForm.control} name="title" rules={{ required: 'Title is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Enter post title" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        <FormField control={forumForm.control} name="category"
                          render={({ field }) => (
                            <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Discussion</SelectItem>
                                <SelectItem value="tournaments">Tournaments</SelectItem>
                                <SelectItem value="strategies">Game Strategies</SelectItem>
                                <SelectItem value="teams">Team Recruitment</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                              </SelectContent>
                            </Select><FormMessage /></FormItem>
                          )} />
                      </div>

                      <FormField control={forumForm.control} name="content" rules={{ required: 'Content is required' }}
                        render={({ field }) => (
                          <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea placeholder="Write your post content..." rows={6} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                          {editingItem ? 'Update' : 'Create'} Post
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {/* News Form */}
                {dialogType === 'news' && (
                  <Form {...newsForm}>
                    <form onSubmit={newsForm.handleSubmit(handleSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={newsForm.control} name="title" rules={{ required: 'Title is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Enter article title" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        <FormField control={newsForm.control} name="author" rules={{ required: 'Author is required' }}
                          render={({ field }) => (
                            <FormItem><FormLabel>Author</FormLabel><FormControl><Input placeholder="Enter author name" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                      </div>

                      <FormField control={newsForm.control} name="category"
                        render={({ field }) => (
                          <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="tournaments">Tournaments</SelectItem>
                              <SelectItem value="updates">Updates</SelectItem>
                              <SelectItem value="partnerships">Partnerships</SelectItem>
                              <SelectItem value="facilities">Facilities</SelectItem>
                            </SelectContent>
                          </Select><FormMessage /></FormItem>
                        )} />

                      <FormField control={newsForm.control} name="excerpt" rules={{ required: 'Excerpt is required' }}
                        render={({ field }) => (
                          <FormItem><FormLabel>Excerpt</FormLabel><FormControl><Textarea placeholder="Brief summary of the article..." rows={2} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <FormField control={newsForm.control} name="content" rules={{ required: 'Content is required' }}
                        render={({ field }) => (
                          <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea placeholder="Full article content..." rows={8} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <div className="flex items-center gap-4">
                        <FormField control={newsForm.control} name="featured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Featured Article</FormLabel>
                                <p className="text-sm text-muted-foreground">Display this article as featured</p>
                              </div>
                              <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                          )} />

                        <FormField control={newsForm.control} name="published"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Published</FormLabel>
                                <p className="text-sm text-muted-foreground">Make this article visible to users</p>
                              </div>
                              <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                          )} />
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                          {editingItem ? 'Update' : 'Create'} Article
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;