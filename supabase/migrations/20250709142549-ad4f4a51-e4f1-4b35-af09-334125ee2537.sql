
-- Create a function to automatically update tournament status based on date
CREATE OR REPLACE FUNCTION update_tournament_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update status based on date logic
  IF NEW.date_held < CURRENT_DATE THEN
    NEW.status := 'completed';
  ELSIF NEW.date_held = CURRENT_DATE THEN
    NEW.status := 'ongoing';
  ELSIF NEW.date_held <= CURRENT_DATE + INTERVAL '7 days' THEN
    NEW.status := 'registration';
  ELSE
    NEW.status := 'upcoming';
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update status on INSERT and UPDATE
CREATE OR REPLACE TRIGGER tournament_status_trigger
  BEFORE INSERT OR UPDATE ON tournaments
  FOR EACH ROW
  EXECUTE FUNCTION update_tournament_status();

-- Update existing tournaments with correct status
UPDATE tournaments SET updated_at = NOW();

-- Create a function to batch update all tournament statuses (useful for admin page)
CREATE OR REPLACE FUNCTION refresh_all_tournament_statuses()
RETURNS void AS $$
BEGIN
  UPDATE tournaments SET updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
