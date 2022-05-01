<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getQA, type cardDeck } from '$lib/firebase/config';

	export const load: Load = async () => {
		console.log('LOAD FUNCTION');
		let questionAnswers = await getQA();
		questionAnswers = _.shuffle(questionAnswers);

		return {
			props: {
				questionAnswers
			}
		};
	};
</script>

<script lang="ts">
	import Flashcard from '$lib/Flashcard.svelte';
	import * as _ from 'lodash';

	export let questionAnswers: cardDeck;
	let currentCard = 0;

	$: cardStack = questionAnswers;
	$: qA = cardStack[currentCard];

	$: if (showCustom) {
		cardStack = questionAnswers.filter((qa) => qa.custom);
		cardStack = _.shuffle(cardStack);
	} else {
		cardStack = questionAnswers;
		cardStack = _.shuffle(cardStack);
	}

	const next = () => {
		if (currentCard < questionAnswers.length - 1) {
			console.log('next');
			currentCard++;
			cardStack = cardStack;
		}
	};

	const previous = () => {
		if (currentCard > 0) {
			console.log('previous');
			currentCard--;
			cardStack = cardStack;
		}
	};

	let showCustom = false;
</script>

<div class="flex flex-col w-full ">
	<div class="flex w-full justify-center pb-6">
		<span>{currentCard + 1} of {cardStack.length}</span>
	</div>
	{#key cardStack}
		<Flashcard q={qA.question} a={qA.answers} num={currentCard + 1} displayAnswer={false} />
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
			on:click={() => (cardStack = _.shuffle(cardStack))}
		>
			Shuffle
		</div>
		<div class="border border-solid py-4 w-20 text-center rounded cursor-pointer" on:click={next}>
			Next
		</div>
	</div>
	<div class="flex justify-center py-10">
		<div
			class="border border-solid p-4 rounded cursor-pointer"
			on:click={() => {
				showCustom = !showCustom;
				currentCard = 0;
			}}
		>
			{#if showCustom}
				Show All Cards
			{:else}
				Show Only Custom Cards
			{/if}
		</div>
	</div>
</div>
