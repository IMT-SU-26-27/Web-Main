"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { User } from "@/types/service/user";
import { editUser, getUserById } from "@/lib/service/user";
import Link from "next/link";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("STUDENT");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.id);

      try {
        const userData = await getUserById(resolvedParams.id);
        if (userData) {
          setUser(userData);
          setSelectedRole(userData.role);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setError("");

    try {
      const result = await editUser(userId, selectedRole);

      if (result.success) {
        router.push("/dashboard/tech");
      } else {
        setError(result.error || "Failed to update user role");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const roleOptions: { value: Role; label: string; description: string }[] = [
    {
      value: "STUDENT",
      label: "Student",
      description: "Can only view student dashboard and submit applications",
    },
    {
      value: "LECTURER",
      label: "Lecturer",
      description: "Can view and verify academic content",
    },
    {
      value: "PR",
      label: "Public Relations",
      description: "Can manage achievements and PR media",
    },
    {
      value: "SA",
      label: "Social Activity",
      description: "Can manage activities, competitions, and student applications",
    },
    {
      value: "PULSE",
      label: "Pulse",
      description: "Can manage and evaluate pulse recruitment submissions",
    },
    {
      value: "TECH",
      label: "Technical",
      description: "Full administrative access across all modules and user permissions",
    },
  ];

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20 select-none">
        <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-6 shadow-2xl">
          <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-8 text-center">
            <div className="w-10 h-10 border-4 border-[#7E3E11] border-t-[#BF6432] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-cinzel font-bold text-sm text-[#541C16]">
              Loading user details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="w-full flex justify-center items-center py-20 select-none">
        <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-6 shadow-2xl">
          <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-8 text-center">
            <p className="font-cinzel font-bold text-base text-[#C0392B] mb-4">
              {error}
            </p>
            <Link
              href="/dashboard/tech"
              className="bg-[#BF6432] hover:bg-[#a75427] text-white px-5 py-2 rounded-lg font-cinzel font-bold border-2 border-black shadow transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      {/* Wooden Board Outer Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4">
        {/* Top Centered Wooden Plaque Header */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            EDIT USER ROLE
          </span>
          <p className="relative z-2">EDIT USER ROLE</p>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
          {/* Back link */}
          <div className="mb-4">
            <Link
              href="/dashboard/tech"
              className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F] hover:text-[#541C16] transition-colors"
            >
              ← Back to Users
            </Link>
          </div>

          {/* User Info Parchment Card */}
          {user && (
            <div className="bg-[#F5D2A4] border-2 border-black rounded-xl p-4 sm:p-5 mb-6 shadow-inner flex items-center gap-4">
              <div className="w-14 h-14 bg-[#BF6432] border-2 border-black rounded-full flex items-center justify-center text-white font-cinzel font-black text-xl shrink-0 shadow-sm">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-cinzel font-black text-base sm:text-lg text-[#541C16] truncate">
                  {user.name || "Unknown User"}
                </h3>
                <p className="font-cinzel text-xs text-[#8C4A2F] truncate">
                  {user.email}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-cinzel text-xs font-bold text-[#8C4A2F]">
                    Current Role:
                  </span>
                  <span className="font-cinzel font-bold text-xs px-2.5 py-0.5 bg-[#BF6432] text-white border border-black rounded-md">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-cinzel font-black text-sm text-[#541C16] uppercase tracking-wide mb-3">
                Select Assignable Role
              </label>

              <div className="space-y-2.5">
                {roleOptions.map((option) => {
                  const isSelected = selectedRole === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`relative flex items-start p-3.5 sm:p-4 rounded-xl border-2 border-black cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-[#BF6432] text-white shadow-md scale-[1.01]"
                          : "bg-[#F5D2A4]/80 text-[#541C16] hover:bg-[#F5D2A4]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={isSelected}
                        onChange={(e) =>
                          setSelectedRole(e.target.value as Role)
                        }
                        className="mt-1 h-4 w-4 accent-[#7E3E11] cursor-pointer"
                      />
                      <div className="ml-3.5 flex-1">
                        <div
                          className={`font-cinzel font-bold text-sm tracking-wide ${
                            isSelected ? "text-white" : "text-[#541C16]"
                          }`}
                        >
                          {option.label}
                        </div>
                        <div
                          className={`text-xs mt-0.5 font-medium ${
                            isSelected ? "text-[#FFE6CD]" : "text-[#8C4A2F]"
                          }`}
                        >
                          {option.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-[#FADBD8] border-2 border-[#C0392B] rounded-lg">
                <p className="font-cinzel font-bold text-xs text-[#922B21] text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || selectedRole === user?.role}
                className={`flex-1 py-2.5 px-4 rounded-xl font-cinzel font-bold text-xs sm:text-sm border-2 border-black shadow transition-all duration-200 ${
                  saving || selectedRole === user?.role
                    ? "bg-[#C8B6A6] text-[#7E3E11]/60 cursor-not-allowed border-[#7E3E11]/40"
                    : "bg-[#BF6432] hover:bg-[#a75427] text-white hover:scale-105 active:scale-95 cursor-pointer"
                }`}
              >
                {saving ? "Updating Role..." : "Save Role Changes"}
              </button>

              <Link
                href="/dashboard/tech"
                className="px-6 py-2.5 text-center bg-[#E5C198] hover:bg-[#d6af84] text-[#541C16] font-cinzel font-bold text-xs sm:text-sm border-2 border-black rounded-xl transition-all"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
