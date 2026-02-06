import { useEffect, useState } from "react";
import API from "../api";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const LIMIT = 3; // blogs per page

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/posts?search=${search}&page=${page}&limit=${LIMIT}`
      );
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchBlogs();
  };

  return (
    <div>
      {/* 🔍 Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading blogs...</p>}
      {!loading && blogs.length === 0 && <p>No blogs found</p>}

      {blogs.map(blog => (
        <div className="blog" key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>

          <div className="tags">
            {blog.tags?.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      ))}

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={blogs.length < LIMIT}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogList;
