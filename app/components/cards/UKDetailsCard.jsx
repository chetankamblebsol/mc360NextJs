"use client";

export default function UKDetailsCard({ person }) {
  const hasValue = (v) =>
    v !== undefined &&
    v !== null &&
    v !== "" &&
    v !== "[NULL]";

  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      {(hasValue(person?.ID) ||
        hasValue(person?.TYPE_) ||
        hasValue(person?.GROUP_ID) ||
        hasValue(person?.SOURCE_) ||
        hasValue(person?.NAME)) && (

        <div className="border  rounded pt-4 pb-4 bg-white border-gray-300 shadow-lg">
          <h3 className="pl-5 pb-3 border-b font-bold">
            Entity Overview
          </h3>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-3 pl-5 pr-5 text-sm">
            <Field label="UID" value={person?.ID} />
            <Badge label="TYPE" value={person?.TYPE_} />
            <Field label="GROUP ID" value={person?.GROUP_ID} />
            <Field label="SOURCE" value={person?.SOURCE_} />
          </div>
        </div>
      )}

      <div className="bg-white p-5 rounded border border-gray-300 shadow-lg">

        {/* ================= PERSONAL DETAILS ================= */}
        {(hasValue(person?.DOB) ||
          hasValue(person?.POB) ||
          hasValue(person?.POSITION_) ||
          hasValue(person?.PASSPORT_NUMBER)) && (
          <>
            <DividerTitle title="PERSONAL DETAILS" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field label="DOB" value={person?.DOB} />
              <Field label="POB" value={person?.POB} />
              <Field label="POSITION" value={person?.POSITION_} />
              <Field label="PASSPORT NUMBER" value={person?.PASSPORT_NUMBER} />
            </div>
          </>
        )}

        {/* ================= SANCTIONS DETAILS ================= */}
        {(hasValue(person?.NATIONALITY) ||
          hasValue(person?.UK_SANCTIONS_LIST) ||
          hasValue(person?.LISTED_ON) ||
          hasValue(person?.LAST_UPDATED) ||
          hasValue(person?.INSERTED_ON) ||
          hasValue(person?.UPDATED_ON)) && (
          <>
            <DividerTitle title="SANCTIONS DETAILS" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field label="NATIONALITY" value={person?.NATIONALITY} />
              <Field label="UK SANCTIONS LIST" value={person?.UK_SANCTIONS_LIST} />
              <Field label="LISTED ON" value={person?.LISTED_ON} />
              <Field label="LAST UPDATED" value={person?.LAST_UPDATED} />
              <Field label="INSERTED ON" value={person?.INSERTED_ON} />
              <Field label="UPDATED ON" value={person?.UPDATED_ON} />
            </div>
          </>
        )}

        {/* ================= NAME AND ALIASES ================= */}
        {(hasValue(person?.TITLE) ||
          hasValue(person?.NAME) ||
          hasValue(person?.NAME_NON_LATIN_SCRIPT)) && (
          <>
            <DividerTitle title="NAME AND ALIASES RESTRICTIONS" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field label="TITLE" value={person?.TITLE} />

              <Field
                label="NAME"
                value={person?.NAME}
                className="col-span-2"
              />

              <Field
                label="NAME NON LATIN SCRIPT"
                value={person?.NAME_NON_LATIN_SCRIPT}
              />
            </div>
          </>
        )}

        {/* ================= ADDRESS ================= */}
        {hasValue(person?.ADDRESS) && (
          <>
            <DividerTitle title="ADDRESS INFORMATION" />

            <div className="grid grid-cols-1 gap-y-5 text-sm">
              <Field
                label="ADDRESS"
                value={person?.ADDRESS}
                className="max-h-48 overflow-y-auto"
              />
            </div>
          </>
        )}

        {/* ================= OTHER INFORMATION ================= */}
        {(hasValue(person?.GOOD_QUALITY_AKA) ||
          hasValue(person?.LOW_QUALITY_AKA) ||
          hasValue(person?.AKA) ||
          hasValue(person?.OTHER_INFORMATION)) && (
          <>
            <DividerTitle title="OTHER INFORMATION / NARRATIVE" />

            <div className="grid grid-cols-1 gap-y-5 text-sm">
              <Field label="GOOD QUALITY AKA" value={person?.GOOD_QUALITY_AKA} />
              <Field label="LOW QUALITY AKA" value={person?.LOW_QUALITY_AKA} />
              <Field label="AKA" value={person?.AKA} />

              <Field
                label="OTHER INFORMATION"
                value={person?.OTHER_INFORMATION}
                className="max-h-48 overflow-y-auto"
              />
            </div>
          </>
        )}

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

/* ================= TYPE BADGE ================= */

function Badge({ label, value }) {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "[NULL]"
  ) {
    return null;
  }

  return (
    <div>
      <span className="text-gray-400 text-xs uppercase block mb-1">
        {label}
      </span>

      <div className="inline-block px-2 py-1 font-bold text-xs rounded bg-blue-100 text-blue-600">
        {value}
      </div>
    </div>
  );
}

/* ================= FIELD ================= */

function Field({ label, value, className = "" }) {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "[NULL]"
  ) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <span className="text-gray-400 text-xs uppercase block mb-1">
        {label}
      </span>

      <div className="text-gray-800 font-bold break-words whitespace-pre-line leading-relaxed">
        {String(value)}
      </div>
    </div>
  );
}