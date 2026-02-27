"use client";

export default function UNDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg px-4 pb-4 bg-gray-50">
        <h3 className="pb-2 border-b font-bold">
          Entity Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-3 text-sm">
          <Field label="TYPE" value={person?.TYPE_} />
          <Field label="ID" value={person?.ID} />
          <Field label="SOURCE" value={person?.SOURCE} />
          <Field label="NATIONALITY" value={person?.NATIONALITY} />
        </div>
      </div>

      {/* ================= IDENTITY INFORMATION ================= */}
      <DividerTitle title="IDENTITY INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="DATE OF BIRTH" value={person?.DOB} />
        <Field label="PLACE OF BIRTH" value={person?.POB} />
        <Field label="PASSPORT NUMBER" value={person?.PASSPORT_NO} />
        <Field label="NATIONAL ID" value={person?.NATIONAL_IDENTITY_NO} />
        <Field label="NAME ORIGINAL SCRIPT" value={person?.NAME_ORIGINAL_SCRIPT} />
      </div>

      {/* ================= NAMES & ALIASES ================= */}
      <DividerTitle title="NAMES & ALIASES" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="PRIMARY NAME" value={person?.NAME} />
        <Field label="GOOD QUALITY AKA" value={person?.GOOD_QUALITY_AKA} />
        <Field label="LOW QUALITY AKA" value={person?.LOW_QUALITY_AKA} />
        <Field label="AKA" value={person?.AKA} />
        <Field label="FKA" value={person?.FKA} />
      </div>

      {/* ================= ROLE / DESIGNATION ================= */}
      <DividerTitle title="ROLE / DESIGNATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="TITLE" value={person?.TITLE} />
        <Field label="DESIGNATION" value={person?.DESIGNATION} />
      </div>

      {/* ================= SANCTIONS ================= */}
      <DividerTitle title="SANCTIONS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="LISTED ON" value={person?.LISTED_ON} />
      </div>

      {/* ================= ADDRESS ================= */}
      <DividerTitle title="ADDRESS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="ADDRESS" value={person?.ADDRESS} />
      </div>

      {/* ================= OTHER INFO ================= */}
      <DividerTitle title="OTHER INFORMATION" />

      <div className="grid grid-cols-1 gap-y-4 text-sm">
        <Field label="DETAILS" value={person?.OTHER_INFORMATION} />
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

/* ================= UI HELPERS (SAME STYLE AS ALL CARDS) ================= */

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

function Field({ label, value }) {

  // ✅ ALWAYS SHOW FIELD — even when null
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

      <div className="text-gray-800 font-bold break-words whitespace-pre-line">
        {String(displayValue)}
      </div>
    </div>
  );
}