'use client'
import { useEffect, useState } from 'react';
import AddIcon from '@/components/icons/addIcon';
import { RoundedButton } from '@/components/ui/buttons';
import Container, { DesktopContainer, SearchBarContainer } from '@/components/ui/containers';
import { Subtitle } from '@/components/ui/texts';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/inputs';

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
  Status: string;
};

export default function Penalties() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);

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
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Infraction Date</th>
                <th className="px-4 py-2">Car</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Currency</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {penalties.map((penalty, index) => (
                <tr key={penalty.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{penalty.Type}</td>
                  <td className="px-4 py-2">{penalty.Location}</td>
                  <td className="px-4 py-2">{new Date(penalty.Infraction_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{penalty.Car}</td>
                  <td className="px-4 py-2">{penalty.Amount}</td>
                  <td className="px-4 py-2">{penalty.Currency}</td>
                  <td className="px-4 py-2">{penalty.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </DesktopContainer>
    </section>
  );
}
