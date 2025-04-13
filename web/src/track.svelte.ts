import _ from "lodash";
import type {Coordinate, Point, Segment} from "./model";

export let points: Point[] = $state([]);
export let segments: Segment[] = $state([]);

const TMP_ID = "tmp";


export function getPermanentPoint(id: string): Point | undefined {
    return points.find(p => p.id === id && p.id !== TMP_ID);
}

export function createPoint(location: Coordinate): Point {
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

/**
 * TEMP ELEMENTS
 */
export function setTempElement<T extends { id: string }>(collection: T[], attributes: T): T {
    const elemOpt = collection.find(p => p.id === TMP_ID);
    if (elemOpt) {
        Object.assign(elemOpt, attributes);
        return elemOpt;
    } else {
        let tempElem = {...attributes, id: TMP_ID} as T;
        collection.push(tempElem);
        return tempElem;
    }
}

export function removeTempElement<T extends { id: string }>(collection: T[]) {
    _.remove(collection, p => p.id == TMP_ID);
}

export function removeTempElements() {
    removeTempElement(points);
    removeTempElement(segments);
}


/**
 * NO BACKEND CONNECTED -> WORKAROUND
 */

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
