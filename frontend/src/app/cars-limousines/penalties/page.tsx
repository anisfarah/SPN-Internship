'use client';
import { useEffect, useState } from 'react';
import AddIcon from '@/components/icons/addIcon';
import TrashIcon from '@/components/icons/trashIcon';
import { RoundedButton } from '@/components/ui/buttons';
import Container, { DesktopContainer, SearchBarContainer } from '@/components/ui/containers';
import { Subtitle } from '@/components/ui/texts';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/inputs';
import Table, { Column, Row } from '@/components/ui/tables';
import Pagination from '@/components/ui/pagination';
import { EmptyDataComponent } from '@/components/ui/error';
import { useSearchParams } from 'next/navigation';
import StatusBadge from '@/components/ui/statusBadge';
import DoubleArrowIcon from '@/components/icons/doubleArrowIcon';

type Penalty = {
  id: string;
  Type: string;
  Location: string;
  Infraction_number: number;
  Car: string;
  Car_plate_number: string;
  Infraction_date: string;
  Amount: number;
  Currency: string;
  Status: 'PAID' | 'UNPAID' | 'IN_PROGRESS';
};

export default function Penalties() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchPenalties() {
      try {
        const res = await fetch('http://localhost:8000/AllPenalties');
        if (!res.ok) {
          throw new Error('Failed to fetch penalties');
        }
        const data = await res.json();
        setPenalties(data as Penalty[]);
      } catch (error) {
        console.error('Error fetching penalties:', error);
      }
    }
    fetchPenalties();
  }, []);

  const displayedPenalties = penalties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this penalty?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete penalty');
      }

      // Update the state to remove the deleted penalty
      setPenalties(penalties.filter((penalty) => penalty.id !== id));
    } catch (error) {
      console.error('Error deleting penalty:', error);
    }
  };

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
              <Table categories={['Type', 'Location', 'Infraction Date', 'Car', 'Amount', 'Currency', 'Status', 'Action']}>
                {displayedPenalties.map((penalty, index) => (
                  <Row key={penalty.id}>
                    <Column>{penalty.Type}</Column>
                    <Column>{penalty.Location}</Column>
                    <Column>{new Date(penalty.Infraction_date).toLocaleDateString()}</Column>
                    <Column>{penalty.Car}</Column>
                    <Column>{penalty.Amount}</Column>
                    <Column>{penalty.Currency}</Column>
                    <Column>
                      <StatusBadge status={penalty.Status='UNPAID'} />
                    </Column>
                    <Column fitted>
                      <Link href={`penalties/${penalty.id}/edit`}>
                        <RoundedButton
                          label={<DoubleArrowIcon className="flex size-7 shrink-0 grow-0" />}
                          className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
                        />
                      </Link>
                      <RoundedButton
                        label={<TrashIcon className="flex size-5 shrink-0 grow-0 fill-red-500" />}
                        onClick={() => handleDelete(penalty.id)}
                        className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-red-700 hover:text-red-700"
                      />
                    </Column>
                  </Row>
                ))}
              </Table>
              <Pagination totalCount={penalties.length} pageSize={itemsPerPage} />
            </div>
          ) : (
            <EmptyDataComponent />
          )}
        </Container>
      </DesktopContainer>
    </section>
  );
}
