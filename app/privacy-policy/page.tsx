import Link from "next/link";
import PageContainer from "../components/ui/pageContainer/PageContainer";

export default function Page() {
  return (
    <PageContainer className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        1. Administrator Danych
      </h2>
      <p className="mb-6 text-secondary">
        Administratorem Twoich danych osobowych jest xyz z siedzibą w xyz. W
        razie jakichkolwiek pytań dotyczących ochrony danych, prosimy o kontakt
        pod adresem e-mail: cinebasetest@gmail.com.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        2. Jakie Dane Gromadzimy?
      </h2>
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6">
        <li>
          <strong>Dane rejestracyjne:</strong> adres e-mail, hasło, imię,
          nazwisko.
        </li>
        <li>
          <strong>Dane dotyczące profilu:</strong> zdjęcie profilowe, biografia,
          ulubione filmy i seriale.
        </li>
        <li>
          <strong>Dane dotyczące aktywności:</strong> historia oglądania, oceny
          filmów, listy ulubionych.
        </li>
        <li>
          <strong>Dane techniczne:</strong> adres IP, rodzaj urządzenia, system
          operacyjny, przeglądarka internetowa.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        3. Cel Przetwarzania Danych
      </h2>
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6">
        <li>
          <strong>Świadczenie usług:</strong> umożliwienie rejestracji,
          logowania oraz korzystania z funkcjonalności aplikacji.
        </li>
        <li>
          <strong>Personalizacja treści:</strong> dostosowanie rekomendacji
          filmów i seriali do Twoich preferencji.
        </li>
        <li>
          <strong>Komunikacja:</strong> informowanie o nowościach,
          aktualizacjach i promocjach.
        </li>
        <li>
          <strong>Bezpieczeństwo:</strong> zapobieganie nadużyciom, ochrona kont
          użytkowników.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        4. Podstawa Prawna Przetwarzania Danych
      </h2>
      <p className="mb-6 text-secondary">Dane przetwarzane są na podstawie:</p>
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6">
        <li>Twojej zgody (art. 6 ust. 1 lit. a RODO);</li>
        <li>wykonania umowy (art. 6 ust. 1 lit. b RODO);</li>
        <li>obowiązków prawnych (art. 6 ust. 1 lit. c RODO);</li>
        <li>
          uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        5. Udostępnianie Danych
      </h2>
      <p className="mb-6 text-secondary">Twoje dane mogą być udostępniane:</p>
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6">
        <li>
          Podmiotom przetwarzającym dane w naszym imieniu (np. dostawcy usług
          hostingowych, narzędzi analitycznych).
        </li>
        <li>
          Organom publicznym, jeśli wymagają tego obowiązujące przepisy prawa.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        6. Przechowywanie Danych
      </h2>
      <p className="mb-6 text-secondary">
        Dane będą przechowywane tak długo, jak jest to konieczne do realizacji
        celów, dla których zostały zebrane, lub zgodnie z wymaganiami prawnymi.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        7. Twoje Prawa
      </h2>
      <p className="mb-6 text-secondary">Masz prawo do:</p>
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6">
        <li>Dostępu do swoich danych oraz otrzymania ich kopii.</li>
        <li>Sprostowania danych, które są nieprawidłowe lub niekompletne.</li>
        <li>{'Usunięcia danych "prawo do bycia zapomnianym"'}.</li>
        <li>Ograniczenia przetwarzania danych.</li>
        <li>Przenoszenia danych.</li>
        <li>Wniesienia sprzeciwu wobec przetwarzania danych.</li>
        <li>Wycofania zgody na przetwarzanie danych w dowolnym momencie.</li>
        <li>
          Złożenia skargi do organu nadzorczego (Urzędu Ochrony Danych
          Osobowych).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        8. Bezpieczeństwo Danych
      </h2>
      <p className="mb-6 text-secondary">
        Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić
        Twoje dane przed nieuprawnionym dostępem, utratą, zniszczeniem czy
        ujawnieniem.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        9. Pliki Cookies
      </h2>
      <p className="mb-6 text-secondary">
        Nasza aplikacja wykorzystuje pliki cookies w celu:
      </p>
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6">
        <li>Zapewnienia prawidłowego działania aplikacji.</li>
        <li>Analizy statystyk i poprawy wydajności.</li>
        <li>Dostosowania treści do Twoich preferencji.</li>
      </ul>
      <p className="mb-6 text-secondary">
        Możesz zarządzać plikami cookies za pomocą ustawień swojej przeglądarki.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        10. Zmiany w Polityce Prywatności
      </h2>
      <p className="mb-6 text-secondary">
        Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce
        prywatności. O wszelkich zmianach poinformujemy Cię za pomocą aplikacji
        lub wiadomości e-mail.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">
        11. Kontakt
      </h2>
      <p className="mb-6 text-secondary">
        {`W razie pytań lub wątpliwości dotyczących naszej polityki prywatności
        prosimy o kontakt: `}
        <Link className=" text-blue-500" href={"/support"}>
          TUTAJ
        </Link>
      </p>

      <p className="text-secondary">
        Dziękujemy za zaufanie i życzymy miłego korzystania z CineBase!
      </p>
    </PageContainer>
  );
}
