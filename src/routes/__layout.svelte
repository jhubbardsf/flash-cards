<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<main class="p-8">
	<slot />
</main>
