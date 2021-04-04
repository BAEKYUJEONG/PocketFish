import React from 'react';


export function NumberToStringKorean(number : number){
  switch (number) {
    case 1:
      return "광어";
    case 2:
      return "참돔";
    case 3:
      return "우럭";
    case 4:
      return "붕어";
    case 5:
      return "쏘가리";
    default:
      return "배스";
  }
}
export function NumberToStringEnglish(number:number){
  switch (number) {
    case 1:
      return "flatfish";
    case 2:
      return "red snapper";
    case 3:
      return "rockfish";
    case 4:
      return "crucian carp";
    case 5:
      return "golden mandarin fish";
    default:
      return "bass";
  }
}
export function EnglishToKorean(name: string){
  switch (name) {
    case "flatfish":
      return "광어";
    case "red snapper":
      return "참돔";
    case "rockfish":
      return "우럭";
    case "crucian carp":
      return "붕어";
    case  "golden mandarin fish":
      return "쏘가리";
    default:
      return "배스";
  }
}
export function StringToNumber(name: string){
  switch (name) {
    case "flatfish":
      return 1;
    case "red snapper":
      return 2;
    case "rockfish":
      return 3;
    case "crucian carp":
      return 4;
    case  "golden mandarin fish":
      return 5;
    default:
      return 6;
  }
}