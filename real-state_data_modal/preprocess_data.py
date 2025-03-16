import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("real_estate_data.csv")

# Convert categorical data into numbers
label_encoder_city = LabelEncoder()
label_encoder_area = LabelEncoder()

df["city"] = label_encoder_city.fit_transform(df["city"])
df["area"] = label_encoder_area.fit_transform(df["area"])

# Define features and target variable
X = df[["city", "area", "cost_per_sq_ft", "cost_per_yard"]]
y = df["cost_per_marla"]  # Predicting price per marla

# Split data into training (80%) and testing (20%) sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save processed data
X_train.to_csv("X_train.csv", index=False)
X_test.to_csv("X_test.csv", index=False)
y_train.to_csv("y_train.csv", index=False)
y_test.to_csv("y_test.csv", index=False)

print("Data preprocessing complete!")
