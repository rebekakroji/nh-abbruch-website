import {
  Hammer,
  Wrench,
  Building2,
  Grid2x2,
  Layers,
  CookingPot,
  ClipboardCheck,
  DoorOpen,
  Trash2,
  House,
  LayoutPanelTop,
  LayoutList,
  Fence,
} from 'lucide-react';

export const SERVICES = [
  {
    title: 'Innenabbruch',
    icon: Hammer,
    text: 'Kontrollierter Abbruch im Innenbereich – von Einbauten und Verkleidungen bis zu Wänden, sauber und strukturiert ausgeführt.',
  },
  {
    title: 'Demontage',
    icon: Wrench,
    text: 'Sorgfältiger Ausbau von Türen, Einbauten und weiteren Bauteilen als Vorbereitung für Umbau oder Neugestaltung.',
  },
  {
    title: 'Rückbau',
    icon: Building2,
    text: 'Rückbau von Räumen und Bauteilen – als Grundlage für Sanierung, Umbau oder Neuausbau.',
  },
  {
    title: 'Fliesen entfernen',
    icon: Grid2x2,
    text: 'Entfernen von Wand- und Bodenfliesen in Bad, Küche und Flur – bereit für den neuen Belag.',
  },
  {
    title: 'Bodenbeläge entfernen',
    icon: Layers,
    text: 'Entfernen von Teppich, Laminat, PVC, Parkett und Kleberresten, damit ein sauberer Untergrund bleibt.',
  },
  {
    title: 'Küchenabbau',
    icon: CookingPot,
    text: 'Abbau von Einbauküchen mit Schränken und Arbeitsplatten – zügig und ordentlich.',
  },
  {
    title: 'Renovierungsvorbereitung',
    icon: ClipboardCheck,
    text: 'Wir schaffen die Ausgangslage für Ihre Handwerker: Räume beräumen, Altes entfernen, Flächen freimachen.',
  },
  {
    title: 'Trennwände entfernen',
    icon: DoorOpen,
    text: 'Entfernen von Trennwänden für offenere Grundrisse und neue Raumaufteilungen.',
  },
  {
    title: 'Entrümpelung',
    icon: Trash2,
    text: 'Räumung von Wohnungen, Kellern und Dachböden – schnell und zuverlässig.',
  },
  {
    title: 'Haushaltsauflösung',
    icon: House,
    text: 'Komplette Auflösung von Haushalten – organisiert und mit Rücksicht auf Ihre Situation.',
  },
  {
    title: 'Trockenbau',
    icon: LayoutPanelTop,
    text: 'Trockenbauwände und -decken für neue Raumaufteilungen – als Vorbereitung für den weiteren Innenausbau.',
  },
  {
    title: 'Bodenleger',
    icon: LayoutList,
    text: 'Fachgerechte Verlegung neuer Bodenbeläge wie Laminat oder Parkett nach Abschluss der Vorarbeiten.',
  },
  {
    title: 'Pflasterarbeiten & GaLaBau',
    icon: Fence,
    text: 'Pflasterarbeiten sowie Garten- und Landschaftsbau für Wege, Einfahrten und Außenanlagen.',
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), 'Sonstiges'];
