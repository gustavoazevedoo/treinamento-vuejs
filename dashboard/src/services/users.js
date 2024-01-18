export default (httpCLient) => ({
  getMe: async () => {
    const response = await httpCLient.get("/users/me");
    return {
      data: response.data,
    };
  },

  generateApiKey: async () => {
    const response = await httpCLient.post("/users/me/apikey");

    return {
      data: response.data,
    };
  },
});
