import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uitplgqukaxrribgrpvv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdHBsZ3F1a2F4cnJpYmdycHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNjE1OTAsImV4cCI6MjA4NDkzNzU5MH0.5ifr6_Tl9mjnWeiaWJ2ICmOgasMRDlaoG0ok3lNu700'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isConfigured = () => supabaseUrl && supabaseAnonKey
