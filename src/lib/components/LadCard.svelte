<script lang="ts">
    export let lad: {name: string, pretext: string}
</script>

<div class="card rounded-lg shadow-lg">
    <div class="p-6">
        <h2 class="mb-0">{lad.name}</h2>
        <p>{lad.pretext}</p>
    </div>
</div>