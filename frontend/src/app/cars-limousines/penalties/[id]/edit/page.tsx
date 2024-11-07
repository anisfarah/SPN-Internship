'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/cards';
import { CardsContainer } from '@/components/ui/containers';
import EditIcon from '@/components/icons/editIcon';
import { RoundedButton } from '@/components/ui/buttons';

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
  Status: string;
  Proof?: string;
  Presumed_chauffeur?: string;
  Driven_by?: string;
  Created_on?: string;
  ExtractedImagePath?: string;
  Invoice?: string;
};

type PenaltyResponse = {
  penalty: Penalty;
};

// Type guard to ensure the response matches PenaltyResponse structure
function isPenaltyResponse(data: any): data is PenaltyResponse {
  return data && typeof data === 'object' && 'penalty' in data;
}

export default function EditPage() {
  const { id } = useParams();
  const [penalty, setPenalty] = useState<Penalty | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempPenalty, setTempPenalty] = useState<Penalty | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  useEffect(() => {
    async function fetchPenaltyDetails() {
      try {
        const res = await fetch(`http://localhost:8000/penalty/${id}`);
        if (!res.ok) throw new Error('Failed to fetch penalty details');

        const data = await res.json();
        if (isPenaltyResponse(data)) {
          setPenalty(data.penalty);
          setTempPenalty(data.penalty);
        } else {
          console.error('Invalid response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching penalty details:', error);
      }
    }

    if (id) fetchPenaltyDetails();
  }, [id]);

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (field: keyof Penalty, value: string | number) => {
    if (tempPenalty) {
      setTempPenalty({
        ...tempPenalty,
        [field]: typeof value === 'string' && (field === 'Infraction_number' || field === 'Amount') ? Number(value) : value,
      });
    }
  };

  const handleSave = async () => {
    const confirmSave = confirm('Do you really want to update this record?');
    if (!confirmSave || !tempPenalty) return;

    try {
      const response = await fetch(`http://localhost:8000/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempPenalty),
      });
      if (!response.ok) throw new Error('Failed to save changes');

      const data = await response.json();
      if (isPenaltyResponse(data)) {
        setPenalty(data.penalty);
        setIsEditing(false);
        setShowSuccessBanner(true);

        setTimeout(() => {
          setShowSuccessBanner(false);
        }, 3000);
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error saving penalty:', error);
    }
  };

  const handleCancel = () => {
    setTempPenalty(penalty);
    setIsEditing(false);
  };

  if (!penalty || !tempPenalty) {
    return <p>Loading penalty details...</p>;
  }

  return (
    <section className="relative flex size-full flex-col items-center justify-center">
      {/* Success Banner */}
      {showSuccessBanner && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Update successful!
        </div>
      )}

      <CardsContainer>
        <div className="relative grid size-full auto-rows-min grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          
          {/* Penalties Details Card */}
          <Card
            data={{
              title: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>PENALTIES DETAILS</span>
                  <RoundedButton
                    label={<EditIcon className="flex size-7 shrink-0 grow-0" />}
                    className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
                    onClick={handleEditClick}
                  />
                </div>
              ),
            }}
          >
            <div>
              <table>
                <tbody>
                  <tr><td><b>Type:</b></td><td>{isEditing ? <input value={tempPenalty.Type} onChange={(e) => handleInputChange('Type', e.target.value)} /> : penalty.Type}</td></tr>
                  <tr><td><b>Location:</b></td><td>{isEditing ? <input value={tempPenalty.Location} onChange={(e) => handleInputChange('Location', e.target.value)} /> : penalty.Location}</td></tr>
                  <tr><td><b>Infraction Number:</b></td><td>{isEditing ? <input type="number" value={tempPenalty.Infraction_number} onChange={(e) => handleInputChange('Infraction_number', Number(e.target.value))} /> : penalty.Infraction_number}</td></tr>
                  <tr><td><b>Car:</b></td><td>{isEditing ? <input value={tempPenalty.Car} onChange={(e) => handleInputChange('Car', e.target.value)} /> : penalty.Car}</td></tr>
                  <tr><td><b>Created on:</b></td><td>{new Date(penalty.Created_on || '').toLocaleDateString()}</td></tr>
                </tbody>
              </table>
              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <button onClick={handleSave} className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-blue-600 transition">
                    Save
                  </button>
                  <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Details Card */}
          <Card
            data={{
              title: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>PAYMENT DETAILS</span>
                  <RoundedButton label={<EditIcon className="size-7" />} onClick={handleEditClick} />
                </div>
              ),
            }}
          >
            <div>
              <table>
                <tbody>
                  <tr><td><b>Amount:</b></td><td>{isEditing ? <input type="number" value={tempPenalty.Amount} onChange={(e) => handleInputChange('Amount', Number(e.target.value))} /> : `${penalty.Amount} ${penalty.Currency}`}</td></tr>
                  <tr><td><b>Proof:</b></td><td>{isEditing ? <input value={tempPenalty.Proof || ''} onChange={(e) => handleInputChange('Proof', e.target.value)} /> : penalty.Proof || 'No proof available'}</td></tr>
                  <tr><td><b>Status:</b></td><td>{isEditing ? <input value={tempPenalty.Status} onChange={(e) => handleInputChange('Status', e.target.value)} /> : penalty.Status}</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Driver Details Card */}
          <Card
            data={{
              title: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>DRIVER</span>
                  <RoundedButton label={<EditIcon className="size-7" />} onClick={handleEditClick} />
                </div>
              ),
            }}
          >
            <div>
              <table>
                <tbody>
                  <tr><td><b>Presumed chauffeur:</b></td><td>{isEditing ? <input value={tempPenalty.Presumed_chauffeur || ''} onChange={(e) => handleInputChange('Presumed_chauffeur', e.target.value)} /> : penalty.Presumed_chauffeur || 'Unknown'}</td></tr>
                  <tr><td><b>Driven by:</b></td><td>{isEditing ? <input value={tempPenalty.Driven_by || ''} onChange={(e) => handleInputChange('Driven_by', e.target.value)} /> : penalty.Driven_by || 'Unknown'}</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Documents Card */}
          <Card
            data={{
              title: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>DOCUMENTS</span>
                  <RoundedButton label={<EditIcon className="size-7" />} onClick={handleEditClick} />
                </div>
              ),
            }}
          >
            <div>
              <table>
                <tbody>
                  <tr>
                    <td><b>Penalty:</b></td>
                    <td>
                      {penalty.ExtractedImagePath ? (
                        <a href={penalty.ExtractedImagePath} target="_blank" rel="noopener noreferrer">
                          <img src={penalty.ExtractedImagePath} alt="Penalty Document" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                        </a>
                      ) : (
                        'No document available'
                      )}
                    </td>
                  </tr>
                  <tr><td><b>Invoice:</b></td><td>{penalty.Invoice || 'No invoice available'}</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </CardsContainer>
    </section>
  );
}
