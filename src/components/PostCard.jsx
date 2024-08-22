
import PropTypes from 'prop-types';
import service from '../appwrite/config'; // Import the service instance
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    // Use service to get the file preview URL
    const imageUrl = featuredImage ? service.getFilePreview(featuredImage) : '/path/to/placeholder-image.jpg';

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img 
                        src={imageUrl} 
                        alt={title || 'Post Image'} 
                        className='rounded-xl' 
                    />
                </div>
                <h2 className='text-xl font-bold'>{title || 'Untitled Post'}</h2>
            </div>
        </Link>
    );
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string,
};

export default PostCard;
