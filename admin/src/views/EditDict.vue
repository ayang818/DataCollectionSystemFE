<template>
    <div>
        <h2>{{!this.parent ? "编辑数据条目" : this.parent}}</h2>
        <el-table
        :data="model"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称"
            width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="listDescendant(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteNode(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        parent: {},
    },
    data() {
        return {
            model: [{'id' : 1}],
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
        listDescendant(index, row) {

        },
        async deleteNode(index, row) {
            
        }
    },
    
    created() {

    }
}
</script>
