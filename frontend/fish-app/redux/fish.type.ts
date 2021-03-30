export interface FishState {
    fishImage: string | null ; //카메라로 촬영한 사진
    fishResult: string |null; //이미지 분석 결과
}

export const SET_FISH_IMAGE='SET_FISH_IMAGE';
export const SET_FISH_RESULT='SET_FISH_RESULT';

export interface SetFishImageAction{
    type: typeof SET_FISH_IMAGE;
    fishImage: string | null ;
}

export interface SetFishResultAction{
    type: typeof SET_FISH_RESULT;
    fishResult: string | null;
}