from fastapi import FastAPI,UploadFile,File
from fastapi.responses import StreamingResponse
from rembg import remove
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok"}



@app.get("/health")
def health():
    return {"status":"ok"}

@app.post("/bg-remover")
async def remove_bg(file: UploadFile = File(...)):

    image_bytes = await file.read()
    
    image = Image.open(io.BytesIO(image_bytes)) #opening file

    output = remove(image) #background remove

    buffer = io.BytesIO() # like creating a  new file but only in ram

    output.save(buffer,format="PNG")

    buffer.seek(0)
    return StreamingResponse(buffer, media_type="image/png")
