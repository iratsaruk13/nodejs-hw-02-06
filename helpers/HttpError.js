// функція створює новий об'єкт, тому краще називати її з великої літери

const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

export default HttpError;
