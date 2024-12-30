export default interface Tours {
  id: number;
  description: string;
  difficulty: string;
  duration: number;
  imageCover: string;
  images: [];
  maxGroupSize: number;
  name: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  startDates: [];
  summary: string;
}
