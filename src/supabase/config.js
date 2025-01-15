import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://osrjdiecpphmrtnhnlqi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcmpkaWVjcHBobXJ0bmhubHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MTA3MzAsImV4cCI6MjA1MjI4NjczMH0.2tko9lNER1UfizducA4_2ezJYbqTJGzQidO0nZINc38";


export const supabase = createClient(supabaseUrl, supabaseKey);

