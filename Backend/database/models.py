from pydantic import BaseModel
from datetime import datetime
from typing import Optional 

class Penalty(BaseModel):
    Type: str
    Location: str
    Infraction_number: int
    Car: str
    Car_plate_number: str
    Infraction_date: datetime
    Amount: float
    Currency: str
    ExtractedImagePath: str  # Path to the locally saved denoised image
    ExtractedText: Optional[str]=None  # Extracted text from the image
