<script>
    import ToolOption from "../ToolOption.svelte";
    const s = 6;
    const d = 3;
</script>

<ToolOption id="smooth" displayName="Smooth path">
    <path d="M{s-d} {24-s-d} L{24-s-d} {s-d}" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M{s+d} {24-s+d} L{24-s+d} {s+d}" stroke="currentColor" stroke-width="2" fill="none"/>
</ToolOption>
