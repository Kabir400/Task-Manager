const getRequest = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const result = await response.json();
  return result;
};

export default getRequest;
