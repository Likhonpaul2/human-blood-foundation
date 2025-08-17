import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

function BlogDetailPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Blog Details||Human Blood Foundation"
    }, [])
    useEffect(() => {
        // Replace with your API call: fetch blog by ID
        fetch(`${import.meta.env.VITE_server}api/blogs/${id}`)
            .then(res => res.json())
            .then((data) => {
                setBlog(data);
                setLoading(false);
            })
            .catch(() => {
                setBlog(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!blog)
        return (
            <div className="p-4">
                <p>Blog not found.</p>
                <Link to="/blogs" className="text-blue-600 hover:underline">
                    Back to blogs
                </Link>
            </div>
        );

    return (
        <div className="container mx-auto p-4 max-w-3xl min-h-screen pt-30">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-2">
                By {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {blog.thumbnail && (
                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full max-h-96 object-cover rounded mb-6"
                />
            )}
            <div className="prose max-w-full">{/* Assuming blog.content is HTML or markdown converted */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            <Link to="/blogs" className="inline-block mt-6 text-blue-600 hover:underline">
                ← Back to Blogs
            </Link>
        </div>
    );
}

export default BlogDetailPage;
