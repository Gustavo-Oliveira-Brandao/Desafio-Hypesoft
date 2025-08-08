"use client";
import { ReactElement } from "react";
import { useGetProductsByCategoryCountQuery } from "@/hooks/queries/products/useGetProductsByCategoryCountQuery";
import { useSession } from "next-auth/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  products: {
    label: "Produtos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const ProductsByCategoryChart = (): ReactElement => {
  const { data: session } = useSession();
  const {
    data: productsByCategory,
    isLoading,
    isError,
  } = useGetProductsByCategoryCountQuery(session?.accessToken);

  if (isLoading) {
    return <div className="p-4 text-center">Carregando gráfico...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Erro ao carregar os dados do gráfico.
      </div>
    );
  }

  const chartData = productsByCategory
    ? Object.entries(productsByCategory)
        .map(([categoryName, productsCount]) => ({
          name: categoryName,
          products: productsCount,
        }))
        .sort((a, b) => b.products - a.products)
        .slice(0, 5)
    : [];

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] max-h-[250px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            value.slice(0, 10) + (value.length > 10 ? "..." : "")
          }
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          barSize={50}
          dataKey="products"
          fill="var(--color-products)"
          radius={8}
        />
      </BarChart>
    </ChartContainer>
  );
};
