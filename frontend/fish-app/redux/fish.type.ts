export interface FishState {
    fishImage: string | null ; //카메라로 촬영한 사진
}

export const SET_FISH_IMAGE='SET_FISH_IMAGE';

export interface SetFishImageAction{
    type: typeof SET_FISH_IMAGE;
    fishImage: string | null ;
}