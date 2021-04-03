import {
    FishState,
    SetFishImageAction,
    SetFishResultAction,
    SET_FISH_IMAGE,
    SET_FISH_RESULT
} from "./fish.type";

export const fishState: FishState={
    fishImage: null,
    fishResult: null
};

export const SetFishImage=(image:string): SetFishImageAction=>{
    //console.log(image);
    return{
        type: SET_FISH_IMAGE,
        fishImage: image,
    };
};

export const SetFishResult=(result:string) : SetFishResultAction=>{
    return{
        type: SET_FISH_RESULT,
        fishResult: result,
    }
}

export const fishReducer = (state = fishState, action:any): FishState=>{
    switch(action.type){
        case SET_FISH_IMAGE:
            //console.log(action.fishImage);
            console.log(fishState);
            return {...state, fishImage:action.fishImage};
        case SET_FISH_RESULT:
            return {...state, fishResult:action.fishResult};
        default:
            return state;
    }
}
