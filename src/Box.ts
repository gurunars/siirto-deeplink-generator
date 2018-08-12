import {
  compose,
  InferableComponentEnhancerWithProps,
  withProps,
  withState
} from "recompose";

// TODO: avoid comparison by reference
export default interface Box<T> {
  set(value: T): void;
  get(): T;
}

export const branch = <P extends {}, C extends {}>(
  parent: Box<P>,
  from: (parent: P) => C,
  to: (parent: P, child: C) => P
) => {
  return {
    get: (): C => from(parent.get()),
    set: (childValue: C) => to(parent.get(), childValue)
  };
};

type boxProps<
  TState,
  TBoxName extends string
  > = (
    { [boxName in TBoxName]: Box<TState> }
  );

type Preprocessor<TState extends {}> = (input: TState) => TState;

export const annotate = <TState extends {}>(
  annotator: (value: TState) => void
): Preprocessor<TState> => {
  const wrapper = (value: TState): TState => {
    annotator(value);
    return value;
  };
  return wrapper;
};

export const withBoxState = <
  TOutter,
  TState,
  TBoxName extends string
  >(
    boxName: string,
    initial: TState | ((props: TOutter) => TState),
    preprocess?: Preprocessor<TState>
  ): InferableComponentEnhancerWithProps<
  boxProps<TState, TBoxName>,
  TOutter
  > => compose(
    withState(boxName, boxName + "OnChange", initial),
    withProps((props: TOutter): boxProps<TState, TBoxName> => {
      const _boxProps = {};
      _boxProps[boxName] = {
        get: () => props[boxName],
        set: (value: TState) => props[boxName + "OnChange"](
          preprocess ? preprocess(value) : value
        )
      };
      return _boxProps as boxProps<TState, TBoxName>;
    })
  );