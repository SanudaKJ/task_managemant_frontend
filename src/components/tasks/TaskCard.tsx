"use client";

import { Pencil, Trash2 } from "lucide-react";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border border-gray-700 shadow-xl hover:shadow-2xl transition-all">
      <div>
        <div className="flex items-center gap-3">
          <h3
            className={`text-xl font-bold transition ${
              task.status === "completed"
                ? "line-through text-black"
                : "text-primary "
            }`}
          >
            {task.title}
          </h3>

          <span
            className={`text-lg px-5 py-1 rounded-full font-medium ${
              task.status === "completed"
                ? "bg-green-600/20 text-green-800"
                : "bg-yellow-600/20 text-yellow-700  "
            }`}
          >
            {task.status === "completed" ? "Completed" : "Pending"}
          </span>
        </div>

        {task.description && (
          <p className="text-secondary mt-1 text-sm">{task.description}</p>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onToggleStatus(task)}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            task.status === "completed"
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
        >
          {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-secondary flex items-center gap-1"
        >
          <Pencil size={16} /> Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 rounded-xl bg-red-700 text-white hover:bg-red-800 flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
