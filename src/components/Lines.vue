<template>
    <div id="lines" ref="lines">
        <el-table :data="lines" style="width: 100%;" :height="tableHeight" stripe @row-dblclick="onLineDbClick">
            <el-table-column
                fixed
                prop="lineno"
                label="行号"
                width="60">
            </el-table-column>
            <el-table-column
                prop="content"
                label="内容">
                <template slot-scope="scope">
                    <span>{{scope.row.content}}</span>
                    <span class="match">{{scope.row.match}}</span>
                    <span>{{scope.row.content2}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  import {getLines, search} from "@/services/lines"
  export default {
    name: "Lines",
    data() {
      return {
        editTab: 'name',
        tabs: [
          {
            name: 'name2',
            title: 'title',
            content: 'content1'
          },
          {
            name: 'name',
            title: 'title2',
            content: 'content2'
          }
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
    span.match {
        background: #ffff99;
    }
    #lines{
        height: 100%;
        max-height: 100%;
        min-height: 100%;
    }
    .lines{
        height: 100%;
        max-height: 100%;
        min-height: 100%;
        padding: 0;
    }
    .line {
        white-space: nowrap;
        border-bottom: solid 1px lightgray;
        list-style-type:none;
        padding-left: 5px;
    }
    .cell {
        white-space: nowrap !important;
        text-overflow: unset !important;
    }
    /*.el-table__fixed-header-wrapper, .el-table__header-wrapper{*/
        /*height: 0;*/
    /*}*/
    .el-table__body{
        width: unset !important;
    }
    .el-table__body td {
        height: 30px;
    }
</style>