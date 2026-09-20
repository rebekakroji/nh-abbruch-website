import { logo } from '../data/images.js';
import { SITE } from '../data/site.js';

// Das Originallogo wird unverändert (nur ohne überflüssigen Weißraum) eingebunden.
export default function Logo({ className = '', priority = false }) {
  return (
    <img
      className={className}
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={`${SITE.name} – Logo`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
