export default defineEventHandler(async (event) => {
  deleteCookie(event, "userId");
});
