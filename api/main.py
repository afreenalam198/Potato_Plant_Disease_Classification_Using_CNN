from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("saved_model/potato_classification_model.keras")

class_names = ['Early blight', 'Late blight', 'healthy']

# Function to test server
@app.get("/")
async def ping():
    return {'ping': 'OK'}

# Function to read the file as a Pillow image and convert it into a numpy array
def read_file_as_image(file) -> np.ndarray:
    image = np.array(Image.open(BytesIO(file)))
    return image

# Function to predict the class of potato plants
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    image_batch = np.expand_dims(image, 0)
    
    predictions = model.predict(image_batch)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0])) * 100
    confidence = round(confidence, 2)
    
    return {
        'class': predicted_class,
        'confidence': confidence
    }
  

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)