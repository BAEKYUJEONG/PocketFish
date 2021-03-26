import {
    FishState,
    SET_EXAMPLE_STRING,
    SetExampleStringAction
} from "./fish.type";

export const fishState: FishState={
    exampleStringState: null,
};

export const SetExampleString =(text: string): SetExampleStringAction=>{
    return {
        type: SET_EXAMPLE_STRING,
        exampleStringState: text,
    };
};

export const fishReducer = (state = fishState, action:any): FishState=>{
    switch(action.type){
        case SET_EXAMPLE_STRING:
            return{ ...state, exampleStringState: action.examepleStringState};
        default:
            return state;
    }
}
