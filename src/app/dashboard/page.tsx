"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/src/context/tokenStore";
import EditTaskModal from "@/src/components/tasks/EditTaskModal";
import TaskCard, { Task } from "@/src/components/tasks/TaskCard";
import Container from "@/src/components/container";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const router = useRouter();

  const loadTasks = async () => {
    try {
      const data = await apiFetch("/tasks");

      // Convert backend boolean `completed` into frontend `status`
      const normalizedTasks: Task[] = data.map((task: any) => ({
        ...task,
        status: task.completed ? "completed" : "pending",
      }));

      setTasks(normalizedTasks);
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async () => {
    if (!title) return;

    await apiFetch("/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await apiFetch(`/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id
          ? { ...t, status: newStatus, completed: newStatus === "completed" }
          : t,
      ),
    );

    await apiFetch(`/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setAccessToken(null);
    router.push("/login");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  if (loading)
    return (
      <div className="min-h-screen  items-center justify-center bg-white">
        <p className="text-gray-300 text-lg animate-pulse">
          Loading your tasks...
        </p>
      </div>
    );

  return (
    <Container>
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-col md:gap-8 gap-4 py-10">
        <div className="flex items-center justify-between ">
          <div className="md:text-5xl text-2xl font-bold items-center justify-center flex text-primary ">
            Task Dashboard
          </div>
          <div className="">
            <button
              onClick={handleLogout}
              className="mt-auto px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold shadow-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16  gap-5 ">
          <div className="bg-blue-800/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center shadow-lg border border-blue-800">
            <p className=" text-lg ">Total Tasks</p>
            <h3 className="text-2xl font-bold">{totalTasks}</h3>
          </div>
          <div className="bg-green-700/25 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center shadow-lg border border-green-600">
            <p className=" text-lg">Completed</p>
            <h3 className="text-2xl font-bold">{completedTasks}</h3>
          </div>
          <div className="bg-yellow-500/25 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center shadow-lg border border-yellow-600">
            <p className="text-lg">Pending</p>
            <h3 className="text-2xl font-bold">{pendingTasks}</h3>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 text-black flex flex-col">
          <p className=" mb-2 font-semibold">Completion Progress</p>
          <div className="w-full h-4 rounded-xl bg-gray-300 overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-green-700 transition-all"
            ></div>
          </div>
        </div>

        {/* Create Task */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-gray-700 space-y-4 text-black  flex flex-col text-primary ">
          <h2 className="text-xl font-semibold flex ">Add New Task</h2>

          <input
            className="flex w-full px-4 py-3 rounded-xl border border-gray-600 bg-white/10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className=" flex w-full px-4 py-3 rounded-xl border border-gray-600 bg-white/10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <button
            onClick={handleCreate}
            className="flex justify-center w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-secondary shadow-lg hover:shadow-xl transition-all"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 && (
            <div className="text-center text-black p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700">
              No tasks yet. Start by adding a new task ✨
            </div>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onEdit={(task) => setSelectedTask(task)}
            />
          ))}
        </div>
      </div>

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdated={loadTasks}
        />
      )}
    </Container>
  );
}
