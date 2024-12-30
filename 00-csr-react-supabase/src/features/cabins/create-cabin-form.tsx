// External Libraries
import { useRef } from 'react';
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FieldErrors,
} from 'react-hook-form';

// Components
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/file-input';
import { Form } from '@/components/ui/form';
import { FormRow } from '@/components/ui/form-row';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
// Hooks
import { useCreateCabin } from '@/features/cabins/hooks/use-create-cabin';
import { useEditCabin } from '@/features/cabins/hooks/use-edit-cabin';
// Types
import { Cabin } from '@/features/cabins/types';

interface CreateCabinFormProps {
  cabinToEdit?: Cabin;
  onCloseModal?: () => void;
}

type FormValues = {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: FileList;
};

export const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabinToEdit = {},
  onCloseModal,
}) => {
  const ref = useRef<null | HTMLButtonElement>(null);
  // Cabin Info
  const { id: editId, ...editValues } = cabinToEdit as Cabin;
  const isEditSession = Boolean(editId);
  // Custom Hooks
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  // Adjust default values
  const defaultValues: Partial<FormValues> = {
    ...editValues,
    image: undefined, // Clear image for default values to be handled separately
  };

  // React Hook Form
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormValues>({
      defaultValues: isEditSession ? defaultValues : {},
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('Data:', data);

    //Check the type of image
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    // We can use reset() in createCabin and editCabin as they come from mutation
    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        { newCabin: { ...data, image: image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  };

  const onError: SubmitErrorHandler<FormValues> = (
    errors: FieldErrors<FormValues>,
  ) => {
    console.log('Failed validation!', errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
          placeholder="001"
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.max_capacity?.message as string}
      >
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register('max_capacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regular_price?.message as string}
      >
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register('regular_price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message as string}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              value <= getValues().regular_price ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message as string}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: isEditSession ? false : true })}
        />
      </FormRow>

      <div className="flex items-center justify-end gap-4 py-4">
        <Button
          ref={ref}
          variant="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? 'Edit Cabin' : 'Create New Cabin'}
        </Button>
      </div>
    </Form>
  );
};
