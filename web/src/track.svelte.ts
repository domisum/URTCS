import type {Location, Point, Segment} from "./datatypes";
import _ from "lodash";

export let points: Point[] = $state([]);
export let segments: Segment[] = $state([]);

export function setTempPoint(index: number, location: Location) {
    const tpOpt = points.find(p => p.id === "p-tmp-" + index);
    if (tpOpt)
        tpOpt.location = location;
    else
        points.push({id: "p-tmp-" + index, location: location});
}

export function removeTempPoints() {
    _.remove(points, p => p.id.startsWith("p-tmp-"));
}

export function createPoint(location: Location) {
    const point = {id: "p-" + randomString(10), location}
    points.push(point);
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
