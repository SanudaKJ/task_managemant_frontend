"use client";

import { useState } from "react";
import { apiFetch } from "@/src/lib/api";
import { Task } from "./TaskCard";

interface Props {
  task: Task;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditTaskModal({ task, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await apiFetch(`/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, status }),
      });
      onUpdated();
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white backdrop-blur-xl p-6 rounded-3xl w-full max-w-md shadow-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-black">Edit Task</h2>

        <input
          className="w-full px-4 py-3 mb-3 rounded-xl border border-gray-600 bg-white/10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <textarea
          className="w-full px-4 py-3 mb-3 rounded-xl border border-gray-600 bg-white/10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Description"
        />

        <div className="flex justify-end gap-3 mt-4 flex-wrap">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-secondary transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
