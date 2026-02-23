import SectionHeader from "./SectionHeader";

export default function UNDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= ENTITY SUMMARY ================= */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <SectionHeader title="Entity Summary" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label="TYPE" value={person?.TYPE_} />
          <Field label="ID" value={person?.ID} />
          <Field label="SOURCE" value={person?.SOURCE} />
          <Field label="NATIONALITY" value={person?.NATIONALITY} />
        </div>
      </div>

      {/* ================= IDENTITY INFORMATION ================= */}
      <SectionHeader title="Identity Information" />
      <Section>
        <Field label="DATE OF BIRTH" value={person?.DOB} />
        <Field label="PLACE OF BIRTH" value={person?.POB} />
        <Field label="PASSPORT NUMBER" value={person?.PASSPORT_NO} />
        <Field label="NATIONAL ID" value={person?.NATIONAL_IDENTITY_NO} />
        <Field label="NAME ORIGINAL SCRIPT" value={person?.NAME_ORIGINAL_SCRIPT} />
      </Section>

      {/* ================= NAMES & ALIASES ================= */}
      <SectionHeader title="Names & Aliases" />
      <Section>
        <Field label="PRIMARY NAME" value={person?.NAME} />
        <Field label="GOOD QUALITY AKA" value={person?.GOOD_QUALITY_AKA} />
        <Field label="LOW QUALITY AKA" value={person?.LOW_QUALITY_AKA} />
        <Field label="AKA" value={person?.AKA} />
        <Field label="FKA" value={person?.FKA} />
      </Section>

      {/* ================= ROLE / DESIGNATION ================= */}
      <SectionHeader title="Role / Designation" />
      <Section>
        <Field label="TITLE" value={person?.TITLE} />
        <Field label="DESIGNATION" value={person?.DESIGNATION} />
      </Section>

      {/* ================= SANCTIONS INFORMATION ================= */}
      <SectionHeader title="Sanctions Information" />
      <Section>
        <Field label="LISTED ON" value={person?.LISTED_ON} />
      </Section>

      {/* ================= ADDRESS ================= */}
      <SectionHeader title="Address Information" />
      <Section>
        <Field label="ADDRESS" value={person?.ADDRESS} />
      </Section>

      {/* ================= OTHER INFO ================= */}
      <SectionHeader title="Other Information" />
      <Section>
        <Field label="OTHER INFORMATION" value={person?.OTHER_INFORMATION} />
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