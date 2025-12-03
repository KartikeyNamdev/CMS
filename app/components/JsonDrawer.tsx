import { XMarkIcon } from "@heroicons/react/24/solid";

export const JsonDrawer = ({ open, onClose, title, json }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-white/30 backdrop-blur-xs"
      onClick={onClose}
    >
      {/* Drawer */}
      <div className="w-full max-w-xl h-full bg-gray-200 border-l border-gray-300 shadow-xl animate-slideLeft p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-black text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300"
          >
            <XMarkIcon className="w-6 h-6 text-black " />
          </button>
        </div>

        {/* JSON Content */}
        <pre className="text-white text-md text-bold bg-black/30 p-4 rounded-lg border border-gray-300 overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
    </div>
  );
};
