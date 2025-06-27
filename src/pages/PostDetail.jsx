import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import service from '../appwrite/service';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { postid } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  const lastDashIndex = postid.lastIndexOf("-");
  const documentId = postid.substring(lastDashIndex + 1);

  useEffect(() => {
    service.getPost(documentId)
      .then((fetchedPost) => {
        if (fetchedPost) setPost(fetchedPost);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [documentId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await service.deletePost(post.$id);
      navigate("/my-space", { replace: true });
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!post) return null;

  const isAuthor = user?.$id === post.userid;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Thumbnail */}
      <div className="rounded-md overflow-hidden shadow-sm">
        <img
          src={service.getFilePreview(post.thumbnail)}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Title & Metadata */}
      
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{post.title}</h1>

<div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-4 gap-y-1">
  <div>Category: {post.category}</div>

  {!isAuthor && (
    <div>
      Author: <a href={`mailto:${post.userEmail}`} className="hover:underline">
        {post.userEmail}
      </a>
    </div>
  )}

  <div>
    Posted: {new Date(post.$createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })}
  </div>
</div>

      

      {/* Content */}
      <article className="prose prose-lg max-w-none text-gray-700">
        {parse(post.content)}
      </article>

      {/* Author Options */}
      {isAuthor && (
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => navigate(`/edit-post/${post.slug}-${post.$id}`)}
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
