export interface AddressedName {
    name: String;
    url: String;
  }
  
export interface charInterface {
    id: number;
    name: String;
    status: String;
    species: String;
    type: String;
    gender: String;
    origin: AddressedName;
    location: AddressedName;
    episode: [String];
    url: String;
    image: String;
    created: String;
  }