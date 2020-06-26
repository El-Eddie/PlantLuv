export interface NewUserPlant {
  ownerID: number;
  plantType: string;
  nickName: string,
  birthday: Date;
  lastWatered: Date,
  lastFertalized: Date;
  wherePurchased: string;
  receiveNotifications: boolean;
  thumbnailURL?: string;
}
