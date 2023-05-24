<template>
    <div id="app_index">
        <el-header height="60px">
            <headers />
        </el-header>
        <!-- 顶部 -->
        <el-container>
            <el-main>
                <router-view />
            </el-main>
            <!-- 容器 -->
        </el-container>
    </div>
</template>
<script>
import headers from "@/components/header";
export default {
    components: { headers },
}
</script>