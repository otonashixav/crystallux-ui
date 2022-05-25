import { Component, ComponentProps, JSX } from "solid-js";
interface BoxRequiredProps {
}
declare type BoxProps<T extends keyof JSX.IntrinsicElements | Component<BoxRequiredProps> = "div"> = ComponentProps<T> & {
    component?: T;
};
export default Box;
export declare function Box<T extends keyof JSX.IntrinsicElements | Component<BoxRequiredProps> = "div">(props: BoxProps<T>): JSX.Element;
export declare namespace Box {
    var defaultProps: {
        readonly component: "div";
        readonly class: string;
    };
}
