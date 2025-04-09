import type {Location, Point, Segment} from "./datatypes";
import _ from "lodash";

export let points: Point[] = $state([]);
export let segments: Segment[] = $state([]);

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

export function removeTempElements() {
    _.remove(points, p => p.id.startsWith("p-tmp-"));
    _.remove(segments, s => s.id.startsWith("s-tmp-"));
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
