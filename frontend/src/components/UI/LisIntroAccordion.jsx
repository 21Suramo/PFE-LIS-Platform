import * as React from "react";
import { ChevronDown } from "lucide-react";

function AccordionItem({ value, open, onToggle, title, children }) {
  return (
    <div className="py-3">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left font-semibold text-white text-lg sm:text-xl hover:text-accent transition-colors"
        aria-expanded={open}>
        {title}
        <ChevronDown
          className={`h-5 w-5 text-accent transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="mt-2 text-sm sm:text-base text-bgLight leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function LisIntroAccordion() {
  const [openItem, setOpenItem] = React.useState(null);

  const toggleItem = (value) => setOpenItem(openItem === value ? null : value);

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-xl px-6 py-4 text-left">
      <AccordionItem
        value="about"
        open={openItem === "about"}
        onToggle={() => toggleItem("about")}
        title="À propos du LIS">
        Explorez les projets, publications et événements du Laboratoire
        d’Informatique et Systèmes. Une plateforme académique pensée pour les
        chercheurs, doctorants et étudiants.
      </AccordionItem>
      <AccordionItem
        value="objectives"
        open={openItem === "objectives"}
        onToggle={() => toggleItem("objectives")}
        title="Nos objectifs">
        Promouvoir l'innovation scientifique, encourager la collaboration
        interdisciplinaire et offrir un espace d'échange entre les membres du
        laboratoire.
      </AccordionItem>
      <AccordionItem
        value="users"
        open={openItem === "users"}
        onToggle={() => toggleItem("users")}
        title="Qui peut utiliser la plateforme ?">
        Les membres du LIS, les doctorants, les chercheurs externes et les
        partenaires académiques ou industriels.
      </AccordionItem>
    </div>
  );
}
