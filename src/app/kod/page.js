import { supabase } from "@/config/supabase";

export default async function Kod({ searchParams }) {
  const categoryId = searchParams.categoryId;
  let data, error;

  if (!categoryId) {
    ({ data, error } = await supabase
      .from("products")
      .select("*"));
  } else {
    ({ data, error } = await supabase
      .from("products") 
      .select("*")
      .eq("categoryId", categoryId));
  }

  if (error) return <div>{error.message}</div>;
  console.log(data);

  return (
    <div>
      <h1 className="text-[#000]">ürünler - {categoryId}</h1>
      <ul className="text-[#000]">
        {data.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
