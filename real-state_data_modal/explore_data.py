import pandas as pd

# Load data
df = pd.read_csv("real_estate_data.csv")

# Display the first few rows
print(df.head())

# Check for missing values
print("\nMissing Values:\n", df.isnull().sum())

# Get summary statistics
print("\nSummary Statistics:\n", df.describe())

# Check data types
print("\nData Types:\n", df.dtypes)
