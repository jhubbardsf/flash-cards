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
	import { type cardDeck, type questionAnswer, db } from '$lib/firebase/config';
	import { collection, query, onSnapshot } from 'firebase/firestore';

	export let questionAnswers: cardDeck = [];

	const q = query(collection(db, 'nc-dmv'));
	onSnapshot(q, (querySnapshot) => {
		questionAnswers = [];
		querySnapshot.forEach((doc) => {
			questionAnswers.push(doc.data() as questionAnswer);
		});
	});
</script>

<div class="w-full mb-8 flex justify-end">
	<div class="w-56">
		<div class="register-login">
			<p>Add Question</p>
		</div>
	</div>
</div>

{#each questionAnswers as questionAnswer, i}
	<div class="qa mb-4">
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
{/each}

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
