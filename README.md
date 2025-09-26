# CulinaryVision 🥗

CulinaryVision is a full-stack web application that uses a fine-tuned YOLOv8 model to detect objects in images uploaded by a user. It features a Python FastAPI backend and a React frontend.

![CulinaryVision Screenshot](<LINK_TO_YOUR_SCREENSHOT_OR_GIF>)

---

## ✨ Features

- **Image Upload:** A clean, modern interface for uploading images.
- **Object Detection:** Real-time analysis of images using a custom-trained YOLOv8 model.
- **Dynamic Results:** Displays a list of detected objects and their confidence scores.
- **Responsive UI:** A user-friendly interface that works on different screen sizes.

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, Ultralytics (YOLOv8)
- **Frontend:** React.js, Vite
- **ML Training:** PyTorch, Google Colab (for GPU access)

---

## 🚀 Setup and Installation

Instructions to run this project locally.

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://localhost:8000`.

### Frontend

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`.

---

## 🧠 Model Training

The YOLOv8n model was fine-tuned on the `coco128` sample dataset for 50 epochs using a T4 GPU on Google Colab. The training script and process are documented in the `training` directory. This process improved the model's performance on the dataset's specific classes.
