import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const postResponse = await apiRequest("/posts/" + params.id);
  const chatResponse = await apiRequest("/chats");

  return { postResponse, chatResponse };
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  const chatPromise = apiRequest("/chats");

  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};

export const layoutLoader = async () => {
  const chatResponse = await apiRequest("/chats");
  return chatResponse.data;
};
