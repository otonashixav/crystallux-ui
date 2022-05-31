/* @jsxImportSource solid-js */
import { JSX } from "solid-js";
import "../src";
import { PassProps } from "../src";

export function Wrapper(props: { children: JSX.Element }) {
  return <PassProps $children="Hello World">{props.children}</PassProps>;
}
