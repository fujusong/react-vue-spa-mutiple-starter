<template>
<div>
	<vhead></vhead>
	<vindex></vindex>
  <hello></hello>
	<vfoot></vfoot>
</div>
</template>

<script>
import vhead from '../../components/Head'
import vfoot from '../../components/Foot'
import hello from '../../components/Hello'
import vindex from './components/Index'
export default {
  components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
    vhead,
    vfoot,
    vindex,
    hello

  }
}
</script>

<style>

</style>
