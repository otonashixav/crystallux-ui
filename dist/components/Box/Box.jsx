import { Dynamic } from "solid-js/web";
import { combineProps } from "../../utils/combineProps";
import styles from "./Box.module.css";
const defaultProps = { component: "div", class: styles.Box };
Box.defaultProps = defaultProps;
export default Box;
export function Box(props) {
    const combinedProps = combineProps(defaultProps, props);
    return <Dynamic {...combinedProps}/>;
}
