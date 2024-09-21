import data from '@/data/agencies/agencyData.json';
import { FindAllAgencies } from '@/services/agency.service';
import {
  cleanAllAgencies,
  cleanAllCatalog,
  cleanAllLocations
} from '@/transformers/agencies/agency.transformer';
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
import Table, { Column, Row } from '@/components/ui/tables';
import { Subtitle } from '@/components/ui/texts';

async function agencies({ searchParams }: { [key: string]: any }) {
  const res = await FindAllAgencies(searchParams);
  const itemsPerPage = searchParams.itemsPerPage || 10;
  const count = res?.response?.data?.count || 0;
  const agenciesResponse = res?.response?.data?.agencies || [];
  const agencies = cleanAllAgencies(agenciesResponse);
  const allCatalog = cleanAllCatalog(res?.response?.data?.allCatalog || []);
  const allLocations = cleanAllLocations(res?.response?.data?.allLocations || []);

  return (
    <section className="relative flex size-full flex-col items-center">
      <FilterNav
        filterData={[
          {
            valueKey: 'catalog',
            title: 'Catalog',
            values: allCatalog
          },
          { valueKey: 'locations', title: 'Locations', values: allLocations }
        ]}
        withSearch
        addData={data.links.addAgency}
      />
      <MobileContainer>
        <div className="pl-6">
          <Subtitle>{data.table.title}</Subtitle>
        </div>
        {agencies.length ? (
          agencies.map((agency: any, idx: number) => (
            <div className="h-fit w-full py-3" key={idx}>
              <CardTable
                isMobile
                title={' '}
                IconOne={
                  <Link href={`agencies/${agency.slug}?tab=profile&tab2=contact`}>
                    <DoubleArrowIcon className="size-5" />
                  </Link>
                }
              >
                <div className="flex w-full flex-col gap-3 py-4 font-text">
                  {agency.columns.map(
                    (col: any, idx2: any) =>
                      col.title !== null &&
                      col.title !== '' &&
                      (col.title === 'CATALOG' ? (
                        <div className="flex w-full items-center justify-between gap-5" key={idx2}>
                          <span className="font-text text-sm font-medium uppercase">
                            {col.title}
                          </span>
                          <span className="truncate text-sm font-light capitalize text-textColor">
                            {col.value.map((val: any, idx4: number) =>
                              idx4 == col.value.length - 1 ? (
                                <span key={idx4}>{val}</span>
                              ) : (
                                <span key={idx4}>{val}, </span>
                              )
                            )}
                          </span>
                        </div>
                      ) : col.title === 'LOCATIONS' ? (
                        <div className="flex w-full items-center justify-between gap-5" key={idx2}>
                          <span className="f ont-text text-sm font-medium uppercase">
                            {col.title}
                          </span>
                          <span className="truncate text-sm font-light capitalize text-textColor">
                            {col.value.map((val: any, idx4: number) =>
                              idx4 == col.value.length - 1 ? (
                                <span key={idx4}>{val.country}</span>
                              ) : (
                                <span key={idx4}>{val.country}, </span>
                              )
                            )}
                          </span>
                        </div>
                      ) : (
                        <div className="flex w-full items-center justify-between gap-5" key={idx2}>
                          <span className="font-text text-sm font-medium uppercase">
                            {col.title}
                          </span>
                          <span className="truncate text-sm font-light capitalize text-textColor">
                            {col.value}
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </CardTable>
            </div>
          ))
        ) : (
          <EmptyDataComponent />
        )}
        <PaginationContainer>
          {count > itemsPerPage && <Pagination totalCount={count} pageSize={itemsPerPage} />}
        </PaginationContainer>
      </MobileContainer>
      <DesktopContainer>
        <Container>
          <SearchBarContainer>
            <Subtitle>{data.table.title}</Subtitle>
            <div className="flex items-center gap-4">
              <div className="w-72">
                <SearchInput />
              </div>
              <Link href={data.links.addAgency}>
                <RoundedButton label={<AddIcon className="size-3 fill-black stroke-black" />} />
              </Link>
            </div>
          </SearchBarContainer>
          {agencies.length ? (
            <div className="flex size-full w-full flex-col justify-between p-6">
              <Table categories={data.table.columns}>
                {agencies.map((agency: any, idx1: number) => (
                  <Row key={idx1}>
                    {agency.columns?.map(
                      (col: any, idx2: any) =>
                        col.title !== null &&
                        (col.title === 'CATALOG' ? (
                          <Column key={idx2}>
                            {col.value.map((val: any, idx3: any) =>
                              idx3 == col.value.length - 1 ? (
                                <span key={idx3}>{val}</span>
                              ) : (
                                <span key={idx3}>{val}, </span>
                              )
                            )}
                          </Column>
                        ) : col.title === 'LOCATIONS' ? (
                          <Column key={idx2}>
                            {col.value.map((val: any, idx3: any) => (
                              <div key={idx3} className="flex items-center gap-2">
                                {val.country}
                              </div>
                            ))}
                          </Column>
                        ) : (
                          <Column key={idx2}>
                            <div className="flex items-center gap-2">{col.value}</div>
                          </Column>
                        ))
                    )}
                    <Column fitted>
                      <div className="flex w-fit items-center gap-2">
                        <Link href={`agencies/${agency.slug}?tab=profile&tab2=contact`}>
                          <RoundedButton
                            label={<DoubleArrowIcon className="flex size-7 shrink-0 grow-0" />}
                            className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
                          />
                        </Link>
                      </div>
                    </Column>
                  </Row>
                ))}
              </Table>
              <PaginationContainer>
                {count > itemsPerPage && <Pagination totalCount={count} pageSize={itemsPerPage} />}
              </PaginationContainer>
            </div>
          ) : (
            <EmptyDataComponent />
          )}
        </Container>
      </DesktopContainer>
    </section>
  );
}

export default agencies;
