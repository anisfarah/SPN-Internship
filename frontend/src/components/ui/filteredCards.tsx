import data from '@/data/brands/brands.json';

import { Card } from './cards';
import { CardsContainer } from './containers';
import { EmptyDataComponent } from './error';

/**
 * Renders a list of filtered cards.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.filteredData - The filtered data object.
 * @param {Array} props.filteredData.current - The array of current filtered cards.
 * @param {Array} props.filteredData.fullData - The full array of cards.
 * @returns {JSX.Element} The rendered JSX element.
 */
export function FilteredCards({ filteredData }: { filteredData: any }): JSX.Element {
  return (
    <CardsContainer>
      {filteredData.current.length !== 0 ? (
        <>
          <div className="relative grid w-full grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredData.current.map(
              (card: {
                _id: string;
                columns: Array<{
                  title: string;
                  value: string;
                }>;
                options: {
                  nb_cars: string;
                };
              }) => (
                <div key={card._id} className="relative w-full max-w-md">
                  <Card
                    link={`${data.url}/${card._id}`}
                    data={card}
                    withRounded={
                      <div className="flex aspect-square size-6 items-center justify-center overflow-hidden rounded-full bg-bgColor">
                        <span className="font-text text-sm">{card.options.nb_cars}</span>
                      </div>
                    }
                  >
                    {card.columns.map((item, idx) => (
                      <div key={idx} className="my-2 flex items-center justify-between gap-7">
                        <span className="font-text text-sm font-medium uppercase">
                          {item.title}
                        </span>
                        <span className="font-text text-sm font-light">{item.value}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <EmptyDataComponent />
      )}
    </CardsContainer>
  );
}
