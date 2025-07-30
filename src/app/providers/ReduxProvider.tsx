"use client"; // 👈 This makes it a Client Component

import { Provider } from "react-redux";
import { store } from "../store/store";
import React from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
