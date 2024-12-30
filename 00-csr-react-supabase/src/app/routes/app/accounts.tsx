import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';

export const Accounts = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Update your account</Heading>
        <p>Update user data form</p>
      </Row>
      <Row type="horizontal">
        <Heading type="h3">Update user data</Heading>
        <p>Update user data form</p>
      </Row>
      <Row type="horizontal">
        <Heading type="h3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
};
