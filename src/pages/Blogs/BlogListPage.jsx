import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function BlogListPage() {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Example fetch, replace with your API URL or data source
        fetch(`${import.meta.env.VITE_server}api/blogs?status=published`)
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch(() => {
                // fallback dummy data if needed
                // setBlogs(data);
            });
    }, []);

    // Filter blogs by search term
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blogs</h1>

            {/* Optional Search */}
            <input
                type="text"
                placeholder="Search blogs..."
                className="border p-2 rounded w-full max-w-md mb-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {
                console.log(blogs)
            }

            {filteredBlogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="border rounded shadow p-4 hover:shadow-lg transition"
                        >
                            <img
                                src={blog.thumbnail}
                                alt={blog.title}
                                className="w-full h-40 object-cover rounded mb-3"
                            />
                            <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
                            <p className="text-gray-600 text-sm mb-2">{blog.snippet}</p>
                            <p className="text-gray-500 text-xs mb-3">
                                By {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                            <Link
                                to={`/blogs/${blog._id}`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Read More →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlogListPage;
