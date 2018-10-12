<template>
    <div id="tabs">
        <!--分出一个Tabs.vue-->

        <el-tabs v-model="editTab" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item) in tabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
                <Lines/>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
  import Lines from '@/components/Lines'
  import {getLines, search} from "@/services/lines"
  export default {
    name: "Lines",
    components: {
      Lines
    },
    data() {
      return {
        editTab: 'name1',
        tabs: [
          {
            name: 'name1',
            title: 'title1111',
            content: 'content1'
          },
          {
            name: 'name2',
            title: 'title2222',
            content: 'content2'
          },
        ],

        lines: [],
        // 给一个较大值，待页面加载后调整
        tableHeight: 2000
      };
    },
    mounted() {
      // this.renderLines();
    },
    computed: {
      filePath() {
        return this.$store.state.filePath;
      },
      updateLines() {
        return this.$store.state.updateLines;
      }
    },
    watch: {
      filePath() {
        this.renderLines();
      },
      updateLines() {
        this.renderLines();
      }
    },
    methods: {
      // 关闭标签
      removeTab() {

      },
      // 调整表格高度到适应容器
      adjustTableHeight() {
        const heightStr = window.getComputedStyle(this.$refs.lines).height;
        this.tableHeight = parseFloat(heightStr);
      },
      async renderLines() {
        if (this.$store.state.searchType === 1) {
          await this.renderLinesBySearch();
        } else {
          await this.renderLinesByStart();
        }
      },
      async renderLinesByStart() {
        const query = {
          filePath: this.$store.state.filePath,
          lnum: this.$store.state.lnum,
          lstart: this.$store.state.lstart
        };
        const dataRaw = await getLines(query);
        this.lines = dataRaw.lines;
        this.adjustTableHeight();
      },
      async renderLinesBySearch() {
        const query = {
          filePath: this.$store.state.filePath,
          pattern: this.$store.state.pattern
        };
        const dataRaw = await search(query);
        this.lines = dataRaw.results;
        this.lines = this.lines.map(line => {
          const start = line.start - line.lineStart;
          const end = line.end - line.lineStart;
          const text = line.content;
          line.content = text.substring(0, start);
          line.match = text.substring(start, end);
          line.content2 = text.substring(end);
          return line;
        });
        this.adjustTableHeight();
      },
      // 双击行
      onLineDbClick(row) {
        if (row.match) {
          // TODO 跳转到以lineno为中间行
          this.$store.commit('submitSearch', {
            searchType: 0,
            lstart: row.lineno,
            pattern: this.$store.state.pattern
          });
          this.$store.commit('updateLines');
        }
      },
    }
  }
</script>

<style>

</style>