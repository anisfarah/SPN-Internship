from datetime import datetime
def individual_data(penalty):
    return {
        "id": str(penalty["_id"]),
        "Type":penalty["Type"],
        "Location":penalty["Location"],
        "Infraction_number":penalty["Infraction_number"],
        "Car":penalty["Car"],
        "Car_plate_number": penalty.get("Car_plate_number", ""),  # Handle optional fields
        "Amount":penalty["Amount"],
        "Currency":penalty["Currency"],
        "Infraction_date": penalty["Infraction_date"].isoformat() if isinstance(penalty["Infraction_date"], datetime) else penalty["Infraction_date"]

    }

def allPenalties(penalties):
    return [individual_data(penalty) for penalty in penalties]