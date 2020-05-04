export interface Plant {
  plantID: number;
  ownerID: number;
  species: string,
  lattinName: string,
  lastWattered: Date;
  waterAgain: Date;
  lastFertalized: Date;
  fertalizeAgain: Date;
  height: number;
  birthday: Date;
  receiveNotifications: boolean;
  imageURL: string;
  //type: PlantType;
  isPublic: boolean;
  // My thought for the water/fertalizeAgain fields is to have the back end
  // calculate this date based on last wattered date of the database object
  // and the watering frequency of the plant type. That way the front end
  // doesn't need to worry about doing it, but still knows when to show an alert.
  // Thoughts?
}

export interface PlantType {
//ToDo: Consider if plant type information should be seperate or included in Plant interface.
}
