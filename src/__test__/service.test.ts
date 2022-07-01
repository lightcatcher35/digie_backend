import { ServiceTypeDefs } from "../service/serviceSchema";
import ServiceResolvers from "../service/serviceResolver";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
// create a mocked schema for the tests
const schema = makeExecutableSchema({
  typeDefs: ServiceTypeDefs,
  resolvers: ServiceResolvers,
});
describe("Listing Character Test", () => {
  
  it("getChars with wrong parameter", async () => {
    const source = `
    query{
      getChars(test:1){
        success
        errorMessage
        data{
            id
            name7
            status
            species
            type
            gender
            location{
                name
            }
            episode
            url
            image
            created
        }
      }
  }
    `;
    const response=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    //@ts-ignore
    expect(response?.errors[0]?.message).toContain("Unknown argument");
  });
  it("getChars with wrong parameter type", async () => {
    const source = `
    query{
      getChars(offset:"1"){
        success
        errorMessage
        data{
            id
            name
            status
            species
            type
            gender
            location{
                name
            }
            episode
            url
            image
            created
        }
      }
  }
    `;
    const response:any=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    expect(response?.errors[0].message).toContain("Int cannot represent");
  });

  it("getChars with wrong field", async () => {
    const source = `
    query{
      getChars(offset:0){
        test
      }
  }
    `;
    const response:any=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    expect(response?.errors[0].message).toContain("Cannot query field");
    expect(response?.errors[0].message).toContain("on type \"ListResult\".");
  });
  it("getChars with true case", async () => {
    const source = `
    query{
      getChars(offset:0,limit:10){
        success
        errorMessage
        data{
            id
            name
            status
            species
            type
            gender
            location{
                name
            }
            episode
            url
            image
            created
        }
    }
    }
    `;
    const response:any=await graphql({schema, source});
    expect(typeof response?.errors).not.toBe("object");
    expect(typeof response?.data?.getChars?.data).toBe("object");
    expect(response?.data?.getChars?.success).toBe(true);
  });
  


});

describe("Update Character Test", () => {
  it("updateChar with without id", async () => {
    const source = `
    mutation{
      updateChar(
        ){
          success
          errorMessage
          data{
              id
              name
              status
              species
              type
              gender
              location{
                  name
              }
              episode
              url
              image
              created
          }
      }
    `;
    const response=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    //@ts-ignore
    expect(response?.errors[0]?.message).toContain("Syntax Error: Expected Name");
  });

  
});

describe("Remove Character Test", () => {
  it("removeChar with without id", async () => {
    const source = `
    mutation{
      removeChar(
        ){
          success 
        }
      }
    `;
    const response=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    //@ts-ignore
    expect(response?.errors[0]?.message).toContain("Syntax Error: Expected Name");
  });

  it("removeChar with wrong parameter", async () => {
    const source = `
    mutation{
      removeChar(
        idt:5
    ){
       success 
    }
      }
    `;
    const response=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    //@ts-ignore
    expect(response?.errors[0]?.message).toContain("Unknown argument");
  });
  it("removeChar with wrong parameter type", async () => {
    const source = `
    mutation{
      removeChar(
        id:"5"
      ){
        success 
      }
        
    }
    `;
    const response:any=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    expect(response?.errors[0].message).toContain("Int cannot represent");
  });
  
});
