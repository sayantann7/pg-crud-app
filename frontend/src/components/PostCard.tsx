
function PostCard(props) {
  return (
    <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 w-full text-black">
        <h3 className='text-lg'>@{props.tweet.username}</h3>
        <p>{props.tweet.content}</p>
    </div>
  )
}

export default PostCard