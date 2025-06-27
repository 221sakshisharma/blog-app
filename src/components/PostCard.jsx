import { Link } from 'react-router-dom';
import service from '../appwrite/service';

const PostCard = ({ $id, title, thumbnail, slug, category = "General", $createdAt}) => {
  const formattedDate = new Date($createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link to={`/post/${slug}-${$id}`}>
      <div className="flex flex-col bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow duration-300">
        
        {/* Thumbnail */}
        <div className="relative h-56 m-2.5 overflow-hidden rounded-md">
          <img
            src={service.getFilePreview(thumbnail)}
            alt={title}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <div className="mb-2 rounded-full bg-cyan-500 py-0.5 px-2.5 text-xs text-white w-fit">
            {category || "Uncategorized"}
          </div>

          {/* Title */}
          <h6 className="mb-1 text-slate-800 text-lg font-semibold line-clamp-2">
            {title}
          </h6>

          {/* Date */}
          <p className="text-sm text-slate-500">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
