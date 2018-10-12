<template>
  <div id="app">
    <div class="header">
      <ToolsBar/>
    </div>
    <div class="main">
      <div class="left">
        <FileTree/>
      </div>
      <div class="right">
        <Lines/>
      </div>
    </div>
  </div>
</template>

<script>
import ToolsBar from './components/ToolsBar'
import FileTree from './components/FileTree'
import Tabs from './components/Tabs'
import Lines from './components/Lines'

export default {
  name: 'app',
  components: {
    ToolsBar,
    FileTree,
    Tabs,
    Lines,
  }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border: solid 1px lightgray;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .header {
    position: absolute;
    width: 100%;
    height: 102px;
  }
  .main {
    border-top: solid 1px lightgray;
    position: absolute;
    top: 102px;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    /*height: 100%;*/
    /*min-height: 100%;*/
    /*max-height: 100%;*/
  }

  .left {
    position: absolute;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    width: 300px;
    overflow: auto;
    border-right: solid 1px lightgray;
  }
  .right {
    box-sizing: border-box;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    padding-left: 300px;
  }
</style>
