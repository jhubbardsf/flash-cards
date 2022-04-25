<script lang="ts">
	import { type cardDeck, type questionAnswer, db } from '$lib/firebase/config';
	import { collection, query, onSnapshot } from 'firebase/firestore';

	let questionAnswers: cardDeck = [];
	const q = query(collection(db, 'nc-dmv'));
	onSnapshot(q, (querySnapshot) => {
		questionAnswers = [];
		querySnapshot.forEach((doc) => {
			questionAnswers.push(doc.data() as questionAnswer);
		});
	});

	$: console.log({ questionAnswers });
</script>

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
