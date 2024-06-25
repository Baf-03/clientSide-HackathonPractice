// src/components/ImageUpload.js
import  { useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filePreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
  };

  const removeImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('images', file);
    }

    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/api/uploadimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrls(res.data.data);
      toast.success('Images uploaded successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Reset form
      setFiles([]);
      setImagePreviews([]);
      setLoading(false);

    } catch (error) {
      console.error('Error uploading images', error);
      toast.error('Error uploading images', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Upload Images</h1>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="images">
            Select Images ({files.length} file{files.length !== 1 && 's'} selected)
          </label>
          <input
            type="file"
            id="images"
            multiple
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-auto rounded-md"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                  onClick={() => removeImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleUpload}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {imageUrls.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Uploaded Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-auto rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

