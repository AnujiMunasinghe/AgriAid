from flask import Flask
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import json
import numpy as np
from flask import Flask, request, Response

app = Flask(__name__)


@app.route('/API/Predict', methods=['POST'])
def Predict():

    print("start")
    input_data = request.get_json()

    # Preprocess the data
    crop_encoder = LabelEncoder()
    region_encoder = LabelEncoder()
    quarter_encoder = LabelEncoder()

    # Fit the encoders with the available data
    crop_encoder.fit(['Capsicum', 'Green Chilli'])
    # Update with the classes used for training the model
    region_encoder.fit(['Colombo', 'Ampara',
                        'Anuradhapura', 'Badulla', 'Batticaloa', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matala', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'])

    # Update with the classes used for training the model
    quarter_encoder.fit(['Q1', 'Q2', 'Q3'])

    # Encode the input values
    input_crop_encoded = crop_encoder.transform([input_data['Crop']])[0]
    input_region_encoded = region_encoder.transform([input_data['Region']])[0]
    input_quarter_encoded = quarter_encoder.transform(
        [input_data['Quarter']])[0]

    # Load the trained model
    model = load_model('trained_model.h5')

    # Preprocess the input data
    scaler = MinMaxScaler()
    input_data_scaled = scaler.fit_transform(
        [[input_crop_encoded, input_region_encoded, input_quarter_encoded]])

    # Make predictions
    predictions = model.predict(input_data_scaled)

    # Fit the scaler with the training data
    scaler_output = MinMaxScaler()
    # Assuming the target variable was scaled between 0 and 1 during training
    scaler_output.fit([[0], [1]])

    # Decode the predictions
    demand_pred = scaler_output.inverse_transform(
        predictions.reshape(-1, 1)).flatten()
    supply_pred = scaler_output.inverse_transform(
        predictions.reshape(-1, 1)).flatten()
    price_pred = scaler_output.inverse_transform(
        predictions.reshape(-1, 1)).flatten()

    # Print the predictions
    print("Demand Prediction:", demand_pred[0])
    print("Supply Prediction:", supply_pred[1])
    print("Price Prediction:", price_pred[2])

    result = json.dumps({
        "Demand": str("{:06.0f}".format(demand_pred[0] * 1000000)),
        "Supply": str("{:06.0f}".format(supply_pred[1] * 1000000)),
        "Price": str("{:03.0f}".format(price_pred[2]*1000))})

    return Response(response=result, status=200)


@app.route('/')
def hello():
    return "Hello, World!"


if __name__ == '__main__':
    app.run()
