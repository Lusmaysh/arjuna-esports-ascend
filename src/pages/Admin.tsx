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
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, RefreshCw, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

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

interface TournamentForm {
  name: string;
  game: string;
  number_of_teams: number;
  prize_pool: number;
  diamond_prize_pool: number;
  registration_fee: number;
  date_held: string;
  location: string;
  description: string;
  registration_link: string;
  image_url: string;
}

const Admin = () => {
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['admin-tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Tournament[];
    },
  });

  const form = useForm<TournamentForm>({
    defaultValues: {
      name: '',
      game: '',
      number_of_teams: 8,
      prize_pool: 0,
      diamond_prize_pool: 0,
      registration_fee: 0,
      date_held: '',
      location: '',
      description: '',
      registration_link: '',
      image_url: '',
    },
  });

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('tournament-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('tournament-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (data: TournamentForm) => {
      let finalImageUrl = data.image_url;
      
      if (imageFile) {
        setUploadingImage(true);
        try {
          finalImageUrl = await uploadImageToSupabase(imageFile);
        } catch (error) {
          console.error('Image upload error:', error);
          throw new Error('Failed to upload image');
        } finally {
          setUploadingImage(false);
        }
      }

      const finalData = {
        ...data,
        image_url: finalImageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'
      };

      const { error } = await supabase
        .from('tournaments')
        .insert([finalData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({
        title: "Success",
        description: "Tournament created successfully.",
      });
      setIsDialogOpen(false);
      setImageFile(null);
      setImagePreview(null);
      form.reset();
    },
    onError: (error) => {
      setUploadingImage(false);
      toast({
        title: "Error",
        description: "Failed to create tournament.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TournamentForm }) => {
      let finalImageUrl = data.image_url;
      
      if (imageFile) {
        setUploadingImage(true);
        try {
          finalImageUrl = await uploadImageToSupabase(imageFile);
        } catch (error) {
          console.error('Image upload error:', error);
          throw new Error('Failed to upload image');
        } finally {
          setUploadingImage(false);
        }
      }

      const finalData = {
        ...data,
        image_url: finalImageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'
      };

      const { error } = await supabase
        .from('tournaments')
        .update(finalData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({
        title: "Success",
        description: "Tournament updated successfully.",
      });
      setIsDialogOpen(false);
      setEditingTournament(null);
      setImageFile(null);
      setImagePreview(null);
      form.reset();
    },
    onError: (error) => {
      setUploadingImage(false);
      toast({
        title: "Error",
        description: "Failed to update tournament.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tournaments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast({
        title: "Success",
        description: "Tournament deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete tournament.",
        variant: "destructive",
      });
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
      toast({
        title: "Success",
        description: "Tournament statuses refreshed successfully.",
      });
    },
    onError: (error) => {
      console.error('Error refreshing tournament statuses:', error);
      toast({
        title: "Error",
        description: "Failed to refresh tournament statuses. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Clear the URL field when a file is selected
      form.setValue('image_url', '');
    }
  };

  const removeImageFile = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = (data: TournamentForm) => {
    if (editingTournament) {
      updateMutation.mutate({ id: editingTournament.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (tournament: Tournament) => {
    setEditingTournament(tournament);
    form.reset({
      name: tournament.name,
      game: tournament.game,
      number_of_teams: tournament.number_of_teams,
      prize_pool: tournament.prize_pool,
      diamond_prize_pool: tournament.diamond_prize_pool,
      registration_fee: tournament.registration_fee,
      date_held: tournament.date_held,
      location: tournament.location,
      description: tournament.description || '',
      registration_link: tournament.registration_link || '',
      image_url: tournament.image_url || '',
    });
    setImageFile(null);
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tournament?')) {
      deleteMutation.mutate(id);
    }
  };

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
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDiamonds = (amount: number) => {
    return `${amount.toLocaleString()} 💎`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold font-orbitron mb-2">Tournament Admin</h1>
                <p className="text-muted-foreground">Manage tournaments and their details</p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => refreshMutation.mutate()}
                  disabled={refreshMutation.isPending}
                  variant="outline"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
                  Refresh Status
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingTournament(null);
                      setImageFile(null);
                      setImagePreview(null);
                      form.reset();
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tournament
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingTournament ? 'Edit Tournament' : 'Create New Tournament'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingTournament ? 'Update tournament details' : 'Add a new tournament to the system'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: 'Tournament name is required' }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tournament Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter tournament name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="game"
                            rules={{ required: 'Game is required' }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Game</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Mobile Legends, PUBG" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <FormLabel>Tournament Image</FormLabel>
                          
                          {(imagePreview || form.watch('image_url')) && (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                              <img 
                                src={imagePreview || form.watch('image_url')} 
                                alt="Tournament preview" 
                                className="w-full h-full object-cover"
                              />
                              {imagePreview && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={removeImageFile}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileChange}
                              className="flex-1"
                              disabled={uploadingImage}
                            />
                            <span className="text-sm text-muted-foreground">OR</span>
                          </div>

                          <FormField
                            control={form.control}
                            name="image_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter image URL" 
                                    {...field}
                                    disabled={!!imageFile || uploadingImage}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      if (e.target.value) {
                                        setImageFile(null);
                                        setImagePreview(null);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                                <p className="text-sm text-muted-foreground">
                                  {imageFile ? 'File selected for upload' : 'If left empty, a default Mobile Legends image will be used'}
                                </p>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="number_of_teams"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Teams</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="date_held"
                            rules={{ required: 'Date is required' }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="prize_pool"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prize Pool (IDR)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="diamond_prize_pool"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Diamond Prize Pool</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="Enter diamond amount"
                                    {...field} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="registration_fee"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Fee (IDR)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          rules={{ required: 'Location is required' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Tournament location" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="registration_link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Link</FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tournament description..."
                                  rows={3}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end gap-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsDialogOpen(false);
                              setEditingTournament(null);
                              setImageFile(null);
                              setImagePreview(null);
                              form.reset();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending || uploadingImage}
                          >
                            {uploadingImage ? 'Uploading...' : editingTournament ? 'Update' : 'Create'} Tournament
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Tournaments</CardTitle>
                <CardDescription>
                  Manage and monitor all tournaments in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
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
                          <TableHead>Money Prize</TableHead>
                          <TableHead>Diamond Prize</TableHead>
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
                              <TableCell>
                                {format(new Date(tournament.date_held), 'dd MMM yyyy', { locale: id })}
                              </TableCell>
                              <TableCell>{tournament.number_of_teams}</TableCell>
                              <TableCell>{formatCurrency(tournament.prize_pool)}</TableCell>
                              <TableCell>{formatDiamonds(tournament.diamond_prize_pool)}</TableCell>
                              <TableCell>
                                <Badge variant={statusBadge.variant}>
                                  {statusBadge.label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(tournament)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(tournament.id)}
                                    disabled={deleteMutation.isPending}
                                  >
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
