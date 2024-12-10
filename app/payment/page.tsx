import Link from "next/link";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const plans = [
  {
    name: "Basic",
    description: "Plan basic opis",
    id: 4,

    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_fZeg0A21I9erdEYeUU"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QUXUwE67REcLBPGX2exISYb"
        : "",
    price: 19,
    duration: "/month",
  },
  {
    name: "Basic",
    description: "Plan basic opis",
    id: 2,

    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_cN2cOobCibmz0SccMN"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QUXYlE67REcLBPGD8PRyvKX"
        : "",

    price: 199,
    duration: "/year",
  },
];

export default async function page() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const buttonClass =
    "text-center content-center hover:scale-105 transition-all duration-150  px-6 py-4 border-[#262626] border rounded-md";

  return (
    <PageContainer>
      <ul>
        {plans.map((plan) => (
          <li
            key={plan.id}
            className="p-4 bg-backgroundLight border  border-[#262626] rounded-md basis-1/3"
          >
            <header className="flex flex-wrap gap-4 mb-5">
              <h3 className="text-h3">{plan.name}</h3>
              <p>{plan.description}</p>
              <h3 className="text-h3 w-full">
                <span>{plan.price}zł</span>
                <span className="text-sm text-secondary">{plan.duration}</span>
              </h3>
            </header>
            <div className="flex justify-between gap-3">
              <Link
                href={plan.link + "?prefilled_email=" + session?.user?.email}
                className={`${buttonClass} bg-primary`}
              >
                Wybierz Plan
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
