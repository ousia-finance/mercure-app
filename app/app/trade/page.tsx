import { TradeAssetsCard } from "@/components/app/trade/TradeAssetsCard";
import { supabaseClient } from "@/utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const revalidate = 10;

const TradePage = async () => {
  const { data: stocks, error } = await supabaseClient
    .from("stocks")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="">
      <h1 className="text-3xl font-bold tracking-tight">Trade</h1>
      <TradeAssetsCard />
    </div>
  );
};

export default TradePage;
