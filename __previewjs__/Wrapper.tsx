/* @jsxImportSource solid-js */
import { JSX } from "solid-js";
import "../src";
import { PropsProvider } from "../src";
import { dark, light } from "../src/theme/styles.css";

export function Wrapper(props: { children: JSX.Element }) {
  return (
    <PropsProvider $children="Hello World">
      <div style={{ height: "100vh", display: "grid" }}>
        <div class={dark}>{props.children}</div>
        <div class={light}>{props.children}</div>
      </div>
    </PropsProvider>
  );
}
