<!-- 视频目录页 -->
<template>
  <div>
    <h1 data-flex="cross:center" class="f-22 p-b-8 b-b">
      <h-icon name="view"></h-icon>
      <span class="m-l-10">{{ title }}</span>
    </h1>
    <div>

      <ul class="p-h-15 p-t-20">
          <!-- 目录 -->
          <template v-if="data.length > 0">
            <li
              v-for="item in data"
              data-flex="cross:center"
              class="catalog m-t-20 p-b-20 p-h-10 b-b"
              :key="item._id"
            >
              <div>
                <h-icon name="video" class="o-8"></h-icon>
              </div>
              <div class="m-l-18 bx-b w-100" data-flex="main:justify">
                <div>
                  <p
                    class="m-b-15 f-18 cp t-hover"
                    @click="toVideo(item._id)"
                    :data-url="item._id"
                  >
                    {{ item.title }}
                  </p>
                  <p class="o-7 p-r-100">{{ item.decoration }}</p>
                </div>
              </div>
              <el-button type="primary" size="medium" @click="toVideo(item._id)">开始学习</el-button>
            </li>
          </template>
          <template v-else>
            <li class="a-c f-22 m-v-20">暂无目录</li>
          </template>  
      </ul>

      <el-pagination
        v-if="data.length > 0"
        class="m-v-20 a-c"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "catalog" },
    data: { type: Array, default: () => [] },
    id: {
      type: String,
    },
    total: { type: Number, default: 0 },
  },
  data() {
    return {
      pagination: {
        pageSizeOptions: ["10", "20", "30", "50"],
        current: 1, // 当前页数
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {
    title() {
     return `课程目录（${this.total}章）`;
    },
  },
  watch: {
    total: {
      deep: true,
      immediate: true,
      handler(newV) {
        this.pagination.total = newV;
      },
    },
  },
  methods: {
    

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.pagination.current = 1;
      this.$emit("handleSizeChange", this.pagination);
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.$emit("handleCurrentChange", this.pagination);
    },

    toVideo(id) {
      this.$router.push({
        path: "/video",
        query: { courseId: this.id, sectionId: id },
      });
    },

  },
};
</script>

<style scoped src="../../assets/css/base.scss" lang="scss"></style>
