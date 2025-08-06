-- Fix all function search paths to resolve security warnings
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.refresh_all_tournament_statuses()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.tournaments 
  SET 
    status = CASE
      WHEN date_held < CURRENT_DATE THEN 'completed'
      WHEN date_held = CURRENT_DATE THEN 'ongoing'
      WHEN (registration_link IS NOT NULL AND LENGTH(TRIM(registration_link)) > 0) 
           OR date_held <= CURRENT_DATE + INTERVAL '7 days' THEN 'registration'
      ELSE 'upcoming'
    END,
    updated_at = NOW()
  WHERE TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_tournament_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.date_held < CURRENT_DATE THEN
    NEW.status := 'completed';
  ELSIF NEW.date_held = CURRENT_DATE THEN
    NEW.status := 'ongoing';
  ELSIF NEW.registration_link IS NOT NULL AND LENGTH(TRIM(NEW.registration_link)) > 0 THEN
    NEW.status := 'registration';
  ELSIF NEW.date_held <= CURRENT_DATE + INTERVAL '7 days' THEN
    NEW.status := 'registration';
  ELSE
    NEW.status := 'upcoming';
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;