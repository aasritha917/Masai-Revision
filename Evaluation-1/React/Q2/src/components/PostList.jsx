export default function PostList({posts, loading, userSelected}){
    if(!userSelected)
        return <p> Please select a user to view Posts</p>
    if(loading) 
        return <p>Loading Posts....</p>

    return (
        <>
        <p>Total Posts: {posts.length}</p>
        {posts.map(post =>(
            <div key ={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ))}
        </>
    )
}