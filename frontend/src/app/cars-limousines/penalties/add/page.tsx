// import { addAgencyAction } from '@/actions/agencies/addAgency.action';
// import { getAddAgencyConfig } from '@/forms/agencies/addAgency.config';
// import React from 'react';

// import Container from '@/components/ui/containers';
// import { DynamicForm } from '@/components/ui/forms';

// async function AddPenalty() {
//   const addAgencyConfig = await getAddAgencyConfig();
//   const addAgencyWithConfigAction = addAgencyAction.bind(null, addAgencyConfig);

//   return (
//     <Container desktopOnly>
//       <DynamicForm config={addAgencyConfig} action={addAgencyWithConfigAction} />
//     </Container>
//   );
// }

// export default AddPenalty;
import { addAgencyAction } from '@/actions/agencies/addAgency.action';
// import { addAgencyAction } from '@/actions/penalties/AddPenalty.action';
import { getAddPenaltyConfig } from '@/forms/penalties/addPenalty.config';
import React from 'react';

import Container from '@/components/ui/containers';
import { DynamicForm } from '@/components/ui/forms';

async function AddPenalty() {
  const addPenaltyConfig = await getAddPenaltyConfig();
  const addPenaltyWithConfigAction = addAgencyAction.bind(null, addPenaltyConfig);

  return (
    <Container desktopOnly>
      <DynamicForm config={addPenaltyConfig} action={addPenaltyWithConfigAction} />
    </Container>
  );
}

export default AddPenalty;

