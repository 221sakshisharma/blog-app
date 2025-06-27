import { useEffect, useState } from "react";
import service from "../appwrite/service";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import {PostCard} from "../components"; // Make sure the path is correct

const AllPosts = () => {
  const user = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", // Default option
  "Technology",
  "Lifestyle",
  "Finance",
  "Health",
  "Education",
  "Entertainment"]

  useEffect(() => {
    service
      .getPosts([Query.equal("status", true), Query.notEqual("userid", user.$id)])
      .then((data) => {
        if (data) setPosts(data.documents);
      });
  }, []);

  const filteredPosts =
    categoryFilter === "All"
      ? posts
      : posts.filter((post) => post.category === categoryFilter);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <select
          className="border text-sm rounded py-1 pl-1 border-gray-300 focus:outline-none"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.$id}
            $id={post.$id}
            title={post.title}
            slug={post.slug}
            thumbnail={post.thumbnail}
            category={post.category}
            $createdAt={post.$createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
