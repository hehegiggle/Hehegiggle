import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { FaPhotoVideo } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCard from "../Spinner/Spinner";
import { createReel } from "../../Redux/Reel/Action";
import { uploadMediaToCloudinary } from "../../Config/UploadVideoToCloudnary";

const CreateReelModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [caption, setCaption] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [videoUrl, setVideoUrl] = useState();
  const [postData, setPostData] = useState({
    video: "",
    caption: ""
  });

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
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
      toast({
        title: "Only videos can be uploaded.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    setPostData((prevValues) => ({ ...prevValues, caption: e.target.value }));
  };

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      reelData: postData,
    };
    if (token && postData.video) {
      await dispatch(createReel(data));
      handleClose();
      toast({
        title: "Reel Posted successfully 🙂‍↕️🙂‍↕️🙂‍↕️",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setIsDragOver(false);
    setPostData({ video: "", caption: "" });
    setIsImageUploaded("");
    setCaption("");
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
        <ModalContent
          fontSize={"sm"}
          style={{
            borderRadius: "20px",
            background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
            width: "60%",
            height: "85%",
            maxHeight: "82vh",
            overflowY: "hidden",
          }}
        >
          <div className="flex justify-between py-1 px-10 items-center text-white">
            <p>Create New Reel</p>
            <Button onClick={handleSubmit} size={"sm"} variant="ghost" textColor="black">
              Upload Reel
            </Button>
          </div>

          <hr className="hrLine" />

          <ModalBody style={{ overflowY: "auto" }}>
            <div className="modalBodyBox flex flex-col justify-start items-center">
              <div className="w-full">
                <div
                  className="card bg-white shadow-md rounded px-4 py-2 mb-5"
                  style={{
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #8697C4, #EDE8F5)"
                  }}
                >
                  <div className="flex items-center px-2">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={
                        user?.reqUser?.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                    <p className="font-semibold ml-4">
                      {user?.reqUser?.username}
                    </p>
                  </div>
                  <textarea
                    style={{ background: "transparent", color: "black", width: "100%", borderRadius: "10px" }}
                    className="captionInput"
                    placeholder="Write a Caption..."
                    name="caption"
                    rows="1"
                    value={caption}
                    onChange={handleCaptionChange}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col justify-center items-center mb-2">
                {isImageUploaded === "" && (
                  <div
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo
                        className={`text-3xl ${isDragOver ? "text-800" : ""}`}
                      />
                      <p>Drag videos here</p>
                    </div>

                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "#8697C4",
                      }}
                    >
                      Select Reel
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="video/*"
                      multiple
                      onChange={handleOnChange}
                    />
                  </div>
                )}

                {isImageUploaded === "uploading" && <SpinnerCard />}
                {postData.video && (
                  <div className="w-full flex justify-center">
                    <video
                      width="30%"
                      height="35%"
                      controls
                      className="object-contain"
                      style={{ borderRadius: "20px" }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateReelModal;