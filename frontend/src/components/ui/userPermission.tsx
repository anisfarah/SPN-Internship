'use client';
import { updatePermissionsAction } from '@/actions/users/updatePermissions';
import { useAlert } from '@/helpers/alertHelper';
import { capitalize } from '@/utils/inputHelpers';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import LockIcon from '../icons/lockIcon';
import Button, { RoundedButton } from './buttons';
import { EditOverlayContainer, TabsContainer } from './containers';
import { DropDownInput } from './dropDownInputs';
import Form from './forms';
import { NestedCheckboxList } from './inputs';
import Tabs from './tabs';

function ManagePermission({
  title,
  userId,
  userRole,
  userPermissions,
  permissionData,
  inOverlay
}: {
  title: string;
  userId: string;
  userRole: string;
  userPermissions: any;
  permissionData: any;
  inOverlay: boolean;
}) {
  const q = useSearchParams();
  const tab = q.get('permissionTab') || 'role';
  const role = q.get('role') || '';
  const allRoles = Object.keys(permissionData.defaultPermissions).map((role) => ({
    name: capitalize(role),
    value: role
  }));
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    userRole !== '' ? userRole : role
  );
  const [isClicked, setIsClicked] = useState(false);
  const { setAlert } = useAlert();
  const router = useRouter();
  const pathname = usePathname();
  const updatePermissionsWithConfig = updatePermissionsAction.bind(null, userId, permissionData);
  useEffect(() => {
    setSelectedRole(role);
  }, [role]);
  const [state, formAction] = useFormState(updatePermissionsWithConfig, {
    alert: '',
    status: null,
    errors: {}
  });
  const handleClick = () => {
    setIsClicked(true);
  };
  const editOverlayTitle = title;
  const [openBanUser, setOpenBanUser] = useState(false);
  useEffect(() => {
    if (state) {
      if (state.status === 200 || state.status === 201) {
        setOpenBanUser(false);
        router.push(pathname);
      }
      setAlert({ message: state.alert, status: state.status });
    }
  }, [state, setAlert]);
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return inOverlay ? (
    <>
      <RoundedButton
        label={<LockIcon className="size-4" />}
        onClick={() => {
          setOpenBanUser(true);
          router.push(pathname + '?' + createQueryString('permissionTab', 'role'));
        }}
        className="group flex size-5 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
      />
      <EditOverlayContainer
        isOpen={openBanUser}
        className="h-[60vh]"
        onClose={() => {
          router.push(pathname);
        }}
        setIsOpen={setOpenBanUser}
        title={editOverlayTitle}
      >
        <TabsContainer fullWidth>
          <Tabs
            data={[
              { title: 'ROLE', value: 'role' },
              { title: 'PERMISSION', value: 'permissions' }
            ]}
            filter={'permissionTab'}
          />
        </TabsContainer>
        <PermissionForm
          inOverlay={inOverlay}
          formAction={formAction}
          isClicked={isClicked}
          tab={tab}
          userId={userId}
          role={role}
          permissionData={permissionData}
          allRoles={allRoles}
          selectedRole={selectedRole}
          state={state}
          userPermissions={userPermissions}
          handleClick={handleClick}
        />
      </EditOverlayContainer>
    </>
  ) : (
    <PermissionForm
      inOverlay={inOverlay}
      formAction={formAction}
      isClicked={isClicked}
      tab={tab}
      userId={userId}
      role={role}
      permissionData={permissionData}
      allRoles={allRoles}
      selectedRole={selectedRole}
      state={state}
      userPermissions={userPermissions}
      handleClick={handleClick}
    />
  );
}
export default ManagePermission;

export function PermissionForm(props: any) {
  return (
    <Form action={props.formAction}>
      <DropDownInput
        isClicked={props.isClicked}
        hidden={props.tab !== 'role'}
        defaultValue={props.allRoles.filter((item: any) => item.value === props.selectedRole)[0]}
        options={props.allRoles}
        validationObjects={props.state?.errors['role'] || []}
        isInner
        required
        label="Role"
        name="role"
        pushToParams
      />
      <NestedCheckboxList
        withAccordion={!props.inOverlay}
        label="Permissions"
        relatedInput="role"
        isClicked={props.isClicked}
        defaultValue={
          props.userPermissions && !props.role
            ? props.userPermissions
            : props.permissionData.defaultPermissions[props.selectedRole || '']
        }
        className={`${props.tab === 'role' && props.inOverlay ? 'hidden' : ''}`}
        title="Permissions"
        treeData={props.permissionData.allPermissions}
        name="permissions"
      />
      <input type="hidden" name="id" value={props.userId}></input>
      <div className="mx-auto my-12 flex h-10 w-48 items-center justify-center">
        <Button onClick={props.handleClick} type={'submit'} withArrow label="Confirm" />
      </div>
    </Form>
  );
}
