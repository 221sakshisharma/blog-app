import {useState, useEffect} from 'react'
import {PostForm} from '../components'
import { useParams } from 'react-router-dom'
import service from '../appwrite/service'

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { postid } = useParams()

    const lastDashIndex = postid.lastIndexOf("-");
    const documentId = postid.substring(lastDashIndex + 1);

    useEffect(() => {
        service.getPost(documentId)
            .then((fetchedPost) => {
                console.log("Fetched post:", fetchedPost);
                if (fetchedPost) setPost(fetchedPost);
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });
    }, [documentId]);

    return (
        <>
            <div className="m-2 mb-8">
                <PostForm post={post}/>
            </div>
        </>
    )
}

export default EditPost