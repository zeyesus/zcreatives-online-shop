import React, { Fragment, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FormInput from "../form/formInput.component";
import {
  addProductItem,
  db,
  storage,
} from "../../utils/firebase/firebase.utils";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const defaultProductData = {
  productName: "",
  shortDescription: "",
  description: "",
  price: "",
  catagory: "",
  productImage: null,
};

const AddProductForm = () => {
  const [imageUpload, setimageUpload] = useState("");
  const [addFormData, setaddFormData] = useState(defaultProductData);
  const [uploadProgress, setuploadProgress] = useState("");

  const uploadFile = async (file) => {
    const name = new Date().getTime() + file.name;
    console.log(name);
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setuploadProgress(progress);

        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setaddFormData((prev) => {
            return { ...prev, ["productImage"]: downloadURL };
          });
        });
      }
    );
  };
  //////////////////////////////////////////////
  useEffect(() => {
    imageUpload && uploadFile(imageUpload);
  }, [imageUpload]);

  const {
    productName,
    shortDescription,
    description,
    price,
    catagory,
    productImage,
  } = addFormData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setaddFormData(() => {
      return { ...addFormData, [name]: value };
    });
  };

  console.log(addFormData);

  const handleFileUpload = (event) => {
    const fileUploaded = event.target.files[0];
    const acceptedFileTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (fileUploaded.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      event.target.value = "";
    } else if (!acceptedFileTypes.includes(fileUploaded.type)) {
      toast.error("File type must be in jpeg, png or svg");
      event.target.value = "";
    } else {
      // handle file upload
      setimageUpload(fileUploaded);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProductItem(addFormData);
    // console.log(addFormData);

    setaddFormData(defaultProductData);
    setimageUpload("");
    toast.success("successfuly add");
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mb-8 shadow-lg p-6 mx-auto  rounded-lg  mt-5"
      >
        <h2 className="text-2xl uppercase text-center">add product</h2>
        <FormInput
          label="Product name"
          name="productName"
          value={productName}
          onChange={handleChange}
          type="text"
          placeholder="Product name"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <FormInput
          label="Short descreption"
          name="shortDescription"
          value={shortDescription}
          onChange={handleChange}
          type="text"
          placeholder="short descreption"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <FormInput
          label="Descreption"
          name="description"
          value={description}
          onChange={handleChange}
          type="text"
          placeholder="Descreption..."
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <div className="flex items-center justify-between ">
          <FormInput
            label="Price"
            name="price"
            value={price}
            onChange={handleChange}
            type="number"
            placeholder="price"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
          />
          <div className="flex flex-col mt-4 ">
            <label>Catagory</label>
            <select
              name="catagory"
              value={catagory}
              onChange={handleChange}
              required
              className=" h-10 rounded-lg mt-2 focus:ring-2  focus:ring-yellow"
            >
              <option value="">Please choose catagory</option>
              <option value="t-shirt">T-shirt</option>
              <option value="hoodie">Hoodie</option>
              <option value="scarf">Scarf</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <FormInput
            label="Product Image"
            name="productImage"
            onChange={handleFileUpload}
            type="file"
            placeholder="Product Image"
            // required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
          />
        </div>
        <button
          disabled={uploadProgress !== null && uploadProgress < 100}
          className="disabled:bg-gray-400  btn-large  btn_hover bg-yellow mt-8 "
          type="submit"
        >
          Add Product
        </button>
      </form>
    </Fragment>
  );
};

export default AddProductForm;
