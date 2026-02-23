import SectionHeader from "./SectionHeader";

export default function EUDetailsCard({ person }) {
  return (
    <div className="space-y-6">

      {/* ================= ENTITY SUMMARY ================= */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <SectionHeader title="Entity Summary" />

        <div className="grid grid-cols-2 gap-4 text-sm">

          <Field label="ID" value={person?.ID} />
          <Field label="EU ID" value={person?.EU_ID} />
          <Field label="SOURCE" value={person?.SOURCE_} />
          <Field label="COMPANY NAME" value={person?.COMPANY_NAME} />

        </div>
      </div>

      {/* ================= LEGAL INFORMATION ================= */}
      <SectionHeader title="Legal Information" />
      <Section>
        <Field label="LEGAL BASIS" value={person?.LEGAL_BASIS} />
        <Field label="PROGRAMME" value={person?.PROGRAMME} />
        <Field label="REMARK" value={person?.REMARK} />
      </Section>

      {/* ================= IDENTITY INFORMATION ================= */}
      <SectionHeader title="Identity Information" />
      <Section>
        <Field label="IDENTITY INFORMATION" value={person?.IDENTITY_INFORMATION} />
        <Field label="IDENTIFICATION DOCUMENT INFO" value={person?.IDENTIFICATION_DOCU_INFO} />
      </Section>

      {/* ================= BIRTH INFORMATION ================= */}
      <SectionHeader title="Birth Information" />
      <Section>
        <Field label="BIRTH INFORMATION" value={person?.BIRTH_INFORMATION} />
        <Field label="CITIZENSHIP INFORMATION" value={person?.CITIZENSHIP_INFORMATION} />
      </Section>

      {/* ================= CONTACT INFORMATION ================= */}
      <SectionHeader title="Contact Information" />
      <Section>
        <Field label="CONTACT INFORMATION" value={person?.CONTACT_INFORMATION} />
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