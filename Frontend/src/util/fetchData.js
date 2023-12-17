import { getRecommendToken } from "./auth";

const token = getRecommendToken();

const fetchData = async (path, body = {}) => {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, ...body }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    var responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("error:", error);
  }
};

export default fetchData;
