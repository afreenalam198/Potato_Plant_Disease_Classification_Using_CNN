# Potato Plant Disease Classification using CNN

## Overview

This project aims to develop an end-to-end application for the detection of two common potato plant diseases: Early Blight and Late Blight. By leveraging Convolutional Neural Networks (CNNs), the application analyzes images of potato plants and classifies them as either healthy or affected by one of the two diseases. This tool can assist farmers in early detection and timely intervention, potentially mitigating crop damage and economic losses.

## Problem Statement

Potato farmers face significant economic challenges when their crops are affected by diseases. Early detection of diseases like Early Blight and Late Blight is crucial for implementing timely control measures.

* **Early Blight:** A fungal disease causing damage to leaves and tubers, leading to dark, water-soaked lesions and potentially rapid plant death.
* **Late Blight:** A fungal disease primarily affecting leaves, characterized by dark, circular lesions with concentric rings, reducing plant vigor and yield.

This project addresses this problem by providing a system that can identify these diseases from uploaded images of potato plants.

## Project Roadmap

The project followed these steps to build the application:

1.  **Collect Data:** Gathered a dataset of potato plant images, including healthy plants and those affected by Early Blight and Late Blight.
2.  **Data Cleaning and Preprocessing:** Prepared the collected data for model training, including resizing and normalizing images.
3.  **Model Building:** Developed a CNN model for image classification.
4.  **ML Ops to serve the models (tf serving and Fast API):** Implemented a backend using FastAPI to serve the trained model for predictions.
5.  **Build the frontend for user interaction (using react JS):** Implemented a frontend using react JS where users can upload image of a potato plant for classification.

## Dataset

The dataset used for this project was obtained from the Plant Village dataset on Kaggle:

* **Source:** [Plant Village Dataset](https://www.kaggle.com/datasets/arjuntejaswi/plant-village)
* **Specific Files Used:**
    * `Potato___Early_blight` (1000 files)
    * `Potato___Late_blight` (1000 files)
    * `Potato___healthy` (152 files)
* **Classes:** The dataset includes images belonging to three classes:
    * Early Blight
    * Late Blight
    * Healthy

## Data Splitting

The dataset was split into training, validation, and testing sets as follows:

* **Training:** 80%
* **Validation:** 10%
* **Testing:** 10%

## Data Processing

Data augmentation techniques were applied to the training data to improve the model's generalization ability. This involved the following techniques - flipping, rotation and contrast.

## Model Architecture

A six layer Convolutional Neural Network (CNN) model was developed for image classification. The architecture included:

* **Input Layer:** To receive the image data.
* **Data Preprocessing Layer:** Resizing and rescaling the input images to a suitable format for the CNN.
* **Convolutional Layers:** 6 convolutional layers to extract features from the images.
* **Max Pooling Layers:** Used after convolutional layers to reduce dimensionality and retain important features. 
* **Dense Layers:** 2 fully connected layers to make the final classification.
  
## Model Training

* **Loss Function:** `SparseCategoricalCrossEntropy` was used. This loss function is suitable for multi-class classification problems where the labels are provided as integer indices.
* **Evaluation Metrics:** The model's performance was evaluated using `loss` and `accuracy`.

## Model Performance
* **Accuracy:** The percentage of correctly classified images.
* **Precision:** For each class, the proportion of correctly predicted instances out of all instances predicted as that class.
* **Recall:** For each class, the proportion of correctly predicted instances out of all actual instances of that class.
* **F1-Score:** The harmonic mean of precision and recall, providing a balanced measure of performance.
* **Confusion Matrix:** A table showing the counts of true positives, true negatives, false positives, and false negatives for each class, which helps in understanding the model's errors.

## Model Saving

The trained model was saved for later deployment and use in the backend application.

## Backend Development (FastAPI)

The backend of the application was built using FastAPI to serve the trained model and handle image predictions.

* **Virtual Environment:** A virtual environment was created to manage project dependencies.
* **Dependencies:** Necessary libraries for FastAPI and model serving were installed.
* **File Upload and Processing:** A Python script was created to handle file uploads, preprocess the uploaded image, and pass it to the trained model for prediction.
* **API Testing:** Postman was used to test the API endpoints and ensure they were functioning correctly.

## Frontend Development (React JS)

The frontend of the applciation was built using React JS to allow users to upload images for classification via the API.

* **Virtual Environment:** A virtual environment was created to manage project dependencies.
* **Dependencies:** Necessary libraries for FastAPI and model serving were installed.
* **File Upload and Processing:** A Python script was created to handle file uploads, preprocess the uploaded image, and pass it to the trained model for prediction.
* **API Testing:** Postman was used to test the API endpoints and ensure they were functioning correctly.
