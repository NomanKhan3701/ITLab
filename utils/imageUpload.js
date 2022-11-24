const { cloudinary } = require("./cloudinary");

const getImages =async() => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:dev_setups")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    return publicIds;
  } catch (error) {
    console.error(error);
  }
};

const addImage = async (img) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(img, {
      upload_preset: "dev_setups",
      quality: "auto",
      fetch_format: "auto",
      dpr: "auto",
      width: "auto",
    });
   data={
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.url,
    };
    //console.log(data)
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteImage = async (public_id) => {
  try {
    const deleted = await cloudinary.uploader.destroy(
      public_id,
      function (result) {
        console.log(result);
      }
    );
    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getImages,
  addImage,
  deleteImage,
};
