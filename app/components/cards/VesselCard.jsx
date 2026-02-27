"use client";

export default function VesselCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg px-4 pb-4 bg-gray-50">
        <h3 className="pb-2 border-b font-bold">
          Vessel Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-3 text-sm">
          <Field label="ID" value={person?.ID} />
          <Field label="DOC SR NO" value={person?.DOC_SRNO} />
          <Field label="VESSEL NAME" value={person?.VESSEL_NAME} />
          <Field label="IMO NUMBER" value={person?.IMO} />
          <Field label="SOURCE" value={person?.SOURCE} />
        </div>
      </div>

      {/* ================= SANCTIONS INFORMATION ================= */}
      <DividerTitle title="SANCTIONS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <LinkField label="EU JOURNAL LINK" value={person?.EU_JOURNAL_LINK} />
        <Field label="DATE OF APPLICATION" value={person?.DATE_OF_APPLICATION} />
      </div>

      {/* ================= METADATA ================= */}
      <DividerTitle title="METADATA" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="INSERTED ON" value={person?.INSERTED_ON} />
        <Field label="UPDATED ON" value={person?.UPDATED_ON} />
      </div>

    </div>
  );
}

/* ================= UI HELPERS ================= */

function DividerTitle({ title }) {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="flex-1 h-[1px] bg-blue-200"></div>
      <h3 className="text-xs font-bold text-blue-500 tracking-wide">
        {title}
      </h3>
      <div className="flex-1 h-[1px] bg-blue-200"></div>
    </div>
  );
}

/* 🔥 Field always shows — even when null */
function Field({ label, value }) {

  let displayValue = value;

  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "[NULL]"
  ) {
    displayValue = "NULL";
  }

  return (
    <div>
      <span className="text-gray-400 text-xs uppercase">
        {label} :
      </span>

      <div className="text-gray-800 font-bold break-words">
        {String(displayValue)}
      </div>
    </div>
  );
}

/* ⭐ Special field for clickable links */
function LinkField({ label, value }) {

  let displayValue = value;

  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "[NULL]"
  ) {
    displayValue = "NULL";
  }

  return (
    <div>
      <span className="text-gray-400 text-xs uppercase">
        {label} :
      </span>

      {displayValue === "NULL" ? (
        <div className="text-gray-800 font-bold">NULL</div>
      ) : (
        <a
          href={displayValue}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-bold break-all hover:underline"
        >
          {displayValue}
        </a>
      )}
    </div>
  );
}