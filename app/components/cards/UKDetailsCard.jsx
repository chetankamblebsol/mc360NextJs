import SectionHeader from "./SectionHeader";

export default function UKDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= OVERVIEW ================= */}
      <div className="border rounded-lg p-4 bg-gray-50">
       

        <div className="grid grid-cols-2 gap-6 text-sm">

          <Field label="UID" value={person?.ID} />

          <div>
            <span className="text-gray-400 text-xs">TYPE</span>
            <div className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-600">
              {person?.TYPE_}
            </div>
          </div>

          <Field label="SOURCE" value={person?.SOURCE_} />
          <Field label="NATIONALITY" value={person?.NATIONALITY} />
          <Field label="DOB" value={person?.DOB} />
          <Field label="POB" value={person?.POB} />

        </div>
      </div>

      {/* ================= SANCTIONS DETAILS ================= */}
      <DividerTitle title="SANCTIONS DETAILS" />

      <div className="grid grid-cols-2 gap-6 text-sm">
        <Field label="UK SANCTIONS LIST" value={person?.UK_SANCTIONS_LIST} />
        <Field label="GROUP ID" value={person?.GROUP_ID} />
        <Field label="LISTED ON" value={person?.LISTED_ON} />
        <Field label="LAST UPDATED" value={person?.LAST_UPDATED} />
      </div>

      {/* ================= REGULATORY RESTRICTIONS ================= */}
      <DividerTitle title="REGULATORY RESTRICTIONS" />

      <div className="grid grid-cols-2 gap-6 text-sm">
        <Field label="TITLE" value={person?.TITLE} />
        <Field label="POSITION" value={person?.POSITION_} />
        <Field label="PASSPORT NUMBER" value={person?.PASSPORT_NUMBER} />
        <Field label="NAME NON LATIN SCRIPT" value={person?.NAME_NON_LATIN_SCRIPT} />
      </div>

      {/* ================= OTHER INFORMATION ================= */}
      <DividerTitle title="OTHER INFORMATION / NARRATIVE" />

      <div className="text-sm">
        <Field label="GOOD QUALITY AKA" value={person?.GOOD_QUALITY_AKA} />
        <Field label="LOW QUALITY AKA" value={person?.LOW_QUALITY_AKA} />
        <Field label="AKA" value={person?.AKA} />
        <Field label="ADDRESS" value={person?.ADDRESS} />
        <Field label="OTHER INFORMATION" value={person?.OTHER_INFORMATION} />
      </div>

      {/* ================= METADATA ================= */}
      <DividerTitle title="METADATA" />

      <div className="grid grid-cols-2 gap-6 text-sm">
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

function Field({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <span className="text-gray-400 text-xs">{label}</span>
      <div className="text-gray-800 break-words">{value}</div>
    </div>
  );
}