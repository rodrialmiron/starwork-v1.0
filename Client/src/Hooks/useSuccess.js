const useSuccess = (response) => {
  try {
    const successMesage = response.data.message;
    return successMesage;
  } catch (error) {
    console.error(error);
  }
};

export default useSuccess;
