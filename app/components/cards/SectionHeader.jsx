export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 my-6">
      
      {/* LEFT LINE */}
      <div className="flex-1 h-[1px] bg-blue-300" />

      {/* TITLE */}
      <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wide whitespace-nowrap">
        {title}
      </h3>

      {/* RIGHT LINE */}
      <div className="flex-1 h-[1px] bg-blue-300" />

    </div>
  );
}