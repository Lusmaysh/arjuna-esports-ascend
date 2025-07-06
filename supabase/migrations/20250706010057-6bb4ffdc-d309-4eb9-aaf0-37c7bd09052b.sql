
-- Create a table to store service orders
CREATE TABLE public.service_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  service_title TEXT NOT NULL,
  service_price TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making it public for now since no auth is implemented
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert orders (for customers)
CREATE POLICY "Anyone can create service orders" 
  ON public.service_orders 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to view orders (you can restrict this later)
CREATE POLICY "Anyone can view service orders" 
  ON public.service_orders 
  FOR SELECT 
  USING (true);
