export interface NewUserPlant {
    ownerId: string;
    plantType: string;
    typeId: number;
    nickName: string,
    birthday: Date;
    lastWatered: Date,
    lastFertalized: Date;
    wherePurchased?: string;
    receiveNotifications: boolean;
    stockImageID?: string;
}
