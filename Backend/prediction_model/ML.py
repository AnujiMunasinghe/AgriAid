import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
import pandas as pd


# Load the dataset from CSV
data = pd.read_csv('Historical.csv')

# Preprocess the data
crop_encoder = LabelEncoder()
region_encoder = LabelEncoder()
quarter_encoder = LabelEncoder()

crop = data['Crop']
region = data['Region']
demand = data['Demand (Kg)']
supply = data['Supply  (Kg)']
price = data['Price (Rs)']
quarter = data['Quarter']

crop_encoded = crop_encoder.fit_transform(crop)
region_encoded = region_encoder.fit_transform(region)
quarter_encoded = quarter_encoder.fit_transform(quarter)

# Concatenate the categorical features
X = pd.concat([pd.Series(crop_encoded), pd.Series(
    region_encoded), pd.Series(quarter_encoded)], axis=1)

scaler = MinMaxScaler()
demand_scaled = scaler.fit_transform(demand.values.reshape(-1, 1))
supply_scaled = scaler.fit_transform(supply.values.reshape(-1, 1))
price_scaled = scaler.fit_transform(price.values.reshape(-1, 1))

# Split the data into training and testing sets
X_train, X_test, y_demand_train, y_demand_test, y_supply_train, y_supply_test, y_price_train, y_price_test = train_test_split(
    X, demand_scaled, supply_scaled, price_scaled, test_size=0.2, random_state=42)

# Build the model
model = Sequential()
model.add(Dense(256, activation='relu', input_dim=X_train.shape[1]))
model.add(Dropout(0.5))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(3))

# Compile the model
model.compile(optimizer=Adam(), loss='mean_squared_error')

# Train the model
model.fit(X_train, [y_demand_train, y_supply_train,
          y_price_train], epochs=100, batch_size=32)

# Evaluate the model
loss = model.evaluate(X_test, [y_demand_test, y_supply_test, y_price_test])

print("Final Loss:", loss)

# Save the trained model
model.save('trained_model.h5')

print("Trained model saved.")
