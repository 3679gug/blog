-- Backfill profiles for existing users who don't have one
INSERT INTO public.profiles (id, full_name, avatar_url)
SELECT 
    id, 
    COALESCE(raw_user_meta_data->>'full_name', 'User'), 
    raw_user_meta_data->>'avatar_url'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Ensure the trigger is active and correctly defined (re-applying to be sure)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', 'User'), new.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
