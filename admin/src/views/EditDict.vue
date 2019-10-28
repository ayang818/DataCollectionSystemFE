<template>
    <div>
        <h2>编辑数据条目</h2>
        <el-table
        :data="model"
        style="width: 100%">
        <el-table-column
            prop="studentName"
            label="内容"
            width="180">
        </el-table-column>
        <el-table-column
            prop="type"
            label="上级"
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
          @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
    {{model}}
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
            model: [],
        }
    },
    methods: {
        async fetch() {
            
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        filterStatus(value, row) {
            return row.pass === value;
        },
    },
    
    created() {

    }
}
</script>
