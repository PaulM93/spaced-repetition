import axios from "axios";

const COLLECTION_URL = "/user/collection";

const generateConfig = (accessToken) => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};

//Create New Collection
const createNewCollection = async (collectionData, accessToken) => {
  const response = await axios.post(
    COLLECTION_URL,
    collectionData,
    generateConfig(accessToken)
  );
  // console.log("create res", response.data);
  return response.data;
};

//Get All Collections
const getCollections = async (accessToken) => {
  const response = await axios.get(COLLECTION_URL, generateConfig(accessToken));
  // console.log("Response", response);
  return response.data;
};

//Edit Collection
const editCollection = async (collectionData, accessToken) => {
  //id required

  // console.log("Collectiondata", collectionData);
  const response = await axios.post(
    COLLECTION_URL + "/update",
    collectionData,
    generateConfig(accessToken)
  );
  // console.log("edit response", response);
  return response.data;
};

//Delete Collection
const deleteCollection = async (id, accessToken) => {
  // console.log("DeleteData", id);
  const url = "/user/collection/delete";
  const data = { id: id };
  // console.log(url);
  const response = await axios.post(
    COLLECTION_URL + "/delete",
    data,
    // collectionData,
    generateConfig(accessToken)
  );
  // console.log("Response", response);
  return response.data;
};

const collectionService = {
  getCollections,
  createNewCollection,
  editCollection,
  deleteCollection,
};

export default collectionService;
