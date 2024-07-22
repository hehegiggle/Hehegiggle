export const uploadToCloudinary = async (file) => {
  if (!file) {
    console.log("No file provided");
    return;
  }

  const fileType = file.type.split("/")[0];
  let uploadUrl;

  if (fileType === "image") {
    uploadUrl = "https://api.cloudinary.com/v1_1/duniqmfnz/image/upload";
  } else if (fileType === "video") {
    uploadUrl = "https://api.cloudinary.com/v1_1/duniqmfnz/video/upload";
  } else {
    console.log("Unsupported file type");
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "hehegiggles");
  data.append("cloud_name", "duniqmfnz");

  try {
    const res = await fetch(uploadUrl, {
      method: "post",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Failed to upload file");
    }

    const fileData = await res.json();
    return fileData.url.toString();
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
