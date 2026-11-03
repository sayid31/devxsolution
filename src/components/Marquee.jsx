// Pita teks berjalan ala TRIONN.
// Tema putih × biru (tema logo), bukan staycom — karena user menekankan
// warna putih/biru saja, serta judul tetap baca biasa.
export default function Marquee({ items, variant = 'solid', className = '' }) {
  const row = [...items, ...items];

  const styles =
    variant === 'outline'
      ? 'bg-white text-blue-700 border-y border-blue-100'
      : 'bg-blue-700 text-white';

  return (
    <div
      className={`overflow-hidden whitespace-nowrap py-4 ${styles} ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track inline-flex items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="font-display text-lg font-semibold tracking-wide sm:text-xl">
            {item} <span className="ml-8 opacity-70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
