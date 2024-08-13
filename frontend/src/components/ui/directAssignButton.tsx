'use client';

import AssignBenchmarkToOfferAction from '@/actions/transportationRequests/assignBenchmarkToOffer.action';
import { useState } from 'react';

import AddIcon from '../icons/addIcon';
import { EditOverlayContainer } from './containers'; // Ensure this path is correct

interface DirectAssignButtonProps {
  reference: string;
  serviceIndex: number;
  benchmarkIndex: number;
}

const DirectAssignButton: React.FC<DirectAssignButtonProps> = ({
  reference,
  serviceIndex,
  benchmarkIndex
}) => {
  const [loading, setLoading] = useState(false);
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [adjustmentRate, setAdjustmentRate] = useState({
    value: '',
    type: 'DISCOUNT',
    unit: 'PERCENTAGE'
  });

  const handleAssign = async () => {
    setLoading(true);
    try {
      await AssignBenchmarkToOfferAction(reference, serviceIndex, benchmarkIndex, {
        details: {
          adjustmentRate: {
            value: parseFloat(adjustmentRate.value),
            type: adjustmentRate.type,
            unit: adjustmentRate.unit
          }
        }
      });
    } catch (error) {
      console.error('Error assigning benchmark:', error);
    } finally {
      setLoading(false);
      setOverlayIsOpen(false);
    }
  };

  return (
    <div className="relative size-4">
      <button onClick={() => setOverlayIsOpen(true)} disabled={loading} type="button">
        {loading ? (
          'Assigning...'
        ) : (
          <div title="Assign to offer">
            <AddIcon className="size-4" />
          </div>
        )}
      </button>

      <EditOverlayContainer
        title="Assign Benchmark"
        isOpen={overlayIsOpen}
        setIsOpen={setOverlayIsOpen}
        confirm={handleAssign}
        archive
      >
        <div className="p-4">
          <p className="mb-4 text-center">Are you sure you want to assign this Benchmark?</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Adjustment Value</label>
            <input
              type="number"
              className="focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
              value={adjustmentRate.value}
              onChange={(e) => setAdjustmentRate({ ...adjustmentRate, value: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Adjustment Type</label>
            <select
              className="focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
              value={adjustmentRate.type}
              onChange={(e) => setAdjustmentRate({ ...adjustmentRate, type: e.target.value })}
            >
              <option value="DISCOUNT">DISCOUNT</option>
              <option value="MARKUP">MARKUP</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Adjustment Unit</label>
            <select
              className="focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
              value={adjustmentRate.unit}
              onChange={(e) => setAdjustmentRate({ ...adjustmentRate, unit: e.target.value })}
            >
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FLAT">FLAT</option>
            </select>
          </div>
        </div>
      </EditOverlayContainer>
    </div>
  );
};

export default DirectAssignButton;
