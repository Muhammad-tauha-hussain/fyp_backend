import json
import pandas as pd

# Load JSON data
with open("real_state_data.json", "r") as file:
    data = json.load(file)

# Convert JSON data into a structured DataFrame
rows = []
for city_data in data:
    city = city_data["city"]
    for area, prices in city_data["areas"].items():
        row = {
            "city": city,
            "area": area,
            "cost_per_sq_ft": prices["costPerSquareFoot"],
            "cost_per_marla": prices["costPerMarla"],
            "cost_per_kanal": prices["costPerKanal"],
            "cost_per_yard": prices["costPerYard"]
        }
        rows.append(row)

df = pd.DataFrame(rows)

# Save to CSV
df.to_csv("real_estate_data.csv", index=False)

print("CSV file created successfully!")
