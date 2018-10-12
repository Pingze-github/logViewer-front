<template>
    <div id="file-tree">
        <el-tree :data="data" @node-click="handleNodeClick" accordion highlight-current></el-tree>
    </div>
</template>

<script>
  import {getFileTree} from "@/services/fileTree"
  export default {
    name: "FileTree",
    data() {
      return {
        rootDirPath: '/',
        data: []
      };
    },
    created() {
        this.renderFileTree();
    },
    methods: {
      async renderFileTree() {
        const dataRaw = await getFileTree();
        let data = dataRaw.root.children;
        this.dataTransfer(data);
        this.data = data;
      },
      dataTransfer(data) {
        data.forEach(node => {
            node.label = node.name;
            if (node.children) {
                this.dataTransfer(node.children);
            }
        });
      },
      handleNodeClick(data) {
        if (data.isFile) {
          this.$store.commit('setFilePath', data.path)
        }
      }
    }
  }
</script>

<style scoped>
    #file-tree {
        height: 100%;
        max-height: 100%;
        min-height: 100%;
    }
    #file-tree .el-tree{
        height: 100%;
        max-height: 100%;
        min-height: 100%;
        box-sizing: border-box;
    }
</style>