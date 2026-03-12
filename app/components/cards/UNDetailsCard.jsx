"use client";

export default function UNDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border border-gray-300 rounded pt-4 pb-4 bg-white shadow-lg">
        <h3 className="pl-5 pb-3 border-b font-bold">
          Entity Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-3 pl-5 pr-5 text-sm">
          <Field label="TYPE" value={person?.TYPE_} />
          <Field label="ID" value={person?.ID} />
          <Field label="SOURCE" value={person?.SOURCE} />
          <Field label="AUTO ID" value={person?.AUTO_ID} />
        </div>
      </div>

      <div className="bg-white p-5 rounded border border-gray-300 shadow-lg">

        {/* ================= PERSONAL INFORMATION ================= */}
        <DividerTitle title="PERSONAL INFORMATION" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
          <Field label="DATE OF BIRTH" value={person?.DOB} />
          <Field label="PLACE OF BIRTH" value={person?.POB} />
          <Field label="NATIONALITY" value={person?.NATIONALITY} />
          <Field label="TITLE" value={person?.TITLE} />
          <Field label="DESIGNATION" value={person?.DESIGNATION} />
        </div>

        {/* ================= IDENTITY INFORMATION ================= */}
        <DividerTitle title="IDENTITY INFORMATION" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
          <Field label="PASSPORT NUMBER" value={person?.PASSPORT_NO} />
          <Field label="NATIONAL ID" value={person?.NATIONAL_IDENTITY_NO} />
          <Field
            label="NAME ORIGINAL SCRIPT"
            value={person?.NAME_ORIGINAL_SCRIPT}
            className="col-span-2"
          />
        </div>

        {/* ================= NAMES & ALIASES ================= */}
        <DividerTitle title="NAMES & ALIASES" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
          <Field label="PRIMARY NAME" value={person?.NAME} />
          <Field label="GOOD QUALITY AKA" value={person?.GOOD_QUALITY_AKA} />
          <Field label="LOW QUALITY AKA" value={person?.LOW_QUALITY_AKA} />
          <Field label="AKA" value={person?.AKA} />
          <Field label="FKA" value={person?.FKA} />
        </div>

        {/* ================= SANCTIONS ================= */}
        <DividerTitle title="SANCTIONS INFORMATION" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
          <Field label="LISTED ON" value={person?.LISTED_ON} />
        </div>

        {/* ================= ADDRESS ================= */}
        <DividerTitle title="ADDRESS INFORMATION" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
          <Field label="ADDRESS" value={person?.ADDRESS} className="col-span-2" />
        </div>

        {/* ================= OTHER INFO ================= */}
        <DividerTitle title="OTHER INFORMATION" />

        <div className="grid grid-cols-1 gap-y-5 text-sm">
          <Field
            label="DETAILS"
            value={person?.OTHER_INFORMATION}
          />
        </div>

        {/* ================= METADATA ================= */}
        <DividerTitle title="METADATA" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
          <Field label="INSERTED ON" value={person?.INSERTED_ON} />
          <Field label="UPDATED ON" value={person?.UPDATED_ON} />
        </div>

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

function Field({ label, value, className = "" }) {
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
    <div className={`${className}`}>
      <span className="text-gray-400 text-xs uppercase block mb-1">
        {label}
      </span>

      <div className="text-gray-800 font-bold break-words whitespace-pre-line leading-relaxed">
        {String(displayValue)}
      </div>
    </div>
  );
}