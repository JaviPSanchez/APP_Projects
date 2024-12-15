import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';

import { bookings, cabins, guests } from '@/assets/index';
import { Button } from '@/components/ui/button';
import supabase from '@/services/api-supabase';
import { subtractDates } from '@/utils/format';

// async functions to delete data

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

// async functions to create data

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: guestsIds, error: guestError } = await supabase
    .from('guests')
    .select('id')
    .order('id');

  if (guestError) {
    console.log(guestError.message);
    return;
  }

  const allGuestIds = guestsIds.map(guest => guest.id);

  const { data: cabinsIds, error: cabinError } = await supabase
    .from('cabins')
    .select('id')
    .order('id');

  if (cabinError) {
    console.log(cabinError.message);
    return;
  }

  const allCabinIds = cabinsIds.map(cabin => cabin.id);

  const finalBookings = bookings.map(booking => {
    const cabin = cabins[booking.cabin_id - 1];
    // Convert date strings to numbers if necessary
    const endDateNum = new Date(booking.end_date).getTime();
    const startDateNum = new Date(booking.start_date).getTime();
    const numNights = subtractDates(endDateNum, startDateNum);
    const cabinPrice = numNights * (cabin.regular_price - cabin.discount);
    const extrasPrice = booking.has_breakfast
      ? numNights * 15 * booking.num_guests
      : 0; // hardcoded breakfast price

    const totalPrice = cabinPrice + extrasPrice;

    let status;

    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    ) {
      status = 'checked-out';
    }

    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    ) {
      status = 'unconfirmed';
    }

    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    ) {
      status = 'checked-in';
    }

    // Return object with snake_case column names
    return {
      ...booking,
      num_nights: numNights,
      cabin_price: cabinPrice,
      extras_price: extrasPrice,
      total_price: totalPrice,
      guest_id: allGuestIds[booking.guest_id - 1],
      cabin_id: allCabinIds[booking.cabin_id - 1],
      status,
    };
  });

  console.log(finalBookings);
  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

export const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div className="mt-auto flex w-fit flex-col items-center gap-4 rounded-md bg-color-indigo-100 p-4 text-center">
      <h3 className="text-xl font-semibold">SAMPLE DATA</h3>
      <Button size={'lg'} onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button size={'lg'} onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
};
