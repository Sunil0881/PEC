import React, { useState } from "react";
import { ethers } from "ethers";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { ADDPRODUCTS } from "../ContractIntegration";
import Button from "../Components/Navbar";


const Sell = () => {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    alert("Button Clicked");
    e.preventDefault();

    // Upload image to Firebase Storage
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(storage, image.name);
      await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      const downloadURLString = downloadURL.toString();

      console.log("Download URL:", downloadURLString);

      // Convert price to the appropriate format
      const formattedPrice = ethers.utils.parseEther(price).toString();
  
      // Call smart contract function with Firebase download URL and formatted price
      const tokenId = await ADDPRODUCTS({
        productName,
        category,
        description,
        price: formattedPrice, // Pass formatted price
        downloadURLString // Pass Firebase download URL as imageURL
      });
      console.log(tokenId)
      
      // Rest of your code...
    } else {
      alert("Please select an image.");
    }

    console.log({
      productName,
      category,
      description,
      price,
      
    });
  };
  return (
    <div className="h-screen bg-green-200 font-serif">
      <Button />
      <div className="flex items-center justify-center pt-32 ">
        <div className="max-w-md w-full space-y-2">
          <label htmlFor="product_name" className="font-semibold text-md">
            Product Name:
          </label>
          <br />
          <input
            className="border-black border-2 rounded-md px-3 py-1 w-full"
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="category" className="font-semibold text-md">
            Category:
          </label>
          <br />
          <select
            className="border-black border-2 rounded-md px-3 py-1 w-full"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="vehicle">Vehicle</option>
            <option value="dress">Dress</option>
            <option value="mobile">Mobile</option>
            <option value="furniture">Furniture</option>
          </select>
          <br />
          <br />

          <label htmlFor="description" className="font-semibold text-md">
            Description:
          </label>
          <br />
          <textarea
            className="border-black border-2 rounded-md px-3 py-1 w-full"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="1"
            required
          ></textarea>
          <br />
          <br />

          <label htmlFor="price" className="font-semibold text-md">
            Price:
          </label>
          <br />
          <input
            className="border-black border-2 rounded-md px-3 py-1 w-full"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
          <br />
          <br />

          <label className="font-semibold text-md">Upload Image:</label>
          <br />
          <input
            className="border-black border-2 bg-white w-full rounded-md"
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
          <br />
          <br />

          <div className=" flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-xl font-bold px-10 py-2 bg-green-600 hover:shadow-2xl text-white rounded-md hover:bg-green-500"
            >
              Submit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;