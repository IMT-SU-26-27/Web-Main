import Link from "next/link";
import { getUsers } from "@/lib/service/user";
import { DeleteButton } from "@/components/DeleteButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management - Tech Dashboard",
  description: "Manage system user roles and permissions.",
};

const getRoleBadgeStyle = (role: string) => {
  switch (role) {
    case "TECH":
      return "bg-[#7E3E11] text-[#FFE6CD] border-black";
    case "SA":
      return "bg-[#2E7D32] text-white border-black";
    case "PR":
      return "bg-[#6A1B9A] text-white border-black";
    case "LECTURER":
      return "bg-[#D35400] text-white border-black";
    case "PULSE":
      return "bg-[#1976D2] text-white border-black";
    case "STUDENT":
    default:
      return "bg-[#BF6432] text-white border-black";
  }
};

export default async function TechDashboard() {
  const users = await getUsers();

  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4">
        {/* Top Centered Wooden Plaque Header */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            USER MANAGEMENT
          </span>
          <p className="relative z-2">USER MANAGEMENT</p>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
          {/* Subtitle description */}
          <div className="mb-6 text-center">
            <p className="font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F]">
              Review, assign roles, and manage access permissions for all registered accounts.
            </p>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12 bg-[#F5D2A4]/60 border-2 border-black rounded-xl p-6">
              <p className="font-cinzel font-bold text-[#8C4A2F] text-base">
                No users found in database.
              </p>
            </div>
          ) : (
            <div className="bg-[#F5D2A4] rounded-xl border-2 border-black shadow-inner overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-black">
                  <thead className="bg-[#7E3E11]">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-5 py-3.5 text-right text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7E3E11]/20 bg-[#FFE6CD]/70">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-[#FFD7AB]/80 transition-colors"
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#BF6432] border-2 border-black rounded-full flex items-center justify-center text-white font-cinzel font-black text-sm shrink-0 shadow-sm">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                              <div className="font-cinzel font-bold text-sm text-[#541C16]">
                                {user.name || "Unknown User"}
                              </div>
                              {user.nim && (
                                <div className="text-xs text-[#8C4A2F] font-semibold">
                                  NIM: {user.nim}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-cinzel font-semibold text-xs sm:text-sm text-[#541C16]">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-cinzel font-bold rounded-md border-2 shadow-xs ${getRoleBadgeStyle(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap font-cinzel text-xs font-bold text-[#8C4A2F]">
                          {user.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/dashboard/tech/${user.id}/edit`}
                              className="bg-[#BF6432] hover:bg-[#a75427] text-white px-3 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black shadow transition-all hover:scale-105 active:scale-95"
                            >
                              Edit
                            </Link>
                            <DeleteButton
                              userId={user.id}
                              userName={user.name || undefined}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
