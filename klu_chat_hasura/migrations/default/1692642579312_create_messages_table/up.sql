-- File: migrations/20230821123456_create_messages_table/up.sql

-- Create the "messages" table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP DEFAULT now(),
  content TEXT
);
