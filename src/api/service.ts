export const baseUrl = 'https://mock-server-api-hcqxe00fv-jik789.vercel.app/catalog';

export const getProducts = async (query = '') => {
  const res = await fetch(`${baseUrl}?q=${query}`);
  return await res.json();
};

export const getProductById = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`);
  return await res.json();
};
