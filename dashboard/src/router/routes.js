const Home = () => import("../views/Home/HomeView.vue");
const Feedbacks = () => import("../views/Feedbacks/FeedbacksView.vue");
const Credentials = () => import("../views/Credentials/CredentialsView.vue");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/credentials",
    name: "Credentials",
    component: Credentials,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];
