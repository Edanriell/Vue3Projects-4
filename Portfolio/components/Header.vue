<template>
	<header class="w-full py-8 border-b-2 mb-4">
		<div class="container h-full mx-auto flex items-center justify-between">
			<ULink
				active-class="text-primary"
				class="font-bold"
				inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
				to="/"
				>🏡 Home</ULink
			>
			<nav>
				<ul class="flex space-x-8 text-lg font-bold">
					<li>
						<ULink
							active-class="text-primary"
							inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
							to="/portfolio"
							>🗂️ Portfolio</ULink
						>
					</li>
					<li>
						<ULink
							active-class="text-primary"
							inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
							to="/me"
							>🧑‍💻 Me</ULink
						>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
