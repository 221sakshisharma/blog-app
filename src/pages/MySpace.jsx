import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {PostCard} from '../components';
import service from '../appwrite/service';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const MySpace = () => {
  const user = useSelector((state) => state.auth.userData);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Fetch published posts
    service
      .getPosts([Query.equal('status', true), Query.equal('userid', user.$id)])
      .then((res) => {
        if (res) {
          setPublishedPosts(res.documents);
        }
      });

    // Fetch drafts
    service
      .getPosts([Query.equal('status', false), Query.equal('userid', user.$id)])
      .then((res) => {
        if (res) setDraftPosts(res.documents);
      });
  }, [user]);

  return (
    <div className="w-full px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">My Space</h1>
        <button
          onClick={() => navigate('/create-post')}
          className="px-2 py-1 bg-amber-300 text-white rounded hover:bg-amber-400 transition"
        >
          + Create Post
        </button>
      </div>

      {/* Published Posts */}
      <h2 className="text-2xl text-gray-700 mb-4">Published Posts</h2>
      {publishedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
          {publishedPosts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-10">No published posts found.</p>
      )}

      {/* Drafts */}
      {draftPosts.length > 0 && (
        <>
          <h2 className="text-2xl text-gray-700 mb-4">Drafts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {draftPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MySpace;
