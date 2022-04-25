<script lang="ts">
	import { MediumModal, ModalButton } from 'flowbite-svelte';
	import { createForm } from 'svelte-forms-lib';
	import { addQA, type questionAnswer } from '$lib/firebase/config';

	let initialValues: questionAnswer = { question: '', answers: [''] };
	// let updateResult: { success: boolean; value: string };
	let modal: any;

	const addField = () => {
		console.log('addField!');
		$form = {
			...$form,
			answers: [...$form.answers, '']
		};
		console.log('$form: ', $form);
	};

	const handlebtnM2 = () => {
		modal.closeModal();
	};

	const { form, handleChange, handleSubmit } = createForm({
		initialValues,
		onSubmit: async (values: questionAnswer) => {
			console.log('Add!: ', values);
			addQA(values);
			initialValues = { question: '', answers: [''] };
			modal.closeModal();
		}
	});
</script>

<ModalButton id="id2" btnName="Add Question" btnColor="green" />
<MediumModal
	bind:this={modal}
	id="id2"
	btnColor="green"
	title="Add a Question/Answer Pair"
	btn1="Add"
	btn2="Cancel"
	on:handlebtn1={handleSubmit}
	on:handlebtn2={handlebtnM2}
>
	<form on:submit={handleSubmit} class="flex flex-col flex-1 ">
		<div id="add-qa" class="mx-8 border-black  shadow-xl rounded p-4 bg-white">
			<section class="pb-2">
				<h3 class="font-bold pb-2">Question</h3>
				<input
					type="text"
					id="question"
					name="question"
					class="block border border-grey-light w-full p-3 rounded mb-4 shadow"
					placeholder="Question"
					on:change={handleChange}
					bind:value={$form.question}
				/>
			</section>

			<!-- {#key $form.answers} -->
			{#each $form.answers as answer, i}
				<section class="pb-2">
					<h3 class="font-bold pb-2">Answer {i + 1}</h3>
					<input
						type="text"
						id="answer"
						name="answer"
						class="block border border-grey-light w-full p-3 rounded mb-4 shadow"
						placeholder="Answer"
						on:change={handleChange}
						bind:value={$form.answers[i]}
					/>
				</section>
			{/each}
			<!-- {/key} -->

			<div class="flex justify-end">
				<span
					class="border border-black border-solid p-2 rounded cursor-pointer"
					on:click={addField}>+ Answer Field</span
				>
			</div>
		</div>
	</form>
</MediumModal>

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
