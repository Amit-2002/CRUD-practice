import { useEffect, useState } from "react"
import { deletePost, getPosts } from "../api/PostApi"
import { From } from "./Form"

export const Posts = () => {
    const [data, setData] = useState()

    const getPostsData = async () => {
        const response = await getPosts();
        console.log(response);

        setData(response.data);    
    }

    useEffect(()=>{
        getPostsData();
    }, [])

    // useEffect(()=>{console.log(data)},[data]) to check how data is deletting

    // function to delete post
    const handleDeletePost = async (id) => {
        try {
            const response = await deletePost(id);

            if(response.status === 200){
            const newUpdatedPosts = data.filter((curPost) => {
                return curPost.id !== id;
            })

            // const update = await getPosts();
            console.log(update);
            

            setData(newUpdatedPosts);
            
        }
        } catch (error) {
            console.log(error); 
        }
    }


    if(data){
        return (
            <>
                <section>
                    <From data={data} setData={setData}/>
                </section>

                <h1>Posts</h1>
                <section>
                    <ul>
                        {
                            data.map((cur) => {
                                const {id, title, body} = cur;
                                return <li key={id}>
                                    <h4>{id}</h4>
                                    <p>{title}</p>
                                    <p>{body}</p>
                                    <button>Edit</button>
                                    <button onClick={() => {
                                        handleDeletePost(id)
                                    }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                </section>
            </>
        )
    }
}