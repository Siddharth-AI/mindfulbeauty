/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect } from "react";
import { Clock, User } from "lucide-react";
import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchUserStatusHistory,
  clearStatusHistory,
} from "@/app/store/slice/userSlice";

interface UserStatusHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

const UserStatusHistoryModal: React.FC<UserStatusHistoryModalProps> = ({
  isOpen,
  onClose,
  userId,
  userName,
}) => {
  const dispatch = useAppDispatch();
  const { statusHistory, historyLoading } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(fetchUserStatusHistory(userId));
    }
    return () => {
      if (!isOpen) {
        dispatch(clearStatusHistory());
      }
    };
  }, [isOpen, userId, dispatch]);

  const handleClose = () => {
    dispatch(clearStatusHistory());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Status History - ${userName}`}
      size="lg">
      <div className="space-y-4">
        {historyLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : statusHistory.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {statusHistory.map((history, index) => (
              <div
                key={history.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={history.old_status} type="user" />
                    <span className="text-gray-500">→</span>
                    <StatusBadge status={history.new_status} type="user" />
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {new Date(history.created_at).toLocaleDateString("en-US", {
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
                    Changed by:{" "}
                    {(history as any).changed_by_user?.name || "System"}
                  </span>
                </div>

                {history.remark && (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-700">
                      <strong>Remark:</strong> {history.remark}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No status history found for this user.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserStatusHistoryModal;
