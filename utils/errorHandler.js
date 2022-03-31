module.exports = (response, error) => {
  console.log('errorHandler')
  response.status(500).json({
    success: false,
    message: error.message ? error.message : error,
  });
};
