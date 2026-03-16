'use client';

/* ================= SectionHeader ================= */
function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-[1px] bg-blue-300" />
      <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wide whitespace-nowrap">
        {title}
      </h3>
      <div className="flex-1 h-[1px] bg-blue-300" />
    </div>
  );
}

/* ================= CONFIG ================= */

const SKIP_FIELDS = new Set([
  'search_blob','FT_SEARCH_EU','FT_SEARCH_UK',
  'FT_SEARCH_UN','FT_SEARCH_US','FT_SEARCH_USV',
]);

const SECTION_DEFS = [
  {
    key: 'overview',
    label: 'Entity Overview',
    match: (k) => ['ID','A_ID','AUTO_ID','UID','EU_ID','DOC_SRNO','GROUP_ID',
      'NAME','FIRST_NAME','FIRSTNAME','LAST_NAME','LASTNAME','COMPANY_NAME',
      'VESSEL_NAME','FILE_NAME','TYPE','TYPE_','SDN_TYPE','SDNTYPE',
      'SOURCE','SOURCE_'].some(kw => k.toUpperCase().includes(kw)),
  },
  {
    key: 'sanctions',
    label: 'Sanctions Details',
    match: (k) => ['PROGRAM','LEGAL','LISTED','REMARK','SANCTION',
      'UK_SANCTIONS_LIST','PROGRAM_LIST','AUTHORITY'].some(kw => k.toUpperCase().includes(kw)),
  },
  {
    key: 'aliases',
    label: 'Names & Aliases',
    match: (k) => ['AKA','AKALIST','NAME_NON_LATIN','NAME_ORIGINAL',
      'GOOD_QUALITY_AKA','LOW_QUALITY_AKA','FKA'].some(kw => k.toUpperCase().includes(kw)),
  },
  {
    key: 'personal',
    label: 'Personal Information',
    match: (k) => ['DOB','DATEOFBIRTH','BIRTH','NATIONALITY','CITIZENSHIP',
      'POB','PLACEOFBIRTH','TITLE','DESIGNATION'].some(kw => k.toUpperCase().includes(kw)),
  },
  {
    key: 'identity',
    label: 'Identity Documents',
    match: (k) => ['PASSPORT','NATIONAL_ID','IDLIST','IDENTIFICATION','IMO']
      .some(kw => k.toUpperCase().includes(kw)),
  },
  {
    key: 'address',
    label: 'Address Information',
    match: (k) => ['ADDRESS','CONTACT'].some(kw => k.toUpperCase().includes(kw)),
  },
  {
    key: 'metadata',
    label: 'Metadata',
    match: (k) => ['INSERTED_ON','UPDATED_ON','LAST_UPDATED']
      .some(kw => k.toUpperCase().includes(kw)),
  },
];

const SECTION_ORDER = [
  'overview','sanctions','aliases','personal','identity','address','metadata','other',
];

/* ================= HELPERS ================= */

function isNullish(v) {
  if (v === null || v === undefined || v === '') return true;
  return ['[NULL]','null','na','n/a','N/A'].includes(String(v).trim());
}

function prettyLabel(key) {
  return key.replace(/_/g, ' ').toUpperCase();
}

function classifyField(key) {
  for (const def of SECTION_DEFS) {
    if (def.match(key)) return def.key;
  }
  return 'other';
}

function partitionRecord(person) {
  const buckets = {};
  SECTION_ORDER.forEach(k => (buckets[k] = []));
  for (const [key, val] of Object.entries(person)) {
    if (SKIP_FIELDS.has(key) || isNullish(val)) continue;
    buckets[classifyField(key)].push([key, val]);
  }
  return buckets;
}

/* ================= SMART VALUE ================= */

function CellValue({ raw }) {
  const str = String(raw);

  if (str.startsWith('http')) {
    return (
      <a
        href={str}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-bold break-all hover:underline"
      >
        {str}
      </a>
    );
  }

  if (str.length > 200) {
    return (
      <div className="text-gray-800 font-bold break-words whitespace-pre-line max-h-64 overflow-y-auto">
        {str}
      </div>
    );
  }

  if (str.includes(';')) {
    return (
      <div className="space-y-1">
        {str.split(';').filter(Boolean).map((item, i) => (
          <div key={i} className="text-gray-800 font-bold break-words">
            {item.trim()}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-gray-800 font-bold break-words whitespace-pre-line">
      {str}
    </div>
  );
}

/* ================= FIELD ================= */

function Field({ fieldKey, raw }) {
  return (
    <div>
      <span className="text-gray-400 text-xs uppercase block mb-1">
        {prettyLabel(fieldKey)}
      </span>

      <CellValue raw={raw} />
    </div>
  );
}

/* ================= OVERVIEW ================= */

function OverviewCard({ fields }) {
  if (!fields?.length) return null;

  return (
    <div className="border rounded pt-4 pb-4 bg-white border-gray-300 shadow-lg">
      <h3 className="pl-5 pb-3 border-b font-bold">
        Entity Overview
      </h3>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-3 pl-5 pr-5 text-sm">
        {fields.map(([k, v]) => (
          <Field key={k} fieldKey={k} raw={v} />
        ))}
      </div>
    </div>
  );
}

/* ================= SECTION ================= */

function RecordSection({ sectionKey, fields }) {
  if (!fields?.length) return null;

  const def = SECTION_DEFS.find(d => d.key === sectionKey) || {
    label: 'Other Information'
  };

  return (
    <div>
      <SectionHeader title={def.label} />

      <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
        {fields.map(([k, v]) => (
          <Field key={k} fieldKey={k} raw={v} />
        ))}
      </div>
    </div>
  );
}

/* ================= MAIN ================= */

export default function UniversalDetailsCard({ person }) {
  if (!person) return null;

  const buckets = partitionRecord(person);

  return (
    <div className="space-y-6">

      <OverviewCard fields={buckets.overview} />

      <div className="bg-white p-5 rounded border border-gray-300 shadow-lg">

        {SECTION_ORDER
          .filter(k => k !== 'overview')
          .map(k => (
            <RecordSection key={k} sectionKey={k} fields={buckets[k]} />
          ))}

      </div>

    </div>
  );
}