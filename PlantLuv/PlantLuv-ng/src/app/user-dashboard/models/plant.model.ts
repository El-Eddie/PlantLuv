import { PhotoData } from './photo-data.model'

export interface Plant {
  plantID: number;
  ownerID: number;
  species: string,
  lattinName: string,
  lastWatered: Date;
  waterAgain: Date;
  lastFertalized: Date;
  fertalizeAgain: Date;
  height: number; //wont need
  birthday: Date;
  receiveNotifications: boolean;
  // imageURL: string;
  imageIDs: number[];
  thumbnailURL?: string;
  //type: PlantType;
  isPublic: boolean;  //not implementing social yet
  isFavorite: boolean;
  lightLevel: string;
  toxisity: string[];
  // My thought for the water/fertalizeAgain fields is to have the back end
  // calculate this date based on last watered date of the database object
  // and the watering frequency of the plant type. That way the front end
  // doesn't need to worry about doing it, but still knows when to show an alert.
  // Thoughts?

  // After consideration, plant type should be seperated and controled by a service in the care module.
  // Basic information about plant type appearing on the plant-card component should be added to the plant model above
  // The API controller will need to pull information from both database objects (user plant & plant type) and combine into
  // one model to send to the browser. This should allow for better seperation of concerns on the Angular side.
}

//export interface PlantType {
//ToDo: Consider if plant type information should be seperate or included in Plant interface.
//}
