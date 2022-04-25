<script lang="ts">
	export let text = 'Text';
	export let href: string | null = '/';
</script>

<a sveltekit:prefetch {href} class="register-login">
	<p>{text}</p>
</a>

<style>
	.register-login {
		cursor: pointer;
		padding: 9px 0;
		display: flex;
		margin: 18px auto 0 auto;
		width: 70%;
		border: 2px solid black;
		border-radius: 5px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	p {
		color: #555555;
		margin: auto;
		font-weight: bold;
		padding: 0;
	}
</style>
