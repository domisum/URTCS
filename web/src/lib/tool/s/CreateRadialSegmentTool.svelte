<script lang="ts">
    import Tool from "../Tool.svelte";
    import type {ToolClick, ToolMove} from "../toolState.svelte.js";
    import {convertLocationToCoordinate, distance, type SvgCoordinate} from "../../svg/modelSvg.svelte.js";
    import {determinePoint, previewPoint} from "../pointSelection.svelte.js";
    import {
        createSegment,
        points,
        removeTempElement,
        removeTempElements,
        segments,
        setTempElement
    } from "../../../track.svelte.js";
    import _ from "lodash";
    import {abs, add, complex, type Complex, cross, divide, multiply, norm, pow, subtract} from "mathjs";
    import type {Location, Point, RadialSegment} from "../../../model";

    interface State {
        a?: Point;
        b?: Point;
        sg?: RadialSegment;
    }

    interface RadialCurvature {
        radius: number;
        turnDirection: "l" | "r";
    }

    let st: State = $state({});

    function reset() {
        removeTempElements();
        st = {};
    }

    function handleMove(move: ToolMove) {
        if (st.a) {
            st.sg = {type: "radial", a: st.a, b: st.b, radius: -1, turnDirection: "r"} as RadialSegment;
        }

        if (!st.b) {
            const point = previewPoint(move.svgCursor, [st.a, st.b]);
            if (st.sg) {
                st.sg.b = point;
                st.sg.radius = distance(st.sg.a.location, st.sg.b.location) / 1.5;
            }
        } else if (st.b && st.sg) {
            removeTempElement(points);
            const curvature = calculateRadialCurvature(move.svgCursor.coordinate);
            st.sg = _.extend(st.sg, curvature);
        }

        if (st.sg) {
            setTempElement(segments, st.sg)
        }
    }

    function handleClick(click: ToolClick) {
        if (!st.a) {
            st.a = determinePoint(click.svgCursor, []);
        } else if (!st.b) {
            st.b = determinePoint(click.svgCursor, [st.a]);
        } else {
            const curvature = calculateRadialCurvature(click.svgCursor.coordinate);
            createSegment({type: "radial", a: st.a, b: st.b, ...curvature} as RadialSegment);
            reset();
        }
        handleMove(click);
    }

    function calculateRadialCurvature(coord: SvgCoordinate): RadialCurvature {
        if (!st.a || !st.b) throw new Error("a or b are missing");
        const al = convertLocationToCoordinate(st.a.location);
        const bl = convertLocationToCoordinate(st.b.location);

        const z1 = complex(al.x, al.y);
        const z2 = complex(bl.x, bl.y);
        let z3 = complex(coord.x, coord.y);

        // move z3 closer if radius would be less than min
        const z12m = divide(add(z1, z2), 2);
        const dist = norm(subtract(z3, z12m) as Complex) as number;
        const minRadius = norm(subtract(z2, z1)) as number / 2;
        if (dist > minRadius) {
            const divisor = dist / minRadius * 1.001;
            z3 = add(z12m, divide(subtract(z3, z12m), divisor)) as Complex;
        }

        const cSpec = circleFrom3Points(z1, z2, z3);
        if (!cSpec)
            return {radius: 0, turnDirection: "r"};
        let [c, radius] = cSpec;

        const ab = subtract([bl.x, 0, bl.y], [al.x, 0, al.y])
        const ac = subtract([c.re, 0, c.im], [al.x, 0, al.y])
        const x = cross(ab, ac) as number[];
        let z = x[1];
        const turnDirection = z > 0 ? "l" : "r";

        return {radius: radius, turnDirection};
    }

    // https://math.stackexchange.com/a/3503338/269931
    function circleFrom3Points(z1: Complex, z2: Complex, z3: Complex): [Complex, number] | undefined {
        if (z1 == z2 || z2 == z3 || z3 == z1)
            return undefined;
        const w = divide(subtract(z3, z1), subtract(z2, z1)) as Complex;

        if (abs(w.im) <= 0.001)
            return undefined;

        const a = subtract(z2, z1);
        const b = subtract(w, pow(w.toPolar().r, 2));
        const deno = multiply(complex(0, 2), w.im);
        const cRel = divide(multiply(a, b), deno);

        const c = add(cRel, z1) as Complex;
        const r = (subtract(z1, c) as Complex).toPolar().r;
        return [c, r];
    }
</script>

<Tool id="create-radial" displayName="Create Radial Segment" deactivate={reset} {handleMove} {handleClick}>
    <path d="M2 2 A20 20 0 0 1 22 22" stroke="currentColor" stroke-width="2" fill="none"/>
</Tool>
