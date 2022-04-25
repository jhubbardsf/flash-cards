<script lang="ts">
	export let num = 1;
	export let q = 'What is the speed limit?';
	export let a = ['25 in neighborhoods.', '60 on highway'];
	export let displayAnswer = false;

	const showAnswer = () => {
		console.log('Show answer!');
		displayAnswer = !displayAnswer;
	};
</script>

<div class="w-[90%] md:w-[500px] border border-solid rounded p-4 m-auto min-h-[200px]">
	<div class="font-extrabold text-center border-b border-solid pb-2">
		{!displayAnswer ? 'Question' : 'Answer'}
		{num}
	</div>
	{#if !displayAnswer}
		<div class="question mb-2 mt-6 text-center">{q}</div>
	{:else}
		<div id="answers" class=" mb-2 pt-4">
			{#each a as answer, i}
				<div class="my-2">{i + 1}. {answer}</div>
			{/each}
		</div>
	{/if}
	<div class="flex justify-center">
		<span
			class="mt-5 py-4 rounded w-[50%] text-center cursor-pointer border border-solid"
			on:click={showAnswer}>{displayAnswer ? 'Show Question' : 'Show Answer'}</span
		>
	</div>
</div>
