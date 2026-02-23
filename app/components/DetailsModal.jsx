'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ===== CARD IMPORTS ===== */
import USDetailsCard from './cards/USDetailsCard';
import USDetailsVCard from './cards/USDetailsVCard';
import UKDetailsCard from './cards/UKDetailsCard';
import UNDetailsCard from './cards/UNDetailsCard';
import EUDetailsCard from './cards/EUDetailsCard';
import VesselCard from './cards/VesselCard';
import GenericCard from './cards/GenericCard';

/* ===== TABLE LAYOUTS ===== */
const tableLayouts = {
  us_details: ['ID','uid','FIRST_NAME','LAST_NAME','SDN_TYPE','REMARKS','FULL_DATA','INSERTED_ON','UPDATED_ON'],

  us_details_v: [
    'A_ID','ID','FIRSTNAME','LASTNAME','SDNTYPE','REMARKS',
    'PROGRAM_LIST','IDLIST','AKALIST','ADDRESSLIST',
    'DATEOFBIRTHLIST','PLACEOFBIRTHLIST'
  ],

  uk_details: [
    'ID','SOURCE_','NAME','TYPE_','NAME_NON_LATIN_SCRIPT','DOB','POB',
    'GOOD_QUALITY_AKA','NATIONALITY','ADDRESS','POSITION_','TITLE',
    'OTHER_INFORMATION','UK_SANCTIONS_LIST','LAST_UPDATED','GROUP_ID',
    'LISTED_ON','AKA','INSERTED_ON','UPDATED_ON','LOW_QUALITY_AKA','PASSPORT_NUMBER'
  ],

  un_details: [
    'AUTO_ID','ID','TYPE_','NAME','NAME_ORIGINAL_SCRIPT','TITLE','DESIGNATION',
    'DOB','POB','GOOD_QUALITY_AKA','LOW_QUALITY_AKA','NATIONALITY',
    'PASSPORT_NO','NATIONAL_IDENTITY_NO','ADDRESS','LISTED_ON',
    'OTHER_INFORMATION','SOURCE','AKA','FKA','INSERTED_ON','UPDATED_ON'
  ],

  eu_details: [
    'ID','EU_ID','SOURCE_','LEGAL_BASIS','PROGRAMME','IDENTITY_INFORMATION',
    'BIRTH_INFORMATION','CONTACT_INFORMATION','CITIZENSHIP_INFORMATION',
    'IDENTIFICATION_DOCU_INFO','REMARK','COMPANY_NAME','INSERTED_ON','UPDATED_ON'
  ],

  eu_sanctioned_vessels_test: [
    'ID','DOC_SRNO','VESSEL_NAME','IMO','SOURCE',
    'EU_JOURNAL_LINK','DATE_OF_APPLICATION','INSERTED_ON','UPDATED_ON'
  ],

  ofac_file_hashes: ['my_row_id','FILE_NAME','MD5_HASH'],
  job_last_run_date: ['my_row_id','LAST_RUN_DATE']
};

export default function DetailsModal({
  table,
  id,
  onClose,
  match,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}) {

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== FETCH RECORD ===== */
  useEffect(() => {
    fetch(`/api/details?table=${table}&id=${id}`)
      .then(r => r.json())
      .then(data => {
        setPerson(data.record);
        setLoading(false);
      });
  }, [table, id]);

  /* ===== VALUE FORMATTER ===== */
  const renderValue = (value) => {
    if (!value) return "N/A";

    if (typeof value === "string" && value.startsWith("{")) {
      try {
        const parsed = JSON.parse(value);
        return (
          <pre className="bg-gray-50 border rounded-md p-3 text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      } catch {
        return value;
      }
    }

    if (typeof value === "string" && value.length > 200) {
      return (
        <div className="bg-gray-50 border rounded-md p-3 text-xs whitespace-pre-wrap">
          {value}
        </div>
      );
    }

    return value;
  };

  /* ===== LAYOUT ===== */
  const layout = tableLayouts[table] || Object.keys(person || {});

  /* ===== DISPLAY NAME ===== */
  const displayName =
    person?.NAME || person?.FIRST_NAME
      ? `${person?.FIRST_NAME || person?.NAME || ''} ${person?.LAST_NAME || ''}`
      : person?.COMPANY_NAME || person?.VESSEL_NAME || person?.FILE_NAME || 'Details';

  /* ===== CARD SELECTOR ===== */
  const renderCard = () => {

    const props = { layout, person, renderValue };

    switch (table) {
      case 'us_details':
        return <USDetailsCard {...props} />;

      case 'us_details_v':
        return <USDetailsVCard {...props} />;

      case 'uk_details':
        return <UKDetailsCard {...props} />;

      case 'un_details':
        return <UNDetailsCard {...props} />;

      case 'eu_details':
        return <EUDetailsCard {...props} />;

      case 'eu_sanctioned_vessels_test':
        return <VesselCard {...props} />;

      default:
        return <GenericCard {...props} />;
    }
  };

  return (
    <div className="bg-white shadow-2xl w-[50%] max-h-[100vh] flex flex-col">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center px-6 pl-1 py-4 border-b bg-gray-50">

        <div className='flex items-center justify-between w-full px-5'>

          {/* LEFT NAV + NAME */}
          <div className="flex items-center gap-3">

            {/* PREV */}
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-1 rounded transition 
                ${hasPrev ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed'}`}
            >
              <ChevronLeft size={18}/>
            </button>
 {/* NEXT */}
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`p-1 rounded transition 
                ${hasNext ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed'}`}
            >
              <ChevronRight size={18}/>
            </button>
            {/* NAME */}
            <h2
              className="text-gray-900 min-h-[24px] text-xl font-bold truncate cursor-default max-w-[300px]"
              title={displayName}
            >
              {displayName.length > 20
                ? displayName.slice(0,20)+'...'
                : displayName}
            </h2>

           

          </div>

          {/* MATCH BADGE */}
          <p className="text-xs text-white bg-red-600 font-bold px-3 py-1 rounded">
            {match}% Matched
          </p>

        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

      </div>

      {/* ===== BODY ===== */}
      <div className="p-6 overflow-y-auto">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : !person ? (
          <p className="text-center py-10">Record not found</p>
        ) : (
          renderCard()
        )}
      </div>

    </div>
  );
}