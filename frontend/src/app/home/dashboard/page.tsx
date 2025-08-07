import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactElement } from "react";

const DashboardPage = (): ReactElement => {
  return (
    <div>
      <div className="flex w-full">
        <Card className="bg-zinc-900">
          <CardHeader>
            <CardTitle>Total de produtos cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Conteudo</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
