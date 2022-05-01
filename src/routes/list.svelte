<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getQA } from '$lib/firebase/config';

	export const load: Load = async () => {
		const questionAnswers = await getQA();

		return {
			props: {
				questionAnswers
			}
		};
	};
</script>

<script lang="ts">
	import { type cardDeck, type questionAnswer, db, deleteQA as delQA } from '$lib/firebase/config';
	import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
	import Add from '$lib/Add.svelte';

	export let questionAnswers: cardDeck = [];

	const q = query(
		collection(db, 'nc-dmv'),
		orderBy('custom', 'desc'),
		orderBy('createdAt', 'desc')
	);
	onSnapshot(q, (querySnapshot) => {
		questionAnswers = [];
		querySnapshot.forEach((doc) => {
			const q = { ...doc.data(), id: doc.id };
			questionAnswers.push(q as questionAnswer);
		});

		console.log('QA Length: ', questionAnswers.length);
	});

	const deleteQA = (id: string | undefined) => {
		const confirmation = confirm('Confirm delete?');
		if (confirmation) {
			console.log({ id });
			delQA(id as string);
			console.log('Deleted');
		}
	};
</script>

<div class="w-full mb-8 flex justify-between">
	<div class="">
		Total Question: {questionAnswers.length} / Custom Questions: {questionAnswers.filter(
			(qa) => qa.custom
		).length}
	</div>
	<div class="w-56">
		<Add />
	</div>
</div>

{#each questionAnswers as questionAnswer, i}
	<div class="section mb-4 flex justify-between border-b-black border-solid border-b pb-4">
		<div class="qa">
			<div class="question">
				Question {i + 1}: {questionAnswer.question}
			</div>
			<div class="answers">
				{#each questionAnswer.answers as answer, j}
					<div class="answer">
						Answer {i + 1}-{j + 1}: {answer}
					</div>
				{/each}
			</div>
		</div>
		{#if questionAnswer.custom}
			<div
				class="delete cursor-pointer border border-solid rounded flex justify-center items-center p-2"
				on:click={() => deleteQA(questionAnswer.id)}
			>
				<span>DELETE</span>
			</div>
		{/if}
	</div>
{/each}
