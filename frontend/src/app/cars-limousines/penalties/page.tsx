'use client';
import { useEffect, useState } from 'react';
import AddIcon from '@/components/icons/addIcon';
import { RoundedButton } from '@/components/ui/buttons';
import Container, { DesktopContainer, SearchBarContainer } from '@/components/ui/containers';
import { Subtitle } from '@/components/ui/texts';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/inputs';
import Table, { Column, Row } from '@/components/ui/tables';
import Pagination from '@/components/ui/pagination';
import { EmptyDataComponent } from '@/components/ui/error';
import { useSearchParams } from 'next/navigation';
import StatusBadge from '@/components/ui/statusBadge'; // Import the StatusBadge component
import DoubleArrowIcon from '@/components/icons/doubleArrowIcon'

// Define the Penalty type inline
type Penalty = {
  id: string;
  Type: string;
  Location: string;
  Infraction_number: number;
  Car: string;
  Car_plate_number: string;
  Infraction_date: string; // Could be Date if processed accordingly
  Amount: number;
  Currency: string;
  Status: 'PAID' | 'UNPAID' | 'IN_PROGRESS'; // Define possible status values
};

export default function Penalties() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 5;

  // Fetch the penalties from the FastAPI backend
  useEffect(() => {
    async function fetchPenalties() {
      try {
        const res = await fetch('http://localhost:8000/AllPenalties'); // Replace with your FastAPI endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch penalties');
        }
        const data = await res.json();
        setPenalties(data as Penalty[]); // Explicitly cast the fetched data to Penalty[]
      } catch (error) {
        console.error('Error fetching penalties:', error);
      }
    }

    fetchPenalties();
  }, []);

  const displayedPenalties = penalties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="relative flex size-full flex-col items-center">
      <DesktopContainer>
        <Container>
          <SearchBarContainer>
            <Subtitle>Penalties List</Subtitle>
            <div className="flex items-center gap-4">
              <div className="w-72">
                <SearchInput />
              </div>
              <Link href={'penalties/add'}>
                <RoundedButton label={<AddIcon className="size-3 fill-black stroke-black" />} />
              </Link>
            </div>
          </SearchBarContainer>
          {penalties.length ? (
            <div className="flex size-full w-full flex-col justify-between p-6">
              <Table categories={['Number', 'Type', 'Location', 'Infraction Date', 'Car', 'Amount', 'Currency', 'Status']}>
                {displayedPenalties.map((penalty, index) => (
                  <Row key={penalty.id}>
                    <Column>{(currentPage - 1) * itemsPerPage + index + 1}</Column>
                    <Column>{penalty.Type}</Column>
                    <Column>{penalty.Location}</Column>
                    <Column>{new Date(penalty.Infraction_date).toLocaleDateString()}</Column>                    <Column>{penalty.Car}</Column>
                    <Column>{penalty.Amount}</Column>
                    <Column>{penalty.Currency}</Column>
                    <Column>
                    <StatusBadge status={'UNPAID'} />                    </Column>
                    <Column fitted>
                      <Link href={`penalties/edit`}>
                        <RoundedButton
                          label={<DoubleArrowIcon className="flex size-7 shrink-0 grow-0" />}
                          className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
                        />
                      </Link>
                    </Column>
                  </Row>
                ))}
              </Table>
              <Pagination
                totalCount={penalties.length}
                pageSize={itemsPerPage}
              />
            </div>
          ) : (
            <EmptyDataComponent />
          )}
        </Container>
      </DesktopContainer>
    </section>
  );
}