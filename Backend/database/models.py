from pydantic import BaseModel
from datetime import datetime
class Penalty(BaseModel):
    Type: str
    Location :str
    Infraction_number: int
    Car: str
    Car_plate_number: str
    Infraction_date: datetime
    Amount: float
    Currency: str