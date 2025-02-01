import { useEffect, useState } from "react"
import { post, updateData } from "../api/PostApi";

export const From = ({data, setData, updatePost, setUpdatePost}) => {
    const [addData, setAddData] = useState({
        title: '',
        body: ''
    })

    let isEmpty = Object.keys(updatePost).length === 0;


    useEffect(()=>{
        updatePost && setAddData({
            title: updatePost.title || '',
            body: updatePost.body || ''
        })
    },[updatePost])


    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            // console.log(prev)
            return{
                ...prev,
                [name]:value,
            }; 
        })
    }

    const addPost = async () => {
        const res = await post(addData);
        console.log("res->", res);
        
        if (res.status === 201){
            setData([...data, res.data])
            setAddData({title: "", body: ""}); 
        }
    }

    // function to update post
    const updatePostData = async () => {
       try {
        const response = await updateData(updatePost.id, addData);
        console.log(response);

        if(response.status === 200){
            setData((prev) => {
                return prev.map((curEle) => {
                    return curEle.id === response.data.id ? response.data : curEle;
                })
            })
            setAddData({title: "", body: ""});
            setUpdatePost({});
        }
       } 
       catch (error) {
        console.log(error);
       }
    }


    const handleSubmit = (e) => {
        e.preventDefault(); 
        const action = e.nativeEvent.submitter.value;

        if(action === 'Add'){
            addPost();
        }
        else if(action === 'Edit'){
            updatePostData();
        }   
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text"
                id="title"
                name="title"
                placeholder="Add Title"
                value={addData.title}
                onChange={handleInputChange}
                />

                <label htmlFor="body">Body:</label>
                <input type="text"
                id="body"
                name="body"
                placeholder="Add post"
                value={addData.body}
                onChange={handleInputChange}
                />

                <button type="submit" value={isEmpty ? 'Add' : 'Edit'}>
                    {isEmpty ? "Add" : "Edit"}
                </button>
            </form>
        </>
    )
}