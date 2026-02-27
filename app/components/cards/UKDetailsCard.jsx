"use client";

export default function UKDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg px-4 pb-4 bg-gray-50">
        <h3 className="pb-2 border-b font-bold">
          Entity Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-3 text-sm">

          <Field label="UID" value={person?.ID} />

          <Badge label="TYPE" value={person?.TYPE_} />

          <Field label="SOURCE" value={person?.SOURCE_} />
          <Field label="NATIONALITY" value={person?.NATIONALITY} />
          <Field label="DOB" value={person?.DOB} />
          <Field label="POB" value={person?.POB} />

          <Field
            label="NAME"
            value={person?.NAME}
            className="col-span-2"
          />
        </div>
      </div>

      {/* ================= SANCTIONS DETAILS ================= */}
      <DividerTitle title="SANCTIONS DETAILS" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="UK SANCTIONS LIST" value={person?.UK_SANCTIONS_LIST} />
        <Field label="GROUP ID" value={person?.GROUP_ID} />
        <Field label="LISTED ON" value={person?.LISTED_ON} />
        <Field label="LAST UPDATED" value={person?.LAST_UPDATED} />
      </div>

      {/* ================= REGULATORY RESTRICTIONS ================= */}
      <DividerTitle title="REGULATORY RESTRICTIONS" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="TITLE" value={person?.TITLE} />
        <Field label="POSITION" value={person?.POSITION_} />
        <Field label="PASSPORT NUMBER" value={person?.PASSPORT_NUMBER} />
        <Field label="NAME NON LATIN SCRIPT" value={person?.NAME_NON_LATIN_SCRIPT} />
      </div>

      {/* ================= OTHER INFORMATION ================= */}
      <DividerTitle title="OTHER INFORMATION / NARRATIVE" />

      <div className="grid grid-cols-1 gap-y-4 text-sm">
        <Field label="GOOD QUALITY AKA" value={person?.GOOD_QUALITY_AKA} />
        <Field label="LOW QUALITY AKA" value={person?.LOW_QUALITY_AKA} />
        <Field label="AKA" value={person?.AKA} />
        <Field label="ADDRESS" value={person?.ADDRESS} />
        <Field label="OTHER INFORMATION" value={person?.OTHER_INFORMATION} />
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

/* ================= SAME UI HELPERS AS OTHER CARDS ================= */

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

/* ✅ Badge style like US card */
function Badge({ label, value }) {

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

      <div className="inline-block px-2 py-1 font-bold text-xs rounded bg-blue-100 text-blue-600">
        {displayValue}
      </div>
    </div>
  );
}

/* ✅ Universal Field (same across all cards) */
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
    <div className={className}>
      <span className="text-gray-400 text-xs uppercase">
        {label} :
      </span>

      <div className="text-gray-800 font-bold break-words whitespace-pre-line">
        {String(displayValue)}
      </div>
    </div>
  );
}