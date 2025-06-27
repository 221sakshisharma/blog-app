import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import service from "../appwrite/service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RTE from "./RTE";

const PostForm = ({
  post,
  categories = [
    "Technology",
    "Lifestyle",
    "Finance",
    "Health",
    "Education",
    "Entertainment",
  ],
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      thumbnail: "",
      title: "",
      content: "",
      category: "",
    },
  });

  // When post data is available, reset the form values
  useEffect(() => {
    if (post) {
      reset({
        thumbnail: post.thumbnail || "",
        title: post.title || "",
        content: post.content || "",
        category: post.category || "",
      });
    }
  }, [post, reset]);

  const [selectedImage, setSelectedImage] = useState("");
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const onSubmit = async (data) => {
    try {
      let thumbnailId = data.thumbnail;

      if (fileInputRef.current?.files[0]) {
        const uploadedFile = await service.uploadFile(fileInputRef.current.files[0]);
        thumbnailId = uploadedFile.$id;
      }

      const slug = generateSlug(data.title);

      const postData = {
        title: data.title,
        content: data.content,
        thumbnail: thumbnailId,
        category: data.category,
        slug,
        status: data.status,
        userid: user.$id,
        userEmail: user.email,
      };

      if (post) {
        await service.updatePost(post.$id, postData);
      } else {
        await service.createPost(postData);
      }

      navigate("/my-space", { replace: true });
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Enter title"
          className="w-full border-b px-2 py-2 text-xl border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400"
          {...register("title", { required: true })}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
      </div>

      {/* Thumbnail Upload */}
      <div className="w-full">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              setSelectedImage(URL.createObjectURL(file));
              setValue("thumbnail", file); // manually set thumbnail for submission
            }
          }}
        />
        <div
          className="relative w-full aspect-[3/1.2] cursor-pointer border border-dashed border-gray-300 hover:border-gray-400 transition-colors rounded-md"
          onClick={() => fileInputRef.current?.click()}
        >
          {(selectedImage || post?.thumbnail) ? (
            <img
              src={selectedImage || service.getFilePreview(post.thumbnail)}
              alt="Thumbnail"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <FiPlus className="text-4xl text-gray-400 mb-2" strokeWidth={0.8} />
              <p className="text-sm text-gray-500">Click to upload thumbnail</p>
            </div>
          )}
        </div>
        {errors.thumbnail && (
          <p className="text-red-500 text-sm mt-1">Thumbnail is required</p>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="w-full">
        <select
          {...register("category", { required: true })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">Category is required</p>}
      </div>

      {/* Rich Text Editor */}
      <div className="w-full">
        <RTE
          name="content"
          control={control}
          defaultValue={post?.content || ""}
          rules={{ required: "Content is required" }}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-end pt-2">
        {!post && (
          <button
            type="button"
            onClick={() => handleSubmit((data) => onSubmit({ ...data, status: false }))()}
            className="px-6 py-2 bg-amber-400 text-white rounded hover:bg-amber-500 transition-colors"
          >
            Save Draft
          </button>
        )}
        <button
          type="button"
          onClick={() => handleSubmit((data) => onSubmit({ ...data, status: true }))()}
          className="px-6 py-2 bg-teal-400 text-white rounded hover:bg-teal-500 transition-colors"
        >
          {post ? "Update" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/my-space")}
          className="px-6 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
