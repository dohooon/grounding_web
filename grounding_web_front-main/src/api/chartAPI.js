import axios from "axios";

console.log(process.env.REACT_APP_SERVER_URL);
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEachDayTrading = async (propertyName, page, size) => {
  const response = await instance.get(
    `/properties/web/${propertyName}/price-info`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};
