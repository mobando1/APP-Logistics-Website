import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { countries, type Country } from "@client/lib/countries";

type Props = {
  value: string; // código de marcado, ej. "+57"
  onChange: (dial: string) => void;
};

export default function CountryCodeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIso, setSelectedIso] = useState(
    () =>
      (countries.find((c) => c.dial === value) ??
        countries.find((c) => c.iso === "co"))!.iso
  );
  const ref = useRef<HTMLDivElement>(null);

  const selected =
    countries.find((c) => c.iso === selectedIso) ?? countries[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso.includes(q)
    );
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const pick = (c: Country) => {
    setSelectedIso(c.iso);
    onChange(c.dial);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 border rounded-xl px-3 py-3 text-sm bg-white hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
      >
        <img
          src={`https://flagcdn.com/24x18/${selected.iso}.png`}
          alt={selected.name}
          className="w-5 h-auto rounded-sm"
        />
        <span className="text-foreground">{selected.dial}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-72 max-w-[80vw] bg-white border rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-muted rounded-lg">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar país o código..."
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
                >
                  <img
                    src={`https://flagcdn.com/24x18/${c.iso}.png`}
                    alt=""
                    className="w-5 h-auto rounded-sm shrink-0"
                  />
                  <span className="flex-1 text-foreground truncate">
                    {c.name}
                  </span>
                  <span className="text-muted-foreground">{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-sm text-muted-foreground text-center">
                Sin resultados
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
