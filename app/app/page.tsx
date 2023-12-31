import AffiliateProgram from "@/components/app/overview/AffiliateProgramCard";
import LearnMore from "@/components/app/overview/LearnMoreCard";
import MyAssets from "@/components/app/overview/MyAssetsCard";
import { OrderHistory } from "@/components/app/overview/OrderHistoryCard";
import TotalValue from "@/components/app/overview/TotalValueCard";
import { createSupabaseServerComponentClient } from "@/utils/supabaseServerComponentClient";
import { Database } from "@/utils/types/supabaseTypes";
import {
  PythConnection,
  PythHttpClient,
  getPythProgramKeyForCluster,
} from "@pythnetwork/client";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { revalidatePath } from "next/cache";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const revalidate = 100;

type Token = {
  id: string;
  created_at: string;
  name: string;
  symbol: string;
  address?: string; // making this optional since you use 'address!' elsewhere
  image_url: string;
  price?: number; // the price after fetching from the API
  tokenAmount?: number; // the token amount after processing
};

const OverviewPage = async () => {
  const supabase = createSupabaseServerComponentClient();
  const session = await supabase.auth.getSession();

  let tokens: Token[] | null = null; // set initial value to null

  if (session.data.session?.user) {
    const { data: profile, error: fetchProfileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.data.session.user.id)
      .single();

    const { data: stocks, error: fetchStocksError } = await supabase
      .from("stocks")
      .select("*");

    let addresses = new Set(stocks?.map((item) => item.address));

    const getBalances = async () => {
      if (!profile?.wallet_address) {
        return null;
      }

      const heliusKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY! as string;

      const requestBody = {
        params: [
          profile.wallet_address,
          {
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            encoding: "jsonParsed",
          },
        ],
      };

      const data = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(profile.wallet_address),
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        }
      );

      console.log(data);

      let tokens = new Set<string>(
        data.value.map((item) => item.account.data.parsed.info.mint)
      );

      console.log("tokens", tokens);

      console.log("tokens", stocks);

      const filteredList = stocks!.filter((stock) =>
        tokens.has(stock.address!)
      );

      //  console.log("filtered list", filteredList);

      // Create a map of mint address to token amount.
      const tokenAmounts = {};
      data.value.forEach((item) => {
        // @ts-ignore
        tokenAmounts[item.account.data.parsed.info.mint] =
          item.account.data.parsed.info.tokenAmount.uiAmount;
      });

      const pythConnection = new PythHttpClient(
        connection,
        getPythProgramKeyForCluster("devnet")
      );

      const pythData = await pythConnection.getData();
      const pricesMap = {};

      for (let stock of filteredList) {
        // Fetch price using Pyth's productPrice.get
        // @ts-ignore
        const priceInfo = pythData.productPrice.get(stock.price_feed_id);
        if (priceInfo) {
          // @ts-ignore
          pricesMap[stock.symbol] = priceInfo.aggregate.price;
        } else {
          console.error("Price info not found for:", stock.symbol);
        }
      }

      // Add the price and the token amount to the filteredList
      for (let stock of filteredList) {
        // @ts-ignore
        stock.price = pricesMap[stock.symbol];
        // @ts-ignore
        stock.tokenAmount = tokenAmounts[stock.address!] || 0;
      }

      return filteredList;
    };
    // @ts-ignore
    tokens = await getBalances();

    console.log(tokens);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-9">
        <div className="col-span-1 md:col-span-6">
          <TotalValue tokens={tokens} />
          {/* @ts-ignore */}
          <MyAssets tokens={tokens ?? []} />
        </div>
        <div className="col-span-1 md:col-span-3 md:ml-3">
          <LearnMore />
          <AffiliateProgram />
        </div>
      </div>
      <div className="w-full">
        <OrderHistory stocks={null} />
      </div>
    </div>
  );
};

export default OverviewPage;
