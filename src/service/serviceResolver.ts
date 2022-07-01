import { ApolloError } from "apollo-server-express";
import mockerFile from "./../ricky-and-morty.json";

import { charInterface } from "./types/char";
let dumpItems = [...mockerFile];

const mapChar = (charObject: charInterface) => {
  return {
    id: charObject?.id,
    name: charObject?.name ?? "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: charObject?.location ?? "",
      url: "",
    },
    episode: [""],
    url: "",
    image: charObject?.image ?? "",
    created: "",
  };
};

const ServiceResolvers = {
  Query: {
    getChars: async (_: any, args: any) => {
      try {
        let errorMessage = "";

        const { offset, limit, filter } = args;
        let start = offset??0;
        let end = limit;

        let mock: any = [];

        if (filter && filter !== "Rick & Morty") {
          mock = [...dumpItems.filter((row) => row.name.includes(filter))];
        } else mock = [...dumpItems];

        const data = mock.splice(start, end);

        return {
          success: true,
          errorMessage,
          data,
        };
      } catch (error: any) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addChar: async (_: any, args: any) => {
      const id = dumpItems[dumpItems.length - 1]?.id + 1;
      const newObject = { id, ...args };
      let errorMessage = "";

      const data = await mapChar(newObject);

      // @ts-ignore
      dumpItems = [...dumpItems, data];

      return {
        success: true,
        errorMessage,
        data:dumpItems[dumpItems.length - 1],
      };
    },
    updateChar: async (_: any, args: any) => {
      const { id, name, location, image } = args;
      let errorMessage = "";

      let updatedObject;

      dumpItems.forEach(function (item, key) {
        if (item?.id === id) {
          updatedObject = {
            ...item,
            name,
            location:{
              name:location,
              url:""
            },
            image,
          };
          dumpItems[key] = updatedObject;
        }
      });

      return {
        success: true,
        errorMessage,
        data:updatedObject,
      };
    },
    removeChar: async (_: any, args: any) => {
      const { id } = args;

      dumpItems = dumpItems.filter((item: any) => item?.id !== id);
      return { success: true };
    },
  },
};
export default ServiceResolvers;
