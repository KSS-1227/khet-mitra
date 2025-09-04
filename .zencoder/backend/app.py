from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the trained model
MODEL_PATH = os.getenv('MODEL_PATH', 'crop_recommendation_model.pkl')

try:
    with open(MODEL_PATH, 'rb') as model_file:
        model = pickle.load(model_file)
    print("Model loaded successfully!")
except FileNotFoundError:
    print(f"Model file {MODEL_PATH} not found!")
    model = None

@app.route('/')
def home():
    return jsonify({
        "message": "Khet Mitra Backend API",
        "status": "running",
        "endpoints": [
            "/predict - POST - Crop recommendation prediction",
            "/health - GET - Health check"
        ]
    })

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None
    })

@app.route('/predict', methods=['POST'])
def predict_crop():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        data = request.get_json()
        
        # Expected features: N, P, K, temperature, humidity, ph, rainfall
        required_features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        
        # Validate input
        for feature in required_features:
            if feature not in data:
                return jsonify({"error": f"Missing feature: {feature}"}), 400
        
        # Prepare features for prediction
        features = np.array([[
            data['N'], data['P'], data['K'], 
            data['temperature'], data['humidity'], 
            data['ph'], data['rainfall']
        ]])
        
        # Make prediction
        prediction = model.predict(features)
        prediction_proba = model.predict_proba(features)
        
        # Get the predicted crop and confidence
        predicted_crop = prediction[0]
        confidence = max(prediction_proba[0]) * 100
        
        return jsonify({
            "predicted_crop": predicted_crop,
            "confidence": round(confidence, 2),
            "input_features": data
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/crops')
def get_crop_info():
    """Get information about different crops"""
    crop_info = {
        "rice": {
            "name": "Rice",
            "season": "Kharif",
            "water_requirement": "High",
            "soil_type": "Clay loam"
        },
        "wheat": {
            "name": "Wheat", 
            "season": "Rabi",
            "water_requirement": "Medium",
            "soil_type": "Loam"
        },
        "cotton": {
            "name": "Cotton",
            "season": "Kharif", 
            "water_requirement": "Medium",
            "soil_type": "Black cotton soil"
        },
        "sugarcane": {
            "name": "Sugarcane",
            "season": "Year-round",
            "water_requirement": "Very High", 
            "soil_type": "Rich loam"
        }
    }
    
    return jsonify(crop_info)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)