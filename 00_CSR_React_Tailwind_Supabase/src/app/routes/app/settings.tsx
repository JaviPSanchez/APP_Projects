// Settings.tsx
import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';
import UpdateSettingsForm from '@/features/settings/update-settings-form';

export const Settings: React.FC = () => {
  return (
    <Row>
      <Heading type="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
