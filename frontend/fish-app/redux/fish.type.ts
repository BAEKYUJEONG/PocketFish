export interface FishState {
    exampleStringState: string | null;
}

export const SET_EXAMPLE_STRING = 'SET_EXAMPLE_STRING';

export interface SetExampleStringAction {
    type: typeof SET_EXAMPLE_STRING;
    exampleStringState: string | null;
}