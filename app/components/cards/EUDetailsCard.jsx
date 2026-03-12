"use client";

export default function EUDetailsCard({ person }) {
  const hasValue = (v) =>
    v !== undefined &&
    v !== null &&
    v !== "" &&
    v !== "[NULL]";

  return (
    <div className="space-y-6">

      {/* ================= ENTITY OVERVIEW ================= */}
      {(hasValue(person?.ID) ||
        hasValue(person?.EU_ID) ||
        hasValue(person?.SOURCE_) ||
        hasValue(person?.COMPANY_NAME)) && (

        <div className="border  rounded pt-4 pb-4 bg-white border-gray-300 shadow-lg">
          <h3 className="pl-5 pb-3 border-b font-bold">Entity Overview</h3>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-3 pl-5 pr-5 text-sm">
            <Field label="ID" value={person?.ID} />
            <Field label="EU ID" value={person?.EU_ID} />
            <Field label="SOURCE" value={person?.SOURCE_} />

            <Field
              label="COMPANY NAME"
              value={person?.COMPANY_NAME}
              className="col-span-2 max-h-64 overflow-y-auto"
            />
          </div>
        </div>
      )}

      <div className="bg-white p-5 rounded border border-gray-300 shadow-lg">

        {/* ================= PERSONAL INFORMATION ================= */}
        {(hasValue(person?.BIRTH_INFORMATION) ||
          hasValue(person?.CITIZENSHIP_INFORMATION)) && (
          <>
            <DividerTitle title="PERSONAL INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field label="BIRTH INFORMATION" value={person?.BIRTH_INFORMATION} />
              <Field label="CITIZENSHIP INFORMATION" value={person?.CITIZENSHIP_INFORMATION} />
            </div>
          </>
        )}

        {/* ================= NAMES & ALIASES ================= */}
        {hasValue(person?.IDENTITY_INFORMATION) && (
          <>
            <DividerTitle title="NAMES & ALIASES" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="IDENTITY INFORMATION"
                value={person?.IDENTITY_INFORMATION}
                className="col-span-2 max-h-64 overflow-y-auto"
              />
            </div>
          </>
        )}

        {/* ================= IDENTITY DOCUMENTS ================= */}
        {hasValue(person?.IDENTIFICATION_DOCU_INFO) && (
          <>
            <DividerTitle title="IDENTITY DOCUMENTS" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="IDENTIFICATION DOCUMENT INFO"
                value={person?.IDENTIFICATION_DOCU_INFO}
                className="col-span-2 max-h-64 overflow-y-auto"
              />
            </div>
          </>
        )}

        {/* ================= ADDRESS INFORMATION ================= */}
        {hasValue(person?.CONTACT_INFORMATION) && (
          <>
            <DividerTitle title="ADDRESS INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="CONTACT INFORMATION"
                value={person?.CONTACT_INFORMATION}
                className="col-span-2 max-h-64 overflow-y-auto"
              />
            </div>
          </>
        )}

        {/* ================= SANCTIONS INFORMATION ================= */}
        {(hasValue(person?.LEGAL_BASIS) ||
          hasValue(person?.PROGRAMME)) && (
          <>
            <DividerTitle title="SANCTIONS INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field label="LEGAL BASIS" value={person?.LEGAL_BASIS} />
              <Field label="PROGRAMME" value={person?.PROGRAMME} />
              <Field label="INSERTED ON" value={person?.INSERTED_ON} />
              <Field label="UPDATED ON" value={person?.UPDATED_ON} />
            </div>
          </>
        )}

        {/* ================= OTHER INFORMATION ================= */}
        {hasValue(person?.REMARK) && (
          <>
            <DividerTitle title="OTHER INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="REMARK"
                value={person?.REMARK}
                className="col-span-2 max-h-64 overflow-y-auto"
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