def individual_data(penalty):
    return {
        "id": str(penalty["_id"]),
        "Type":penalty["Type"],
        "Location":penalty["Location"],
        "Infraction_number":penalty["Infraction_number"],
        "Car":penalty["Car"],
        "Amount":penalty["Amount"],
        "Currency":penalty["Currency"]
    }

def allPenalties(penalties):
    return [individual_data(penalty) for penalty in penalties]