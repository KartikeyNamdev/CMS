"use client";

import { useState, useEffect } from "react";

export interface MyProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  companyType: string;
}

export const useMyProfile = () => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock API fetch
  useEffect(() => {
    setTimeout(() => {
      setProfile({
        name: "Sonu Dabas",
        email: "vaishnaviskill@gmail.com",
        phone: "919310849397",
        role: "Owner",
        companyName: "Dabas EV Charge",
        companyType: "CPO",
      });
      setLoading(false);
    }, 500);
  }, []);

  // Mock API update
  const updateProfile = async (updated: MyProfile) => {
    console.log("Saving changes...", updated);
    setProfile(updated);
    return true;
  };

  return { profile, loading, updateProfile, setProfile };
};
