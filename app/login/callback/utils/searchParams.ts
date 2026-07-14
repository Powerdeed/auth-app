export const getSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    code: searchParams.get("code"),
    error: searchParams.get("error"),
    returnedState: searchParams.get("state"),
  };
};
