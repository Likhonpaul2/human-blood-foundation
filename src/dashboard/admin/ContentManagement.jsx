import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BlogContent from "./BlogContent";
import { AuthContext } from "../../context/AuthContext";

const ContentManagement = () => {
  const { userRole } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((blog) => blog.status === filter);

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_server}blogs/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => setBlogs((prev) => prev.filter((blog) => blog._id !== id)));
  };

  const togglePublish = (id, status) => {
    const newStatus = status === "draft" ? "published" : "draft";
    fetch(`${import.meta.env.VITE_server}blogs/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() =>
        setBlogs((prev) =>
          prev.map((blog) =>
            blog._id === id ? { ...blog, status: newStatus } : blog
          )
        )
      );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Content Management 📝</h2>
        <button
          onClick={() => navigate("/dashboard/content-management/add-blog")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Add Blog
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="filter" className="block mb-1 text-sm font-medium text-gray-700">
          Filter by status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-60 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded-lg shadow-sm bg-white flex flex-col justify-between"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Status: {blog.status}</p>

            <div className="mb-4">
              <BlogContent content={blog.content} />
            </div>

            {userRole?.role === "admin" && (
              <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                <button
                  onClick={() => togglePublish(blog._id, blog.status)}
                  className="flex-1 px-3 py-2 text-white bg-green-600 hover:bg-green-700 rounded text-sm transition"
                >
                  {blog.status === "draft" ? "Publish" : "Unpublish"}
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded text-sm transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
