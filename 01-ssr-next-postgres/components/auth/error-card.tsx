import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Ops!, Something went wrong!"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-red-600" />
      </div>
    </CardWrapper>
  );
};
