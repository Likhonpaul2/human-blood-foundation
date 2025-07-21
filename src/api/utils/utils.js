import axios from "axios";

export const imageUpload = async imageData => {
    const imageFormData = new FormData();
    imageFormData.append("image", imageData)

    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`, imageFormData)
     return data?.data?.display_url;

    
}