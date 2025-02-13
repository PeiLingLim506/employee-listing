export interface Employee {
  id: number;
  name: {
    first: string;
    last: string;
  };
  gender: string;
  species: string;
  sayings: { [key: number]: string };
  images: {
    main: string;
  };
  homePlanet: string;
  occupation: string;
  age: string;
}