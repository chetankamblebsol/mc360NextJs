import SectionHeader from "./SectionHeader";

export default function USDetailsVCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= ENTITY SUMMARY ================= */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <SectionHeader title="Entity Summary" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label="A ID" value={person?.A_ID} />
          <Field label="ID" value={person?.ID} />
          <Field label="SDN TYPE" value={person?.SDNTYPE} />
        </div>
      </div>

      {/* ================= NAME INFORMATION ================= */}
      <SectionHeader title="Name Information" />
      <Section>
        <Field label="FIRST NAME" value={person?.FIRSTNAME} />
        <Field label="LAST NAME" value={person?.LASTNAME} />
        <Field label="ALIASES (AKA LIST)" value={person?.AKALIST} />
      </Section>

      {/* ================= IDENTITY INFORMATION ================= */}
      <SectionHeader title="Identity Information" />
      <Section>
        <Field label="DATE OF BIRTH LIST" value={person?.DATEOFBIRTHLIST} />
        <Field label="PLACE OF BIRTH LIST" value={person?.PLACEOFBIRTHLIST} />
        <Field label="ID LIST" value={person?.IDLIST} />
      </Section>

      {/* ================= ADDRESS INFORMATION ================= */}
      <SectionHeader title="Address Information" />
      <Section>
        <Field label="ADDRESS LIST" value={person?.ADDRESSLIST} />
      </Section>

      {/* ================= SANCTIONS INFORMATION ================= */}
      <SectionHeader title="Sanctions Information" />
      <Section>
        <Field label="PROGRAM LIST" value={person?.PROGRAM_LIST} />
        <Field label="REMARKS" value={person?.REMARKS} />
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