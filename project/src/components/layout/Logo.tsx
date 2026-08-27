import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="Terra & Thread home">
      <span className="flex h-9 w-9 items-center justify-center rounded-btn bg-accent text-white transition-transform group-hover:scale-105">
        <Leaf size={20} strokeWidth={1.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-ink-primary">
          Terra &amp; Thread
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-secondary">
          Handmade Home Decor
        </span>
      </span>
    </Link>
  );
}

export { Logo };
