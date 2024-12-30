import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return;

  return (
    <div className="bg-green-200 p-3 rounded-md flex items-center gap-x-2 text-sm justify-center text-green-600">
      <CheckCircledIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
};
