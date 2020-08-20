export interface NewUserPlant {
  plantId: number;
  ownerId: string;
  plantType: string;
  PlantTypeID: number;
  nickName: string,
  birthday: Date;
  lastWatered: Date,
  lastFertalized: Date;
  wherePurchased?: string;
  receiveNotifications: boolean;
  PrimaryImageID?: string;
}
