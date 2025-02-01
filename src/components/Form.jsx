import { useState } from "react"
import { post } from "../api/PostApi";

export const From = ({data, setData}) => {
    const [addData, setAddData] = useState({
        title: '',
        body: ''
    })


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

    const handleSubmit = (e) => {
        e.preventDefault(); 
        addPost();
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

                <button type="submit">Submit</button>
            </form>
        </>
    )
}