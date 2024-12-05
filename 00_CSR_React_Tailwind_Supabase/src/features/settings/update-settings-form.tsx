// Components
import { Form } from '@/components/ui/form';
import { FormRow } from '@/components/ui/form-row';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
// Types
import { Settings } from '@/features/settings/types';

// Hooks
import { useSettings } from './hooks/use-settings';
import { useUpdateSettings } from './hooks/use-update-settings';

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isPending) return <Spinner />;

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    inputField: keyof Settings,
  ) {
    const { value } = e.target;

    // Guard clause
    if (!value) return;

    // Convert value to the appropriate type if needed
    const numericValue = parseFloat(value);

    // Create an object with only the updated field
    const updateData: Partial<Settings> = {
      [inputField]: numericValue,
    };

    // Ensure that the object matches the `Settings` type
    updateSetting(updateData as Settings);
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e, 'min_booking_length')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e, 'max_booking_length')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests_per_booking}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e, 'max_guests_per_booking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e, 'breakfast_price')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
