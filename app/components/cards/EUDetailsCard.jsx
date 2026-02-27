"use client";

export default function EUDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg px-4 pb-4 bg-gray-50">
        <h3 className="pb-2 border-b font-bold">
          Entity Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-3 text-sm">
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

      {/* ================= LEGAL INFORMATION ================= */}
      <DividerTitle title="LEGAL INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="LEGAL BASIS" value={person?.LEGAL_BASIS} />
        <Field label="PROGRAMME" value={person?.PROGRAMME} />
        <Field label="REMARK" value={person?.REMARK} />
      </div>

      {/* ================= IDENTITY INFORMATION ================= */}
      <DividerTitle title="IDENTITY INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="IDENTITY INFORMATION" value={person?.IDENTITY_INFORMATION} />
        <Field label="IDENTIFICATION DOCUMENT INFO" value={person?.IDENTIFICATION_DOCU_INFO} />
      </div>

      {/* ================= BIRTH INFORMATION ================= */}
      <DividerTitle title="BIRTH INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="BIRTH INFORMATION" value={person?.BIRTH_INFORMATION} />
        <Field label="CITIZENSHIP INFORMATION" value={person?.CITIZENSHIP_INFORMATION} />
      </div>

      {/* ================= CONTACT INFORMATION ================= */}
      <DividerTitle title="CONTACT INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="CONTACT INFORMATION" value={person?.CONTACT_INFORMATION} />
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

function Field({ label, value, className = "" }) {

  // ✅ SHOW NULL INSTEAD OF HIDING
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