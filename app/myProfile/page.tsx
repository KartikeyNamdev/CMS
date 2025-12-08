"use client";

import { useMyProfile } from "@/hooks/useMyProfile";
import Image from "next/image";

export default function MyProfilePage() {
  const { profile, loading, updateProfile, setProfile } = useMyProfile();

  if (loading || !profile) {
    return (
      <div className="text-center text-gray-600 p-10 text-xl">
        Loading Profile…
      </div>
    );
  }

  const handleSave = async () => {
    await updateProfile(profile);
    alert("Changes saved!");
  };

  return (
    <div className="p-8 lg:pl-40 min-h-screen text-gray-700">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-18">
        <div className="col-span-1 gap-8">
          {/* Name */}
          <div className="p-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
            />
          </div>

          {/* Email (Non-editable) */}
          <div className="p-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="p-4">
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
            />
          </div>
        </div>
        <div className="col-span-1">
          {/* Role (Non-editable) */}
          <div className="p-4">
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Company Name */}
          <div className="p-4">
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) =>
                setProfile({ ...profile, companyName: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
            />
          </div>

          {/* Company Type */}
          <div className="p-4">
            <label className="block text-sm font-medium mb-1">
              Company Type
            </label>
            <input
              type="text"
              value={profile.companyType}
              onChange={(e) =>
                setProfile({ ...profile, companyType: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
            />
          </div>
        </div>
        <div className="p-4">
          <Image
            src={"/pfp1.jpg"}
            alt="Profile photo"
            className="rounded-full"
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[#b22828] hover:bg-red-600 text-white text-lg rounded-lg shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
