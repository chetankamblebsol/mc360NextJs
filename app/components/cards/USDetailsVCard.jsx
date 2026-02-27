"use client";

export default function USDetailsCard({ person }) {

  /* ================= SAFE IDS ================= */
  const rawIds = person?.IDLIST;
  const ids = safeParseIdList(rawIds);

  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg px-4 pb-4 bg-gray-50">

     

        <h3 className="pb-2 border-b font-bold">
          Entity Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-3 text-sm">
          <Field label="A ID" value={person?.A_ID} />
          <Field label="ID" value={person?.ID} />
          <Badge label="SDN TYPE" value={person?.SDNTYPE} />
        </div>
      </div>

      {/* ================= NAME INFORMATION ================= */}
      <DividerTitle title="NAME INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="FIRST NAME" value={person?.FIRSTNAME} />
        <Field label="LAST NAME" value={person?.LASTNAME} />
        <Field label="ALIASES (AKA LIST)" value={person?.AKALIST} />
      </div>

      {/* ================= IDENTITY INFORMATION ================= */}
      <DividerTitle title="IDENTITY INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="DATE OF BIRTH LIST" value={person?.DATEOFBIRTHLIST} />
        <Field label="PLACE OF BIRTH LIST" value={person?.PLACEOFBIRTHLIST} />
      </div>

      {/* ================= ID LIST (SAFE RENDER) ================= */}
      <DividerTitle title="ID LIST" />

      <div className="space-y-3 text-sm">

        {/* ✅ If parsed correctly */}
        {Array.isArray(ids) && ids.length > 0 && ids.map((item, i) => (
          <div key={i}>
            <span className="text-gray-400 font-bold text-xs">
              {item.idType || "ID"}
            </span>

            <div className="text-gray-800 font-bold break-words">
              {item.idNumber}
            </div>
          </div>
        ))}

        {/* ✅ FALLBACK — show raw data if parsing failed */}
        {(!Array.isArray(ids) || ids.length === 0) && rawIds && (
          <div className="text-gray-800 font-bold break-words">
            {String(rawIds)}
          </div>
        )}

      </div>

      {/* ================= ADDRESS ================= */}
      <DividerTitle title="ADDRESS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="ADDRESS LIST" value={person?.ADDRESSLIST} />
      </div>

      {/* ================= SANCTIONS ================= */}
      <DividerTitle title="SANCTIONS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="PROGRAM LIST" value={person?.PROGRAM_LIST} />
        <Field label="REMARKS" value={person?.REMARKS} />
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

function Field({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <span className="text-gray-400 text-xs">{label} :</span>
      <div className="text-gray-800 font-bold break-words">{value}</div>
    </div>
  );
}

function Badge({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <span className="text-gray-400 text-xs">{label} :</span>
      <div className="inline-block px-2 py-1 font-bold text-xs rounded bg-blue-100 text-blue-600">
        {value}
      </div>
    </div>
  );
}

/* ================= SAFE PARSER WITH TRY/CATCH ================= */

function safeParseIdList(data) {
  try {
    if (!data) return [];

    if (Array.isArray(data)) return data;

    if (typeof data !== "string") return [];

    return data
      .split(";")
      .map(v => v.trim())
      .filter(Boolean)
      .map(entry => {
        const typeMatch = entry.match(/idType:\s*(.*?),\s*idNumber:/i);
        const numberMatch = entry.match(/idNumber:\s*(.*?)(?:,\s*idCountry:|$)/i);

        return {
          idType: typeMatch ? typeMatch[1].trim() : "",
          idNumber: numberMatch ? numberMatch[1].trim() : entry
        };
      });

  } catch (err) {
    console.error("IDLIST parse failed:", err);
    return []; // never break UI
  }
}