<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getQA, type cardDeck } from '$lib/firebase/config';

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
	import Flashcard from '$lib/Flashcard.svelte';
	import { browser } from '$app/env';

	export let questionAnswers: cardDeck;
	let currentCard = 0;

	function shuffleArray(questionAnswers: cardDeck) {
		console.log('Shuffling!');
		for (let i = questionAnswers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[questionAnswers[i], questionAnswers[j]] = [questionAnswers[j], questionAnswers[i]];
		}
		console.log(questionAnswers);

		questionAnswers = questionAnswers;
		qA = questionAnswers[0];
	}

	if (!browser) shuffleArray(questionAnswers);
	console.log('Flash Game!');
	console.log({ questionAnswers });
	$: qA = questionAnswers[currentCard];
	$: console.log('Current QA: ', qA);

	const next = () => {
		if (currentCard < questionAnswers.length - 1) {
			console.log('next');
			currentCard++;
		}
	};

	const previous = () => {
		if (currentCard > 0) {
			console.log('previous');
			currentCard--;
		}
	};
</script>

<div class="flex flex-col w-full ">
	<div class="flex w-full justify-center pb-6">
		<span>{currentCard + 1} of {questionAnswers.length}</span>
	</div>
	{#key questionAnswers}
		<Flashcard q={qA.question} a={qA.answers} num={currentCard + 1} />
	{/key}
	<div class="w-[90%] md:w-[500px] flex justify-between pt-6 px-6 m-auto">
		<div
			class="border border-solid py-4 w-20 text-center rounded cursor-pointer"
			on:click={previous}
		>
			Previous
		</div>
		<div
			class="border border-solid py-4 w-20 text-center rounded cursor-pointer"
			on:click={() => shuffleArray(questionAnswers)}
		>
			Shuffle
		</div>
		<div class="border border-solid py-4 w-20 text-center rounded cursor-pointer" on:click={next}>
			Next
		</div>
	</div>
</div>
