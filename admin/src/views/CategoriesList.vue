<template>
    <div>
        <h3>分类列表</h3>
        <el-table :data="tableData">
            <el-table-column prop="_id" label="ID">
        </el-table-column>
        <el-table-column prop="parent.name" label="上级名称" >
        </el-table-column>
        <el-table-column prop="name" label="分类名称" >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="modify(scope.row._id)"  size="small">编辑</el-button>
                <el-button @click="drop(scope.row)"  size="small">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/rest/categories");
            this.tableData = res.data;
        },
        drop(row) {
            this.$confirm(`是否删除分类 "${row.name}"`, "提示", {
                cancelButtonText: "取消",                
                confirmButtonText: "确认",
                type: "warning"
            }).then(async () =>{
                await this.$http.delete(`/rest/heroes/${row._id}`);
                this.$message({
                    type: "success",
                    message: "删除成功"
                })
            this.fetch();
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                })
            })
        },
        async modify(id) {
            this.$router.push(`/categories/edit/${id}`);
        }
    },  
    created() {
        this.fetch();
    }
}
</script>