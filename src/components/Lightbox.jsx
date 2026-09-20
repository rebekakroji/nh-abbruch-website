import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Lightbox({ items, index, onIndexChange, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];
  const count = items.length;

  const go = (delta) => onIndexChange((index + delta + count) % count);

  // Fokus setzen, Scrollen der Seite sperren, Fokus beim Schließen zurückgeben
  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab') {
        // Fokus im Dialog halten
        const focusable = dialogRef.current?.querySelectorAll('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Bildansicht: ${item.label}`}
      ref={dialogRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose}>
        <X size={24} aria-hidden="true" />
        <span className="visually-hidden">Schließen</span>
      </button>
      <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)}>
        <ChevronLeft size={28} aria-hidden="true" />
        <span className="visually-hidden">Vorheriges Bild</span>
      </button>
      <figure className="lightbox__figure">
        <img src={item.full} alt={item.alt} />
        <figcaption>
          {item.label} · {index + 1} / {count}
        </figcaption>
      </figure>
      <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)}>
        <ChevronRight size={28} aria-hidden="true" />
        <span className="visually-hidden">Nächstes Bild</span>
      </button>
    </div>
  );
}
