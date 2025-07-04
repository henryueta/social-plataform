import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
    "https://dpjzdzhdhqgackpxojdi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwanpkemhkaHFnYWNrcHhvamRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODQ3MzgsImV4cCI6MjA2NzA2MDczOH0.4Qm64edoRXkxQZQ7myNLO5Je6XMfJfMjUURAqWjEoSk")


export default supabase
