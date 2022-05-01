<script>
	import { Navbar } from 'flowbite-svelte';
	let siteName = 'Flash Cards';
	let logo = '/card-icon.svg';
	let alt = 'flash-card';
	let textsize = 'text-lg';
	let menus = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Question List',
			href: '/list'
		},
		{
			name: 'Flash Cards',
			href: '/cards'
		},
		{
			name: 'GitHub',
			href: 'https://github.com/jhubbardsf/flash-cards'
		}
	];
</script>

<img src="/card-icon.svg" height={400} />
<Navbar {menus} {siteName} {alt} {logo} {textsize} />
