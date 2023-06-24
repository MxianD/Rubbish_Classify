import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import PersonalCenter from "@/components/PersonalCenter.vue";
import Upload from "@/components/Upload.vue";
import History from "@/components/History.vue";
import Tips from "@/components/Tips.vue";
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"
import UploadVideo from '@/components/UploadVideo.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: "/personalCenter",
                name: "personCenter",
                component: PersonalCenter
            },
            {
                path: "/upload",
                name: "upload",
                component: Upload
            },
            {
                path: "/history",
                name: "history",
                component: History
            },
            {
                path: "/tips",
                name: "tips",
                component: Tips
            },
            {
                path: "/uploadVideo",
                name: "uploadVideo",
                component:UploadVideo
            }
        ]
    }, {       
        path: "/login",
        name: "login",
        component: Login
    },{
        path: "/register",
        name: "register",
       component:Register
    }
    ]
})
export default router;