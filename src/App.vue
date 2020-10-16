<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
@import './assets/fonts.css';
@import './assets/reset.css';

#app {
	display: flex;
	flex-direction: column;
	// width: 1280px;
	max-width: 1140px;
	// max-height: 100vh;
	height: 100%;
	margin:  auto;
}

</style>
