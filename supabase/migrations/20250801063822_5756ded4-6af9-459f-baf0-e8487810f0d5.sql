-- Fix the refresh_all_tournament_statuses function to actually refresh tournament statuses
CREATE OR REPLACE FUNCTION public.refresh_all_tournament_statuses()
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Update tournament statuses based on current date
  UPDATE tournaments 
  SET 
    status = CASE
      -- If tournament is completed (date in the past)
      WHEN date_held < CURRENT_DATE THEN 'completed'
      
      -- If tournament is ongoing (today)
      WHEN date_held = CURRENT_DATE THEN 'ongoing'
      
      -- If registration is open (has link OR within 7 days)
      WHEN (registration_link IS NOT NULL AND LENGTH(TRIM(registration_link)) > 0) 
           OR date_held <= CURRENT_DATE + INTERVAL '7 days' THEN 'registration'
      
      -- Otherwise upcoming
      ELSE 'upcoming'
    END,
    updated_at = NOW();
END;
$function$;