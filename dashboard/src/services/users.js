export default (httpCLient) => ({
  getMe: async () => {
    const response = await httpCLient.get("/users/me");
    return {
      data: response.data,
    };
  },
});
