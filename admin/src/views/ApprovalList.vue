<template>
    <div>
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
            label="审批状态"
            :filters="[{text : '审核通过', value: '审核通过'},{text : '审核不通过', value: '审核不通过'},{text : '审核中', value: '审核中'}]"
            :filter-method="filterStatus"
            filter-placement="bottom-end">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="edit(scope.$index, scope.row)" v-if="scope.row.pass != '审核通过'">编辑</el-button>
        <el-button
        size="mini"
        @click="viewSource(scope.$index, scope.row)" v-if="scope.row.pass == '审核通过'">查看详情</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            model: [],
        }
    },
    methods: {
        async fetchList() {
            const res = await this.$http.get("/api/honor/list");
            const data = res.data
            for (let i = 0; i < data.length; i++) {
                let entry = data[i]
                if (entry.pass === 0) {
                    entry.pass = "审核不通过"
                }
                if (entry.pass === 1) {
                    entry.pass = "审核中"
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
                    entry.type = "申请知识产权"
                }
                if (entry.type === 4) {
                    entry.type = "综合素质提升"
                }
            }
            this.model = data;
        },
        edit(index, row) {
            if (row.type === "学科竞赛获奖") {
                this.$router.push("/honor/competition/edit/"+row.detailId);
            }
            else if (row.type === "发表科研论文") {
                this.$router.push("/honor/paper/edit/"+row.detailId);
            }
            else if (row.type === "综合素质提升") {
                this.$router.push("/honor/ability/edit/"+row.detailId);
            }
            else if (row.type === "申请知识产权") {
                this.$router.push("/honor/knowledge/edit/"+row.detailId);
            }
        },
         filterStatus(value, row) {
            return row.pass === value;
        },
        viewSource(index, row) {
            if (row.type === "学科竞赛获奖") {
                this.$router.push("/honor/competition/edit/"+row.detailId);
            }
            else if (row.type === "发表科研论文") {
                this.$router.push("/honor/paper/edit/"+row.detailId);
            }
            else if (row.type === "综合素质提升") {
                this.$router.push("/honor/ability/edit/"+row.detailId);
            }
            else if (row.type === "申请知识产权") {
                this.$router.push("/honor/knowledge/edit/"+row.detailId);
            }
        }
    },
    created() {
        this.fetchList()
    }
}
</script>

<style lang="css">
    
</style>