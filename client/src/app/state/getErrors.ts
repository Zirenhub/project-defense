export const getErrors = (error: any) => {
  if (error.error.errors) {
    return { validationErrors: error.error.errors };
  }
  if (error.error.message) {
    return { error: error.error.message };
  }
  return { error: 'Unknown error' };
};
