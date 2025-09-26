import requests
from PIL import Image
from io import BytesIO
from ultralytics import YOLO

def test_object_detection():
    print("starting model test...")

    model = YOLO('yolov8n.pt')
    print("YOLOv8 model loaded successfully")

    # Using a new, stable URL for a pizza image
    image_url = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg"
    print(f"Downloading image from {image_url}...")

    # Add headers to mimic a browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(image_url, headers=headers)
        # This will raise an error if the download failed (e.g., 404 Not Found)
        response.raise_for_status()

        img = Image.open(BytesIO(response.content))
        print("Image downloaded and opened successfully")

        print("running inference on the image...")
        results = model(img)
        print("Inference completed successfully")

        for r in results:
            im_array = r.plot()  # plot() returns a NumPy array with detections
            im = Image.fromarray(im_array[..., ::-1])  # Convert to PIL Image

            output_path = "pizzadetection_result.jpg"
            im.save(output_path)
            print(f"Result image saved to {output_path}")

    except requests.exceptions.RequestException as e:
        print(f"Error downloading the image: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    test_object_detection()