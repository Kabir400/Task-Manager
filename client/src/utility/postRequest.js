const postRequest = async (url, data, type) => {
  let Data = data;
  let header = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (type === "json") {
    Data = JSON.stringify(data);
    header = {
      "Content-Type": "application/json",
    };
  }
  const response = await fetch(url, {
    method: "POST",
    headers: header,
    credentials: "include",
    body: Data,
  });
  const result = await response.json();
  return result;
};

export default postRequest;
