import { addAgencyAction } from '@/actions/agencies/addAgency.action';
import { getAddAgencyConfig } from '@/forms/agencies/addAgency.config';
import React from 'react';

import Container from '@/components/ui/containers';
import { DynamicForm } from '@/components/ui/forms';

async function AddAgency() {
  const addAgencyConfig = await getAddAgencyConfig();
  const addAgencyWithConfigAction = addAgencyAction.bind(null, addAgencyConfig);

  return (
    <Container desktopOnly>
      <DynamicForm config={addAgencyConfig} action={addAgencyWithConfigAction} />
    </Container>
  );
}

export default AddAgency;
