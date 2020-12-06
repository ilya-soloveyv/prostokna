const api = async (method, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/${method}?${queryString}`);

  return await response.json();
};

export default { call: api };
