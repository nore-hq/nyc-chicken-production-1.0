import { onRequestDelete as __api_admin_menu__id__ts_onRequestDelete } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\menu\\[id].ts"
import { onRequestPatch as __api_admin_menu__id__ts_onRequestPatch } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\menu\\[id].ts"
import { onRequestPut as __api_admin_menu__id__ts_onRequestPut } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\menu\\[id].ts"
import { onRequestGet as __api_admin_categories_ts_onRequestGet } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\categories.ts"
import { onRequestPost as __api_admin_categories_ts_onRequestPost } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\categories.ts"
import { onRequestGet as __api_admin_menu_index_ts_onRequestGet } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\menu\\index.ts"
import { onRequestPost as __api_admin_menu_index_ts_onRequestPost } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\menu\\index.ts"
import { onRequestPost as __api_auth_login_ts_onRequestPost } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\auth\\login.ts"
import { onRequestPost as __api_auth_logout_ts_onRequestPost } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\auth\\logout.ts"
import { onRequestGet as __api_auth_me_ts_onRequestGet } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\auth\\me.ts"
import { onRequestGet as __api_menu_ts_onRequestGet } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\menu.ts"
import { onRequest as __api_admin__middleware_ts_onRequest } from "C:\\E_folder\\AGENCY\\newyork_chicken\\source-code-nyc-chicken\\functions\\api\\admin\\_middleware.ts"

export const routes = [
    {
      routePath: "/api/admin/menu/:id",
      mountPath: "/api/admin/menu",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_menu__id__ts_onRequestDelete],
    },
  {
      routePath: "/api/admin/menu/:id",
      mountPath: "/api/admin/menu",
      method: "PATCH",
      middlewares: [],
      modules: [__api_admin_menu__id__ts_onRequestPatch],
    },
  {
      routePath: "/api/admin/menu/:id",
      mountPath: "/api/admin/menu",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_menu__id__ts_onRequestPut],
    },
  {
      routePath: "/api/admin/categories",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_categories_ts_onRequestGet],
    },
  {
      routePath: "/api/admin/categories",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_categories_ts_onRequestPost],
    },
  {
      routePath: "/api/admin/menu",
      mountPath: "/api/admin/menu",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_menu_index_ts_onRequestGet],
    },
  {
      routePath: "/api/admin/menu",
      mountPath: "/api/admin/menu",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_menu_index_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/logout",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_logout_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/me",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_me_ts_onRequestGet],
    },
  {
      routePath: "/api/menu",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_menu_ts_onRequestGet],
    },
  {
      routePath: "/api/admin",
      mountPath: "/api/admin",
      method: "",
      middlewares: [__api_admin__middleware_ts_onRequest],
      modules: [],
    },
  ]