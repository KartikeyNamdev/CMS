import { XMarkIcon } from "@heroicons/react/24/solid";

export const JsonDrawer = ({ open, onClose, title, json }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      {/* Drawer */}
      <div className="w-full max-w-xl h-full bg-black border-l border-gray-800 shadow-xl animate-slideLeft p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* JSON Content */}
        <pre className="text-gray-300 text-sm bg-black/30 p-4 rounded-lg border border-gray-800 overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
    </div>
  );
};
