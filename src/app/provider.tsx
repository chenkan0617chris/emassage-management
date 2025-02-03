"use client"
import Sidebar from "@/components/sidebar";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { persistedStore, store } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <PersistGate loading={null} persistor={persistedStore}>
        <Provider store={store}>
          <Sidebar />
          {children}
        </Provider>
      </PersistGate>
    </NextUIProvider>
  )
}