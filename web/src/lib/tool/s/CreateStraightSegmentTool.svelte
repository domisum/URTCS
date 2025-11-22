<script lang="ts">
    import Tool from "../Tool.svelte";
    import type {ToolClick, ToolMove} from "../toolState.svelte.js";
    import {createSegment, removeTempElements, segments, setTempElement,} from "../../../track.svelte.js";
    import {determinePoint, previewPoint} from "../pointSelection.svelte.js";
    import type {Point, StraightSegment} from "../../../model";
    import type {BackendTask} from "../../../backend.svelte";

    interface State {
        a?: Point;
        sg?: StraightSegment;
    }

    let st: State = $state({});

    function reset() {
        removeTempElements();
        st = {};
    }

    function handleMove(move: ToolMove) {
        const p = previewPoint(move.svgCursor, [st.a]);
        if (st.a) {
            st.sg = {a: st.a, b: p} as StraightSegment;
            setTempElement(segments, st.sg);
        }
    }

    function handleClick(click: ToolClick) {
        if (!st.a) {
            st.a = determinePoint(click.svgCursor, []);
        } else {
            const b = determinePoint(click.svgCursor, [st.a]);
            createSegment({a: st.a, b} as StraightSegment)
            reset();
        }
        handleMove(click);
    }

    class CreateStraightSegmentBackendTask implements BackendTask {
        path = "/edit/create/segment";
        requestInit = {method: "POST"}

        constructor(toolState: State) {}

        handleSuccess(response: Response) {

        }

        handleFail(reason: any) {

        }
    }

</script>

<Tool id="create-straight" displayName="Create Straight Segment" deactivate={reset} {handleMove} {handleClick}>
    <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" stroke-width="2"/>
</Tool>
