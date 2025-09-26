import io
from fastapi import FastAPI, File, UploadFile
from PIL import Image
from ultralytics import YOLO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
  title= "CulinaryVision API",
  description="An API for detecting food items in images using YOLOv8",
  version="0.1.0",
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

model = YOLO('best.pt')

@app.post("/detect/")
async def detect_objects(file: UploadFile = File(...)):

  contents = await file.read()

  img = Image.open(io.BytesIO(contents))

  results = model(img)

  detections = []
  for r in results:
    for box in r.boxes:
      class_id = int(box.cls[0])
      confidence = float(box.conf[0])

      detection_info = {
        "object": model.names[class_id],
        "confidence": confidence
      }
      detections.append(detection_info)
  
  return detections