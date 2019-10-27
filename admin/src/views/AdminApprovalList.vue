<template>
    <div>
        <h2>所有审批</h2>
        <el-table
        :data="model"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="单号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="180">
        </el-table-column>
        <el-table-column
            prop="honorName"
            label="名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="pass"
            label="审批状态">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
          {{scope.row}}
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    props: {
        id: {},
    },
    data() {
        return {
            model: {},
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("api/honor/admin/list");
            const data = res.data;
            for (let i = 0; i < data.length; i++) {
                let entry = data[i]
                if (entry.pass === 0) {
                    entry.pass = "未通过审核"
                }
                if (entry.pass === 1) {
                    entry.pass = "正在审核"
                }
                if (entry.pass === 2) {
                    entry.pass = "审核通过"
                }
                if (entry.type === 1) {
                    entry.type = "学科竞赛获奖"
                }
                if (entry.type === 2) {
                    entry.type = "发表科研论文"
                }
                if (entry.type === 3) {
                    entry.type = "综合素质提升"
                }
                if (entry.type === 4) {
                    entry.type = "发表科研论文"
                }
            }
            this.model = res.data;
        }
    },
    
    created() {
        this.fetch()
    }
}
</script>
