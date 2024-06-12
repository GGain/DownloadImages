import json
import requests
from io import BytesIO
from PIL import Image
from PyPDF2 import PdfWriter

# Function to download image from URL and return PIL image object
def download_image(url):
    response = requests.get(url)
    image = Image.open(BytesIO(response.content))
    return image

# Function to create PDF document with images
def create_pdf(images, output_file):
    pdf = PdfWriter()
    for i, image in enumerate(images):
        pdf.add_page()
        image.save(output_file, "PDF", resolution=100.0, save_all=True, append_images=images)
    with open(output_file, "wb") as f:
        pdf.write(f)

outputDir = "C:\Users\PC1\Downloads\New folder\"
imageURLs = f"{outputDir}\img-url.txt"
# Define the output PDF file path
pdfOutputPath = f"{outputDir}\images.pdf"

# Load JSON data containing image URLs
with open(imageURLs, "r") as file:
    data = json.load(file)

# Download images and store them in a list
images = []
for entry in data:
    image_url = entry["image_url"]
    image = download_image(image_url)
    images.append(image)

# Create PDF document with downloaded images
create_pdf(images, pdfOutputPath)