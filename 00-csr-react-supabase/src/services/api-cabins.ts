import supabase, { supabaseUrl } from './api-supabase';

interface Cabin {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: File | string; // Allow both File and string types for the image
  // Add any other properties here
}

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin: Cabin, id?: string) {
  console.log('createEditCabin:', newCabin);
  console.log('id:', id);
  // Type guard to check if the image is a string
  const hasImagePath =
    typeof newCabin.image === 'string' &&
    newCabin.image.startsWith(supabaseUrl);

  let imageName = '';
  if (newCabin.image instanceof File) {
    // Create imageName = 0.6012798433640476-cabin-003 if the image is a File
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  }

  /*
  supabaseUrl= https://suhwxfapnihtjdetmffz.supabase.co
  imagePath = https://suhwxfapnihtjdetmffz.supabase.co/storage/v1/object/public/cabin-images/0.6012798433640476-cabin-003.jpg

  Logic: if hasImagePath (true) create newCabin.image otherwise keep the existing one coming from supabase
  */
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  const query = supabase.from('cabins');

  let queryBuilder;

  // A) CREATE
  if (!id) {
    queryBuilder = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // B) EDIT
    queryBuilder = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await queryBuilder.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload image if it's a new file
  if (hasImagePath) return data;

  if (newCabin.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created',
      );
    }
  }

  return data;
}

export async function deleteCabin(id?: string) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
