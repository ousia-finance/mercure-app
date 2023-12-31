"use client";
import { BorrowAmountInput } from "@/components/app/borrow/BorrowAmountInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabaseClient } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Earn = () => {
  const [assets, setAssets] = useState([]);
  const fetchStocks = async () => {
    const { data: stocks, error } = await supabaseClient
      .from("stocks")
      .select("*")
      .order("name", { ascending: true });
    if (stocks) {
      // @ts-ignore
      setAssets(stocks);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const [amount, setAmount] = useState<string>("");
  const router = useRouter();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Earn</h1>{" "}
      <p className="text-muted-foreground mb-4">
        Provide liquidity for token pairs and earn a share of the Orca swap
        fees.
      </p>
      {assets.map((asset) => (
        // @ts-ignore
        <Card key={asset.name} className="mb-2">
          <CardHeader>
            <Image
              // @ts-ignore
              src={asset.image_url}
              // @ts-ignore
              alt={asset.name}
              width={40}
              height={40}
            />
            {/* @ts-ignore */}
            <h2 className="text-xl font-bold">{asset.name}</h2>
          </CardHeader>
          <CardFooter>
            <Button
              className="bg-indigo-600"
              // @ts-ignore
              onClick={() => router.push(`/app/earn/${asset.symbol}`)}
            >
              Provide Liquidity
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Earn;
