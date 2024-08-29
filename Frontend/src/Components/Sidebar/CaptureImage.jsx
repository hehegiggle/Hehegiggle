import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { RiCameraLensFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

export default function CaptureImage({ isOpen, onClose, onImageCaptured }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isUploadingDisabled, setIsUploadingDisabled] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start the webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing webcam: ", err);
    }
  };

  // Capture the image from the webcam
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/png");
    setImageSrc(imageDataUrl);
    setIsUploadingDisabled(false);
  };

  // Handle close and cleanup
  const handleClose = () => {
    onClose();
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  // Handle retake picture
  const handleRetake = () => {
    setImageSrc(null);
    setIsUploadingDisabled(true);
    startWebcam();
  };

  // Handle image uploading
  const handleUpload = () => {
    onImageCaptured(imageSrc);
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      startWebcam();
    }
  }, [isOpen]);

  return (
    <Modal size={"3xl"} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent
        fontSize={"sm"}
        style={{
          borderRadius: "20px",
          background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
          width: "60%",
          height: "80%",
          maxHeight: "95vh",
          overflowY: "hidden",
        }}
      >
        <div className="flex justify-between py-1 px-10 items-center text-white">
          <p>Capture Image</p>
          <Button
            size={"sm"}
            variant="ghost"
            textColor="black"
            isDisabled={isUploadingDisabled}
            onClick={handleUpload}
          >
            Start Uploading
          </Button>
        </div>
        <hr className="hrLine" />
        <ModalBody>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <video
              ref={videoRef}
              style={{ width: "80%", borderRadius: "10px" }}
            ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="Captured"
                position="absolute"
                top="0"
                left="4.5rem"
                width="80%"
                height="auto"
                borderRadius="10px"
                zIndex="1"
                objectFit="cover"
              />
            )}
          </Box>
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box display="flex" alignItems="center">
            {imageSrc && (
              <Tooltip label="Retake Picture" placement="top">
                <Box position="relative">
                  <MdDelete
                    size={"3rem"}
                    color="#8697C4"
                    onClick={handleRetake}
                    _hover={{ bg: "#6a7b99" }}
                    cursor="pointer"
                    style={{ marginRight: "1rem" }}
                  />
                </Box>
              </Tooltip>
            )}
            <Tooltip label="Take Picture" placement="top">
              <Box position="relative">
                <RiCameraLensFill
                  size={"3rem"}
                  color="#8697C4"
                  onClick={imageSrc ? null : captureImage}
                  _hover={{ bg: imageSrc ? "transparent" : "#6a7b99" }}
                  cursor={imageSrc ? "not-allowed" : "pointer"}
                  opacity={imageSrc ? 0.5 : 1}
                />
              </Box>
            </Tooltip>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
