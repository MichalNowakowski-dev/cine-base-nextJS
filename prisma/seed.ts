import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      id: 1,
      name: "Podstawowy",
      description:
        "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści. Ograniczone reklamy",
      monthlyPrice: 19.99,
      yearlyPrice: 199,
      monthlyPaymentLink: "https://buy.stripe.com/test_fZeg0A21I9erdEYeUU",
      yearlyPaymentLink: "https://buy.stripe.com/test_cN2cOobCibmz0SccMN",
      trialMonthlyPaymentLink: "https://buy.stripe.com/test_00g29K6hY9er1WgaEO",
      trialYearlyPaymentLink: "https://buy.stripe.com/test_6oE4hS49Q1LZcAU14f",
      monthlyPriceId: "price_1QUXUwE67REcLBPGX2exISYb",
      yearlyPriceId: "price_1QUXYlE67REcLBPGD8PRyvKX",
      content: "Dostęp do szerokiego wyboru filmów i programów, w tym nowości.",
      devicesNumber: 1,
      trialPeriod: 30,
      cancelAllowed: true,
      HDR: false,
      DolbyAtmos: false,
      adsFree: false,
      offlineView: false,
      familySharing: false,
      popular: false,
    },
    {
      id: 2,
      name: "Standard",
      description:
        "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści. Ograniczone reklamy",
      monthlyPrice: 24.99,
      yearlyPrice: 249,
      monthlyPaymentLink: "https://buy.stripe.com/test_8wMaGgeOu9erfN69AD",
      yearlyPaymentLink: "https://buy.stripe.com/test_4gw29K0XEgGTeJ27su",
      trialMonthlyPaymentLink: "https://buy.stripe.com/test_eVag0A6hYeyLasM8wE",
      trialYearlyPaymentLink: "https://buy.stripe.com/test_aEU29K6hYbmzbwQ6ox",
      monthlyPriceId: "price_1QUYLnE67REcLBPGGugXhWLN",
      yearlyPriceId: "price_1QUYO1E67REcLBPGwJe9eQAJ",
      content:
        "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści.",
      devicesNumber: 2,
      trialPeriod: 30,
      cancelAllowed: true,
      HDR: true,
      DolbyAtmos: false,
      adsFree: true,
      offlineView: false,
      familySharing: true,
      popular: true,
    },
    {
      id: 3,
      name: "Premium",
      description:
        "Dostęp do najszerszej oferty filmów i programów, w tym wszystkich nowości i opcji oglądania offline. Ograniczone reklamy",
      monthlyPrice: 29.99,
      yearlyPrice: 299,
      monthlyPaymentLink: "https://buy.stripe.com/test_bIYcOo7m2bmz30kfZ2",
      yearlyPaymentLink: "https://buy.stripe.com/test_eVa15Gaye76j7gAfZ3",
      trialMonthlyPaymentLink: "https://buy.stripe.com/test_cN23dO8q6aivgRacMS",
      trialYearlyPaymentLink: "https://buy.stripe.com/test_5kA01Caye8angRa5kr",
      monthlyPriceId: "price_1QUYNGE67REcLBPGjaYfw4JT",
      yearlyPriceId: "price_1QUYT4E67REcLBPGzpGNDC6Z",
      content:
        "Dostęp do najszerszej oferty filmów i programów, w tym wszystkich nowości i opcji oglądania offline.",
      devicesNumber: 3,
      trialPeriod: 30,
      cancelAllowed: true,
      HDR: true,
      DolbyAtmos: true,
      adsFree: true,
      offlineView: true,
      familySharing: true,
      popular: false,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.create({
      data: plan,
    });
  }

  console.log("Dane zostały załadowane do bazy");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
