import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = async e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setThumbnail(data.data.url);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const blog = { title, thumbnail, content, status: "draft" };

    fetch(`${import.meta.env.VITE_server}blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(res => res.json())
      .then(() => {
        navigate("/dashboard/content-management");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <label htmlFor="" className="font-bold ">Upload Thumbnail</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="border border-black p-2 rounded-2xl ml-3"
          accept="image/*"
          required
        />
        {thumbnail && <img src={thumbnail} alt="Thumbnail" className="w-48 h-28 object-cover mt-2 rounded" />}

        <JoditEditor
          ref={editor}
          value={content}
          onChange={newContent => setContent(newContent)}
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
