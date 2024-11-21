"use server";

export async function sendSupportMessage(prevState: any, data: FormData) {
  const formData = Object.fromEntries(data);

  // Tu możesz dodać logikę np. wysłania do bazy danych lub innego API
  console.log("Form data submitted:");
  console.log(formData);

  // Zwróć status, który będzie widoczny w UI
  return { success: true, message: "Wiadomość została wysłana!" };
}
