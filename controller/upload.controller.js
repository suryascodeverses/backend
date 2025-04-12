const server_url = process.env.SERVER_URL;
exports.fileUpload = async (req, res, next) => {
  try {
    // res.status(200).json(req.file);
    res.status(200).json({
      status: "success",
      message: "uploaded successfully!",
      data: {
        url: `${server_url}/${req.file.destination}/${req.file.filename}`,
        id: req.file.filename,
      },
    });
  } catch (error) {
    next(error);
  }
};
