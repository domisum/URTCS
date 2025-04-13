<script lang="ts">
    import Tool from "../Tool.svelte";
    import type {ToolClick, ToolMove} from "../toolState.svelte.js";
    import {createSegment, removeTempElements, segments, setTempElement,} from "../../../track.svelte.js";
    import {determinePoint, previewPoint} from "../pointSelection.svelte.js";
    import type {Point, StraightSegment} from "../../../model";

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
            st.sg = {type: "straight", a: st.a, b: p} as StraightSegment;
            setTempElement(segments, st.sg);
        }
    }

    function handleClick(click: ToolClick) {
        if (!st.a) {
            st.a = determinePoint(click.svgCursor, []);
        } else {
            const b = determinePoint(click.svgCursor, [st.a]);
            createSegment({type: "straight", a: st.a, b} as StraightSegment)
            reset();
        }
        handleMove(click);
    }
</script>

<Tool id="create-straight" displayName="Create Straight Segment" deactivate={reset} {handleMove} {handleClick}>
    <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" stroke-width="2"/>
</Tool>
