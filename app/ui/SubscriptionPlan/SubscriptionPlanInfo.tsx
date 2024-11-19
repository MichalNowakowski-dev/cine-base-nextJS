import { plansData } from "@/app/lib/plansData";

import SubscriptionTable from "./SubscriptionPlanTable";
import SubscriptionPlanMobile from "./SubscriptionPlanMobile";

export default function SubscriptionPlanInfo() {
  return (
    <div className="flex flex-wrap gap-8 justify-between items-center mb-8">
      <header>
        <h2 className="mb-3 text-h2 ">
          Porównaj nasze plany i znajdź ten odpowiedni dla siebie
        </h2>
        <p className="text-sm text-secondary">
          CineBase oferuje trzy różne plany dostosowane do Twoich potrzeb:
          Basic, Standard i Premium. Porównaj funkcje każdego planu i wybierz
          ten, który jest dla Ciebie odpowiedni.
        </p>
      </header>
      <SubscriptionPlanMobile data={plansData} />
      <SubscriptionTable data={plansData} />
    </div>
  );
}
