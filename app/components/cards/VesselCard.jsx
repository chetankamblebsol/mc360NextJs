import SectionHeader from "./SectionHeader";

export default function VesselCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= VESSEL SUMMARY ================= */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <SectionHeader title="Vessel Summary" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label="ID" value={person?.ID} />
          <Field label="DOC SR NO" value={person?.DOC_SRNO} />
          <Field label="VESSEL NAME" value={person?.VESSEL_NAME} />
          <Field label="IMO NUMBER" value={person?.IMO} />
          <Field label="SOURCE" value={person?.SOURCE} />
        </div>
      </div>

      {/* ================= SANCTIONS INFORMATION ================= */}
      <SectionHeader title="Sanctions Information" />
      <Section>
        <Field label="EU JOURNAL LINK" value={person?.EU_JOURNAL_LINK} />
        <Field label="DATE OF APPLICATION" value={person?.DATE_OF_APPLICATION} />
      </Section>

      {/* ================= METADATA ================= */}
      <SectionHeader title="Metadata" />
      <Section>
        <Field label="INSERTED ON" value={person?.INSERTED_ON} />
        <Field label="UPDATED ON" value={person?.UPDATED_ON} />
      </Section>

    </div>
  );
}

/* ===================================================== */
/* REUSABLE UI HELPERS */
/* ===================================================== */

function Section({ children }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        {children}
      </div>
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