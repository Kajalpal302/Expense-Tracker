import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Append image file to form FormData
    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set header for file upload
            },
        });
        return response.data; // Return response data
    } catch (error) {
        console.error('Error while uploading the image:', error);
        throw error;
    }
};

export default uploadImage;