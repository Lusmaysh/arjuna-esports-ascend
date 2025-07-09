
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useTournaments = () => {
  return useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('date_held', { ascending: true });
      
      if (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
      }
      
      return data;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to ensure status is up to date
  });
};
