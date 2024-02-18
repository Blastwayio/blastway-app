import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LendingTabs = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList className="flex justify-between">
        <TabsTrigger className="w-1/2 text-white" value="account">
          Deposits
        </TabsTrigger>
        <TabsTrigger className="w-1/2 text-white" value="password">
          Borrows
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-2" value="account">
        Here is deposits section.
      </TabsContent>
      <TabsContent className="mt-2" value="password">
        Here is borrows section.
      </TabsContent>
    </Tabs>
  );
};

export default LendingTabs;
