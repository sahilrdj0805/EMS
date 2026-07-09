import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Loader2Icon, PlusIcon, Trash2Icon } from 'lucide-react';

const Departments = () => {
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDeptName, setNewDeptName] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const { data } = await api.get("/departments");
            setDepartments(data);
        } catch (error) {
            toast.error("Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        if (!newDeptName.trim()) return;
        setAdding(true);
        try {
            const { data } = await api.post("/departments", { name: newDeptName });
            setDepartments([...departments, data.department].sort((a, b) => a.name.localeCompare(b.name)));
            setNewDeptName("");
            toast.success("Department added successfully");
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to add department");
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department? Employees in this department won't be deleted, but they will keep their old department string.")) {
            return;
        }
        try {
            await api.delete(`/departments/${id}`);
            setDepartments(departments.filter((d) => d._id !== id));
            toast.success("Department deleted");
        } catch (error) {
            toast.error("Failed to delete department");
        }
    };

    if (user?.role !== "ADMIN") {
        return <div className="text-center py-12">Access Denied</div>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2Icon className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Departments</h1>
                <p className="text-slate-500 text-sm mt-1">Manage organization departments dynamically.</p>
            </div>

            <div className="card p-5 sm:p-6">
                <form onSubmit={handleAddDepartment} className="flex gap-4 items-end mb-8">
                    <div className="flex-1 max-w-sm">
                        <label className="block mb-2 text-sm font-medium text-slate-700">Add New Department</label>
                        <input
                            type="text"
                            placeholder="e.g. Artificial Intelligence"
                            value={newDeptName}
                            onChange={(e) => setNewDeptName(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                    <button type="submit" disabled={adding || !newDeptName.trim()} className="btn-primary h-[42px] px-6">
                        {adding ? <Loader2Icon className="w-5 h-5 animate-spin" /> : <PlusIcon className="w-5 h-5" />}
                        <span className="ml-2">Add</span>
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th className="px-6 py-4">Department Name</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="text-center py-12 text-slate-400">
                                        No departments found
                                    </td>
                                </tr>
                            ) : (
                                departments.map((dept) => (
                                    <tr key={dept._id}>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {dept.name}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(dept._id)}
                                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2Icon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Departments;
