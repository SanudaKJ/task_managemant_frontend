"use client";

import { useState } from "react";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Dashboard</h1>

          <button className="bg-black text-white px-4 py-2 rounded hover:opacity-90">
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
