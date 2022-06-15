/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
declare module "@vanilla-extract/sprinkles" {
  import { CSSProperties, StyleRule } from "@vanilla-extract/css";
  import { SprinklesFn } from "@vanilla-extract/sprinkles/dist/declarations/src/createSprinkles";
  import {
    SprinklesProperties,
    ResponsiveArrayConfig,
  } from "@vanilla-extract/sprinkles/dist/declarations/src/types";
  export {
    createNormalizeValueFn,
    createMapValueFn,
  } from "@vanilla-extract/sprinkles/createUtils";
  export type {
    ConditionalValue,
    RequiredConditionalValue,
  } from "@vanilla-extract/sprinkles/createUtils";
  interface Condition {
    "@media"?: string;
    "@supports"?: string;
    selector?: string;
  }
  type BaseConditions = {
    [conditionName: string]: Condition;
  };
  type AtomicProperties = {
    [Property in
      | (string & {})
      | keyof CSSProperties]?: Property extends keyof CSSProperties
      ?
          | Record<
              string,
              | CSSProperties[Property]
              | Omit<StyleRule, "selectors" | "@media" | "@supports">
            >
          | ReadonlyArray<CSSProperties[Property]>
      : Record<string, Omit<StyleRule, "selectors" | "@media" | "@supports">>;
  };
  type ShorthandOptions<
    Properties extends AtomicProperties,
    Shorthands extends {
      [shorthandName: string]: Array<keyof Properties>;
    }
  > = {
    shorthands: Shorthands;
  };
  type UnconditionalAtomicOptions<Properties extends AtomicProperties> = {
    properties: Properties;
  };
  type ResponsiveArrayOptions<
    Conditions extends {
      [conditionName: string]: Condition;
    },
    ResponsiveLength extends number
  > = {
    responsiveArray: ResponsiveArrayConfig<keyof Conditions> & {
      length: ResponsiveLength;
    };
  };
  type ConditionalAtomicOptions<
    Properties extends AtomicProperties,
    Conditions extends {
      [conditionName: string]: Condition;
    },
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  > = UnconditionalAtomicOptions<Properties> & {
    conditions: Conditions;
    defaultCondition: DefaultCondition;
  };
  type Values<Property, Result> = {
    [Value in Property extends ReadonlyArray<any>
      ? Property[number]
      : Property extends Array<any>
      ? Property[number]
      : keyof Property]: Result;
  };
  type UnconditionalAtomicStyles<Properties extends AtomicProperties> = {
    conditions: never;
    styles: {
      [Property in keyof Properties]: {
        values: Values<
          Properties[Property],
          {
            defaultClass: string;
          }
        >;
      };
    };
  };
  type ConditionalAtomicStyles<
    Properties extends AtomicProperties,
    Conditions extends {
      [conditionName: string]: Condition;
    },
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  > = {
    conditions: {
      defaultCondition: DefaultCondition;
      conditionNames: Array<keyof Conditions>;
    };
    styles: {
      [Property in keyof Properties]: {
        values: Values<
          Properties[Property],
          {
            defaultClass: DefaultCondition extends false ? undefined : string;
            conditions: {
              [Rule in keyof Conditions]: string;
            };
          }
        >;
      };
    };
  };
  type ConditionalWithResponsiveArrayAtomicStyles<
    Properties extends AtomicProperties,
    Conditions extends {
      [conditionName: string]: Condition;
    },
    ResponsiveLength extends number,
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  > = {
    conditions: {
      defaultCondition: DefaultCondition;
      conditionNames: Array<keyof Conditions>;
      responsiveArray: Array<keyof Conditions> & {
        length: ResponsiveLength;
      };
    };
    styles: {
      [Property in keyof Properties]: {
        responsiveArray: Array<keyof Conditions> & {
          length: ResponsiveLength;
        };
        values: Values<
          Properties[Property],
          {
            defaultClass: DefaultCondition extends false ? undefined : string;
            conditions: {
              [Rule in keyof Conditions]: string;
            };
          }
        >;
      };
    };
  };
  type ShorthandAtomicStyles<
    Shorthands extends {
      [shorthandName: string]: Array<string | number | symbol>;
    }
  > = {
    styles: {
      [Shorthand in keyof Shorthands]: {
        mappings: Shorthands[Shorthand];
      };
    };
  };
  export function defineProperties<
    Properties extends AtomicProperties,
    ResponsiveLength extends number,
    Conditions extends BaseConditions,
    Shorthands extends {
      [shorthandName: string]: Array<keyof Properties>;
    },
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  >(
    options: ConditionalAtomicOptions<
      Properties,
      Conditions,
      DefaultCondition
    > &
      ShorthandOptions<Properties, Shorthands> &
      ResponsiveArrayOptions<Conditions, ResponsiveLength>
  ): ConditionalWithResponsiveArrayAtomicStyles<
    Properties,
    Conditions,
    ResponsiveLength,
    DefaultCondition
  > &
    ShorthandAtomicStyles<Shorthands>;
  export function defineProperties<
    Properties extends AtomicProperties,
    Conditions extends BaseConditions,
    Shorthands extends {
      [shorthandName: string]: Array<keyof Properties>;
    },
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  >(
    options: ConditionalAtomicOptions<
      Properties,
      Conditions,
      DefaultCondition
    > &
      ShorthandOptions<Properties, Shorthands>
  ): ConditionalAtomicStyles<Properties, Conditions, DefaultCondition> &
    ShorthandAtomicStyles<Shorthands>;
  export function defineProperties<
    Properties extends AtomicProperties,
    Conditions extends BaseConditions,
    ResponsiveLength extends number,
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  >(
    options: ConditionalAtomicOptions<
      Properties,
      Conditions,
      DefaultCondition
    > &
      ResponsiveArrayOptions<Conditions, ResponsiveLength>
  ): ConditionalWithResponsiveArrayAtomicStyles<
    Properties,
    Conditions,
    ResponsiveLength,
    DefaultCondition
  >;
  export function defineProperties<
    Properties extends AtomicProperties,
    Conditions extends BaseConditions,
    DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
  >(
    options: ConditionalAtomicOptions<Properties, Conditions, DefaultCondition>
  ): ConditionalAtomicStyles<Properties, Conditions, DefaultCondition>;
  export function defineProperties<
    Properties extends AtomicProperties,
    Shorthands extends {
      [shorthandName: string]: Array<keyof Properties>;
    }
  >(
    options: UnconditionalAtomicOptions<Properties> &
      ShorthandOptions<Properties, Shorthands>
  ): UnconditionalAtomicStyles<Properties> & ShorthandAtomicStyles<Shorthands>;
  export function defineProperties<Properties extends AtomicProperties>(
    options: UnconditionalAtomicOptions<Properties>
  ): UnconditionalAtomicStyles<Properties>;
  export function createSprinkles<
    Args extends ReadonlyArray<SprinklesProperties>
  >(...config: Args): SprinklesFn<Args>;
  /** @deprecated - Use `defineProperties` */
  export const createAtomicStyles: typeof defineProperties;
  /** @deprecated - Use `createSprinkles` */
  export const createAtomsFn: typeof createSprinkles;
}
