import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleDetails } from "@/lib/agGrid";

interface Props {
  open: boolean;
  data: RoleDetails | null; // <--- Strongly typed
  onClose: () => void;
}

export default function RoleDetailsDialog({ open, data, onClose }: Props) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-full overflow-y-auto rounded-xl bg-white/80 p-0 sm:max-w-4xl"
        style={{ maxWidth: "800px", height: "800px" }}
      >
        <DialogHeader className="sticky top-0 bg-white z-10 border-b px-6 py-4">
          <DialogTitle className="text-2xl font-semibold">
            View Custom Role
          </DialogTitle>
        </DialogHeader>

        {/* TOP FIELDS */}
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Role Name*</label>
            <input
              value={data.roleName}
              disabled
              className="mt-1 h-11 w-full bg-gray-100 border rounded-lg px-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Company*</label>
            <input
              value={data.company}
              disabled
              className="mt-1 h-11 w-full bg-gray-100 border rounded-lg px-3"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-500">Role Template*</label>
            <input
              value={data.template}
              disabled
              className="mt-1 h-11 w-full bg-gray-100 border rounded-lg px-3"
            />
          </div>
        </div>

        {/* PERMISSIONS */}
        <div className="px-6 pb-6">
          <p className="text-lg font-semibold mb-3">
            Permissions and Functionality
          </p>

          <div className="rounded-xl border bg-white">
            {data.permissions?.map((section, i) => (
              <div key={i} className="border-b last:border-none">
                {/* Section Header */}
                <div className="flex justify-between px-5 py-3 bg-gray-50 border-b font-semibold">
                  <span>{section.name}</span>
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    readOnly
                    className="h-5 w-5"
                  />
                </div>

                {/* Permission Items */}
                {section.items?.map((item, j) => (
                  <div
                    key={j}
                    className="flex justify-between px-5 py-3 border-b last:border-none"
                  >
                    <span className="text-gray-700">{item.title}</span>

                    <div className="flex gap-3 text-green-600 font-medium text-sm">
                      {item.view && <span>✓ View</span>}
                      {item.edit && <span>✓ Edit</span>}
                      {item.add && <span>✓ Add</span>}
                      {item.download && <span>✓ Download</span>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
