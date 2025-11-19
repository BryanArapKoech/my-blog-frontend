import qs from "qs";

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiData<T> {
  data: {
    id: number;
    attributes: T;
  }[];
}

export async function fetchFromStrapi<T>(
  path: string,
  urlParamsObject: Record<string, any> = {}
): Promise<StrapiData<T>> {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${STRAPI_API_URL}/api/${path}?${queryString}`;

  const response = await fetch(requestUrl, options);
  const data: StrapiData<T> = await response.json();

  return data;
}