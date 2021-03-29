import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CollectionItemView(props : any) {
    const { } = props;
    return (
        <TouchableOpacity
            onPress={() => alert("상세 페이지 이동")}
        >
        </TouchableOpacity>
    );
}