from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model import Layout

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"])

# layout = load("/home/domisum/Seafile/rail/osm/oberbayern-rail.pbf")
layout = Layout.empty("test")

@app.get("/")
async def root():
    return layout
