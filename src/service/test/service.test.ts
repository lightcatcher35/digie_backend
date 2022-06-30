import { ServiceTypeDefs } from "../serviceSchema";
import ServiceResolvers from "../serviceResolver";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
// create a mocked schema for the tests
const schema = makeExecutableSchema({
  typeDefs: ServiceTypeDefs,
  resolvers: ServiceResolvers,
});
describe("Listing Character Test", () => {
  it("getChars without pageNumber", async () => {
    const source = `
    query{
      getChars(){
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
    expect(response?.errors[0].message).toContain("Syntax Error: Expected Name");
  });
  
  it("getChars with wrong parameter", async () => {
    const source = `
    query{
      getChars(test:1){
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
    expect(response?.errors[0].message).toContain("Unknown argument");
  });
  it("getChars with wrong parameter type", async () => {
    const source = `
    query{
      getChars(PageNumber:"1"){
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
      getChars(PageNumber:1){
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
      getChars(PageNumber:1){
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


describe("Create Character Test", () => {
  it("addChar with null success message", async () => {
    const source = `
    mutation{
      addChar(
          name:"test",
          location:"test"
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
      
  }
    `;
    const response:any=await graphql({schema, source});
    expect(typeof response?.errors).toBe("object");
    expect(response?.errors[0].message).toContain("Cannot return null for non-nullable field SingleResult.success.");
  });

})