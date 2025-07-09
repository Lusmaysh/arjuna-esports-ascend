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
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Tournament {
  id: string;
  name: string;
  game: string;
  number_of_teams: number;
  prize_pool: number;
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
      registration_fee: 0,
      date_held: '',
      location: '',
      description: '',
      registration_link: '',
      image_url: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: TournamentForm) => {
      const { error } = await supabase
        .from('tournaments')
        .insert([data]);
      
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
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create tournament.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TournamentForm }) => {
      const { error } = await supabase
        .from('tournaments')
        .update(data)
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
      form.reset();
    },
    onError: (error) => {
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
  });

  const onSubmit = (data: TournamentForm) => {
    const finalData = {
      ...data,
      image_url: data.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'
    };
    
    if (editingTournament) {
      updateMutation.mutate({ id: editingTournament.id, data: finalData });
    } else {
      createMutation.mutate(finalData);
    }
  };

  const handleEdit = (tournament: Tournament) => {
    setEditingTournament(tournament);
    form.reset({
      name: tournament.name,
      game: tournament.game,
      number_of_teams: tournament.number_of_teams,
      prize_pool: tournament.prize_pool,
      registration_fee: tournament.registration_fee,
      date_held: tournament.date_held,
      location: tournament.location,
      description: tournament.description || '',
      registration_link: tournament.registration_link || '',
      image_url: tournament.image_url || '',
    });
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

                        <FormField
                          control={form.control}
                          name="image_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tournament Image URL (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com/image.jpg (leave blank for default Mobile Legends image)" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-sm text-muted-foreground">
                                If left empty, a default Mobile Legends image will be used
                              </p>
                            </FormItem>
                          )}
                        />

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
                        </div>

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
                              form.reset();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                          >
                            {editingTournament ? 'Update' : 'Create'} Tournament
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
                              <TableCell>
                                {format(new Date(tournament.date_held), 'dd MMM yyyy', { locale: id })}
                              </TableCell>
                              <TableCell>{tournament.number_of_teams}</TableCell>
                              <TableCell>{formatCurrency(tournament.prize_pool)}</TableCell>
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
