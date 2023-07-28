import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://vgzuppijoyeriwmvvctm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnenVwcGlqb3llcml3bXZ2Y3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3Nzc2NzAsImV4cCI6MjAwMDM1MzY3MH0.pIGpT-1otC_7ehJTtCFuRHUNBDeagxuZTQEHsb5DO3I')

export default supabase