'use client';
import { confirmBanChauffeurAction } from '@/actions/chauffeurs/banChauffeur.action';
import { confirmBanUserAction } from '@/actions/users/banUser.action';
import { BanChauffeur } from '@/services/chauffeurs.service';
import { BanUser } from '@/services/user.service';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import data from '../../data/users/users.json';
import BanIcon from '../icons/banIcon';
import ResetIcon from '../icons/resetIcon';
import { RoundedButton } from './buttons';
import { EditOverlayContainer } from './containers';
import { DynamicForm } from './forms';
import { Textarea } from './inputs';
import { LabelText } from './texts';

function BanButton({
  id,
  status,
  isMobile,
  title,
  userType
}: {
  id: string;
  status: string;
  isMobile: boolean;
  title?: string;
  userType: string;
}) {
  const router = useRouter();
  const editOverlayTitle = title ? title : data.texts.ban;
  const banConfig: { [key: string]: any }[] = data.forms.banUser;
  banConfig[0]['value'] = id;
  const [openBanUser, setOpenBanUser] = useState(false);

  const unbanUser = async (id: any) => {
    const resp = userType === 'USER' ? await BanUser(id) : await BanChauffeur(id);
    if (resp.status === 200) {
      router.refresh();
    }
  };

  return (
    <>
      {isMobile ? (
        <button
          type="button"
          onClick={async () => (status !== 'BANNED' ? setOpenBanUser(true) : await unbanUser(id))}
        >
          {status !== 'BANNED' ? <BanIcon className="size-6" /> : <ResetIcon className="size-6" />}
        </button>
      ) : (
        <RoundedButton
          label={
            status !== 'BANNED' ? <BanIcon className="size-5" /> : <ResetIcon className="size-5" />
          }
          onClick={async () => (status !== 'BANNED' ? setOpenBanUser(true) : await unbanUser(id))}
          className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
        />
      )}

      <EditOverlayContainer
        isOpen={openBanUser}
        setIsOpen={setOpenBanUser}
        title={editOverlayTitle}
      >
        <DynamicForm
          overlayIsOpen={openBanUser}
          setOverlayIsOpen={setOpenBanUser}
          config={banConfig}
          action={userType === 'USER' ? confirmBanUserAction : confirmBanChauffeurAction}
          withSteps={false}
        />
      </EditOverlayContainer>
    </>
  );
}
function BanHistoryComponent({ banHistory }: any) {
  return banHistory?.length > 0 ? (
    banHistory?.map((bh: any, idx: number) => (
      <div className="w-full" key={idx}>
        {bh.banReason ? (
          <>
            <div className="flex justify-between">
              <LabelText
                className="text-red"
                label={`banned on ${moment.utc(bh.dateOfBan).format('DD/MM/YYYY - HH:mm')}`}
              ></LabelText>

              <LabelText
                className="text-red"
                label={`By ${bh.bannedBy.firstName} ${bh.bannedBy.lastName}`}
              ></LabelText>
            </div>
            <div>
              <Textarea rows={2} disabled defaultValue={bh.banReason} />
            </div>
          </>
        ) : (
          <div className="flex justify-between">
            <LabelText
              className="text-green"
              label={`unbanned on ${moment.utc(bh.dateOfBan).format('DD/MM/YYYY - HH:mm')}`}
            />
            <LabelText
              className="text-green"
              label={`By ${bh.bannedBy?.firstName} ${bh.bannedBy?.lastName}`}
            />
          </div>
        )}
        <div className="my-4 w-full border-b border-grayBgProfile"></div>
      </div>
    ))
  ) : (
    <div className="w-full">
      {' '}
      <LabelText label="No ban history" />
    </div>
  );
}
export default BanButton;
export { BanHistoryComponent };
