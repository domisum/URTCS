import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model import Location, Point
from osm_test import load
from tid import generate_unique_tid

logger = logging.getLogger()
app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"])

layout = load("/home/domisum/Seafile/rail/osm/oberbayern-rail.pbf")


# layout = Layout.empty("test")

@app.get("/")
async def root():
    return layout


@app.post("/edit/create/point")
async def createPoint(location: Location):
    id = generate_unique_tid("p", layout.points)
    p = Point(id=id, location=location)
    logger.info(f"Created point %s", p)
    layout.points[id] = p
    return id
