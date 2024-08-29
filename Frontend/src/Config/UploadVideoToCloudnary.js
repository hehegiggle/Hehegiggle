export const uploadMediaToCloudinary = async (media) => {
  if (media) {
    const data = new FormData();
    data.append("file", media);
    // Determine resource_type based on media type
    const resourceType = media.type.startsWith("image") ? "image" : "video";
    data.append("resource_type", resourceType);
    data.append("upload_preset", "hehegiggles");
    data.append("cloud_name", "duniqmfnz");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/duniqmfnz/${resourceType}/upload`,
        {
          method: "post",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to upload ${resourceType}: ${res.statusText}`);
      }
      const fileData = await res.json();
      return fileData.url.toString();
    } catch (error) {
      console.error("Error uploading media to Cloudinary:", error);
      // Handle error as per your application's needs
      return null;
    }
  } else {
    console.error("No media provided");
    return null;
  }
};
