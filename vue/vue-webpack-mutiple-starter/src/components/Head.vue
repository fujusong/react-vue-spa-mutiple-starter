<template>
	<div>
		<h2><a href="/index/index.html">Index</a>
		<a href="/about/about.html">About</a>
		</h2>
		<h1>This is new Head!</h1>
	</div>
	
</template>

<script></script>

<!-- 加入scoped是为了防止本组件中的css渗透到其他组件，可以去掉看看结果 -->
<style scoped>
	h1{
		color: black;
	}
	a{
		text-decoration:none;
		border: solid 1px black;
		padding: 5px;
	}
</style>
