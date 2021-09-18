<template>
  <div id="one" style="width:100%;height:800px">
    <div style="font-size: 100px;font-weight: 500">
      Welcome SmartHome!
    </div>
	</div>
</template>

<style>
  #one{
		background: linear-gradient(90deg, #496eaa, #944fa8, #a8804f, #496eaa);
		background-size:1400% 300%;
		position:absolute;
		top:0px;
		left:0px;
		animation:mymove 20s ease infinite;
		-webkit-animation: mymove 20s ease infinite;
		-moz-animation: mymove 20s ease infinite;
	}

	@keyframes mymove
	{
    0% {
			background-position: 0% 0%; }
    50% {
      background-position: 50% 100%; }
    100% {
      background-position: 100% 0%; }
	}
</style>