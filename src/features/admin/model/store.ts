import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "@/features/admin/model/admin-slice";
import type { CmsContent } from "@/domain/entities/cms-content";
import type { CmsApplication } from "@/application/services/cms-application";

export function makeStore(content: CmsContent, application: CmsApplication) {
  return configureStore({
    reducer: { admin: adminReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: application } }),
    preloadedState: {
      admin: {
        content,
        loading: false,
        error: null,
        uploading: false,
      },
    },
  });
}

export type CmsStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<CmsStore["getState"]>;
export type AppDispatch = CmsStore["dispatch"];
