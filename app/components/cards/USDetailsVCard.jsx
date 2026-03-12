"use client";

export default function USDetailsVCard({ person }) {
  const rawIds = person?.IDLIST;
  const ids = safeParseIdList(rawIds);

  const hasValue = (v) =>
    v !== undefined &&
    v !== null &&
    v !== "" &&
    v !== "[NULL]";

  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      {(hasValue(person?.A_ID) ||
        hasValue(person?.ID) ||
        hasValue(person?.SDNTYPE) ||
        hasValue(person?.FIRSTNAME) ||
        hasValue(person?.LASTNAME)) && (

        <div className="border border-gray-300 rounded pt-4 pb-4 bg-white shadow-lg">
          <h3 className="pl-5 pb-3 border-b font-bold">
            Entity Overview
          </h3>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-3 pl-5 pr-5 text-sm">
            <Field label="A ID" value={person?.A_ID} />
            <Field label="ID" value={person?.ID} />
            <Badge label="SDN TYPE" value={person?.SDNTYPE} />
            <Field label="FIRST NAME" value={person?.FIRSTNAME} />
            <Field label="LAST NAME" value={person?.LASTNAME} />
          </div>
        </div>
      )}

      <div className="bg-white p-5 rounded shadow-2xl border border-gray-300 shadow-lg ">

        {/* ================= NAME INFORMATION ================= */}
        {hasValue(person?.AKALIST) && (
          <>
            <DividerTitle title="NAME INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="ALIASES (AKA LIST)"
                value={person?.AKALIST}
                className="col-span-2"
              />
            </div>
          </>
        )}

        {/* ================= PERSONAL ================= */}
        {(hasValue(person?.DATEOFBIRTHLIST) ||
          hasValue(person?.PLACEOFBIRTHLIST)) && (
          <>
            <DividerTitle title="PERSONAL INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="DATE OF BIRTH LIST"
                value={person?.DATEOFBIRTHLIST}
              />

              <Field
                label="PLACE OF BIRTH LIST"
                value={person?.PLACEOFBIRTHLIST}
              />
            </div>
          </>
        )}

        {/* ================= ID LIST ================= */}
        {((Array.isArray(ids) && ids.length > 0) || rawIds) && (
          <>
            <DividerTitle title="IDENTITY DOCUMENTS" />

            <div className="space-y-4 text-sm">
              {Array.isArray(ids) && ids.length > 0 && ids.map((item, i) => (
                <div key={i} className="border-b pb-2">
                  <span className="text-gray-400 text-xs uppercase block mb-1">
                    {item.idType || "ID"}
                  </span>

                  <div className="text-gray-800 font-bold break-words">
                    {item.idNumber}
                  </div>
                </div>
              ))}

              {(!Array.isArray(ids) || ids.length === 0) && rawIds && (
                <div className="text-gray-800 font-bold break-words">
                  {String(rawIds)}
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= ADDRESS ================= */}
        {hasValue(person?.ADDRESSLIST) && (
          <>
            <DividerTitle title="ADDRESS INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="ADDRESS LIST"
                value={person?.ADDRESSLIST}
                className="col-span-2"
              />
            </div>
          </>
        )}

        {/* ================= SANCTIONS ================= */}
        {(hasValue(person?.PROGRAM_LIST) ||
          hasValue(person?.REMARKS)) && (
          <>
            <DividerTitle title="SANCTIONS INFORMATION" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
              <Field
                label="PROGRAM LIST"
                value={person?.PROGRAM_LIST}
              />

              <Field
                label="REMARKS"
                value={person?.REMARKS}
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

/* ================= SAFE PARSER ================= */

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
    return [];
  }
}