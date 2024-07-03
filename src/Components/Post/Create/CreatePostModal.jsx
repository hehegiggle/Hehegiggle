import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import SpinnerCard from "../../Spinner/Spinner";

const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const toast = useToast();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    
  }, [file]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile.type.startsWith("image/") ||
      droppedFile.type.startsWith("video/")
    ) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {

    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFile(file);
      setIsImageUploaded("uploading");
      const url = await uploadToCloudinary(file);
      setPostData((prevValues) => ({ ...prevValues, image: url }));
      setIsImageUploaded("uploaded");
    } else {
      setFile(null);
      alert("Please select an image/video file.");
    }
  };

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      data: postData,
    };
    if (token && postData.image) {
      dispatch(createPost(data));
      handleClose();
      toast({
        title: "Posted successfully 🙂‍↕️🙂‍↕️🙂‍↕️",
        status: "success",
        duration: 1000,
        isClosable: true,
      })
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setIsDragOver(false);
    setPostData({ image: "", caption: "", location: "" });
    setIsImageUploaded("");
  };

  return (
    <div>
      <Modal
        size={"4xl"}
        className=""
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent
          fontSize={"sm"}
          style={{
            borderRadius: "20px",
            background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
          }}
        >
          <div className="flex justify-between py-1 px-10 items-center text-white">
            <p>Create New Post</p>
            <Button
              onClick={handleSubmit}
              className="inline-flex"
              size={"sm"}
              variant="ghost"
            >
              Upload Post
            </Button>
          </div>

          <hr className="hrLine" />

          <ModalBody>
            <div className="modalBodyBox flex h-[70vh] justify-between">
              <div className="w-[50%] flex flex-col justify-center items-center">
                {isImageUploaded === "" && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo
                        className={`text-3xl ${
                          isDragOver ? "text-800" : ""
                        }`}
                      />
                      <p>Drag photos here </p>
                    </div>

                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                      style={{ borderRadius: "20px", backgroundColor: "#8697C4" }}
                    >
                      Select Post
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      multiple
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                )}

                {isImageUploaded === "uploading" && <SpinnerCard />}

                {isImageUploaded === "uploaded" && (
                  <img
                    className=""
                    src={postData.image}
                    alt="dropped-img"
                    style={{ borderRadius: "20px" }}
                  />
                )}
              </div>
              <div className="w-[50%]">
                <div
                  style={{
                    background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
                    borderRadius: "20px",
                  }}
                  className="card bg-white shadow-md rounded px-4 py-2 mb-4"
                >
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={
                        user?.reqUser?.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt=""
                      style={{objectFit:"cover"}}
                    />{" "}
                    <p className="font-semibold ml-4">
                      {user?.reqUser?.username}
                    </p>
                  </div>
                </div>

                <div
                  className="card bg-white shadow-md rounded px-4 py-2 mb-4"
                  style={{ borderRadius: "20px", background: "linear-gradient(135deg, #8697C4, #EDE8F5)"}}
                >
                  <div className="px-2">
                    <textarea
                    style={{background: "linear-gradient(135deg, #8697C4, #EDE8F5)", color:"black"}}
                      className="captionInput"
                      placeholder="Write a Caption..."
                      name="caption"
                      rows="12"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-between px-2">
                    <p className="opacity-70">
                      {postData.caption?.length}/2,200
                    </p>
                  </div>
                </div>

                <div
                  className="card bg-white shadow-md rounded px-4 py-2 mb-4"
                  style={{ borderRadius: "20px", background: "linear-gradient(135deg, #8697C4, #EDE8F5)"}}
                >
                  <div className="p-2 flex justify-between items-center">
                    <input
                    style={{ background: "linear-gradient(120deg, #8697C4, #EDE8F5)", borderRadius:"20px"}}
                      className="locationInput"
                      type="text"
                      placeholder="Add Location"
                      name="location"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
