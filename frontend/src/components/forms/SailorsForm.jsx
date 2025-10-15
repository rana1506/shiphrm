import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";
//import { Button } from "@/components/ui/button";

export default function SailorsForm({ sailor, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    serviceNo: "",
    name: "",
    division: "",
    rank: "",
  });

  useEffect(() => {
    if (sailor) {
      setFormData({
        serviceNo: sailor.user?.serviceNo || "",
        name: sailor.name || "",
        division: sailor.division?._id || "",
        rank: sailor.rank || "",
      });
    }
  }, [sailor]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (sailor?._id) {
        await axios.put(`/sailors/${sailor._id}`, formData);
      } else {
        await axios.post("/sailors", formData);
      }
      onSuccess();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl shadow-md bg-white max-w-md space-y-3"
    >
      <h2 className="text-lg font-semibold mb-2">
        {sailor ? "Edit Sailor" : "Add Sailor"}
      </h2>

      <div>
        <label className="block mb-1">Service No</label>
        <input
          type="text"
          name="serviceNo"
          value={formData.serviceNo}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Division</label>
        <input
          type="text"
          name="division"
          value={formData.division}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Rank</label>
        <input
          type="text"
          name="rank"
          value={formData.rank}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button type="submit">{sailor ? "Update" : "Create"}</button>
        <button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
