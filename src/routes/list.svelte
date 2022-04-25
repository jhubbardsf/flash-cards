<script lang="ts">
	import { getQA } from '$lib/firebase/config';

	$: questionAnswers = getQA();

	$: console.log(questionAnswers);
</script>
