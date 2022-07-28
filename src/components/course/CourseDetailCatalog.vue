<!-- 目录 -->
<template>
  <div>
    <list-view
      type="catalog"
      :data="data"
      :id='id'
      :total="pagination.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      
    ></list-view>
  </div> 
</template>

<script>
import ListView from "./ListView";
import { getCouresAllSection } from "../../request/course";
export default {
  components: {
    ListView,
  },
  props: {
    id: {
      type: String,
    },
    courseDetail: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      data: [],
      pagination: {
        pageSizeOptions: ["10", "20", "30", "50"],
        current: 1, // 当前页数
        pageSize: 10,
        total: 0,
      },
    };
  },
  methods: {
    async init(params = {}) {
      Object.assign(params, { id: this.id });
      getCouresAllSection({
        ...params,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
      }).then((res) => {
        let data = res.message;
        if (data) {
          this.data = data || [];
          this.pagination.total = res.status || 0;
          this.$emit("firstData", this.data);
        }
      });
    },
    //到第几页
    handleCurrentChange(val) {
      this.pagination = val;
      this.init();
    },
    handleSizeChange(val) {
      this.pagination = val;
      this.init();
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped src="../../assets/css/base.scss" lang="scss"></style>
