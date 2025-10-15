import React, { useState } from "react";
import SailorsTable from "../components/tables/SailorsTable.jsx";
import SailorsForm from "../components/forms/SailorsForm.jsx";

export default function SailorsPage() {
    const [editing, setEditing] = useState(null);
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="p-4">
            {!editing && (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sailors Management</h1>
                    <button onClick={() => setEditing({})}>+ Add Sailor</button>
                </div>
            )}
            {editing ? (
                <SailorsForm
                    sailor={editing}
                    onSuccess={() => {
                        setEditing(null);
                        setRefresh(!refresh);
                    }}
                    onCancel={() => setEditing(null)}
                />
            ) : (
                <SailorsTable key={refresh} onEdit={setEditing} />
            )}
        </div>
    );
}
