export default function GenericCard({ layout, person, renderValue }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
      {layout.map(key =>
        person[key] !== undefined && (
          <div key={key} className="border-b pb-3">
            <div className="text-[11px] tracking-wide text-gray-400 uppercase mb-1">
              {key}
            </div>
            <div className="text-sm text-gray-800 break-words">
              {renderValue(person[key])}
            </div>
          </div>
        )
      )}
    </div>
  );
}