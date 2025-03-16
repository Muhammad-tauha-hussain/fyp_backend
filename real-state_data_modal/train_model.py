import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Load the dataset
df = pd.read_json("real_state_data.json")  # Make sure your JSON filename is correct

# Convert nested areas into separate rows
# expanded_rows = []
# for index, row in df.iterrows():
#     city = row["city"]
#     for area, values in row["areas"].items():
#         new_row = {
#             "city": city,
#             "area": area,
#             "costPerSquareFoot": values["costPerSquareFoot"],
#         }
#         expanded_rows.append(new_row)

# df_expanded = pd.DataFrame(expanded_rows)

# # Encoding categorical variables
# label_encoder_city = LabelEncoder()
# label_encoder_area = LabelEncoder()

# df_expanded["city_encoded"] = label_encoder_city.fit_transform(df_expanded["city"])
# df_expanded["area_encoded"] = label_encoder_area.fit_transform(df_expanded["area"])

# # Define features and target variable
# df_expanded["size_sq_ft"] = df_expanded["costPerSquareFoot"]  # Dummy variable (replace with actual size data if available)
# df_expanded["size_yard"] = df_expanded["costPerSquareFoot"] * 9  # Dummy variable (convert sq_ft to yards if needed)

# X = df_expanded[["city_encoded", "area_encoded"]]
# y = df_expanded["costPerSquareFoot"]

# # Split data
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Train model
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Evaluate model
# y_pred = model.predict(X_test)
# mae = mean_absolute_error(y_test, y_pred)
# mse = mean_squared_error(y_test, y_pred)

# print(f"Model Training Complete!\nMean Absolute Error: {mae}\nMean Squared Error: {mse}")

# # Save the trained model and label encoders
# with open("trained_model.pkl", "wb") as model_file:
#     pickle.dump(model, model_file)

# with open("label_encoder_city.pkl", "wb") as city_encoder_file:
#     pickle.dump(label_encoder_city, city_encoder_file)

# with open("label_encoder_area.pkl", "wb") as area_encoder_file:
#     pickle.dump(label_encoder_area, area_encoder_file)

# print("Model and encoders saved successfully!")


expanded_rows = []
for index, row in df.iterrows():
    city = row["city"]
    for area, values in row["areas"].items():
        new_row = {
            "city": city,
            "area": area,
            "costPerMarla": values["costPerMarla"],  # Use costPerMarla instead
        }
        expanded_rows.append(new_row)

df_expanded = pd.DataFrame(expanded_rows)

# Encoding
label_encoder_city = LabelEncoder()
label_encoder_area = LabelEncoder()

df_expanded["city_encoded"] = label_encoder_city.fit_transform(df_expanded["city"])
df_expanded["area_encoded"] = label_encoder_area.fit_transform(df_expanded["area"])

# Define features & target
X = df_expanded[["city_encoded", "area_encoded"]]
y = df_expanded["costPerMarla"]  # Use costPerMarla

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
