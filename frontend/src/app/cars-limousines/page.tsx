import { Card } from '@/components/ui/cards';
import { CardsContainer } from '@/components/ui/containers';

export default function CarsLimousines(props) {
  console.log('🚀 ~ CarsLimousines ~ props:', props);
  return (
    <section className="relative flex size-full flex-col items-center justify-center">
      <CardsContainer>
        <div className="relative grid size-full auto-rows-min grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <Card data={{ title: 'AAA' }}>
            <div className="h-36 bg-red"></div>
          </Card>
          <Card data={{ title: 'AAA' }}>Graph X</Card>
          <Card data={{ title: 'AAA' }}>Number X</Card>
          <Card data={{ title: 'AAA' }}>AAA</Card>
          <Card data={{ title: 'AAA' }}>AAA</Card>
          <Card data={{ title: 'AAA' }}>AAA</Card>
        </div>
      </CardsContainer>
    </section>
  );
}
