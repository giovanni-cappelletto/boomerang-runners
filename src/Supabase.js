import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON_KEY
);

const fetchData = async (table, column, value, setState) => {
  if (column !== "" && value !== "") {
    const { data } = await supabase.from(table).select("*").eq(column, value);
    setState(data);
    return;
  }

  const { data } = await supabase.from(table).select("*");
  setState(data);
};

export default supabase;
export { fetchData };
