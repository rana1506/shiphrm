import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
//import { Button } from "@/components/ui/button";

export default function SailorsTable({ onEdit }) {
  const [sailors, setSailors] = useState([]);

  const fetchSailors = async () => {
    try {
      const res = await axios.get("/sailors");
      setSailors(res.data);
    } catch (err) {
      console.error("Failed to fetch sailors", err);
    }
  };

  useEffect(() => {
    fetchSailors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sailor?")) return;
    try {
      await axios.delete(`/sailors/${id}`);
      setSailors((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Sailors</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Service No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Division</th>
            <th className="border p-2">Rank</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sailors.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-3">
                No sailors found
              </td>
            </tr>
          ) : (
            sailors.map((sailor) => (
              <tr key={sailor._id}>
                <td className="border p-2">{sailor.user?.serviceNo}</td>
                <td className="border p-2">{sailor.name}</td>
                <td className="border p-2">{sailor.division?.name || "-"}</td>
                <td className="border p-2">{sailor.rank}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(sailor)}
                  >
                    Edit
                  </button>
                  <button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(sailor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
