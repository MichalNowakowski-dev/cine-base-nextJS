import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const SubscriptionCard = () => {
  return (
    <div className=" text-white ">
      <div className=" bg-backgroundDashboardCard  border-b border-white">
        <p className="text-sm uppercase text-black bg-white/70 rounded-tl-lg rounded-tr-lg pl-4">
          Bieżący plan
        </p>
        <div className="p-4 ">
          <h2 className=" text-h2 uppercase">Podstawowy</h2>
          <h3 className="text-h3">
            19,99zł<span className="text-secondary text-sm">/miesiąc</span>
          </h3>
        </div>
      </div>
      <div className="p-4 bg-backgroundDashboardCard  border-b border-white">
        <p className=" text-lg ">Zbliżające się płatności</p>
        <p className="text-lg">Brak zbliżających się płatności</p>
      </div>
      <div className="p-4 bg-backgroundDashboardCard  border-b border-white">
        <div className="flex justify-between w-full">
          <p className=" text-lg ">Zmień pakiet</p>
          <Link href={"/plans"}>
            <FaChevronRight size={20} />
          </Link>
        </div>
        <p className="text-lg">Podstawowy - miesięcznie</p>
      </div>
    </div>
  );
};

export default SubscriptionCard;
