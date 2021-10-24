
import { useRef, useState } from "react";

const CreatePost = () => {

    const [formState, updateFormState] = useState({
        caption: ''
    });

    const fileInput = useRef();

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        updateFormState({
            ...formState,
            [name]: value
        });
    }

    const submit = (event) => {
        event.preventDefault();
        console.log(formState);
        console.log(fileInput.current.files);
        const formData = new FormData();
        formData.append("form", JSON.stringify(formData));
        formData.append("media", fileInput.current.files[0]);
        fetch('/create-post', {
            method: "post",
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then((res) => res.json()).then((resJson) => console.log(resJson));
    }

    return (
        <div className="createpost">
            <form className="createpost__form" onSubmit={submit}>
                <input className="createpost__form-caption" type="text" name="caption" value={formState.caption} onChange={handleFormChange}></input>
                <input className="createpost__form-file" type="file" ref={fileInput}></input>
                <button className="createpost__form-submit" type="submit">Submit</button>
            </form>
        </div>
        
    );
} 

export default CreatePost;