import type React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "user" | "request";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = "user" }) => {
  const getStatusColor = (status: string, type: string) => {
    if (type === "user") {
      switch (status) {
        case "approved":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "active":
          return "bg-green-100 text-green-800 border-green-200";
        case "inactive":
          return "bg-red-100 text-red-800 border-red-200";
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "suspended":
          return "bg-orange-100 text-orange-800 border-orange-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    } else {
      switch (status) {
        case "approved":
          return "bg-green-100 text-green-800 border-green-200";
        case "rejected":
          return "bg-red-100 text-red-800 border-red-200";
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "follow-up":
          return "bg-blue-100 text-blue-800 border-blue-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
        status,
        type
      )}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
