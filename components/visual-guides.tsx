import Image from "next/image";

type VisualGuide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  caption: string;
};

const directAnswerGuides: Record<string, VisualGuide> = {
  "przed-i-po": {
    src: "/images/diagrams/before-after-standard.svg",
    alt: "Dwa identyczne kadry pokazujące standard uczciwego porównania zdjęć przed i po",
    eyebrow: "Standard materiału",
    title: "Porównanie ma sens tylko w tych samych warunkach",
    caption: "To schemat edukacyjny, nie przypadek pacjenta. Prawdziwe materiały pojawią się dopiero po potwierdzeniu zgody, zakresu leczenia i dat wykonania zdjęć."
  }
};

const sectionGuides: Record<string, Record<string, VisualGuide>> = {
  koszt: {
    "Co powinno znaleźć się w wycenie": {
      src: "/images/diagrams/cost-scope.svg",
      alt: "Schemat czterech elementów pełnego kosztu: leczenia, materiałów, podróży i opieki",
      eyebrow: "Pełny zakres",
      title: "Cena zabiegu to tylko część całkowitego kosztu",
      caption: "Porównuj na piśmie zakres kliniczny, materiały, etapy podróży oraz opiekę po leczeniu."
    }
  },
  implanty: {
    "Jak planuje się leczenie implantologiczne?": {
      src: "/images/diagrams/implant-plan.svg",
      alt: "Cztery etapy planowania implantu od dokumentacji do odbudowy",
      eyebrow: "Kolejność ma znaczenie",
      title: "Dokumentacja, kwalifikacja, leczenie i odbudowa",
      caption: "Schemat porządkuje proces, ale nie określa liczby wizyt ani nie kwalifikuje do zabiegu."
    }
  },
  licowki: {
    "Licówka, korona czy bonding": {
      src: "/images/diagrams/veneer-options.svg",
      alt: "Uproszczone porównanie zakresu licówki, korony i bondingu",
      eyebrow: "Różne wskazania",
      title: "Podobny cel estetyczny nie oznacza tej samej metody",
      caption: "Rysunek pokazuje jedynie różnicę zakresu. Wybór wymaga oceny szkliwa, zgryzu i stanu zęba."
    }
  },
  "cala-szczeka": {
    "Możliwe rozwiązania": {
      src: "/images/diagrams/full-arch-options.svg",
      alt: "Schemat możliwych kierunków leczenia pełnego łuku",
      eyebrow: "Najpierw diagnoza",
      title: "Pełna odbudowa może prowadzić różnymi drogami",
      caption: "Zachowanie własnych zębów, uzupełnienie braków i odbudowa pełnego łuku wymagają odmiennych planów."
    }
  },
  "all-on-4": {
    "Co wymaga indywidualnej oceny": {
      src: "/images/diagrams/all-on-4-plan.svg",
      alt: "Uproszczony schemat pełnego łuku opartego na czterech punktach podparcia",
      eyebrow: "Koncepcja, nie pakiet",
      title: "Liczba implantów wynika z kwalifikacji i planu protetycznego",
      caption: "Schemat nie przedstawia anatomii konkretnego pacjenta ani nie potwierdza możliwości wykonania leczenia."
    }
  },
  antalya: {
    "Przed wyjazdem": {
      src: "/images/diagrams/antalya-journey.svg",
      alt: "Trzy etapy wyjazdu: przygotowanie, leczenie na miejscu i opieka po powrocie",
      eyebrow: "Ciągłość opieki",
      title: "Wyjazd obejmuje więcej niż czas spędzony w klinice",
      caption: "Przygotowanie, harmonogram na miejscu i opieka po powrocie powinny być ustalone przed wyjazdem."
    }
  },
  opinie: {
    "Na co zwrócić uwagę w opinii": {
      src: "/images/diagrams/review-check.svg",
      alt: "Lupa i znacznik weryfikacji nad kartą opinii",
      eyebrow: "Sprawdź kontekst",
      title: "Opinia nie zastępuje informacji od lekarza",
      caption: "Weryfikuj źródło, datę, opis zakresu leczenia oraz ewentualną relację komercyjną."
    }
  },
  "jak-wybrac-klinike": {
    "Co sprawdzić przed wpłatą": {
      src: "/images/diagrams/clinic-check.svg",
      alt: "Klinika połączona z informacjami o lekarzu, planie i opiece po leczeniu",
      eyebrow: "Przed zaliczką",
      title: "Zweryfikuj podmiot, lekarza, plan i odpowiedzialność",
      caption: "Każdy z tych elementów powinien być możliwy do potwierdzenia i zachowania na piśmie."
    }
  }
};

function GuideFigure({ guide }: { guide: VisualGuide }) {
  return <figure className="visual-guide">
    <div className="visual-guide-copy">
      <p className="mini-label">{guide.eyebrow}</p>
      <h3>{guide.title}</h3>
      <figcaption>{guide.caption}</figcaption>
    </div>
    <Image src={guide.src} alt={guide.alt} width={640} height={360} sizes="(max-width: 760px) 100vw, 360px" />
  </figure>;
}

export function DirectAnswerVisual({ slug }: { slug: string }) {
  const guide = directAnswerGuides[slug];
  return guide ? <GuideFigure guide={guide} /> : null;
}

export function SectionVisual({ slug, sectionTitle }: { slug: string; sectionTitle: string }) {
  const guide = sectionGuides[slug]?.[sectionTitle];
  return guide ? <GuideFigure guide={guide} /> : null;
}
