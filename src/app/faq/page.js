import React from 'react';

const FaqPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">FooFest FAQ</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">1. Hvad er FooFest?</h2>
            <p>FooFest er en årlig rockmusikfestival med et lineup af både etablerede og upcoming kunstnere fra hele verden. Det er en fejring af rockmusik i alle dens former og tilbyder en uforglemmelig oplevelse for fans af genren.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">2. Hvornår og hvor finder FooFest sted?</h2>
            <p>FooFest finder sted 365 dage om året, og er beliggende et sted i et parallelt univers. For detaljerede anvisninger og parkeringsinformation, prøv at google parallelle universer.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">3. Hvordan kan jeg købe billetter?</h2>
            <p>Billetter kan købes online via vores officielle hjemmeside <a href="#" className="text-blue-500 underline">her</a>. Vi tilbyder forskellige billetmuligheder herunder weekend-billetter og VIP-pakker.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">4. Hvad er de forskellige billettyper, og hvad inkluderer de?</h2>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Generel adgang:</strong> Adgang til alle scener og generelle festivalområder.</li>
              <li><strong>VIP-adgang:</strong> Inkluderer prioriteret indgang, adgang til VIP-lounger, eksklusive sektorer og mere.</li>
              <li><strong>Campingbilletter:</strong> Tilgængelige for dem, der ønsker at overnatte på stedet, med muligheder for grundlæggende camping og glamping.</li>
            </ul>
            <p>For flere detaljer, besøg vores <a href="#" className="text-blue-500 underline">Billetter</a> side.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. Kan jeg medbringe min egen mad og drikke?</h2>
            <p>Uden for mad og drikkevarer er ikke tilladt, men der vil være et bredt udvalg af madboder og drikkevaremuligheder tilgængelige inden for festivalområdet, herunder vegetariske, veganske og glutenfrie valgmuligheder.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">6. Er FooFest familievenlig?</h2>
            <p>FooFest er en begivenhed for alle aldre. Dog er festivalmiljøet rettet mod voksne, og nogle optrædener kan indeholde eksplicit indhold. Vi anbefaler forældreskøn for yngre deltagere. Børn under 12 år kan komme gratis med en voksen, der har billet.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">7. Hvad skal jeg medbringe til festivalen?</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Gyldig ID og din festivalbillet</li>
              <li>Behageligt tøj og fodtøj</li>
              <li>Solcreme og en hat</li>
              <li>Genopfyldelig vandflaske (tom ved indgangen)</li>
              <li>Kontanter og/eller kort til køb</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">8. Hvilke genstande er forbudt?</h2>
            <p>Af sikkerhedsmæssige årsager er følgende genstande ikke tilladt:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Ulovlige stoffer</li>
              <li>Våben af enhver art</li>
              <li>Professionelle kameraer og optageudstyr</li>
              <li>Store tasker eller rygsække</li>
              <li>Mad og drikkevarer</li>
              <li>Fyrværkeri eller eksplosiver</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
