import osmium

from model import Layout, Location, Point, StraightSegment


def load(osmfile):
    points = {}
    segments = {}
    for obj in osmium.FileProcessor(osmfile, osmium.osm.NODE | osmium.osm.WAY) \
            .with_locations() \
            .with_filter(osmium.filter.TagFilter(('railway', 'subway'))):
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
                        s = StraightSegment(id=sid, a=prev, b=p)
                        segments[sid] = s
                    
                    prev = p
            except osmium.InvalidLocationError:
                print("WARNING: way %d incomplete. Ignoring." % obj.id)
    
    print(len(points))
    print(len(segments))
    return Layout(id="osm", points=points, segments=segments, switches={})
