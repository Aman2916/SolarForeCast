import sys
import pandas as pd
import joblib


def load_model():
    model = joblib.load('./model/solar_model.pkl')  # Path to the saved model
    return model

def predict_solar_radiation(air_temp, clearsky_dhi, clearsky_dni, clearsky_ghi, cloud_opacity, precipitation_rate, relative_humidity, hour, day, month, day_of_week, year):
    model = load_model()
    
    # Create a DataFrame for the input data
    input_data = pd.DataFrame({
        'air_temp': [air_temp],
        'clearsky_dhi': [clearsky_dhi],
        'clearsky_dni': [clearsky_dni],
        'clearsky_ghi': [clearsky_ghi],
        'cloud_opacity': [cloud_opacity],
        'precipitation_rate': [precipitation_rate],
        'relative_humidity': [relative_humidity],
        'hour': [hour],
        'day': [day],
        'month': [month],
        'day_of_week': [day_of_week],
        'year': [year]
    })

    # Make the prediction
    prediction = model.predict(input_data)
    return prediction

# Get user input from Node.js/Express
air_temp = float(sys.argv[1])
clearsky_dhi = float(sys.argv[2])
clearsky_dni = float(sys.argv[3])
clearsky_ghi = float(sys.argv[4])
cloud_opacity = float(sys.argv[5])
precipitation_rate = float(sys.argv[6])
relative_humidity = float(sys.argv[7])
hour = int(sys.argv[8])
day = int(sys.argv[9])
month = int(sys.argv[10])
day_of_week = int(sys.argv[11])
year = int(sys.argv[12])

# Call the prediction function
prediction = predict_solar_radiation(air_temp, clearsky_dhi, clearsky_dni, clearsky_ghi, cloud_opacity, precipitation_rate, relative_humidity, hour, day, month, day_of_week, year)
prediction_list = prediction.tolist()
# Output the prediction back to Node.js/Express
import json
print(json.dumps(prediction_list))

