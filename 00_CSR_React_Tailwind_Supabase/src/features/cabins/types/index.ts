export interface Cabin {
  id?: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount?: number;
  description?: string;
  image?: string | File; // Use string to represent URL or file path, or 'string | File' based on your needs
}
