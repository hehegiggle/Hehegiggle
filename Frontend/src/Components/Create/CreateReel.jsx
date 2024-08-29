import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Box, Flex, Icon, useToast } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCard from "../Spinner/Spinner";
import { createReel } from "../../Redux/Reel/Action";
import { uploadMediaToCloudinary } from "../../Config/UploadVideoToCloudnary";
import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";

const CreateReelModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [caption, setCaption] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [videoUrl, setVideoUrl] = useState();
  const [postData, setPostData] = useState({
    video: "",
    caption: "",
  });

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    const maxSize = 20 * 1024 * 1024; //Max size of video file is 20MB (30 * 1024 * 1024 converts MB's to bytes (MB * KB * byte))

    if (file.size > maxSize) {
      toast({
        title: "Video size exceeds the limit of 20 MB.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

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

  const handleEmojiClick = (emojiObject) => {
    setCaption((prevCaption) => prevCaption + emojiObject.emoji);
    setPostData((prevValues) => ({
      ...prevValues,
      caption: prevValues.caption + emojiObject.emoji,
    }));
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
    setShowEmojiPicker(false);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

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
            <Button
              onClick={handleSubmit}
              size={"sm"}
              variant="ghost"
              textColor="black"
            >
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
                    background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
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
                  <div style={{ position: "relative" }}>
                    <textarea
                      style={{
                        background: "transparent",
                        color: "black",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                      className="captionInput"
                      placeholder="Write a Caption..."
                      name="caption"
                      rows="1"
                      value={caption}
                      onChange={handleCaptionChange}
                    />
                    <Icon
                      mb="3"
                      as={GrEmoji}
                      boxSize={6}
                      ml="5%"
                      cursor="pointer"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                      }}
                    />
                  </div>
                </div>

                {showEmojiPicker && (
                  <Box
                    ref={emojiPickerRef}
                    position="absolute"
                    bottom="50px"
                    right="10px"
                    zIndex="999"
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </Box>
                )}
              </div>

              <div className="w-full flex flex-col justify-center items-center mb-2">
                {isImageUploaded === "" && (
                  <div
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo
                        size={"4rem"}
                        className={`text-3xl ${isDragOver ? "text-800" : ""}`}
                      />
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
