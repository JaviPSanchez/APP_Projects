import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';

import { bookings, cabins, guests } from '../assets/index';
import { Button } from '../components/ui/button';
import supabase from '../services/api-supabase';

import { subtractDates } from './format';

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
    const cabin = cabins[booking.cabinId - 1];

    // Convert date strings to numbers if necessary
    const endDateNum = new Date(booking.endDate).getTime();
    const startDateNum = new Date(booking.startDate).getTime();

    const numNights = subtractDates(endDateNum, startDateNum);

    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price

    const totalPrice = cabinPrice + extrasPrice;

    let status;

    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    ) {
      status = 'checked-out';
    }

    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    ) {
      status = 'unconfirmed';
    }

    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    ) {
      status = 'checked-in';
    }

    return {
      ...booking,

      numNights,

      cabinPrice,

      extrasPrice,

      totalPrice,

      guestId: allGuestIds[booking.guestId - 1],

      cabinId: allCabinIds[booking.cabinId - 1],

      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);

  if (error) console.log(error.message);
}

function Uploader() {
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
    <div
      style={{
        marginTop: 'auto',

        backgroundColor: '#e0e7ff',

        padding: '8px',

        borderRadius: '5px',

        textAlign: 'center',

        display: 'flex',

        flexDirection: 'column',

        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
