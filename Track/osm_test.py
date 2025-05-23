import random

import osmium

from model import Layout, Location, Point, StraightSegment

def random_tid(t: str, n: int = 6) -> str:
    ID_CHARACTERS = 'ABCDEFGHKMNPRSTWX23456789'
    characters = random.choices(ID_CHARACTERS, k=n)
    idcs = ''.join(characters)
    return f"{t}-{idcs}"

def load(osmfile):
    points = {}
    segments = []
    for obj in osmium.FileProcessor(osmfile, osmium.osm.NODE | osmium.osm.WAY) \
            .with_locations() \
            .with_filter(osmium.filter.TagFilter(('railway', 'tram'))):
        if obj.is_way():
            try:
                prev = None
                for ni, node in enumerate(obj.nodes):
                    pid = f"p-{node.ref}"
                    if not pid in points:
                        points[pid] = Point(id=pid, location=Location(lat=node.lat, lon=node.lon))
                    p = points[pid]
                    if prev:
                        sid = f"s-{obj.id}-{ni - 1}"
                        s = StraightSegment(id=sid, type="straight", a=prev, b=p)
                        segments.append(s)
                    
                    prev = p
            except osmium.InvalidLocationError:
                print("WARNING: way %d incomplete. Ignoring." % obj.id)
    
    print(len(points))
    print(len(segments))
    return Layout(id="osm", points=list(points.values()), segments=segments, switches=[])
