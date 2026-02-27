"use client";

export default function USDetailsCard({ person }) {

  /* ================= UNIVERSAL DATA EXTRACTION ================= */
  const ids = extractIds(person);
  const address = extractAddress(person);
  const program = extractProgram(person);
  const aliases = extractAliases(person);
  const dob = extractDOB(person);
  const citizenship = extractCitizenship(person);
  const birthPlace = extractBirthPlace(person);

  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg px-4 pb-4 bg-gray-50">
        <h3 className="pb-2 border-b font-bold">
          Entity Overview
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-3 text-sm">
          <Field label="A ID" value={person?.A_ID || person?.ID} />
          <Field label="ID" value={person?.uid || person?.ID} />
          <Badge label="SDN TYPE" value={person?.SDNTYPE || person?.SDN_TYPE} />
        </div>
      </div>

      {/* ================= NAME ================= */}
      <DividerTitle title="NAME INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="FIRST NAME" value={person?.FIRST_NAME} />
        <Field label="LAST NAME" value={person?.LAST_NAME} />
        <Field label="ALIASES" value={aliases} />
      </div>

      {/* ================= PERSONAL ================= */}
      <DividerTitle title="PERSONAL INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="DATE OF BIRTH" value={dob} />
        <Field label="CITIZENSHIP" value={citizenship} />
        <Field label="PLACE OF BIRTH" value={birthPlace} />
      </div>

      {/* ================= ID LIST ================= */}
      <DividerTitle title="ID LIST" />

      <div className="space-y-3 text-sm">
        {Array.isArray(ids) && ids.length > 0 ? (
          ids.map((item, i) => (
            <div key={i}>
              <span className="text-gray-400 font-bold text-xs">
                {item.idType}
              </span>

              <div className="text-gray-800 font-bold break-words">
                {item.idNumber || "NULL"}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-800 font-bold">
            NULL
          </div>
        )}
      </div>

      {/* ================= ADDRESS ================= */}
      <DividerTitle title="ADDRESS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="ADDRESS" value={address} />
      </div>

      {/* ================= SANCTIONS ================= */}
      <DividerTitle title="SANCTIONS INFORMATION" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Field label="PROGRAM LIST" value={program} />
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

/* ✅ ALWAYS SHOW FIELD (even if missing in JSON) */
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
      <span className="text-gray-400 text-xs">
        {label} :
      </span>

      <div className="text-gray-800 font-bold break-words whitespace-pre-line">
        {String(displayValue)}
      </div>
    </div>
  );
}

/* ✅ Badge also shows NULL */
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
      <span className="text-gray-400 text-xs">
        {label} :
      </span>

      <div className="inline-block px-2 py-1 font-bold text-xs rounded bg-blue-100 text-blue-600">
        {displayValue}
      </div>
    </div>
  );
}

/* =========================================================
   🔥 UNIVERSAL EXTRACTORS
   ========================================================= */

function parseFullData(person) {
  try {
    if (!person?.FULL_DATA) return null;

    return typeof person.FULL_DATA === "string"
      ? JSON.parse(person.FULL_DATA)
      : person.FULL_DATA;
  } catch {
    return null;
  }
}

function extractIds(person) {
  try {
    if (person?.IDLIST && typeof person.IDLIST === "string") {
      return person.IDLIST.split(";")
        .map(v => v.trim())
        .filter(Boolean)
        .map(entry => {
          const typeMatch = entry.match(/idType:\s*(.*?),\s*idNumber:/i);
          const numberMatch = entry.match(/idNumber:\s*(.*?)(?:,|$)/i);

          return {
            idType: typeMatch ? typeMatch[1].trim() : "ID",
            idNumber: numberMatch ? numberMatch[1].trim() : entry
          };
        });
    }

    const parsed = parseFullData(person);
    const idObj = parsed?.idList?.id;
    if (!idObj) return [];

    const list = Array.isArray(idObj) ? idObj : [idObj];

    return list.map(v => ({
      idType: v?.idType || "ID",
      idNumber: v?.idNumber || ""
    }));
  } catch {
    return [];
  }
}

function extractAliases(person) {
  try {
    if (person?.AKALIST) return person.AKALIST;

    const parsed = parseFullData(person);
    const aka = parsed?.akaList?.aka;
    if (!aka) return "";

    const list = Array.isArray(aka) ? aka : [aka];

    return list
      .map(v => `${v?.firstName || ""} ${v?.lastName || ""}`.trim())
      .join(", ");
  } catch {
    return "";
  }
}

function extractDOB(person) {
  try {
    const parsed = parseFullData(person);
    const dob = parsed?.dateOfBirthList?.dateOfBirthItem;
    if (!dob) return "";

    const list = Array.isArray(dob) ? dob : [dob];

    return list.map(v => v?.dateOfBirth).join(", ");
  } catch {
    return "";
  }
}

function extractCitizenship(person) {
  try {
    const parsed = parseFullData(person);
    return parsed?.citizenshipList?.citizenship?.country || "";
  } catch {
    return "";
  }
}

function extractBirthPlace(person) {
  try {
    const parsed = parseFullData(person);
    return parsed?.placeOfBirthList?.placeOfBirthItem?.placeOfBirth || "";
  } catch {
    return "";
  }
}

function extractAddress(person) {
  try {
    if (person?.ADDRESSLIST) return person.ADDRESSLIST;

    const parsed = parseFullData(person);
    const addr = parsed?.addressList?.address;

    if (!addr) return "";

    return `${addr?.address1 || ""}, ${addr?.city || ""}, ${addr?.country || ""}`;
  } catch {
    return "";
  }
}

function extractProgram(person) {
  try {
    if (person?.PROGRAM_LIST) return person.PROGRAM_LIST;

    const parsed = parseFullData(person);
    return parsed?.programList?.program || "";
  } catch {
    return "";
  }
}