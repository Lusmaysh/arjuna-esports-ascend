-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.refresh_all_tournament_statuses()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fix the trigger function as well
CREATE OR REPLACE FUNCTION public.update_tournament_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Jika turnamen sudah selesai
  IF NEW.date_held < CURRENT_DATE THEN
    NEW.status := 'completed';

  -- Jika turnamen sedang berlangsung hari ini
  ELSIF NEW.date_held = CURRENT_DATE THEN
    NEW.status := 'ongoing';

  -- Jika sudah ada link pendaftaran ATAU kurang dari 1 bulan
  ELSIF NEW.registration_link IS NOT NULL AND LENGTH(TRIM(NEW.registration_link)) > 0 THEN
    NEW.status := 'registration';
    
  ELSIF NEW.date_held <= CURRENT_DATE + INTERVAL '7 days' THEN
    NEW.status := 'registration';

  -- Selain itu dianggap upcoming
  ELSE
    NEW.status := 'upcoming';
  END IF;

  -- Perbarui waktu update
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$function$;