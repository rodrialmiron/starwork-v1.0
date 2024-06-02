const useError = (error) => {
  try {
    const errorMessage = error.response.data.error;
    return errorMessage;
  } catch (error) {
    console.error(error);
  }
};

export default useError;
