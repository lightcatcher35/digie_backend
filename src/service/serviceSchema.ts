import { gql } from "apollo-server-express";
export const ServiceTypeDefs = gql`
  type AddressedName{
    name:String
    url:String
  }
  type Char {
    id: Int
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin:AddressedName
    location:AddressedName
    episode:[String]
    url:String
    image: String
    created: String
  }
  type QueryResult{
    success:Boolean
  }
  type ListResult{
    success:Boolean!
    errorMessage:String
    data:[Char]!
  }
  type SingleResult{
    success:Boolean!
    errorMessage:String
    data:Char!
  }
  
  type Query {
    getChars(offset: Int,limit:Int!,filter:String): ListResult
  }
  
  type Mutation {
    addChar(name: String!, location: String,image:String):SingleResult
  }  
  type Mutation {
    updateChar(id:Int!, name: String!, location: String,image:String):SingleResult
  }
  type Mutation {
    removeChar(id:Int!):QueryResult
  }

`;