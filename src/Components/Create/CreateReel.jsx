import {
  Modal, ModalBody, ModalContent, ModalOverlay
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCard from "../Spinner/Spinner";
import { createReel } from "../../Redux/Reel/Action";
import {uploadMediaToCloudinary} from '../../Config/UploadVideoToCloudnary'

const CreateReelModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user, reels } = useSelector((store) => store);
  const [videoUrl, setVideoUrl] = useState();
  const [postData, setPostData] = useState({
    video: "",
    caption: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        setVideoUrl(reader.result);
      };

      setIsImageUploaded("uploading");
      const url = await uploadMediaToCloudinary(file);
      setPostData((prevValues) => ({ ...prevValues, video: url }));
      setIsImageUploaded("uploaded");
    } else {
      setFile(null);
      alert("Please select an image/video file.");
    }
  };

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      reelData: postData,
    };
    if (token && postData.video) {
      await dispatch(createReel(data));
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setIsDragOver(false);
    setPostData({ video: "", caption: "", location: "" });
    setIsImageUploaded("");
  };

  return (
    <div>
      <Modal
        size={"4xl"}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent fontSize={"sm"} style={{ borderRadius: "20px" }}>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Reel</p>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              size={"sm"}
              variant="ghost"
            >
              Upload Reel
            </Button>
          </div>

          <hr className="hrLine" />

          <ModalBody>
            <div className="modalBodyBox flex h-[70vh] justify-between">
              <div className="w-[50%] flex flex-col justify-center items-center">
                {isImageUploaded === "" && (
                  <div
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo className={`text-3xl ${isDragOver ? "text-blue-800" : ""}`} />
                      <p>Drag videos here</p>
                    </div>

                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                      style={{ borderRadius: "20px" }}
                    >
                      Select Reel
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      multiple
                      onChange={handleOnChange}
                    />
                  </div>
                )}

                {isImageUploaded === "uploading" && <SpinnerCard />}
                {postData.video && (
                  <video
                    width="60%"
                    height=""
                    controls
                    className="object-contain"
                    borderRadius="20px"
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="w-[50%]">
                <div className="card bg-white shadow-md rounded px-4 py-2 mb-4" style={{ borderRadius: "20px" }}>
                  <div className="flex items-center px-2">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={user?.reqUser?.image || "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"}
                      alt=""
                    />
                    <p className="font-semibold ml-4">{user?.reqUser?.username}</p>
                  </div>
                </div>

                <div className="card bg-white shadow-md rounded px-4 py-2 mb-4" style={{ borderRadius: "20px" }}>
                  <div className="px-2">
                    <textarea
                      className="captionInput"
                      placeholder="Write a caption..."
                      name="caption"
                      rows="12"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-between px-2">
                    <p className="opacity-70">{postData.caption?.length}/2,200</p>
                  </div>
                </div>

                <div className="card bg-white shadow-md rounded px-4 py-2 mb-4" style={{ borderRadius: "20px" }}>
                  <div className="p-2 flex justify-between items-center">
                    <input
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

export default CreateReelModal;
