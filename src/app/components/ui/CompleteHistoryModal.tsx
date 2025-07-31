/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Clock, User, ArrowRight, CheckCircle } from "lucide-react";
import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import { getTokenFromLocalStorage } from "@/app/store/slice/authSlice";

interface CompleteHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  requestName: string;
}

const CompleteHistoryModal: React.FC<CompleteHistoryModalProps> = ({
  isOpen,
  onClose,
  requestId,
  requestName,
}) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && requestId) {
      fetchCompleteHistory();
    }
  }, [isOpen, requestId]);

  const fetchCompleteHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getTokenFromLocalStorage();
      const response = await fetch(
        `/api/registration-request/${requestId}/complete-history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (data.success) {
        setHistory(data.data);
      } else {
        setError(data.error || "Failed to fetch history");
      }
    } catch (err) {
      console.log("error fetching complete history:", err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Complete History - ${requestName}`}
      size="lg">
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {history.map((item, index) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={item.old_status} type="request" />
                    <ArrowRight size={16} className="text-gray-400" />
                    <StatusBadge status={item.new_status} type="request" />
                    {item.user_id && (
                      <>
                        <ArrowRight size={16} className="text-green-500" />
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle size={16} />
                          <span className="text-sm font-medium">
                            User Created
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User size={14} className="mr-1" />
                  <span>
                    Changed by: {item.changed_by_user?.name || "System"}
                  </span>
                </div>

                {item.remark && (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-700">
                      <strong>Remark:</strong> {item.remark}
                    </p>
                  </div>
                )}

                {item.user && (
                  <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        User Created: {item.user.name} ({item.user.email})
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-xs text-green-600">
                        Current Status:{" "}
                      </span>
                      <StatusBadge status={item.user.status} type="user" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No history found for this request.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CompleteHistoryModal;
