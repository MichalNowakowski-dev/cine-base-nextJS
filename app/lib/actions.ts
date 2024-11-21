"use server";

export async function sendSupportMessage(prevState, data: FormData) {
  const firstName = data.get("firstName")?.toString() || "";
  const lastName = data.get("lastName")?.toString() || "";
  const email = data.get("email")?.toString() || "";
  const countryCode = data.get("countryCode")?.toString() || "+48";
  const phoneNumber = data.get("phoneNumber")?.toString() || "";
  const message = data.get("message")?.toString() || "";

  // Walidacja danych
  if (!firstName || !lastName || !email || !message) {
    return {
      success: false,
      message: "Wszystkie wymagane pola muszą być wypełnione.",
    };
  }

  // Tu możesz dodać logikę np. wysłania do bazy danych lub innego API
  console.log("Form data submitted:", {
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    message,
  });

  // Zwróć status, który będzie widoczny w UI
  return { success: true, message: "Wiadomość została wysłana!" };
}
