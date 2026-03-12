import { X } from 'lucide-react';

export default function WarningModel({ message, onClose }) {
  return (
    <div className="fixed top-5 right-5 z-50 animate-slideIn">
      <div className="flex items-start gap-3 bg-red-500 text-white shadow-lg rounded-xl px-4 py-3 min-w-[300px] max-w-[350px]">

        {/* Message */}
        <div className="flex-1 text-sm font-medium">
          {message}
        </div>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="hover:bg-red-600 rounded p-1 transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}