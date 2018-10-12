<template>
    <div id="ToolsBar">
        <div class="area select-area">
            <el-form ref="form" :inline="false" label-width="80px">
                <el-form-item label="选择主机">
                    <el-select v-model="host" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in hosts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择目录">
                    <el-select v-model="rootDir" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in rootDirs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <div class="area settings-area">
            <el-form ref="form" :inline="true" label-width="80px">
                <el-form-item label="显示行数">
                    <el-input
                            placeholder="请输入"
                            v-model="lnum"
                            size="small"
                            width="100"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitSettings" size="small">确认</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="area search-area">
            <el-form ref="form" :inline="true" label-width="80px">
                <el-form-item label="查询方式">
                    <el-radio-group v-model="searchType" size="small">
                        <el-radio-button :label="0">按行号</el-radio-button>
                        <el-radio-button :label="1">正则搜索</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <br>
                <el-form-item label="起始行号" v-show="searchType===0">
                    <el-input
                            placeholder="请输入行号数字"
                            v-model="lstart"
                            size="small"
                            width="100"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="搜索" v-show="searchType===1">
                    <el-input
                            placeholder="请输入正则表达式"
                            v-model="pattern"
                            size="small"
                            width="100"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitSearch" size="small">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ToolsBar",
    data() {
      return {
        // 主机s
        hosts: [{
          value: 'localhost',
          label: 'localhost',
        }],
        host: 'localhost',
        // 目录
        rootDirs: [],
        rootDir: '/var/webos/logs',
        // 获取总行数
        lnum: 100,
        // 起始行数
        lstart: 0,
        // 搜索pattern
        pattern: '',
        // 查询方式
        searchType: 0,
      }
    },
    mounted() {

    },
    methods: {
      onSubmitSearch() {
        this.$store.commit('submitSearch', {
          searchType: this.searchType,
          lstart: this.lstart,
          pattern: this.pattern
        });
        this.$store.commit('updateLines');
      },
      onSubmitSettings() {
        this.$store.commit('submitSettings', this.lnum);
        this.$store.commit('updateLines');
      }
    }
  }
</script>

<style>
    #ToolsBar {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
    }
    .area {
        margin: 10px 0 0 0;
        border-right: 1px solid lightgray;
    }
    .select-area {
        flex: 3;
    }
    .settings-area {
        flex: 3;
    }
    .search-area {
        flex: 3;
    }
    .el-form-item {
        margin-bottom: 6px;
    }
    .el-form-item__label{
        font-size: 12px;
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>