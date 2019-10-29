<template>
    <div>
        <h2>{{!this.parent ? "编辑数据条目" : this.parent_value}}</h2>
        <el-table
        :data="model"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="title"
            label="名称"
            width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="listDescendant(scope.$index, scope.row)">进入条目</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteNode(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-form ref="form" :model="input" label-width="140px" @@submit.native.prevent>
            <el-form-item label="在此层级新建条目">
                <el-input v-model="input.value" clearablel></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="insertNode">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        parent: {},
    },
    data() {
        return {
            model: [],
            input: {},
            parent_value: "",
        }
    },
    methods: {
        async fetch(parentId) {
            const res = await this.$http.get("/api/admin/categories/query?parent="+parentId);
            this.model = res.data;
        },
        async deleteNode(index, row) {
            const id = this.parent ? this.parent : 0;
            const res = await this.$http.get("/api/admin/categories/delete?parent="+row.id); 
            this.fetch(id)
        },
        async insertNode() {
            const id = this.parent ? this.parent : 0;
            const res = await this.$http.get("/api/admin/categories/insert?parent="+id+"&value="+this.input.value);
            this.fetch(id);
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        filterStatus(value, row) {
            return row.pass === value;
        },
        listDescendant(index, row) {
            this.$router.push("/admin/editdict/"+row.id);
        },
        async getParentName(parentId) {
            const res = await this.$http.get("/api/admin/categories/parentname?parent="+parentId);
            this.parent_value = res.data;
        }
    },
    
    created() {
        !this.parent && this.fetch(0);
        this.parent && this.fetch(this.parent);
        this.parent && this.getParentName(this.parent);
    }
}
</script>
