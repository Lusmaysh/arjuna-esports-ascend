
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useTournamentStatusRefresh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('refresh_all_tournament_statuses');
      
      if (error) {
        console.error('Error refreshing tournament statuses:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch tournament data
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
    },
  });
};
