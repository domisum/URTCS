import type {Location, Point, Segment} from "./datatypes";
import _ from "lodash";

export let points: Point[] = $state([]);
export let segments: Segment[] = $state([]);

export function getPermanentPoint(id: string): Point | undefined {
    return points.find(p => p.id === id && !p.id.startsWith("p-tmp-"));
}

export function createPoint(location: Location): Point {
    const point = {id: "p-" + randomString(10), location}
    points.push(point);
    return point;
}

export function createSegment(segment: Segment) {
    segment.id = "s-" + randomString(10);
    segments.push(segment);
}

export function deleteTrackElement(id: string) {
    const rmPoints = _.remove(points, p => p.id === id);
    _.remove(segments, s => s.id === id || doesSegmentContainAnyPoint(s, rmPoints));
}

function doesSegmentContainAnyPoint(segment: Segment, points: Point[]): boolean {
    for (const p of points)
        if (segment.a.id == p.id || segment.b.id == p.id)
            return true;
    return false;
}

export function setTempPoint(index: number, location: Location): Point {
    const tpOpt = points.find(p => p.id === "p-tmp-" + index);
    if (tpOpt) {
        tpOpt.location = location;
        return tpOpt;
    } else {
        let tp = {id: "p-tmp-" + index, location: location};
        points.push(tp);
        return tp;
    }
}

export function removeTempPoint(index: number) {
    _.remove(points, p => p.id == "p-tmp-" + index);
}

export function removeTempElements() {
    _.remove(points, p => p.id.startsWith("p-tmp-"));
    _.remove(segments, s => s.id.startsWith("s-tmp-"));
}


function randomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHKMNPRSTWX23456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
