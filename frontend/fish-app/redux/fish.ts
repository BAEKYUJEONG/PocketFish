import {
    FishState,
    SetFishImageAction,
    SET_FISH_IMAGE
} from "./fish.type";

export const fishState: FishState={
    fishImage: null,
};

export const SetFishImage=(image:string): SetFishImageAction=>{
    //console.log(image);
    return{
        type: SET_FISH_IMAGE,
        fishImage: image,
    };
};

export const fishReducer = (state = fishState, action:any): FishState=>{
    switch(action.type){
        case SET_FISH_IMAGE:
            //console.log(action.fishImage);
            console.log(fishState);
            return {...state, fishImage:action.fishImage};
        default:
            return state;
    }
}
