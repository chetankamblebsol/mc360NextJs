import SectionHeader from "./SectionHeader";

export default function USDetailsCard({ person }) {

  const fullData = typeof person?.FULL_DATA === "string"
    ? JSON.parse(person.FULL_DATA)
    : person?.FULL_DATA || {};

  const {
    uid,
    lastName,
    sdnType,
    remarks,
    programList,
    idList,
    vesselInfo
  } = fullData;

  const ids = idList?.id || [];

  return (
    <div className="space-y-6">

      {/* ================= INDIVIDUAL OVERVIEW ================= */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-700 mb-4">
          {person?.NAME}
        </h3>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <Field label="ID" value={uid || person?.ID} />
          <Badge label="TYPE" value={sdnType || person?.TYPE_} />
          <Field label="SOURCE" value={person?.SOURCE_} />
          <Field label="NATIONALITY" value={person?.NATIONALITY} />
          <Field label="DATE OF BIRTH" value={person?.DOB} />
          <Field label="PLACE OF BIRTH" value={person?.POB} />
          <Field label="VESSEL FLAG" value={vesselInfo?.vesselFlag} />
        </div>
      </div>

      {/* ================= SANCTIONS DETAILS ================= */}
      <DividerTitle title="SANCTIONS DETAILS" />

      <div className="grid grid-cols-2 gap-6 text-sm">
        <Field label="SANCTIONS AUTHORITY" value="OFAC" />
        <Field label="PROGRAM" value={programList?.program} />
        <Field label="LISTED ON" value={person?.LISTED_ON} />
        <Field label="LAST UPDATED" value={person?.LAST_UPDATED} />
      </div>

      {/* ================= REGULATORY RESTRICTIONS ================= */}
      <DividerTitle title="REGULATORY RESTRICTIONS" />

      <div className="space-y-3 text-sm">
        {ids.map((item, i) => (
          <div key={i}>
            <span className="text-gray-400 text-xs">
              {item.idType}
            </span>
            <div className="text-gray-800">
              {item.idNumber}
            </div>
          </div>
        ))}
      </div>

      {/* ================= OTHER INFORMATION / NARRATIVE ================= */}
      <DividerTitle title="OTHER INFORMATION / NARRATIVE" />

      <Field
        label="REMARKS"
        value={remarks}
      />

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
      <span className="text-gray-400 text-xs">{label}</span>
      <div className="text-gray-800 break-words">{value}</div>
    </div>
  );
}

function Badge({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <span className="text-gray-400 text-xs">{label}</span>
      <div className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
        {value}
      </div>
    </div>
  );
}