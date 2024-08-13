import RequestData from '@/data/requests/requests.json';
import { FindAllRequests } from '@/services/request.service';
import { cleanAllRequests } from '@/transformers/cars/requests/requests.transformer';
import Link from 'next/link';

import AddIcon from '@/components/icons/addIcon';
import DoubleArrowIcon from '@/components/icons/doubleArrowIcon';
import { RoundedButton } from '@/components/ui/buttons';
import { CardTable } from '@/components/ui/cards';
import Container, {
  DesktopContainer,
  MobileContainer,
  PaginationContainer,
  SearchBarContainer
} from '@/components/ui/containers';
import { EmptyDataComponent } from '@/components/ui/error';
import FilterNav from '@/components/ui/filterNav';
import { SearchInput } from '@/components/ui/inputs';
import Pagination from '@/components/ui/pagination';
import StatusBadge from '@/components/ui/statusBadge';
import Table, { Column, Row } from '@/components/ui/tables';
import { Subtitle } from '@/components/ui/texts';

async function allRequests({ searchParams }: { [key: string]: any }) {
  const { response: allRequestsResponse } = await FindAllRequests(searchParams);
  const requests = allRequestsResponse?.data.requests || [];
  const cleanRequests = cleanAllRequests(requests);

  return (
    <section className="relative flex size-full flex-col items-center justify-center">
      <FilterNav filterData={RequestData} addData={'requests/add'} withSearch />
      <MobileContainer>
        <div className="pl-6">
          <Subtitle>Requests Table</Subtitle>
        </div>
        {cleanRequests.map((request: any, idx: number) => (
          <div className="h-fit w-full py-3" key={idx}>
            <CardTable
              isMobile
              title={' '}
              IconTwo={
                <Link href={`/manage-requests/${request.id}`}>
                  <DoubleArrowIcon className="size-5" />
                </Link>
              }
            >
              <div className="flex w-full flex-col gap-3 py-4 font-text">
                {request.columns.map(
                  (col: any, idx2: any) =>
                    col.title !== null && (
                      <div className="flex w-full items-center justify-between gap-5" key={idx2}>
                        <span className="font-text text-sm font-medium uppercase">{col.title}</span>
                        <span className="truncate text-sm font-light capitalize text-textColor">
                          {col.title === 'Status' ? <StatusBadge status={col.value} /> : col.value}
                        </span>
                      </div>
                    )
                )}
              </div>
            </CardTable>
          </div>
        ))}
      </MobileContainer>
      <DesktopContainer>
        <Container>
          <SearchBarContainer>
            <Subtitle>Requests Table</Subtitle>
            <div className="flex items-center gap-4">
              <div className="w-72">
                <SearchInput />
              </div>
              <Link href={'requests/add'}>
                <RoundedButton label={<AddIcon className="size-3 fill-black stroke-black" />} />
              </Link>
            </div>
          </SearchBarContainer>
          {cleanRequests.length ? (
            <div className="mx-auto mt-8 flex h-[calc(100%-112px)] w-full grow items-start justify-start overflow-x-auto px-8">
              <div className="w-full">
                <Table
                  categories={[
                    '',
                    'Reference',
                    'Service Type',
                    'Source',
                    'Business',
                    'Customer',
                    'Model',
                    'Status'
                  ]}
                >
                  {cleanRequests.map((request: any, idx: number) => (
                    <Row key={idx}>
                      {request.columns.map((col: any, idx2: number) => (
                        <Column fitted key={idx2}>
                          <div className="mx-auto flex items-center justify-start gap-3">
                            {col.title === '' ? (
                              <div className="flex w-0 items-center gap-2">
                                {request.isUrgent && (
                                  <span className="relative flex size-3">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-75" />
                                    <span className="relative inline-flex size-3 rounded-full bg-red" />
                                  </span>
                                )}
                                {request.isDelegation && (
                                  <span className="relative flex size-3">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-yellow opacity-75" />
                                    <span className="relative inline-flex size-3 rounded-full bg-yellow" />
                                  </span>
                                )}
                                <span>{col.value}</span>
                              </div>
                            ) : col.title === 'Status' ? (
                              <StatusBadge status={col.value} />
                            ) : (
                              col.value
                            )}
                          </div>
                        </Column>
                      ))}
                      <Column fitted>
                        <div className="flex justify-end">
                          <Link
                            href={`/cars-limousines/requests/${request.reference}`}
                            className="ml-auto"
                          >
                            <RoundedButton
                              label={<DoubleArrowIcon className="size-5" />}
                              className="group flex items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
                            />
                          </Link>
                        </div>
                      </Column>
                    </Row>
                  ))}
                </Table>
              </div>
            </div>
          ) : (
            <EmptyDataComponent />
          )}
        </Container>
        <Pagination totalCount={allRequestsResponse?.data?.count} pageSize={5} />
      </DesktopContainer>
      <PaginationContainer>
        {cleanRequests.response?.data.count > 20 && (
          <Pagination totalCount={cleanRequests?.response?.data?.count} pageSize={20} />
        )}
      </PaginationContainer>
    </section>
  );
}

export default allRequests;
