import pandas as pd
import pickle

# Load trained model
model = pickle.load(open("trained_model.pkl", "rb"))

# Load label encoders
label_encoder_city = pickle.load(open("label_encoder_city.pkl", "rb"))
label_encoder_area = pickle.load(open("label_encoder_area.pkl", "rb"))

# User input
city_input = "Lahore"
area_input = "DHA"
size_sq_ft = 2500
size_yard = 2700

# Convert inputs
city_encoded = label_encoder_city.transform([city_input])[0]
area_encoded = label_encoder_area.transform([area_input])[0]

# Make prediction
input_data = pd.DataFrame([[city_encoded, area_encoded, size_sq_ft, size_yard]], 
                          columns=["city_encoded", "area_encoded", "size_sq_ft", "size_yard"])

predicted_price = model.predict(input_data)[0]
print(f"Predicted Cost per Marla in {area_input}, {city_input}: {predicted_price} PKR")
