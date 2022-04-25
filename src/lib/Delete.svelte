<script lang="ts">
	import { SmallModal, ModalButton } from 'flowbite-svelte';

	export let qId: string | undefined;
	console.log({ qId });
	// let updateResult: { success: boolean; value: string };
	let modalD;

	const deleteQuestion = () => {
		console.log('deleteQuestion!');
	};
	const handlebtnM2 = () => {
		modalD.closeModal();
	};
</script>

<ModalButton id="id2" btnName="Delete" btnColor="green" />
<SmallModal
	bind:this={modalD}
	id="id2"
	btnColor="red"
	title="Delete Confirmation"
	btn1="Delete"
	btn2="Cancel"
	on:handlebtn1={deleteQuestion}
	on:handlebtn2={handlebtnM2}
>
	Sure?
</SmallModal>

<!-- <div class="register-login" on:click={handleSubmit}>
	<p>Add Question</p>
</div> -->
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
