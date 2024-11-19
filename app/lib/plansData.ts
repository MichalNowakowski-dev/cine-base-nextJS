import { SubscriptionPlanData } from "./types";

export const plansData: SubscriptionPlanData = {
  basic: {
    id: "basic",
    popular: false,
    name: "Podstawowy",
    description:
      "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści. Ograniczone reklamy",
    price: {
      monthly: 19.99,
      yearly: 199,
    },
    content: "Dostęp do szerokiego wyboru filmów i programów, w tym nowości.",
    devicesNumber: 1,
    trialPeriod: 7,
    cancelAllowed: "Tak",
    HDR: "Nie",
    DolbyAtmos: "Nie",
    adsFree: "Nie",
    offlineView: "Nie",
    familySharing: "Nie",
  },
  standard: {
    id: "standard",
    popular: true,
    name: "Standard",
    content:
      "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści.",
    description:
      "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści. Ograniczone reklamy",
    price: {
      monthly: 24.99,
      yearly: 249.99,
    },
    devicesNumber: 2,
    trialPeriod: 7,
    cancelAllowed: "Tak",
    HDR: "Tak",
    DolbyAtmos: "Tak",
    adsFree: "Tak",
    offlineView: "Tak, dla wybranych tytułów",
    familySharing: "Tak, do 5 członków rodziny",
  },
  premium: {
    id: "premium",
    popular: false,
    name: "Premium",
    content:
      "Dostęp do najszerszej oferty filmów i programów, w tym wszystkich nowości i opcji oglądania offline.",
    description:
      "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści. Ograniczone reklamy",
    price: {
      monthly: 29.99,
      yearly: 299.99,
    },
    devicesNumber: 3,
    trialPeriod: 7,
    cancelAllowed: "Tak",
    HDR: "Tak",
    DolbyAtmos: "Tak",
    adsFree: "Tak",
    offlineView: "Tak",
    familySharing: "Tak, do 7 członków rodziny",
  },
};
