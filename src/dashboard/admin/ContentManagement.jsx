import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BlogContent from "./BlogContent";
import { AuthContext } from "../../context/AuthContext";

const ContentManagement = () => {

    const { userRole } = useContext(AuthContext)
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}blogs`)
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    const filteredBlogs = filter === "all" ? blogs : blogs.filter(blog => blog.status === filter);

    const handleDelete = id => {
        fetch(`${import.meta.env.VITE_server}blogs/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => setBlogs(prev => prev.filter(blog => blog._id !== id)));
    };

    const togglePublish = (id, status) => {
        const newStatus = status === "draft" ? "published" : "draft";
        fetch(`${import.meta.env.VITE_server}blogs/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(res => res.json())
            .then(() =>
                setBlogs(prev =>
                    prev.map(blog => (blog._id === id ? { ...blog, status: newStatus } : blog))
                )
            );
    };

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Content Management 📝</h2>
                <button
                    onClick={() => navigate("/dashboard/content-management/add-blog")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Blog
                </button>
            </div>

            <div className="mb-4">
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBlogs.map(blog => (
                    <div key={blog._id} className="border p-4 rounded shadow-sm space-y-2">
                        <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover rounded" />
                        <h3 className="text-lg font-bold">{blog.title}</h3>
                        <p className="text-sm text-gray-500">Status: {blog.status}</p>


                        <BlogContent content={blog.content} />


                        {
                            userRole.role === "admin" &&
                            <div className="flex justify-between">
                                <button
                                    // disabled={userRole.role === "volunteer"}
                                    onClick={() => togglePublish(blog._id, blog.status)}
                                    className="px-3 py-1 text-white bg-green-500 rounded"
                                >
                                    {blog.status === "draft" ? "Publish" : "Unpublish"}
                                </button>
                                <button
                                    // disabled={userRole.role === "volunteer"}
                                    onClick={() => handleDelete(blog._id)}
                                    className="px-3 py-1 text-white bg-red-500 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentManagement;
