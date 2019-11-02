<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="预览" name="previous">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <h2 style="text-align: center;" v-if="tableData.length != 0">预览excel</h2>
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="上传" name="upload">
        <el-upload
          class="upload-demo"
          :action="$http.defaults.baseURL+'/api/excel/competition'"
          :headers=getAuthHeaders()
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
           multiple
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UploadExcelComponent from '../../components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      fileList: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    handleRemove(file, fileList) {
      fileList.remove(file);
    },
    handlePreview(file) {
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
