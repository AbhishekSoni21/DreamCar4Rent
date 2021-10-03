export interface SignUpInResponse{
  displayName?: string,
  email: string,
  expiresIn: string,
  idToken: string,
  kind?: string,
  localId: string,
  refreshToken: string,
  registered?: boolean,
}

export interface ModelResponse{
  title:string;
  message:string;
  status:string;
}

export interface Car{
  carId:string;
  brand:string;
  color:string;
  fuelType:string;
  model:string;
  rentPrice:string;
  seat:string;
  year:string;
  photoUrl:string;
}

export interface BookingRequest{
  bookingId:string;
  bookingFromDate:string;
  noOfDays:string;
  comments:string;
  carId:string;
  bookingAmount:string;
  userId:string;
  status:string;
  bookingDate:string;
  cancelledOn?:string;
  adminComment:string;
}
